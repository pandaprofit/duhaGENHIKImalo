'use client'
import { ReactNode, useEffect, useState } from 'react';
import { Footer } from '@modules/footer';
import { Header } from '@modules/header';

import '@styles/global.scss';

import localFont from 'next/font/local';
import { Provider } from '@service/provider';
import { getPosts } from '@/shared/api/instances';

const font = localFont({
  src: [
    {
      path: './fonts/neuemachina-light.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/neuemachina-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/neuemachina-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/neuemachina-ultrabold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [posts, setPosts] = useState<any[]>([]); // Типизируйте свои данные правильно

  useEffect(() => {
    getPosts
      .then((res) => {
        setPosts(res.data); // Предполагаем, что ваши данные находятся в res.data
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <html lang="ru">
      <body className={font.className}>
        <Provider>
          <div id="root">
            <Header />
            {children}
            <div>
              {posts.map((post, index) => (
                <div key={index}>{post}</div>
              ))}
            </div>
            <Footer />
          </div>

          <div id="modal-root" />
        </Provider>
      </body>
    </html>
  );
}
