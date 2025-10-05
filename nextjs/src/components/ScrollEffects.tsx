'use client';

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    // Remove no-js class (enables CSS features that require JS)
    document.documentElement.classList.remove('no-js');

    // Scroll to top functionality
    const toTop = document.getElementById('to-top');
    if (toTop) {
      toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Lead down arrow scroll
    const leadDown = document.getElementById('lead-down');
    if (leadDown) {
      leadDown.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Timeline animations - fade in on scroll
    const timelineBlocks = document.querySelectorAll('#experience-timeline > div');
    
    const checkScroll = () => {
      timelineBlocks.forEach((block) => {
        const rect = block.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        
        if (isVisible) {
          block.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll(); // Check on initial load

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return null; // This component doesn't render anything
}
