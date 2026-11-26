# 首次使用命令行时检查什么

装完 HuiClip 后，可以先在终端确认三个问题：运行的是哪个版本、配置写在哪里，以及网页应该连接哪个端口。以下示例假设已按[安装指南](./install.md)把安装目录加入 PATH。

## 确认命令和版本

```sh
command -v huiclip
huiclip --version
huiclip --help
```

第一行显示当前终端找到的命令位置。后两行分别输出版本和可用子命令。用 0.1.3 在空环境中检查时，查询版本不会创建实例目录。帮助中可见 `setup`（准备运行环境）、`run`（启动）和 `info`（查看实例配置）等入口。

## 让脚本读取端口

`info` 输出 JSON，也会初始化指定的空目录。在一次性目录里运行下面的命令，可避免写入日常实例。这里使用安装 HuiClip 时已有的 Node.js 解析 JSON：

```sh
trial_dir=$(mktemp -d)
HUICLIP_HOME="$trial_dir" huiclip info | node -e 'let s="";process.stdin.on("data", x=>s+=x).on("end",()=>console.log(JSON.parse(s).port))'
```

未指定自定义端口时，0.1.3 输出 `1549`。这个数字来自已保存的配置；要确认进程已启动，还需在运行 `huiclip run` 后请求对应地址的 `/api/health`。如果要查看其他端口或数据目录，可直接阅读完整 JSON。[实例端口指南](./instance-ports.md)

实测范围为本地帮助、版本查询和配置输出。对应的上游主题见 [CLI 概览](https://docs.paperclip.ing/reference/cli/overview/)和[输出与脚本](https://docs.paperclip.ing/reference/cli/output-and-scripting/)。
