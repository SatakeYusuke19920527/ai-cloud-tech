import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'AI Cloud Tech - AI のスキルを向上させる',
  description: 'AIのキャッチアップを体系的に提供するプラットフォーム',
  openGraph: {
    title: 'AI Cloud Tech - AI のスキルを向上させる',
    description: 'AIのキャッチアップを体系的に提供するプラットフォーム',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={'/'} afterSignInUrl={'/dashboard'}>
      <html lang="ja">
        <body className={`${notoSansJP.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
