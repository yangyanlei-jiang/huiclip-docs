import { createHash, randomBytes } from 'node:crypto';
import { access, link, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import createWaline from '@waline/vercel';

const host = '127.0.0.1';
const port = Number(process.env.WALINE_PORT ?? 8360);
const dataDir = resolve(process.env.WALINE_DATA_DIR || '.waline-data');
const dbPath = resolve(dataDir, 'waline.sqlite');
const tokenPath = resolve(dataDir, 'jwt-token');
const siteOrigin = new URL(process.env.WALINE_SITE_URL || 'http://127.0.0.1:4174');
const sqliteTemplate = 'https://raw.githubusercontent.com/walinejs/waline/c22448242cfd3170d8daad543a7eca86b13b11f7/assets/waline.sqlite';
const sqliteSha256 = 'ac08959a80b2756701742d97ad445fab24597428b3bc56e0c87541c4ea8b1b37';

if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('WALINE_PORT 必须是有效端口。');
if (siteOrigin.origin !== siteOrigin.href.replace(/\/$/, '') || !['http:', 'https:'].includes(siteOrigin.protocol)) {
  throw new Error('WALINE_SITE_URL 必须设置为文档站的来源地址。');
}

async function initializeFile(path, createContents) {
  try {
    await access(path);
    return;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const contents = await createContents();
  const stage = await mkdtemp(resolve(dataDir, '.initializing-'));
  const temporary = resolve(stage, 'content');
  try {
    await writeFile(temporary, contents, { mode: 0o600 });
    await link(temporary, path);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

await mkdir(dataDir, { recursive: true, mode: 0o700 });
await initializeFile(dbPath, async () => {
  const downloaded = process.env.WALINE_SQLITE_TEMPLATE
    ? await readFile(process.env.WALINE_SQLITE_TEMPLATE)
    : await fetch(sqliteTemplate, { signal: AbortSignal.timeout(30_000) }).then(async (response) => {
        if (!response.ok) throw new Error(`无法获取 Waline 初始库（HTTP ${response.status}）。`);
        return Buffer.from(await response.arrayBuffer());
      });
  if (createHash('sha256').update(downloaded).digest('hex') !== sqliteSha256) {
    throw new Error('Waline 初始库校验不通过。');
  }
  return downloaded;
});
let jwt = process.env.WALINE_JWT_TOKEN;
if (!jwt) {
  await initializeFile(tokenPath, () => randomBytes(48).toString('hex'));
  jwt = (await readFile(tokenPath, 'utf8')).trim();
}
if (jwt.length < 32) throw new Error('Waline 签名密钥必须至少 32 个字符。');

// Never inherit an application's storage or notification configuration.
for (const key of Object.keys(process.env)) {
  if (/^(?:LEAN_|MYSQL_|TIDB_|SQLITE_|PG_|POSTGRES_|MONGO_|TCB_|TENCENTCLOUD_|SMTP_|MAIL_|GITHUB_|AUTHOR_|OAUTH_)/.test(key)) {
    delete process.env[key];
  }
}
Object.assign(process.env, {
  SQLITE_PATH: dataDir,
  SQLITE_DB: 'waline',
  SQLITE_PREFIX: 'wl_',
  JWT_TOKEN: jwt,
  SITE_NAME: '回形夹 · HuiClip',
  SITE_URL: siteOrigin.origin,
  SECURE_DOMAINS: `${siteOrigin.host},${host}:${port}`,
  LOGIN: 'force',
  COMMENT_AUDIT: 'true',
  IPQPS: process.env.WALINE_IP_QPS ?? '30',
  AKISMET_KEY: 'false',
  DISABLE_REGION: 'true',
  WALINE_ADMIN_MODULE_ASSET_URL: '/assets/waline-admin.js',
});

const adminAsset = await readFile(createRequire(import.meta.url).resolve('@waline/admin'));
const waline = createWaline();
createServer((req, res) => {
  const origin = req.headers.origin;
  if (origin && origin !== siteOrigin.origin && origin !== `http://${host}:${port}`) {
    res.writeHead(403).end('Forbidden origin');
    return;
  }
  if (req.method === 'GET' && req.url === '/assets/waline-admin.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' }).end(adminAsset);
    return;
  }
  for (const header of Object.keys(req.headers)) {
    if (header.startsWith('x-forwarded-') || header === 'forwarded') delete req.headers[header];
  }
  void waline(req, res).catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    if (!res.headersSent) res.writeHead(500);
    res.end('Waline error');
  });
}).listen(port, host, () => console.log(`Waline: http://${host}:${port}/ui`));
