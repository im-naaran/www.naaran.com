import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import './index.css'

// 导入生成的最新内容
import latestContent from './latest-content.json'

export default function Home () {
  const { siteConfig } = useDocusaurusContext()
  const { blogs, docs } = latestContent
  
  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
  
  return (
    <Layout
      title="首页"
      description="构建自己的知识森林">
      <main className="home-page">
        <div className="hero-section">
          <h1>构建自己的知识森林</h1>
          <p className="hero-subtitle">记录学习、分享经验、持续成长</p>
        </div>

        <div className="content-section">
          {/* 最新博客 */}
          <section className="content-block">
            <div className="section-header">
              <h2>最新博客</h2>
              <Link to="/blog" className="view-all">查看全部 →</Link>
            </div>
            <div className="card-grid">
              {blogs.map((blog, index) => (
                <Link key={index} to={blog.permalink} className="content-card">
                  <div className="card-meta">
                    <span className="card-date">{formatDate(blog.date)}</span>
                  </div>
                  <h3 className="card-title">{blog.title}</h3>
                </Link>
              ))}
            </div>
          </section>

          {/* 最新文档 */}
          <section className="content-block">
            <div className="section-header">
              <h2>最新文档</h2>
              <Link to="/keyboard/intro" className="view-all">查看全部 →</Link>
            </div>
            <div className="card-grid">
              {docs.map((doc, index) => (
                <Link key={index} to={doc.permalink} className="content-card">
                  <div className="card-meta">
                    <span className="card-category">{doc.category}</span>
                  </div>
                  <h3 className="card-title">{doc.title}</h3>
                  {doc.description && (
                    <p className="card-description">{doc.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}
