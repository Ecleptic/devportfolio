'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log('[Header] Component mounted, mobileMenuOpen:', mobileMenuOpen);
    
    // Check the computed style on mount
    const header = document.querySelector('header');
    if (header) {
      const computedStyle = window.getComputedStyle(header);
      console.log('[Header] Header computed display:', computedStyle.display);
      console.log('[Header] Header has active class:', header.classList.contains('active'));
    }
    
    // Toggle body active class for mobile menu
    if (mobileMenuOpen) {
      document.body.classList.add('active');
      console.log('[Header] Opening menu - added active class to body and header');
    } else {
      document.body.classList.remove('active');
      console.log('[Header] Closing menu - removed active class from body and header');
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    console.log('[Header] Setting up click handlers');
    
    // Smooth scrolling for anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <button
        id="mobile-menu-open"
        className="shadow-large"
        onClick={() => setMobileMenuOpen(true)}
        type="button"
        aria-label="Open menu"
      >
        <i className="fa fa-bars" aria-hidden="true"></i>
      </button>

      <header className={mobileMenuOpen ? 'active' : ''}>
        <button 
          id="mobile-menu-close" 
          onClick={() => setMobileMenuOpen(false)}
          type="button"
          aria-label="Close menu"
        >
          <span>Close</span>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <ul id="menu" className="shadow">
          <li>
            <img
              src="/images/pachi.svg"
              alt="pachimari img"
              style={{ height: '5rem', width: '5rem' }}
            />
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
          <li>
            <a href="#volunteer">Volunteering</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <img
              src="/images/pachi.svg"
              alt="pachimari img"
              style={{ height: '5rem', width: '5rem' }}
            />
          </li>
        </ul>
      </header>
    </>
  );
}
