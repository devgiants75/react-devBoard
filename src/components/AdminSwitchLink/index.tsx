import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

function Index() {
  return (
    <Typography variant='body2' style={{ textAlign: 'center' }}>
      관리자이신가요? <Link to='/register/admin'>여기를 클릭하세요</Link>
    </Typography>
  );
};

export default Index;