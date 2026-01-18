'use client';

import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';

interface RenderFlashProps {
  children: React.ReactNode;
}

/**
 * Component that visually highlights its children when a render happens.
 * 
 * HOW RENDER DETECTION WORKS:
 * 1. We track if this is the initial mount to avoid hydration issues
 * 2. We use useEffect to detect when renders happen (after mount)
 * 3. We only update flashKey state if the render is from an external source
 * 4. The animation is applied via a key prop, causing a brief highlight effect
 * 
 * PREVENTING INFINITE LOOPS & HYDRATION ISSUES:
 * - We skip flash on initial mount to prevent hydration mismatches
 * - We use a flag to skip updates when we're updating our own state
 * - This breaks the cycle: render -> setState -> render -> setState -> ...
 */
export function RenderFlash({ children }: RenderFlashProps) {
  // State to trigger the flash animation
  const [flashKey, setFlashKey] = useState(0);
  
  // Ref to track if this is the initial mount (prevents hydration issues)
  const isMountedRef = useRef(false);
  
  // Ref to track if we're currently updating our own state
  const isUpdatingRef = useRef(false);
  
  // Track if component has mounted (after first render)
  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  // Detect renders - only trigger flash for external renders after mount
  useEffect(() => {
    // Skip on initial mount to prevent hydration issues
    if (!isMountedRef.current) {
      return;
    }
    
    // Skip if we're updating our own state
    if (isUpdatingRef.current) {
      isUpdatingRef.current = false;
      return;
    }
    
    // This is an external render - trigger the flash
    // Set flag before updating to prevent loop
    isUpdatingRef.current = true;
    setFlashKey((prev) => prev + 1);
  }); // Run after every render, but logic inside prevents issues

  return (
    <Box
      key={flashKey}
      sx={{
        // Simple CSS animation that flashes a highlight color
        '@keyframes flash': {
          '0%': {
            backgroundColor: 'transparent',
          },
          '50%': {
            // Highlight color - adjust this to match your theme
            backgroundColor: 'rgba(25, 118, 210, 0.2)', // MUI primary blue with opacity
          },
          '100%': {
            backgroundColor: 'transparent',
          },
        },
        // Apply the animation
        animation: 'flash 0.4s ease-in-out',
        // Ensure children are displayed properly
        display: 'inline-block',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
}
