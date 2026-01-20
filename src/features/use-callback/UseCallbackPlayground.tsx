'use client';

import { Box, Button, Chip, Divider, Paper, Stack, Tooltip, Typography, FormControlLabel, Switch, Alert } from "@mui/material";
import { memo, useRef, useState, useCallback } from "react";
import { ThreePanelLayout } from '@/shared/layout/ThreePanelLayout';
import { CODE_EXAMPLES_USE_CALLBACK, USECALLBACK_HIGHLIGHT } from './useCallback.constants';

const Child = memo(function Child({ 
  childCount,
  onIncrement
}: { 
  childCount: number;
  onIncrement: () => void;
}) {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  
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
              Child Component (memo)
            </Typography>
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
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: '0.875rem',
                minWidth: 40,
                bgcolor: 'success.main',
                color: 'white',
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
        <Button
          variant="outlined"
          onClick={onIncrement}
          size="medium"
          sx={{
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          Increment Child Count
        </Button>
      </Stack>
    </Paper>
  );
});

export function UseCallbackPlayground() {
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(false);

  function Parent() {
    const [count, setCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    
    const renderCountRef = useRef(0);
    renderCountRef.current += 1;

    const handleIncrementWithoutCallback = () => {
      setChildCount((c) => c + 1);
    };

    const handleIncrementWithCallback = useCallback(() => {
      setChildCount((c) => c + 1);
    }, []); 

    const handleIncrement = useCallbackEnabled 
      ? handleIncrementWithCallback 
      : handleIncrementWithoutCallback;

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
                title={useCallbackEnabled 
                  ? "Changes parent state. Child won't re-render because function reference is stable (useCallback)."
                  : "Changes parent state. Child WILL re-render because a new function reference is created each time."}
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
            </Stack>
          </Stack>
        </Paper>

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
            <Tooltip 
              title={useCallbackEnabled 
                ? "Function reference is stable (useCallback) - memo comparison passes"
                : "New function reference created - memo comparison fails"}
            >
              <Typography 
                variant="caption" 
                sx={{ color: 'text.secondary', fontWeight: 600, cursor: 'pointer' }}
              >
                {useCallbackEnabled 
                  ? '✅ Function reference stable (useCallback)' 
                  : '❌ New function reference each render'}
              </Typography>
            </Tooltip>
          </Box>
        </Box>

        <Child 
          childCount={childCount}
          onIncrement={handleIncrement}
        />
      </Stack>
    );
  }

  const codeExample = useCallbackEnabled 
    ? CODE_EXAMPLES_USE_CALLBACK.withUseCallback 
    : CODE_EXAMPLES_USE_CALLBACK.withoutUseCallback;
  const codeLines = codeExample.split('\n');

  return (
    <ThreePanelLayout
      codePanel={
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Code
            </Typography>
            {useCallbackEnabled && (
              <Chip
                label="useCallback"
                color="success"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            )}
            {!useCallbackEnabled && (
              <Chip
                label="Without useCallback"
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
                const isHighlighted = useCallbackEnabled && 
                  lineNumber >= USECALLBACK_HIGHLIGHT.startLine && 
                  lineNumber <= USECALLBACK_HIGHLIGHT.endLine;
                
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
            <Parent />
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
                bgcolor: useCallbackEnabled ? 'success.50' : 'warning.50',
                borderColor: useCallbackEnabled ? 'success.light' : 'warning.light',
              }}
            >
              <Stack spacing={2}>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={useCallbackEnabled}
                        onChange={(e) => setUseCallbackEnabled(e.target.checked)}
                        color={useCallbackEnabled ? 'success' : 'warning'}
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
                          {useCallbackEnabled ? 'With useCallback' : 'Without useCallback'}
                        </Typography>
                        <Chip
                          label={useCallbackEnabled ? 'Fixed' : 'Problem'}
                          color={useCallbackEnabled ? 'success' : 'warning'}
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
                  1. Click "Increment Parent Count" - watch child render count<br/>
                  2. Toggle useCallback to see the difference<br/>
                  3. Notice: Without useCallback, child re-renders even with memo!
                </Typography>
              </Paper>
              
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: useCallbackEnabled ? 'success.50' : 'warning.50',
                  border: '1px solid',
                  borderColor: useCallbackEnabled ? 'success.light' : 'warning.light',
                  borderRadius: 2,
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    color: useCallbackEnabled ? 'success.dark' : 'warning.dark',
                    lineHeight: 1.7,
                    mb: 1,
                  }}
                >
                  {useCallbackEnabled ? '✅ With useCallback:' : '⚠️ Without useCallback:'}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 400,
                    color: useCallbackEnabled ? 'success.dark' : 'warning.dark',
                    lineHeight: 1.7,
                  }}
                >
                  {useCallbackEnabled 
                    ? 'Function reference stays the same across renders. When you click "Increment Parent Count", the child render count stays the same because memo sees the same function reference.'
                    : 'A new function reference is created on every parent render. Even though Child is wrapped with memo, it still re-renders because the function prop reference changes each time.'}
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
                  The Problem:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {`• Child is wrapped with memo()\n• But still re-renders when parent re-renders\n• Why? Function prop gets a new reference each render\n• memo() does shallow comparison: function !== function`}
                </Typography>
              </Alert>

              <Alert 
                severity={useCallbackEnabled ? 'success' : 'warning'}
                sx={{ 
                  '& .MuiAlert-message': {
                    fontSize: '0.875rem',
                  }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {useCallbackEnabled ? 'The Solution:' : 'The Solution (toggle to see):'}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {`• Wrap function with useCallback()\n• Function reference stays stable\n• memo() comparison passes\n• Child skips unnecessary re-renders`}
                </Typography>
              </Alert>
            </Stack>
          </Box>
        </Box>
      }
    />
  );
}

