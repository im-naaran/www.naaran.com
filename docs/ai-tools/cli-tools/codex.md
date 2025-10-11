---
sidebar_position: 4
---

# Codex

Codex 是 OpenAI 的 AI 编程助手<sup>[[1]](#参考)</sup>。

需要使用 ChatGPT 付费账户才可以使用。

## 体验

Codex 是最近刚刚推出的，整体完善程度还不如 CC 和 Gemini，暂时还不支持 `!` 使用命令功能。不过上传图片是支持的。

体验下来感觉有时候比较笨。如我希望它列出项目依赖，它没有判断项目环境，分别尝试 `npm list` `pnpm list` `pip list`，结果都报错了。其实直接读取 `package.json` 或者搜索代码中 `import ... from ...` 即可。

此外使用 `@` 选中文件，必须输入至少一个字符，否则不展示文件列表。

还有一点让我很疑惑。它不支持插件、也不提供 `!` 命令，但是却有 `/diff` 查看 `git diff`。难道后续要扩展一些常用的命令么？我认为意义不大，不如直接先放开 `!` 命令更实际。

如果可以找到价格非常便宜的中转，Codex 是还可以的，否则现阶段还是更推荐 CC 和 Gemini。

## 系统要求

- Node.js
- OpenAI 付费账号，或国内其他兼容平台

## 安装

```bash
npm install -g @openai/codex
# 如果安装失败，可尝试更换国内源进行安装
npm install -g @openai/codex --registry https://registry.npmmirror.com
```

## 官方使用方法

1. 如果使用官方方案，需要使用命令行工具，访问到项目目录，之后配置代理（根据你的代理工具IP和端口进行调整）：

```bash
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
```

2. 运行启动命令：

```bash
codex
```

3. 启动 codex 后，展示LOGO，并可以选择登录渠道，选择 ChatGPT 后，会打开默认浏览器，直接授权即可。
4. 返回命令行工具，就可以使用了。

## 对接正规代理第三方中转平台

1. 编辑配置文件 `~/.codex/config.toml`、`~/.codex/auth.json` ，或者辅助使用环境变量来进行。具体参考各个中转平台。

:::info 配置说明

如果 config.toml 中配置了 env_key = "XXX_API_KEY"，那么需要对应配置环境变量 export XXX_API_KEY

如果配置了auth.json（内含 API_KEY），则不需要每次手动配置环境变量

:::

两个文件大概示例如下：

```toml 
model_provider = "custom-provider"
model = "gpt-5-codex" # 使用模型，不同中转平台，可能不同
model_reasoning_effort = "high"
network_access = "enabled"
disable_response_storage = true

[model_providers.custom-provider]
name = "custom-provider" # 将在Codex用户界面中显示的提供者名称
base_url = "xxxx" # API 地址
wire_api = "responses" # 有效值为 "chat" 和 "responses"
requires_openai_auth = true
```

```json
{
"OPENAI_API_KEY": "sk-xxxx"
}
```

1. 运行启动命令：

```bash
codex
```

3. 应该会自动完成鉴权，不需要做任何配置等处理，即可使用。

## 故障排除

如果出现什么意外，可以考虑移除用户目录下的 `.codex` 目录后，再次尝试。

## 参考

[1]&nbsp;[codex](https://openai.com/zh-Hans-CN/codex/)
