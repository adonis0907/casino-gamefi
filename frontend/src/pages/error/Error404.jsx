import { Box, Typography } from '@mui/material';

const Error404Page = () => {
    return (
        <Box sx={{ display: 'flex', height: '30rem', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h4">404 Not Found!</Typography>
        </Box>
    );
}

export default Error404Page;