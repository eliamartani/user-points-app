import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// components
import Input from '../components/Input';
import Messages from '../components/Messages';
import User from '../components/User';

// utils
import { title } from '../utils/constants';

export default function Room() {
  const router = useRouter();
  const [msgs, setMsgs] = useState([]);
  const [user, setUser] = useState('');
  const { room } = router.query;

  const handleMessages = data => {
    // updates internal message list
    setMsgs(msgs => [...msgs, data]);
  };

  if (!user) {
    return <User handleUser={setUser} />;
  }

  return (
    <div className='room'>
      <Head>
        <title>
          {title} - {room}
        </title>
      </Head>

      <Messages msgs={msgs} user={user} />

      <Input room={room} user={user} handleMessages={handleMessages} />
    </div>
  );
}
