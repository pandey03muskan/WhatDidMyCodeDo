import { useRef } from 'react';

/**
 * Hook that tracks the number of times a component has rendered.
 * Increments a counter on every render without causing additional re-renders.
 * 
 * @returns {Object} An object containing the current render count
 */
export function useRenderCount() {
  // Use useRef to store the count because:
  // 1. It persists across renders without causing re-renders
  // 2. Mutating .current doesn't trigger a component update
  // 3. This allows us to increment on every render without infinite loops
  const countRef = useRef(0);

  // Increment the counter on every render
  // This runs during the render phase, so it counts every render
  countRef.current += 1;

  // Return the current count value
  // We return countRef.current to get the latest count
  return { count: countRef.current };
}
