import { useEffect, useRef } from 'react';
import Head from 'next/head';

// utils
import { keyCodes, title } from '../../utils/constants';

const labels = {
  hint: 'and press enter',
  placeholder: 'inform your name',
};

export default function User({ handleUser }) {
  const inputRef = useRef();
  const handleKeyDown = e =>
    e.keyCode === keyCodes.enter ? handleUser(e.target.value) : null;

  useEffect(() => {
    inputRef && inputRef.current.focus();
  }, [inputRef]);

  return (
    <>
      <Head>
        <title>
          {title} - {labels.placeholder}
        </title>
      </Head>
      <div className='user'>
        <input
          aria-label={`${labels.placeholder} ${labels.hint}`}
          onKeyDown={handleKeyDown}
          placeholder={labels.placeholder}
          ref={inputRef}
          tabIndex='0'
        ></input>
        <span>{labels.hint}</span>
      </div>
    </>
  );
}
