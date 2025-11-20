const fs = require('fs');
const path = require('path');

// 生成新的版本号（使用当前时间戳）
const newVersion = `SW_${Date.now()}`;

console.log(`[构建] 更新 Service Worker 版本号: ${newVersion}`);

// 更新 docusaurus.config.js 中的版本号
const configPath = path.join(__dirname, '../docusaurus.config.js');
let configContent = fs.readFileSync(configPath, 'utf8');

// 替换 SW_VERSION 常量
const originalContent = configContent;
configContent = configContent.replace(
  /const SW_VERSION = 'SW_\d+'/,
  `const SW_VERSION = '${newVersion}'`
);

if (configContent === originalContent) {
  console.log('[构建] 警告: 未找到 SW_VERSION 常量，请检查 docusaurus.config.js');
} else {
  fs.writeFileSync(configPath, configContent, 'utf8');
  console.log(`[构建] 已更新 docusaurus.config.js 中的版本号`);
}

