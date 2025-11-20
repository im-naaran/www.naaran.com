const { themes } = require('prism-react-renderer')
const lightTheme = themes.github
const darkTheme = themes.dracula
const navbar = require('./docusaurus.config.navbars')

const HOST = 'https://www.naaran.com'

const config = {
  title: '知识森林',
  tagline: '知识森林',
  favicon: 'img/favicon.ico',
  url: HOST,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          path: 'docs',
          sidebarPath: require.resolve('./docusaurus.config.sidebars.js'),
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        blog: {
          routeBasePath: '/blog',
          path: 'blog',
          showReadingTime: true,
          blogSidebarCount: 20,
          blogSidebarTitle: '最新文章',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
        gtag: {
          trackingID: 'G-92GG5G6QVL',
          anonymizeIP: true
        }
      }
    ]
  ],
  themeConfig: {
    navbar,
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'sitemap',
              href: HOST + '/sitemap.xml'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Naaran. Built with Docusaurus.`
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
      additionalLanguages: ['bash', 'diff', 'json'],
    },
    algolia: {
      appId: 'YIOL05U7L5',
      apiKey: '8984f17ffb8ad373bc0a40788f6bb2d3',  // 只读 API Key（不是管理员 Key）
      indexName: 'blog',
      contextualSearch: false, // 是否开启上下文搜索
      searchParameters: {}, // 可选：传递给 Algolia API 的搜索参数
      insights: true, // 是否启用 Algolia Insights（可选）
      // askAi: 'YOUR_ALGOLIA_ASSISTANT_ID', // TODO: Replace with your Algolia Assistant ID
    },
  },
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid'
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'baidu-site-verification',
        content: 'codeva-iIlYvv0UuU',
      },
    },
    {
      tagName: 'script',
      innerHTML: `
if ('serviceWorker' in navigator && 'caches' in window) {
  // 只在生产环境中注册 Service Worker
  if (window.location.hostname !== 'localhost') {
    console.log('[Service Worker] 注册启动')
    
    // 生成版本号：使用构建时时间戳（会被脚本自动更新）
    const SW_VERSION = 'SW_1732099200000'
    
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      console.log('[Service Worker] 注册成功:', registration.scope)
      
      // 发送版本信息给 SW
      const sendMessage = () => {
        if (registration.active) {
          registration.active.postMessage({
            type: 'SW_NAME',
            payload: SW_VERSION
          })
        }
      }
      
      // 立即发送
      sendMessage()
      
      // 监听 SW 更新
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        console.log('[Service Worker] 发现新版本')
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'activated') {
            console.log('[Service Worker] 新版本已激活，清理旧缓存')
            sendMessage()
            // 刷新页面以使用新的 SW
            window.location.reload()
          }
        })
      })
    }).catch(function (err) {
      console.log('[Service Worker] 注册失败:', err)
    })
  } else {
    console.log('[Service Worker] 本地开发环境，跳过注册')
  }
}
      `,
      attributes: {
        defer: 'true',
      },
    },
  ],
}

module.exports = config
