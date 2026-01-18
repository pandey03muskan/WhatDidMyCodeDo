'use client';

import { useState, useRef, memo, useMemo } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Switch, 
  FormControlLabel, 
  Chip, 
  Paper,
  Divider,
  Stack,
  Tooltip,
  Alert
} from '@mui/material';
import { ThreePanelLayout } from '@/shared/layout/ThreePanelLayout';
import { CODE_EXAMPLES, MEMO_HIGHLIGHT } from './memo.constants';

/**
 * Base Child component implementation.
 * This will be conditionally wrapped with memo based on the toggle.
 */
function ChildBase({ 
  childCount,
  isMemoized,
  previousChildCount,
  renderReason
}: { 
  childCount: number;
  isMemoized?: boolean;
  previousChildCount?: number;
  renderReason?: string;
}) {
  // Initialize render count ref to 0
  // useRef persists across renders but doesn't trigger re-renders when mutated
  const renderCountRef = useRef(0);

  // Increment the render count on every render
  // This runs during the render phase, so it counts every time the component function executes
  renderCountRef.current += 1;

  // Determine if props changed (for visual indicator)
  const propsChanged = previousChildCount !== undefined && previousChildCount !== childCount;
  const willRender = !isMemoized || propsChanged;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '2px solid',
        borderColor: 'primary.light',
        bgcolor: 'background.paper',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
                mb: 0.5
              }}
            >
              Child Component
            </Typography>
            {renderReason && (
              <Chip
                label={renderReason}
                size="small"
                color={willRender ? 'success' : 'default'}
                sx={{ 
                  mt: 0.5,
                  fontSize: '0.7rem',
                  height: 20,
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              p: 1.5,
              bgcolor: 'action.hover',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 600,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Renders:
            </Typography>
            <Chip
              label={renderCountRef.current}
              color="primary"
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: '0.875rem',
                minWidth: 40,
              }}
              suppressHydrationWarning
            />
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
            Child Count: <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>{childCount}</Typography>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

/**
 * ReactMemoPlayground component demonstrating re-render behavior.
 * 
 * This playground shows:
 * - How parent state changes cause child re-renders
 * - How static props don't prevent re-renders without optimization
 * - How React.memo prevents unnecessary re-renders
 * - Render count tracking using useRef (explicit implementation for learning)
 * 
 * RENDER COUNTING IMPLEMENTATION:
 * - Each component uses useRef to track its own render count
 * - Ref is initialized to 0 and incremented in the component body
 * - This counts renders without causing additional re-renders
 * - When parent state changes, both parent and child render counts increase (without memo)
 * - With memo, child only re-renders when props actually change
 */
export function ReactMemoPlayground() {
  // Toggle state: false = without memo (default), true = with memo
  const [isMemoized, setIsMemoized] = useState(false);

  // Conditionally create memoized or non-memoized Child component
  const Child = useMemo(() => {
    if (isMemoized) {
      // Wrap with memo when toggle is on
      return memo(ChildBase);
    } else {
      // Return unwrapped component when toggle is off
      return ChildBase;
    }
  }, [isMemoized]);

  // Track previous childCount for comparison (using ref to avoid re-renders)
  const previousChildCountRef = useRef<number | undefined>(undefined);
  const previousCountRef = useRef<number | undefined>(undefined);

  /**
   * Parent component that manages count state.
   * This is defined inside to have access to the dynamically created Child component.
   */
  function Parent() {
    const [count, setCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    
    // Initialize render count ref to 0
    // useRef persists across renders but doesn't trigger re-renders when mutated
    const renderCountRef = useRef(0);

    // Increment the render count on every render
    // This runs during the render phase, so it counts every time the component function executes
    renderCountRef.current += 1;

    // Determine render reason for child
    const propsChanged = previousChildCountRef.current !== undefined && previousChildCountRef.current !== childCount;
    const parentRendered = previousCountRef.current !== undefined && previousCountRef.current !== count;
    let renderReason = '';
    if (isMemoized) {
      if (propsChanged) {
        renderReason = 'Rendered: Props changed';
      } else if (parentRendered) {
        renderReason = 'Skipped: Props unchanged (memo)';
      }
    } else {
      if (parentRendered) {
        renderReason = 'Rendered: Parent re-rendered';
      }
    }

    // Update previous values (after render, for next comparison)
    previousChildCountRef.current = childCount;
    previousCountRef.current = count;

    return (
      <Stack spacing={3}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '2px solid',
            borderColor: 'rgb(148, 90, 242)',
            bgcolor: 'background.paper',
            transition: 'all 0.2s ease-in-out',
            position: 'relative',
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: 'rgb(148, 90, 242)',
                  mb: 0.5
                }}
              >
                Parent Component
              </Typography>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Renders:
                </Typography>
                <Chip
                  label={renderCountRef.current}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    minWidth: 40,
                    bgcolor: 'rgb(148, 90, 242)',
                    color: 'white',
                  }}
                  suppressHydrationWarning
                />
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                Parent Count: <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>{count}</Typography>
              </Typography>
            </Box>
            
            <Stack spacing={1.5}>
              <Tooltip 
                title={isMemoized 
                  ? "Changes parent state. Child won't re-render (memoized) unless childCount prop changes."
                  : "Changes parent state. Child will re-render even though props don't change."}
                arrow
              >
                <Button
                  variant="contained"
                  onClick={() => setCount((prev) => prev + 1)}
                  size="large"
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 2,
                    bgcolor: 'rgb(148, 90, 242)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgb(128, 70, 222)',
                      boxShadow: 4,
                    },
                  }}
                >
                  Increment Parent Count
                  <Typography component="span" sx={{ ml: 1, fontSize: '0.75rem', opacity: 0.8 }}>
                    (triggers parent re-render)
                  </Typography>
                </Button>
              </Tooltip>
              
              <Tooltip 
                title="Changes childCount prop. Child will always re-render when this changes."
                arrow
              >
                <Button
                  variant="contained"
                  onClick={() => setChildCount((prev) => prev + 1)}
                  size="large"
                  color="primary"
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 4,
                    },
                  }}
                >
                  Increment Child Prop
                  <Typography component="span" sx={{ ml: 1, fontSize: '0.75rem', opacity: 0.8 }}>
                    (triggers child re-render)
                  </Typography>
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
        </Paper>

        {/* Visual Flow Indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: -1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                fontSize: 32,
                color: 'text.secondary',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 0.6 },
                  '50%': { opacity: 1 },
                },
                lineHeight: 1,
              }}
            >
              ↓
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              {isMemoized ? 'Memo checks props' : 'Always re-renders'}
            </Typography>
          </Box>
        </Box>

        {/* Child Component with enhanced props */}
        {/* <Box sx={{ mt: 2, pl: 2, borderLeft: '3px solid', borderColor: 'primary.light' }}> */}
          <Child 
            childCount={childCount}
            isMemoized={isMemoized}
            previousChildCount={previousChildCountRef.current}
            renderReason={renderReason}
          />
        {/* </Box> */}
      </Stack>
    );
  }

  // Get the code example based on toggle state
  const codeExample = isMemoized ? CODE_EXAMPLES.withMemo : CODE_EXAMPLES.withoutMemo;
  const codeLines = codeExample.split('\n');

  return (
    <ThreePanelLayout
      codePanel={
        <Box>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Code
            </Typography>
            {isMemoized && (
              <Chip
                label="Memoized"
                color="success"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>
          <Paper
            elevation={1}
            sx={{
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              component="pre"
              sx={{
                p: 3,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                color: (theme) => theme.palette.mode === 'dark' ? 'grey.100' : 'text.primary',
                overflow: 'auto',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                lineHeight: 1.8,
                m: 0,
                maxHeight: '600px',
              }}
            >
              {codeLines.map((line, index) => {
                const lineNumber = index + 1;
                const isHighlighted = isMemoized && 
                  lineNumber >= MEMO_HIGHLIGHT.startLine && 
                  lineNumber <= MEMO_HIGHLIGHT.endLine;
                
                return (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      display: 'block',
                      backgroundColor: (theme) => isHighlighted 
                        ? theme.palette.mode === 'dark' 
                          ? 'rgba(76, 175, 80, 0.25)' 
                          : 'rgba(76, 175, 80, 0.15)'
                        : 'transparent',
                      borderLeft: isHighlighted 
                        ? '3px solid' 
                        : 'none',
                      borderColor: isHighlighted 
                        ? 'success.main' 
                        : 'transparent',
                      px: isHighlighted ? 2 : 0,
                      py: isHighlighted ? 0.5 : 0,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {line || '\u00A0'}
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Box>
      }
      outputPanel={
        <Box>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            UI Output
          </Typography>
          <Parent />
        </Box>
      }
      statsPanel={
        <Box>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            Render Stats
          </Typography>
          <Paper
            elevation={1}
            sx={{
              p: 2.5,
              mb: 3,
              border: '1px solid',
              borderRadius: 2,
              bgcolor: isMemoized ? 'success.50' : 'warning.50',
              borderColor: isMemoized ? 'success.light' : 'warning.light',
            }}
          >
            <Stack spacing={2}>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isMemoized}
                      onChange={(e) => setIsMemoized(e.target.checked)}
                      color={isMemoized ? 'success' : 'warning'}
                      sx={{ 
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: 'success.main',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: 'success.main',
                        },
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {isMemoized ? 'With React.memo' : 'Without React.memo'}
                      </Typography>
                      <Chip
                        label={isMemoized ? 'Optimized' : 'Baseline'}
                        color={isMemoized ? 'success' : 'warning'}
                        size="small"
                        sx={{ mt: 0.5, fontWeight: 600 }}
                      />
                    </Box>
                  }
                />
              </Box>
            </Stack>
          </Paper>
          <Stack spacing={2}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: 'info.50',
                border: '1px solid',
                borderColor: 'info.light',
                borderRadius: 2,
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500,
                  color: 'info.dark',
                  lineHeight: 1.7,
                }}
              >
                💡 <strong>How to test:</strong>
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 400,
                  color: 'info.dark',
                  lineHeight: 1.7,
                  mt: 1,
                  pl: 2,
                }}
              >
                1. Click "Increment Parent Count" - see if child re-renders<br/>
                2. Click "Increment Child Prop" - child always re-renders<br/>
                3. Toggle memo to see the difference
              </Typography>
            </Paper>
            
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: isMemoized ? 'success.50' : 'warning.50',
                border: '1px solid',
                borderColor: isMemoized ? 'success.light' : 'warning.light',
                borderRadius: 2,
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: isMemoized ? 'success.dark' : 'warning.dark',
                  lineHeight: 1.7,
                  mb: 1,
                }}
              >
                {isMemoized ? '✅ With React.memo:' : '⚠️ Without React.memo:'}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 400,
                  color: isMemoized ? 'success.dark' : 'warning.dark',
                  lineHeight: 1.7,
                }}
              >
                {isMemoized 
                  ? 'Child only re-renders when props change. When you click "Increment Parent Count", the child render count stays the same because the childCount prop didn\'t change.'
                  : 'Child re-renders on every parent render, even when props don\'t change. Notice how the child render count increases even when only parent state changes.'}
              </Typography>
            </Paper>

            <Alert 
              severity="info" 
              sx={{ 
                '& .MuiAlert-message': {
                  fontSize: '0.875rem',
                }
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Current Behavior:
              </Typography>
              <Typography variant="body2">
                {isMemoized 
                  ? '• Memo is active - comparing props before re-rendering\n• Child will skip render if props unchanged\n• Watch the "Render Reason" badge on child component'
                  : '• No memo - child always re-renders with parent\n• Props comparison is skipped\n• Every parent render triggers child render'}
              </Typography>
            </Alert>
          </Stack>
        </Box>
      }
    />
  );
}
