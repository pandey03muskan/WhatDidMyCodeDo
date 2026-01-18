import { ReactMemoPlayground } from "@/features/react-memo/ReactMemoPlayground";
import { Header } from "@/components/Header";
import { Box } from "@mui/material";

const ReactMemo = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ flex: 1, p: 2 }}>
                <ReactMemoPlayground/>
            </Box>
        </Box>
    );
};

export default ReactMemo;