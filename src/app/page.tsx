'use client';

import { Box, Container, Typography, Paper, Stack, Chip, Button } from '@mui/material';
import Link from 'next/link';
import { Header } from '@/components/Header';

interface CategoryCardProps {
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
}

function CategoryCard({ title, description, href, comingSoon }: CategoryCardProps) {
  const content = (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        height: '100%',
        borderRadius: 3,
        border: '2px solid',
        borderColor: comingSoon ? 'divider' : 'primary.light',
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease',
        cursor: comingSoon ? 'not-allowed' : 'pointer',
        opacity: comingSoon ? 0.6 : 1,
        '&:hover': comingSoon ? {} : {
          transform: 'translateY(-4px)',
          boxShadow: 6,
          borderColor: 'primary.main',
        },
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: comingSoon ? 'text.secondary' : 'primary.main',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            {title}
          </Typography>
          {comingSoon && (
            <Chip
              label="Coming Soon"
              size="small"
              color="default"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Paper>
  );

  if (comingSoon || !href) {
    return content;
  }

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      {content}
    </Link>
  );
}

export default function Home() {
  const categories = [
  {
    title: 'React.memo',
    description: 'Skips re-rendering when props stay the same. Works great with values, breaks with fresh function references — unless you know what you’re doing.',
    href: '/react-memo',
    comingSoon: false,
  },
  {
    title: 'useCallback',
    description: 'Prevents new function references on every render. Makes React.memo actually useful when passing functions as props.',
    href: '/useCallback',
    comingSoon: false,
  },
  {
    title: 'useMemo',
    description: 'Doesn’t stop re-renders — stops expensive calculations from running again. React still renders, but the work gets reused.',
    href: '/useMemo',
    comingSoon: false,
  },
  // {
  //   title: 'Lazy Loading',
  //   description: 'Doesn’t stop re-renders — stops expensive calculations from running again. React still renders, but the work gets reused.',
  //   href: '/lazy-loading',
  //   comingSoon: false,
  // }
]
  
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      
      <Box sx={{ height: '90vh', overflowY: 'auto', overflowX: 'hidden' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Main Heading */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            Exploring React
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Small experiments to answer one question: what did my code actually do?
          </Typography>
        </Box>

        {/* React Optimization Techniques Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            React Optimization Techniques
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                href={category.href}
                comingSoon={category.comingSoon}
              />
            ))}
          </Box>
        </Box>

        {/* What's Next Section */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'text.primary',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            What&apos;s Next
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontStyle: 'italic',
            }}
          >
            This journey isn&apos;t finished. More experiments and learnings will be added over time.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              disabled
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                borderColor: 'divider',
                color: 'text.secondary',
                cursor: 'not-allowed',
              }}
            >
              Coming Soon
            </Button>
          </Box>
        </Box>
        </Container>
      </Box>
    </Box>
  );
}
