module.exports = {
  title: 'HuiClip',
  tagline: '面向中文开发团队的 Paperclip 社区版',
  url: process.env.HUICLIP_SITE_URL || 'http://127.0.0.1:4174',
  baseUrl: '/',
  organizationName: 'yangyanlei-jiang',
  projectName: 'huiclip-docs',
  i18n: { defaultLocale: 'zh-Hans', locales: ['zh-Hans'] },
  onBrokenLinks: 'throw',
  customFields: { walineUrl: process.env.HUICLIP_WALINE_URL || null },
  presets: [
    ['classic', {
      blog: false,
      docs: {
        routeBasePath: '/',
        sidebarPath: './sidebars.js',
        versions: {
          current: { label: '开发中' },
        },
      },
    }],
  ],
  themeConfig: {
    navbar: {
      title: 'HuiClip',
      items: [
        { type: 'docSidebar', sidebarId: 'guide', label: '指南', position: 'left' },
        { type: 'docsVersionDropdown', position: 'right' },
        { href: 'https://github.com/yangyanlei-jiang/huiclip', label: 'GitHub', position: 'right' },
      ],
    },
  },
};
