---
description: "部署 HuiClip 私有团队实例，核对访问范围和数据隔离。"
---

# 团队私有部署

## 在本机验证认证

先完成[安装](./install.md)，运行 `huiclip info` 确认配置与数据目录，然后停止测试进程。在它的 `config.json` 的 `server` 中设置 `deploymentMode` 为 `authenticated`、`exposure` 为 `private`、`bind` 为 `loopback`。再次运行 `huiclip run`。

```sh
huiclip auth bootstrap-ceo
```

在同一台电脑使用一次性链接完成管理员引导。用另一个浏览器会话确认匿名访客需要登录。CLI 在管理员引导后可用 `huiclip auth login --no-browser` 生成授权链接。批准后运行 `huiclip auth whoami --json` 检查。CLI 上下文和凭据在 `huiclip info` 指向的目录中。

## 从团队私网访问

先选择团队管理的主机、专用系统账号、持久化目录和访问控制。使用上游支持的私网模式与团队防火墙，先测试登录回调和邀请。数据库如改用团队 PostgreSQL，应设置 HuiClip 自己的连接串、权限和备份。数据库、密钥文件与附件需要各自备份，并在新测试实例中演练恢复。

`huiclip service-file` 输出当前系统的独立服务定义。macOS 使用 `io.github.yangyanlei-jiang.huiclip`，Linux 使用 `huiclip.service`。部署人确认路径、执行账号和退出行为后自行注册，升级或卸载前先停止该服务。文档站和 Waline 数据使用各自的运行目录。

本地核验覆盖认证私有模式。跨机器访问、HTTPS 代理、Linux 服务注册和外置 PostgreSQL 属于后续部署验证。

- [上游部署模式](https://docs.paperclip.ing/reference/deploy/deployment-modes/)
- [上游 Docker 参考](https://docs.paperclip.ing/reference/deploy/docker/)
