# 为第二个 HuiClip 实例选择端口

同一台机器上要保留日常实例，又想试一个新配置，可以先用 `huiclip info` 在临时目录生成配置。这个命令会写入实例配置和本地密钥，但不会启动应用或数据库，因此可以先核对结果，再决定是否启动。

## 从空目录验证

在已安装 HuiClip 0.1.3 的终端运行以下命令。若使用安装指南里的独立前缀，请把 `huiclip` 换成对应的可执行文件路径。

```sh
trial_dir=$(mktemp -d)
HUICLIP_HOME="$trial_dir" HUICLIP_PORT=1550 HUICLIP_DB_PORT=54340 huiclip info
```

输出中的 `home` 应指向临时目录，`port` 应为 1550，`embeddedPostgresPort` 应为 54340。前者用于网页和 API，后者供嵌入式 PostgreSQL 使用。省略两个端口变量时，新实例默认采用 1549 和 54339。配置生成成功只说明数值被接受，实际启动时两个端口还需要可用。

## 为什么改了变量，端口还是原值？

在同一终端、同一目录上复查：

```sh
HUICLIP_HOME="$trial_dir" HUICLIP_PORT=1551 huiclip info
```

此时输出仍为 1550。端口变量只在首次创建配置时生效。要调整已有实例，先停止该实例，再按输出中 `config` 的路径编辑 `server.port`；下次启动时继续使用同一个 `HUICLIP_HOME`。

**验证范围**：用 0.1.3 的 CLI 在两个一次性目录中复现了首次配置、重新读取，以及两个端口同值时拒绝创建配置。本文未启动第二个数据库或测试网络连通性。

[HuiClip 配置源码](https://github.com/yangyanlei-jiang/huiclip/blob/10f2e4f/community/huiclip/huiclip.mjs) · [Paperclip 官方环境变量参考](https://docs.paperclip.ing/reference/deploy/environment-variables/)
