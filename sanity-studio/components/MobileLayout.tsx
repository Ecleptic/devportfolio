import React, { useEffect } from 'react';
import { LayoutProps } from 'sanity';

/**
 * Custom layout component that enhances Sanity Studio for mobile devices
 * Adds responsive styles and mobile-friendly optimizations
 */
export function MobileLayout(props: LayoutProps) {
  useEffect(() => {
    // Add mobile-friendly styles to the document
    const style = document.createElement('style');
    style.textContent = `
      /* Mobile-friendly improvements for Sanity Studio */

      /* Better touch targets on mobile */
      @media (max-width: 768px) {
        /* Larger touch targets for buttons */
        button, a {
          min-height: 44px;
          min-width: 44px;
        }

        /* Better spacing for form fields on mobile */
        [data-ui="FormField"] {
          margin-bottom: 1.5rem;
        }

        /* Collapsible fieldsets are easier to navigate */
        [data-ui="Fieldset"] {
          margin-bottom: 1rem;
        }

        /* Better array item spacing */
        [data-ui="ArrayOfObjectsInput__item"] {
          margin-bottom: 1rem;
          padding: 1rem;
        }

        /* Improved preview cards */
        [data-ui="DocumentListPane"] {
          padding: 0.5rem;
        }

        /* Make text inputs more mobile-friendly */
        input[type="text"],
        input[type="url"],
        input[type="email"],
        textarea {
          font-size: 16px; /* Prevents zoom on iOS */
          padding: 0.75rem;
        }

        /* Better mobile menu */
        [data-ui="Navbar"] {
          padding: 0.5rem;
        }

        /* Optimize pane layout for mobile */
        [data-ui="Pane"] {
          min-width: 100% !important;
        }

        /* Make document title more prominent on mobile */
        [data-ui="PaneHeader"] {
          padding: 1rem;
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--card-bg-color);
        }

        /* Better array field item controls */
        [data-ui="ArrayOfObjectsInput__item__toolbar"] {
          padding: 0.5rem;
        }

        /* Improved modal dialogs on mobile */
        [data-ui="Dialog"] {
          max-height: 90vh;
          margin: 1rem;
        }

        /* Better select dropdowns */
        select {
          font-size: 16px;
          padding: 0.75rem;
        }
      }

      /* Small mobile devices */
      @media (max-width: 480px) {
        /* Stack toolbar items vertically if needed */
        [data-ui="PaneHeader__actions"] {
          flex-direction: column;
          align-items: stretch;
        }

        /* Full width buttons on small screens */
        [data-ui="Button"] {
          width: 100%;
          justify-content: center;
        }

        /* Reduce font size slightly for better fit */
        body {
          font-size: 14px;
        }
      }

      /* Landscape mobile orientation */
      @media (max-width: 768px) and (orientation: landscape) {
        /* Optimize for landscape mode */
        [data-ui="PaneHeader"] {
          padding: 0.5rem;
        }

        [data-ui="FormField"] {
          margin-bottom: 1rem;
        }
      }

      /* High DPI mobile screens */
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        /* Sharper icons and borders */
        svg {
          shape-rendering: geometricPrecision;
        }
      }

      /* Touch-friendly scrolling */
      * {
        -webkit-overflow-scrolling: touch;
      }

      /* Prevent text size adjustment on orientation change */
      html {
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Render the default layout with our enhancements
  return props.renderDefault(props);
}
