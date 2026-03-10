const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const BLOG_DIR = path.join(__dirname, '../blog')
const DOCS_DIR = path.join(__dirname, '../docs')

const OUTPUT_FILE = path.join(__dirname, '../src/pages/latest-content.json')

// 读取文件 frontmatter
function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  
  const frontmatter = {}
  const lines = match[1].split('\n')
  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
      frontmatter[key] = value
    }
  }
  return frontmatter
}

// 获取博客列表（扫描文件，生成正确的 permalink）
function getLatestBlogs() {
  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(BLOG_DIR, filename)
      const frontmatter = readFrontmatter(filePath)
      
      const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/)
      if (!match) return null
      
      const [, year, month, day, slug] = match
      const date = frontmatter.date || `${year}-${month}-${day}`
      
      return {
        title: frontmatter.title || slug,
        date: date,
        permalink: `/blog/${year}/${month}/${day}/${slug}`,
        filename
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
  
  return files
}

// 获取文档列表（按 git 最后提交时间）
function getLatestDocs() {
  const docs = []
  
  function scanDir(dir, basePath = '') {
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        scanDir(fullPath, path.join(basePath, item))
      } else if (item.endsWith('.md')) {
        const relativePath = path.join(basePath, item)
        const frontmatter = readFrontmatter(fullPath)
        
        // 获取 git 最后提交时间
        let lastCommitTime = 0
        try {
          const output = execSync(`git log -1 --format=%ct "${fullPath}"`, {
            cwd: path.join(__dirname, '..'),
            encoding: 'utf-8'
          })
          lastCommitTime = parseInt(output.trim()) * 1000
        } catch (e) {
          // 如果没有 git 历史，使用文件修改时间
          lastCommitTime = stat.mtime.getTime()
        }
        
        // 从路径推断分类
        const category = basePath.split('/')[0] || '文档'
        
        // 生成 permalink（去掉 .md 后缀）
        const permalink = '/' + relativePath.replace(/\.md$/, '')
        
        docs.push({
          title: frontmatter.title || item.replace('.md', ''),
          category,
          permalink,
          description: frontmatter.description || '',
          lastCommitTime,
          relativePath
        })
      }
    }
  }
  
  scanDir(DOCS_DIR)
  
  return docs
    .sort((a, b) => b.lastCommitTime - a.lastCommitTime)
    .slice(0, 5)
}

// 主函数
function generate() {
  console.log('生成最新内容列表...')
  
  const blogs = getLatestBlogs()
  const docs = getLatestDocs()
  
  const output = {
    blogs,
    docs,
    generatedAt: new Date().toISOString()
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2))
  
  console.log(`✓ 博客: ${blogs.length} 篇`)
  blogs.forEach(b => console.log(`  - ${b.title} (${b.date})`))
  
  console.log(`\n✓ 文档: ${docs.length} 篇`)
  docs.forEach(d => console.log(`  - ${d.title} (${d.category})`))
  
  console.log(`\n已保存到: ${OUTPUT_FILE}`)
}

generate()
