import { useEffect } from 'react';

export default function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    function handleOnClickOutside(e) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleOnClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleOnClickOutside);
    };
  }, [onClickOutside, ref]);
}
