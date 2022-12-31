import { Star } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { ApartModel } from '../../model/ApartModel';
import Apart from './Apart';

interface ApartListProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  data: ApartModel[];
}

const ApartList: React.FC<ApartListProps> = (props) => {
  return (
    <Grid container p="40px 0 0 40px" spacing={2} alignItems="stretch">
      {props.data.map((item) => (
        <Apart key={item.id} item={item} />
      ))}
    </Grid>
  );
};

export default ApartList;
