'use client';

import { Box, Typography } from "@mui/material";
import { UseCallbackPlayground } from '@/features/use-callback/UseCallbackPlayground';

const WhereReactMemoFails = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Where React.memo fails (function props)
      </Typography>
      <UseCallbackPlayground />
    </Box>
  );
};

export default WhereReactMemoFails;
