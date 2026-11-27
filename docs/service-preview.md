---
description: "在 macOS 检查 HuiClip 的 launchd 服务配置、启动命令和日志。"
---

# 在 macOS 检查 HuiClip 服务定义

如果准备让 HuiClip 随登录启动，可以先确认服务将调用哪个程序、使用哪个数据目录。HuiClip 0.1.3 的 `service-file` 会把服务定义写到标准输出。生成后可以先检查文件，不必把它放进 LaunchAgents 目录。

## 生成一份可检查的预览

按[安装指南](./install.md)安装命令后，在 macOS 终端执行：

```sh
preview_dir=$(mktemp -d)
HUICLIP_HOME="$preview_dir/instance" huiclip service-file > "$preview_dir/huiclip.plist"
plutil -lint "$preview_dir/huiclip.plist"
plutil -p "$preview_dir/huiclip.plist"
```

`-lint` 检查文件格式，`-p` 显示字段。对照这三项确认预览指向了期望的实例：

| 字段 | HuiClip 0.1.3 的结果 |
| --- | --- |
| Label | `io.github.yangyanlei-jiang.huiclip` |
| ProgramArguments | Node 的绝对路径、HuiClip 启动脚本的绝对路径，以及 `run` |
| EnvironmentVariables 中的 HUICLIP_HOME | 本次传入的临时实例目录 |

这些路径在生成时确定。移动安装目录后，应重新生成并检查服务定义。预览指向临时目录，正式实例需要用自己的路径重新生成。

本次在 macOS 解析了实际输出，核对了服务名、实例目录与启动命令。未注册系统服务，也未验证开机自启或 Linux 上的服务行为。[上游 CLI 服务参考](https://docs.paperclip.ing/reference/cli/service/)
