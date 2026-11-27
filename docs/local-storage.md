---
description: "区分 HuiClip 的数据目录、工作区、数据库和临时文件。"
---

# 找到当前实例的存储目录

给 HuiClip 所在的磁盘盘点空间时，先运行 `huiclip info`，找到输出中的 `config`。打开这份 JSON 配置，能看到同一实例下几类数据各自写到哪里。使用自定义 `HUICLIP_HOME` 的实例尤其适合这样查，避免误看默认目录。

| 想找的内容 | 配置字段 | 默认位置（相对于配置文件所在目录） |
| --- | --- | --- |
| 本地文件存储 | `storage.localDisk.baseDir` | `data/storage` |
| 嵌入式 PostgreSQL 数据 | `database.embeddedPostgresDataDir` | `db` |
| 数据库备份目标 | `database.backup.dir` | `data/backups` |
| 实例日志 | `logging.logDir` | `logs` |

例如，只复制 `data/storage` 会漏掉位于 `db` 的数据库。配置列出备份目标，也不能证明已经产生可恢复的备份。做迁移时应单独检查备份文件，并在隔离实例中演练恢复。

本页按 HuiClip 0.1.3 的默认配置编写，并在空目录初始化后核对了文件存储与数据库路径。未执行备份恢复或外部存储测试。[Paperclip 存储参考](https://docs.paperclip.ing/reference/deploy/storage/)
