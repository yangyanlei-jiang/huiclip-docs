# 连接 Codex

把 Paperclip 的任务交给 Codex 时，先在运行 Agent 的主机和系统账号下检查环境，再选一个独立测试项目。浏览器所在的电脑可以与执行主机不同。

1. 在执行主机以 Agent 会使用的账号运行 `codex --version`，核对命令可用。用 `huiclip info` 查看 `codexHome`，将其设为 `CODEX_HOME` 后，用 Codex 自带流程完成登录和 `codex login status`。这会使用 HuiClip 自己的 Codex CLI 目录。使用实例提供的连接管理时，在 Paperclip 界面完成授权并按组织成员范围授予访问。
2. 管理员在组织的 Agent 页面添加 Agent，选择 Codex 对应的运行方式。如果表单显示本机适配器，确认执行账号可访问同一主机上的 Codex 和项目工作目录。使用原生 Runner 时检查兼容的 Runner 已安装并能启动。
3. 保存后检查 Agent 详情中的环境检测或运行提示。首条任务使用空的试验目录与只读请求，例如列出试验目录中文件并汇报。记录适配器、任务编号、运行结果与访问范围。
4. 跟着[任务验收流程](./tasks.md)检查回复。若需要项目写权限，先给单独的工作目录并明确任务的允许修改范围。

模型名、适配器 ID 和运行日志沿用上游原文。遇到登录错误时在执行主机确认授权状态，凭据只通过官方登录或实例的受控配置提供。

本地包构建了界面和 Runner 的 TypeScript 部分。原生 Runner 需要兼容的可执行文件，可由管理员在 HuiClip 实例的 `.env` 设定 `PAPERCLIP_RUNNER_BINARY`。实测范围包括向导、模型连接界面和 Agent 名录，模型授权与真实运行留待具备授权的环境验证。

- [上游 Codex 适配器参考](https://docs.paperclip.ing/reference/adapters/codex/)
