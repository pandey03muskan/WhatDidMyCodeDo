import { Header } from "@/components/Header";
import { Box } from "@mui/material";
import { UseMemoPlayground } from "@/features/use-memo/useMemoPlayground";

const UseMemoPage = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      <Box sx={{ height: '90vh', overflowY: 'auto', overflowX: 'hidden', p: 2 }}>
        <UseMemoPlayground />
      </Box>
    </Box>
  );
};

export default UseMemoPage;
