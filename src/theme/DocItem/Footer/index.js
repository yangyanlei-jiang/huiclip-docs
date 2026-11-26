import React, { useEffect, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemFooter from '@theme-original/DocItem/Footer';
import '@waline/client/style';

function Comments({ serverURL, path }) {
  const container = useRef(null);

  useEffect(() => {
    let instance;
    let active = true;
    import('@waline/client').then(({ init }) => {
      if (!active || !container.current) return;
      instance = init({
        el: container.current,
        serverURL,
        path,
        lang: 'zh-CN',
        login: 'force',
        search: false,
        imageUploader: false,
        emoji: [],
      });
    }).catch(() => {
      if (active && container.current) container.current.textContent = '评论暂时无法加载。';
    });
    return () => {
      active = false;
      instance?.destroy();
    };
  }, [serverURL, path]);

  return (
    <section aria-label="文档评论">
      <h2>评论</h2>
      <p>登录 Waline 账号后可以发评论或回复。内容审核通过后公开显示。</p>
      <div ref={container} />
    </section>
  );
}

export default function Footer(props) {
  const { siteConfig } = useDocusaurusContext();
  const { metadata } = useDoc();
  const serverURL = siteConfig.customFields.walineUrl;
  return (
    <>
      <DocItemFooter {...props} />
      {serverURL && <Comments serverURL={serverURL} path={metadata.permalink} />}
    </>
  );
}
