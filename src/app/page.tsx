'use client';

import { Box, Container, Typography, Paper, Stack, Chip } from '@mui/material';
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
      description: 'Learn how React.memo prevents unnecessary re-renders by memoizing component results. Understand when and how to use it effectively.',
      href: '/react-memo',
      comingSoon: false,
    },
    {
      title: 'useCallback',
      description: 'Explore how useCallback memoizes functions to prevent unnecessary re-renders in child components. Master function memoization patterns.',
      href: "/useCallback",
      comingSoon: false,
    },
    {
      title: 'useMemo',
      description: 'Discover how useMemo optimizes expensive computations by memoizing values. Learn when to use it for performance optimization.',
      href: undefined,
      comingSoon: true,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ flex: 1, py: 6 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            React Performance Optimization
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
            Interactive playgrounds to understand React optimization techniques
          </Typography>
        </Box>

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
      </Container>
    </Box>
  );
}
