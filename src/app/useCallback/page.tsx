import { Header } from "@/components/Header";
import { Box } from "@mui/material";
import { UseCallbackPlayground } from "@/features/use-callback/UseCallbackPlayground";

const UseCallbackPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, p: 2 }}>
        <UseCallbackPlayground />
      </Box>
    </Box>
  );
};

export default UseCallbackPage;

