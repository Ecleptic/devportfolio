'use client';

import { useEffect, useState, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    // Toggle body active class for mobile menu
    if (mobileMenuOpen) {
      document.body.classList.add('active');
    } else {
      document.body.classList.remove('active');
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
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
        onClick={handleOpenMenu}
        type="button"
        aria-label="Open menu"
      >
        <FaBars aria-hidden="true" />
      </button>

      <header className={mobileMenuOpen ? 'active' : ''}>
        <button 
          id="mobile-menu-close" 
          onClick={handleCloseMenu}
          type="button"
          aria-label="Close menu"
        >
          <span>Close</span>
          <FaTimes aria-hidden="true" />
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
