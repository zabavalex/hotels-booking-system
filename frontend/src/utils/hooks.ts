import { useEffect, MutableRefObject, useRef } from 'react';

export function useClickOutside(
  ref: MutableRefObject<HTMLElement>,
  callback: () => void,
  exceptionClass?: string,
): void {
  const isTouch = useRef(false);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.type === 'touchend') {
        isTouch.current = true;
      }

      if (event.type === 'click' && isTouch.current) {
        return;
      }
      if (exceptionClass && event.target.className.includes(exceptionClass)) {
      } else if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('touchend', handleClick, true);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('touchend', handleClick, true);
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
}
