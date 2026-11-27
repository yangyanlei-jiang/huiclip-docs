---
description: "找到 HuiClip 中文社区的评论、反馈和讨论入口。"
---

# 评论、反馈与社区讨论

Docusaurus 文档可直接阅读。开启评论的环境使用 Waline 独立账号。评论和回复先进入审核队列，管理员批准后对访客显示。

## 本地启动评论与文档

用 Node.js 26 在文档仓库的 `comments/` 目录中运行：

```sh
npm ci
npm start
```

服务只监听 `127.0.0.1:8360`。首次启动下载并校验固定版本的 Waline 空 SQLite 模板。也可事先取得同一模板，通过 `WALINE_SQLITE_TEMPLATE` 指定本地路径。SQLite 与自动生成的签名密钥默认位于这里的 `.waline-data/`，可以用 `WALINE_DATA_DIR` 指定专用目录。

再在文档仓库根目录中打开另一个终端。Node.js 24.11+ 可运行静态文档。

```sh
npm ci
HUICLIP_WALINE_URL=http://127.0.0.1:8360 npm start
```

访问 [文档站](http://127.0.0.1:4174)和 [Waline 管理界面](http://127.0.0.1:8360/ui)。首次注册使用维护者的账号，首位注册用户会获得管理员权限。另用普通测试账号提交评论或回复，在管理端审核，再以未登录访客身份重新打开文章核对。未指定评论服务地址也可以构建和浏览文档。

![本地 Waline 简体中文注册界面](/img/huiclip-waline-register.jpg)

## 审核、反垃圾与保存数据

- 默认需要登录才能发言，评论和回复均进入待审队列。IP 限流默认为 30 秒一条，可通过 `WALINE_IP_QPS` 调整。审核员在后台内批准、标记垃圾或删除内容，对外记录处理途径和联系入口。
- 备份时先停止 Waline，再备份 SQLite 与签名密钥，或通过管理员导出执行内容级迁移。备份限制访问，恢复时用独立实例核对账号、评论数量、回复关系和审核状态。
- Waline 账号与 HuiClip 登录分别管理。评论库不存储 HuiClip 任务、Agent 或费用数据。公开评论只提交脱敏信息，避免个人或团队凭据、私有日志和内部链接。
- 本地配置未接邮件。公网前还需验证新用户邮箱验证、找回密码、HTTPS 和反垃圾处理。真实账号、邮箱、域名和 Cloudflare 均应在单独的部署环境配置。

## GitHub 讨论与贡献

软件问题、跨文章的使用问答和贡献讨论预留 GitHub Discussions。当前 Fork 的 Discussions 和 Issues 均关闭，先用仓库中的反馈模板整理可复现材料。需要启用时，由拥有仓库管理权限的人到 **Settings → Features** 按 GitHub 的流程操作。

- [HuiClip 仓库](https://github.com/yangyanlei-jiang/huiclip)
- [GitHub Discussions 启用说明](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository)
- [Waline 自托管参考](https://waline.js.org/guide/deploy/vps.html)
