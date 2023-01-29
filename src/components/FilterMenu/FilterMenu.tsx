import { FilterAltOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  ListItem,
  MenuItem,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

export interface TagData {
  id: number;
  label: string;
}

const DistrictList = [
  { value: 'all', label: 'Tất cả' },
  { value: 'Cau Giay', label: 'Cầu Giấy' },
  { value: 'Hai Ba Trung', label: 'Hai Bà Trưng' },
];

const UniversityList = [
  { value: 'all', label: 'Tất cả' },
  { value: 'HUST', label: 'Đại học Bách khoa Hà Nội' },
  { value: 'VNU', label: 'Đại học Quốc Gia Hà Nội' },
];

const tagsList = [
  { id: 1, label: 'Tiện nghi' },
  { id: 2, label: 'Giá rẻ' },
  { id: 3, label: 'Tối giản' },
  { id: 4, label: 'Cho phép thú nuôi' },
  { id: 5, label: 'Yên Tĩnh' },
  { id: 6, label: 'Có nơi để xe' },
  { id: 7, label: 'Hiện đại' },
  { id: 8, label: 'Phòng mới' },
  { id: 9, label: 'Phòng nhiều người' },
  { id: 10, label: 'Phòng đơn' },
];

export const Input = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: 10,
  },
  '& label.Mui-focused': {
    color: '#b772ff',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#9854df',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#b772ff',
    },
  },
});

interface FilterMenuProps {
  priceStart: string | null;
  priceEnd: string | null;
  setPriceStart: (priceStart: string | null) => void;
  setPriceEnd: (priceEnd: string | null) => void;
  areaStart: string | null;
  setAreaStart: (areaStart: string | null) => void;
  areaEnd: string | null;
  setAreaEnd: (areaEnd: string | null) => void;
  district: string | null;
  setDistrict: (district: string) => void;
  university: string | null;
  setUniversity: (university: string) => void;
  filterHandler: () => Promise<void>;
}

const FilterMenu: React.FC<FilterMenuProps> = (props) => {
  const [tags, setTags] = React.useState<TagData[]>(tagsList);
  const [selectedTags, setSelectedTags] = React.useState<TagData[]>([]);

  const handleAdd = (tag: TagData) => () => {
    setSelectedTags((tags) => [...tags, tag]);
    setTags((tags) => tags.filter((t) => t.id !== tag.id));
  };

  const handleDelete = (tag: TagData) => () => {
    setSelectedTags((tags) => tags.filter((t) => t.id !== tag.id));
    setTags((tags) => [...tags, tag]);
  };

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <FilterAltOutlined
            sx={{
              fontSize: 16,
              color: '#ccc',
              mr: 1,
            }}
          />
          <Typography variant="h6">Lọc</Typography>
        </Stack>
        <Button
          onClick={props.filterHandler}
          variant="outlined"
          sx={{
            textTransform: 'none',
          }}
          color="secondary"
        >
          Xác nhận
        </Button>
      </Stack>

      <Divider sx={{ mt: 1, mb: 1 }} />

      <Box>
        <Typography fontSize={14} variant="h6">
          Diện tích phòng (m2)
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <Typography fontSize={12} variant="h6" fontWeight={400}>
              Min
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography fontSize={12} variant="h6" fontWeight={400}>
              Max
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Input
              value={props.areaStart}
              onChange={(e) => props.setAreaStart(e.target.value)}
              type="number"
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography textAlign="center" fontSize={16} variant="h6">
              ~
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Input
              value={props.areaEnd}
              onChange={(e) => props.setAreaEnd(e.target.value)}
              type="number"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Typography fontSize={14} variant="h6">
          Giá (VND)
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <Typography fontSize={12} variant="h6" fontWeight={400}>
              Min
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography fontSize={12} variant="h6" fontWeight={400}>
              Max
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Input
              value={props.priceStart}
              onChange={(e) => props.setPriceStart(e.target.value)}
              type="number"
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography textAlign="center" fontSize={16} variant="h6">
              ~
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Input
              value={props.priceEnd}
              onChange={(e) => props.setPriceEnd(e.target.value)}
              type="number"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Typography fontSize={14} variant="h6">
          Vị trí
        </Typography>
        <Typography fontSize={14} variant="h6" fontWeight={400}>
          Quận
        </Typography>
        <Input
          fullWidth
          select
          size="small"
          defaultValue="all"
          value={props.district}
          onChange={(e) => props.setDistrict(e.target.value)}
        >
          {DistrictList.map((district) => (
            <MenuItem
              key={district.value}
              sx={{
                fontSize: 12,
              }}
              value={district.value}
            >
              {district.label}
            </MenuItem>
          ))}
        </Input>
      </Box>

      <Box mt={2}>
        <Typography fontSize={14} variant="h6">
          Trường học
        </Typography>
        <Input
          fullWidth
          select
          size="small"
          defaultValue="all"
          value={props.university}
          onChange={(e) => props.setUniversity(e.target.value)}
        >
          {UniversityList.map((university) => (
            <MenuItem
              key={university.value}
              sx={{
                fontSize: 12,
              }}
              value={university.value}
            >
              {university.label}
            </MenuItem>
          ))}
        </Input>
      </Box>

      <Box mt={2}>
        <Typography fontSize={14} variant="h6">
          Tags
        </Typography>
        <Paper
          sx={{
            display: selectedTags.length ? 'flex' : 'none',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            border: '1px solid #e2e8f0',
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {selectedTags.map((tag) => {
            return (
              <ListItem key={tag.id}>
                <Chip
                  label={tag.label}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onDelete={handleDelete(tag)}
                />
              </ListItem>
            );
          })}
        </Paper>
        <Stack direction="row" flexWrap="wrap" mt={1}>
          {tags.map((tag) => (
            <Button
              onClick={handleAdd(tag)}
              key={tag.id}
              variant="outlined"
              size="small"
              sx={{
                textTransform: 'none',
                fontSize: 12,
                mr: 1,
                mb: 1,
              }}
              color="secondary"
            >
              {tag.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default FilterMenu;
