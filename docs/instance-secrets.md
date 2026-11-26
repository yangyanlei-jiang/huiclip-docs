# 检查实例密钥文件的位置与权限

维护 HuiClip 时，确认密钥位置通常只需看配置和文件属性。以下过程使用临时实例，避免把正在使用的密钥显示在终端中。前提是当前终端能运行 `huiclip`。

```sh
trial_dir=$(mktemp -d)
HUICLIP_HOME="$trial_dir" huiclip info
ls -l "$trial_dir/instances/huiclip/.env"
```

在 macOS 的 0.1.3 测试中，首次执行会创建实例的 `.env`，其权限为 `-rw-------`，即仅文件所有者可读写。再次以同一个目录执行 `info`，该文件的修改时间保持不变。

实例配置还有一个 `secrets.localEncrypted.keyFilePath` 字段，默认指向配置文件旁的 `secrets/master.key`。它与 `.env` 是两个用途不同的文件：前者是本地加密所用的密钥路径，后者在初始化时保存 Agent 的签名密钥。在仅执行 `info` 的空实例中，配置已经列出主密钥路径，主密钥文件此时尚未生成。

如果需要社区协助排查，只提供文件是否存在、权限和脱敏后的路径。这里仅核对了初始化行为，未测试密钥轮换或恢复。[Paperclip 密钥参考](https://docs.paperclip.ing/reference/deploy/secrets/)
