import { useRef } from 'react';

// hooks
import useSocket from '../../hooks/useSocket';

// utils
import { keyCodes } from '../../utils/constants';

const labels = {
  placeholder: 'Place the message here',
  send: 'Send',
};

export default function Input({ room, user, handleMessages }) {
  const inputRef = useRef();
  const socket = useSocket(`message:${room}`, messages =>
    handleMessages(messages)
  );
  const handleKeyDown = e =>
    e.keyCode === keyCodes.enter ? handleClick() : null;
  const handleClick = () => {
    const obj = {
      message: inputRef.current.value,
      room,
      user,
    };

    if (obj.message) {
      handleMessages(obj);

      // propagate the message
      socket.emit('message', obj);

      // clear input
      inputRef.current.value = '';
    }

    // give focus back to input
    inputRef.current.focus();
  };

  return (
    <div className='input'>
      <input
        autoFocus
        ref={inputRef}
        placeholder={labels.placeholder}
        type='text'
        onKeyDown={handleKeyDown}
      ></input>
      <button onClick={handleClick}>{labels.send}</button>
    </div>
  );
}
