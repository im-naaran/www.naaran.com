---
sidebar_position: 6
---

# Droid

Droid 是 Factory 的 AI 编程助手<sup>[[1]](#参考)</sup>。

有一个月 1M ~ 10M Tokens的免费体验量，可以使用自己提供的 KEY。

## 体验

首先是注册比较麻烦，本以为邮箱验证码直接登录，没想到国外的产品还需要手机号认证，我也没测试国内手机号是否可行。此外还需要填写组织、二次验证等，注册流程整体比较长。好在文档、指引写的很详细清晰。就是感觉流程、废话有点多，上来需要用户走很长流程才能使用。

注册免费送 1M Tokens，如果绑卡，再额外送 9M Tokens。有效期一个月。当然也可以自己提供KEY（BYOK）。

首先是上来报错，让我感到很奇怪，但是网页上走完教程流程后，报错又消失了。Droid 手感上，总感觉和 CC、Gemini 有些差距。可能是配色以及上来不好的体验导致的。还有就是，它的快捷键和 CC 不一样。

它支持 CC 的 Skills，可以方便导入；也支持 subagents 子代理，功能上应有尽有。

模型上主要还是 Claude-4.5-sonnet、GPT-5.1，它自己的 Droid Core 模型是 GLM-4.6。我自己打算配置 GLM-4.6、KIMI-K2、以及走中转平台，结果发现都不行，可能是这些平台的 API 地址不支持它这么使用😓。

比价有意思的是，它提供网页版的 session 管理，可以方便查看沟通的内容，尤其是查找之前的历史记录非常方便。不过，应该没有人去查历史记录吧😁。

## 系统要求

- factory.ai 账号，邮箱注册，需要绑定手机（未测试国内手机）

## 安装

建议参考官网，使用命令安装。下面是 MacOS/Linux 安装方法：

```bash
curl -fsSL https://app.factory.ai/cli | sh
```

Droid 不支持类 npm 的安装方式。这点差评。

## 使用方法

1. 使用默认浏览器，打开 [factory.ai](https://factory.ai) ，首先进行注册。
2. 运行启动命令：

```bash
droid
```

3. 启动后，会要求进行登录，选择后跳转网页完成鉴权即可
4. 返回命令行工具，就可以使用了。
5. 如需使用自定义模型，可以新建或编辑 `~/.factory/config.json`，我没有成功，就不举例了。

## 参考

[1]&nbsp;[Factory - Agent-Native Software Development](https://factory.ai/)
