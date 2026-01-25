import { ReactMemoPlayground } from "@/features/react-memo/ReactMemoPlayground";
import { Header } from "@/components/Header";
import { Box } from "@mui/material";

const ReactMemo = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      <Box sx={{ height: '90vh', overflowY: 'auto', overflowX: 'hidden', p: 2 }}>
        <ReactMemoPlayground />
      </Box>
    </Box>
  );
};

export default ReactMemo;