'use client';

import { Box, Button, Chip, Divider, Paper, Stack, Tooltip, Typography, FormControlLabel, Switch, Alert, TextField } from "@mui/material";
import { useRef, useState, useMemo, useEffect } from "react";
import { ThreePanelLayout } from '@/shared/layout/ThreePanelLayout';
import { CODE_EXAMPLES_USE_MEMO, USEMEMO_HIGHLIGHT } from './useMemo.constants';

// Simulate expensive calculation
function expensiveCalculation(filter: string): number {
  let result = 0;
  // Simulate heavy computation - smaller number for demo purposes
  for (let i = 0; i < 100000; i++) {
    result += i;
  }
  return result + filter.length;
}

export function UseMemoPlayground() {
  const [useMemoEnabled, setUseMemoEnabled] = useState(false);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');

  // Track render count
  const renderCountRef = useRef(0);
  const previousUseMemoEnabledRef = useRef(useMemoEnabled);
  const isInitialRenderRef = useRef(true);
  
  // Reset render and computation counts when toggle changes
  const toggleJustChanged = previousUseMemoEnabledRef.current !== useMemoEnabled;
  if (toggleJustChanged) {
    renderCountRef.current = 0;
    previousUseMemoEnabledRef.current = useMemoEnabled;
  }
  
  renderCountRef.current += 1;

  // Track computation count
  const computationCountRef = useRef(0);
  const previousFilterRef = useRef(filter);
  const hasComputedThisRenderRef = useRef(false);

  // Reset computation count when toggle changes (in render phase, before any computation)
  if (toggleJustChanged) {
    computationCountRef.current = 0;
    previousFilterRef.current = filter;
  }

  // Reset the flag at the start of each render (refs persist, so we need to reset manually)
  hasComputedThisRenderRef.current = false;
  
  if (isInitialRenderRef.current) {
    isInitialRenderRef.current = false;
  }

  // Without useMemo: runs on every render
  let resultWithoutMemo = 0;
  if (!useMemoEnabled) {
    if (!hasComputedThisRenderRef.current) {
      computationCountRef.current += 1;
      hasComputedThisRenderRef.current = true;
    }
    resultWithoutMemo = expensiveCalculation(filter);
  }

  // With useMemo: only runs when filter changes
  const resultWithMemo = useMemo(() => {
    // This callback only runs when filter changes or on first render
    if (!hasComputedThisRenderRef.current) {
      computationCountRef.current += 1;
      hasComputedThisRenderRef.current = true;
    }
    previousFilterRef.current = filter;
    return expensiveCalculation(filter);
  }, [filter]);

  const result = useMemoEnabled ? resultWithMemo : resultWithoutMemo;
  const computationCount = computationCountRef.current;

  const codeExample = useMemoEnabled 
    ? CODE_EXAMPLES_USE_MEMO.withUseMemo 
    : CODE_EXAMPLES_USE_MEMO.withoutUseMemo;
  const codeLines = codeExample.split('\n');

  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 700, 
          mb: 3,
          color: 'text.primary',
          fontFamily: 'var(--font-poppins), sans-serif',
        }}
      >
        useMemo Playground
      </Typography>
      <ThreePanelLayout
        codePanel={
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Code
              </Typography>
              {useMemoEnabled && (
                <Chip
                  label="useMemo"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              )}
              {!useMemoEnabled && (
                <Chip
                  label="Without useMemo"
                  color="warning"
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
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
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
                  flex: 1,
                }}
              >
                {codeLines.map((line, index) => {
                  const lineNumber = index + 1;
                  const isHighlighted = useMemoEnabled && 
                    lineNumber >= USEMEMO_HIGHLIGHT.startLine && 
                    lineNumber <= USEMEMO_HIGHLIGHT.endLine;
                  
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
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              UI Output
            </Typography>
            <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
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
                <Stack spacing={3}>
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
                  
                  <Divider />
                  
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                      Count: <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>{count}</Typography>
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 1.5,
                      bgcolor: useMemoEnabled ? 'error.50' : 'warning.50',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: useMemoEnabled ? 'error.light' : 'warning.light',
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 600,
                        color: useMemoEnabled ? 'error.dark' : 'warning.dark',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}
                    >
                      Computations:
                    </Typography>
                    <Chip
                      label={computationCount}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        minWidth: 40,
                        bgcolor: useMemoEnabled ? 'error.main' : 'warning.main',
                        color: 'white',
                      }}
                      suppressHydrationWarning
                    />
                  </Box>
                  
                  <Stack spacing={1.5}>
                    <Tooltip 
                      title="Changes parent state. Component re-renders, but expensive calculation may be skipped with useMemo."
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
                        Increment Count
                        <Typography component="span" sx={{ ml: 1, fontSize: '0.75rem', opacity: 0.8 }}>
                          (triggers re-render)
                        </Typography>
                      </Button>
                    </Tooltip>
                  </Stack>

                  <Divider />

                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'primary.main',
                        mb: 2
                      }}
                    >
                      Expensive Calculation
                    </Typography>
                    
                    <TextField
                      label="Filter"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      placeholder="Type to filter..."
                      fullWidth
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                        Result: <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>{result.toLocaleString()}</Typography>
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                        (This expensive calculation runs on every render without useMemo)
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Box>
        }
        statsPanel={
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Render Stats
            </Typography>
            <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Paper
                elevation={1}
                sx={{
                  p: 2.5,
                  mb: 3,
                  border: '1px solid',
                  borderRadius: 2,
                  bgcolor: useMemoEnabled ? 'success.50' : 'warning.50',
                  borderColor: useMemoEnabled ? 'success.light' : 'warning.light',
                }}
              >
                <Stack spacing={2}>
                  <Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={useMemoEnabled}
                          onChange={(e) => setUseMemoEnabled(e.target.checked)}
                          color={useMemoEnabled ? 'success' : 'warning'}
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
                            {useMemoEnabled ? 'With useMemo' : 'Without useMemo'}
                          </Typography>
                          <Chip
                            label={useMemoEnabled ? 'Optimized' : 'Baseline'}
                            color={useMemoEnabled ? 'success' : 'warning'}
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
                    1. Click "Increment Count" - watch render & computation counts<br/>
                    2. Change the filter - see computation count increase<br/>
                    3. Toggle useMemo to see the difference<br/>
                    4. Notice: Parent always re-renders, but computation is cached!
                  </Typography>
                </Paper>
                
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: useMemoEnabled ? 'success.50' : 'warning.50',
                    border: '1px solid',
                    borderColor: useMemoEnabled ? 'success.light' : 'warning.light',
                    borderRadius: 2,
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600,
                      color: useMemoEnabled ? 'success.dark' : 'warning.dark',
                      lineHeight: 1.7,
                      mb: 1,
                    }}
                  >
                    {useMemoEnabled ? '✅ With useMemo:' : '⚠️ Without useMemo:'}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 400,
                      color: useMemoEnabled ? 'success.dark' : 'warning.dark',
                      lineHeight: 1.7,
                    }}
                  >
                    {useMemoEnabled 
                      ? 'Expensive calculation only runs when filter (dependency) changes. When you click "Increment Count", the component re-renders but the calculation is skipped because filter didn\'t change.'
                      : 'Expensive calculation runs on EVERY render, even when filter didn\'t change. Notice how the computation count increases with every render, wasting CPU cycles.'}
                  </Typography>
                </Paper>

               {useMemoEnabled && (
                <Alert 
                  severity="info" 
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'info.light',
                    '& .MuiAlert-message': {
                      fontSize: '0.875rem',
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Key Insight:
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {`• Component ALWAYS re-renders when state changes\n• useMemo does NOT stop re-rendering\n• useMemo only skips the expensive calculation\n• Dependencies control when calculation runs`}
                  </Typography>
                </Alert>
               )}
                <Alert 
                  severity={useMemoEnabled ? 'success' : 'warning'}
                  sx={{ 
                    border: '1px solid',
                    borderColor: useMemoEnabled ? 'success.light' : 'warning.light',
                    '& .MuiAlert-message': {
                      fontSize: '0.875rem',
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {useMemoEnabled ? 'The Solution:' : 'The Problem:'}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {useMemoEnabled 
                      ? `• useMemo caches the calculation result\n• Only recalculates when dependencies change\n• Component still re-renders, but work is skipped\n• Performance improved without changing render behavior`
                      : `• Every render triggers expensive calculation\n• Even if inputs didn't change\n• Wastes CPU cycles unnecessarily\n• Component re-renders AND recalculates`}
                  </Typography>
                </Alert>

              {useMemoEnabled && (
                <Alert 
                  severity="error"
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'error.light',
                    '& .MuiAlert-message': {
                      fontSize: '0.875rem',
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Remember:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'error.main' }}>
                    useMemo skips recalculation, not re-rendering
                  </Typography>
                </Alert>)}
              </Stack>
            </Box>
          </Box>
        }
      />
    </Box>
  );
}
