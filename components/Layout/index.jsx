import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.gstatic.com'></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400&display=swap'
          rel='stylesheet'
        ></link>
      </Head>

      {children}
    </>
  );
}
