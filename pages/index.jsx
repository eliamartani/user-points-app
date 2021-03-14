import Head from 'next/head';

// utils
import { title } from '../utils/constants';

const labels = {
  missing: "You're missing something...",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='home'>{labels.missing}</div>
    </>
  );
}
