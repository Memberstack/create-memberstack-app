import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/favicon.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon.png' />
      </Head>
      <body className='h-screen bg-slate-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
