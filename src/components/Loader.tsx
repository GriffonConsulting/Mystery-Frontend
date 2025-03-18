import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
};

export default Loader;
