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
      tagName: 'script',
      innerHTML: `
if ('serviceWorker' in navigator && 'caches' in window) {
  // 只在生产环境中注册 Service Worker
  if (window.location.hostname !== 'localhost') {
    console.log('[Service Worker] 注册启动')
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      console.log('[Service Worker] 注册成功:', registration.scope)
      if (registration.active) {
        registration.active.postMessage({
          type: 'SW_NAME',
          payload: 'SW_${new Date().getTime()}'
        })
      }
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
