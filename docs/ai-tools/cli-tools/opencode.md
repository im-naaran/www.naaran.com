---
sidebar_position: 5
---

# OpenCode

OpenCode 是开源的 AI 编程助手<sup>[[1]](#参考)</sup>。

## 体验

OpenCode 的 CLI 效果明显要比 CC、Gemini、Codex 体验要好一些，而且在一些配置选择上，还可以使用鼠标，更加人性化。右侧可以实时显示上下文使用量等，也很有创意。不过比起 CC 底栏显示数据来讲，OpenCode 空间利用率太差了。

对于 MCP、agent、subagent 等配置，不支持 CC 导入，需要编辑文件，略显繁琐。非要说好处的话，就是配置项很全面，自定义能力比较强大。

还有一个功能，虽然我极少使用，但是觉得很方便。进入 OpenCode 后，可以通过 <kbd>Ctrl</kbd> + <kbd>p</kbd> 来进行切换 session。Claude 必须在启动时候进行 `claude --resume`。

## 系统要求

- Node.js

## 安装

```bash
npm i -g opencode-ai
# 如果安装失败，可尝试更换国内源进行安装
npm i -g opencode-ai --registry https://registry.npmmirror.com
```

## 使用方法

1. 运行启动命令：

```bash
opencode
```

2. 进入后，使用 <kbd>Ctrl</kbd> + <kbd>p</kbd> 激活 command 配置台，选择 `Connect provider`，来配置 AI 模型。

:::warning 登录

也可以直接使用 `opencode auth login` 来直接进入 `Connect provider`，配置 AI 模型。

:::

3. OpenCode Zen，有时会提供免费模型使用。可以使用 <kbd>Ctrl</kbd> + <kbd>p</kbd>，选择 `Switch Mode`，并选择免费的模型来体验。

## 参考

[1]&nbsp;[OpenCode | The AI coding agent built for the terminal](https://opencode.ai)
