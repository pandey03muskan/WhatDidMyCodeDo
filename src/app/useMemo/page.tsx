import { Header } from "@/components/Header";
import { Box } from "@mui/material";
import { UseMemoPlayground } from "@/features/use-memo/useMemoPlayground";

const UseMemoPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, p: 2 }}>
        <UseMemoPlayground />
      </Box>
    </Box>
  );
};

export default UseMemoPage;
