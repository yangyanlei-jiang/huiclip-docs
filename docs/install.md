# 安装与启动

HuiClip 基于上游 Paperclip 稳定标签 `v2026.1117.0`。选择下面的社区分支可以获得简中默认界面、`huiclip` 命令和独立数据目录。上游安装命令 `npx paperclipai` 安装的是 Paperclip 原版。

## 从 npm 安装和启动（推荐）

准备 Node.js 24.11+、npm、pnpm 9.15.4 和 tar，然后运行：

```sh
npx --yes huiclip@0.1.4 run
```

启动后打开 [http://127.0.0.1:1549](http://127.0.0.1:1549)。包名是 `huiclip`，不需要先克隆仓库或下载本地压缩包。想确认使用的版本，可以执行 `npx --yes huiclip@0.1.4 --version`。

### 升级现有实例

在旧终端按 `Ctrl+C`，或用原有服务管理方式停止旧实例，再用上面的命令启动新版。保持同一个 `HUICLIP_HOME`（默认 `~/.huiclip`）和原有端口设置，不要重新初始化，也不要另开一份同时连接同一个数据目录。升级前可在服务停止后备份该目录。由 launchd 或 systemd 托管的实例应更新原服务中的启动命令，再重启原服务。

## 从社区源码打包（可选）

在 macOS 或 Linux 准备 Git、Node.js 24.11+、pnpm 9.15.4、npm 和 tar。本地包会携带固定的社区代码，首次准备仍需下载锁定的公共依赖。

```sh
git clone --branch community/zh-cn-v1 --single-branch https://github.com/yangyanlei-jiang/huiclip.git
cd huiclip
node community/huiclip/pack.mjs ../huiclip-packages
npm install --global --prefix ../huiclip-cli ../huiclip-packages/huiclip-0.1.4.tgz
../huiclip-cli/bin/huiclip setup
../huiclip-cli/bin/huiclip run
```

如希望在当前终端直接使用 `huiclip`，可以执行 `export PATH="$(cd ../huiclip-cli/bin && pwd):$PATH"`。

打开 [http://127.0.0.1:1549](http://127.0.0.1:1549)。首次进入可创建试用组织并为 Agent 命名。有模型授权再选择服务商，否则可以在现有组织中继续查看界面。安装和查看界面可以使用内嵌 PostgreSQL。

首次初始化默认写入 `~/.huiclip`。指定专用路径或端口时，在第一次执行 `huiclip info`、`setup` 或 `run` 前设置 `HUICLIP_HOME`、`HUICLIP_PORT` 或 `HUICLIP_DB_PORT`，随后沿用所选数据目录。例如：

```sh
export HUICLIP_HOME="$PWD/../huiclip-test-data"
export HUICLIP_PORT=1549
export HUICLIP_DB_PORT=54339
../huiclip-cli/bin/huiclip info
```

地址和数据目录可以由 `huiclip info` 核对，服务状态可以用 `curl -fsS http://127.0.0.1:1549/api/health` 检查。从页面的账号菜单或首次设置右上角可选择 English，选择会保留在当前浏览器。

- [团队私有部署](./private.md)
- [Paperclip 原版安装参考](https://docs.paperclip.ing/guides/getting-started/installation/)

已有 HuiClip 实例会沿用保存的端口。要改为 1549，请先停止 HuiClip，通过 `huiclip info` 找到其配置文件，将 `server.port` 改为 `1549`，然后重新启动。
