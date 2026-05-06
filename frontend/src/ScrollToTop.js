import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  
  useLayoutEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);
    
    // Fix body overflow if any page locked it
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.documentElement.style.overflow = '';
  }, [pathname]);
  
  return null;
}