module.exports = {
  title: 'HuiClip',
  tagline: '面向中文开发团队的 Paperclip 社区版',
  url: process.env.HUICLIP_SITE_URL || 'http://127.0.0.1:4174',
  baseUrl: '/',
  trailingSlash: true,
  organizationName: 'yangyanlei-jiang',
  projectName: 'huiclip-docs',
  i18n: { defaultLocale: 'zh-Hans', locales: ['zh-Hans'] },
  onBrokenLinks: 'throw',
  customFields: { walineUrl: process.env.HUICLIP_WALINE_URL || null },
  presets: [
    ['classic', {
      blog: false,
      sitemap: { ignorePatterns: ['/0.1/**', '/next/**'] },
      docs: {
        routeBasePath: '/',
        sidebarPath: './sidebars.js',
        lastVersion: 'current',
        versions: {
          current: { label: '当前文档', path: '' },
          '0.1': { label: '0.1 存档', path: '0.1', noIndex: true },
        },
      },
    }],
  ],
  themeConfig: {
    navbar: {
      title: 'HuiClip',
      items: [
        { to: '/paperclip-chinese-docs/', label: '中文文档', position: 'left' },
        { type: 'docsVersionDropdown', position: 'right' },
        { href: 'https://github.com/yangyanlei-jiang/huiclip', label: 'GitHub', position: 'right' },
      ],
    },
  },
};
