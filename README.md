# 回形夹 · HuiClip 中文文档

这里维护 HuiClip 的简体中文使用指南、版本快照与文档评论服务。回形夹是基于 Paperclip 的独立中文社区版。[软件仓库](https://github.com/yangyanlei-jiang/huiclip/tree/community/zh-cn-v1)

从[安装指南](docs/install.md)开始，也可以直接阅读[目录](docs/index.md)。修改当前指南请编辑 `docs/`，已归档的 0.1 版位于 `versioned_docs/version-0.1/`。

## 本机预览

需要 Node.js 24.11 或更高版本。在本仓库根目录运行：

```sh
npm ci
npm start
```

打开 http://127.0.0.1:4174 查看文档。HuiClip 应用使用独立端口 1549。提交前运行 `npm run build` 检查站点和内部链接。评论是可选服务，使用独立 SQLite，启动和审核步骤见[评论指南](docs/community.md)。

## 来源与许可

初始内容迁自 [HuiClip 社区分支](https://github.com/yangyanlei-jiang/huiclip/tree/10f2e4f/community/site)，沿用 [MIT 许可](LICENSE)。文章依据社区版源码和本地验证原创编写。参考官方页面时，在[覆盖清单](COVERAGE.md)记录对应文章和验证状态。
