# 更新、卸载与资料保留

更新前关闭正在运行的 HuiClip 进程，保存 `huiclip info` 显示的配置、实例数据目录和 CLI 文件。为新提交重新生成本地包，在原安装前缀上安装新版，然后用同一个 `HUICLIP_HOME` 启动。确认组织、任务和登录状态能恢复后再清理旧包。

```sh
node community/huiclip/pack.mjs ../huiclip-packages
npm install --global --prefix ../huiclip-cli ../huiclip-packages/huiclip-0.1.3.tgz
../huiclip-cli/bin/huiclip setup
../huiclip-cli/bin/huiclip run
```

这里使用本分支的 0.1.3 本地包。发生数据库迁移时，切回旧包之前应使用对应备份在另一个数据目录试跑。

卸载前先关闭 HuiClip 及其独立服务。运行 `npm uninstall --global --prefix ../huiclip-cli huiclip` 移除包和命令入口。HuiClip 的配置、数据库、登录和运行缓存仍在 `HUICLIP_HOME`，由管理员按备份策略管理。Waline 的数据库需要单独备份。

[上游更新机制](https://docs.paperclip.ing/how-to/update-paperclip/)可以帮助了解稳定标签。HuiClip 目前采用上面的本地包更新流程。
