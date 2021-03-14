import { useEffect, useRef } from 'react';
import { uid } from 'uid';

const labels = {
  connected: "You're connected",
};

export default function Messages({ msgs, user }) {
  const messagesRef = useRef();

  useEffect(() => {
    // scroll to the last message
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messagesRef, msgs]);

  return (
    <div ref={messagesRef} className='messages'>
      <h1>
        {labels.connected}, {user}...
      </h1>

      <ul>
        {msgs.map(m => (
          <li key={uid()} data-title={`(${m.user}): `}>
            {m.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
