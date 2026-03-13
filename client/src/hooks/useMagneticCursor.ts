import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { setCursorPosition } from '../store/slices/uiSlice';

export function useMagneticCursor() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      dispatch(setCursorPosition({ x: e.clientX, y: e.clientY }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [dispatch]);
}
