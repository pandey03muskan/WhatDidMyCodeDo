import { Header } from "@/components/Header";
import { Box } from "@mui/material";
import { UseCallbackPlayground } from "@/features/use-callback/UseCallbackPlayground";

const UseCallbackPage = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      <Box sx={{ height: '90vh', overflowY: 'auto', overflowX: 'hidden', p: 2 }}>
        <UseCallbackPlayground />
      </Box>
    </Box>
  );
};

export default UseCallbackPage;

