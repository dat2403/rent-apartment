import { Typography } from '@mui/material';
import React from 'react';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = (props) => {
  return (
    <Typography
      mb="30px"
      fontSize="40px"
      fontWeight="bold"
      sx={{ m: '0 0 5px 0' }}
    >
      {props.title}
    </Typography>
  );
};

export default Title;
