import Search from '@mui/icons-material/Search';
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadAllPost } from '../../api/service';
import ApartList from '../../components/ApartPost/ApartList';
import AppLoading from '../../components/AppLoading/AppLoading';
import useScreenState from '../../hook/useScreenState';
import { ApartModel } from '../../model/ApartModel';
import { Input } from '../LoginPage/styled';
import FilterMenu from '../../components/FilterMenu/FilterMenu';

export interface TagData {
  id: number;
  label: string;
}

export const tagsList = [
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

const HomePage: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string | null>(null);
  const [priceStart, setPriceStart] = useState<string | null>(null);
  const [priceEnd, setPriceEnd] = useState<string | null>(null);
  const [areaStart, setAreaStart] = useState<string | null>(null);
  const [areaEnd, setAreaEnd] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [apartList, setApartList] = useState<ApartModel[]>([]);
  const [university, setUniversity] = useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [tags, setTags] = React.useState<TagData[]>(tagsList);
  const [selectedTags, setSelectedTags] = React.useState<TagData[]>([]);
  const { setLoading, loading, error, setError } = useScreenState();
  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const loadHomePageData: () => Promise<void> = async () => {
    try {
      setLoading(true);
      const res = await loadAllPost({
        searchValue: searchKey,
        priceStart: Number(priceStart),
        priceEnd: Number(priceEnd),
        areaStart: Number(areaStart),
        areaEnd: Number(areaEnd),
        district: district,
        university: university,
        pageIndex: 1,
        pageSize: 10,
        tags: selectedTags.map((item) => item.id.toString()),
      });
      if (res.status === 201) {
        console.log(res.data);
        setApartList(res.data);
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomePageData().finally(() => {});
  }, []);

  const searchApart = async () => {
    try {
      // setLoading(true);
      const res = await loadAllPost({
        searchValue: searchKey,
        priceStart: Number(priceStart),
        priceEnd: Number(priceEnd),
        areaStart: Number(areaStart),
        areaEnd: Number(areaEnd),
        district: district,
        university: university,
        pageIndex: 1,
        pageSize: 10,
      });

      if (res.status === 201) {
        setApartList(res.data);
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      // setLoading(false);
    }
  };

  const filterHandler = async () => {
    await loadHomePageData();
    setAreaEnd(null);
    setAreaStart(null);
    setPriceStart(null);
    setPriceEnd(null);
    setDistrict(null);
    setUniversity(null);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await searchApart();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKey]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Container
      sx={{
        marginTop: '85px',
      }}
      maxWidth="xl"
    >
      <Grid container padding="40px 0 0">
        <Grid item xs={2}>
          <FilterMenu
            priceStart={priceStart}
            setPriceStart={setPriceStart}
            priceEnd={priceEnd}
            setPriceEnd={setPriceEnd}
            areaStart={areaStart}
            setAreaStart={setAreaStart}
            areaEnd={areaEnd}
            setAreaEnd={setAreaEnd}
            district={district}
            setDistrict={setDistrict}
            university={university}
            setUniversity={setUniversity}
            filterHandler={filterHandler}
            tags={tags}
            setTags={setTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </Grid>

        <Grid item xs={10}>
          <Box width="60%" m="auto">
            <Input
              size="small"
              fullWidth
              label="Tìm kiếm"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Search fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Stack mt={5} justifyContent="center" alignItems="flex-end">
            <Pagination
              count={1}
              page={page}
              onChange={handleChangePagination}
              color="secondary"
            />
          </Stack>
          <ApartList data={apartList} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
