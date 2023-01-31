import { Add, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadAllPostByUser } from '../../api/service';
import AppLoading from '../../components/AppLoading/AppLoading';
import useScreenState from '../../hook/useScreenState';
import { ApartModel } from '../../model/ApartModel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ApartManagement: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { setLoading, loading, error, setError } = useScreenState();
  const [apartList, setApartList] = useState<ApartModel[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const loadPosts: () => Promise<void> = async () => {
    try {
      setLoading(true);
      const res = await loadAllPostByUser(
        {
          pageIndex: 1,
          pageSize: 10,
        },
        value
      );
      if (res.status === 201) {
        setApartList(res.data);
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts().finally(() => {});
  }, [value]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <>
      <Box mt="85px">
        <Stack pt={4} pr={3} alignItems="flex-end">
          <Button
            sx={{
              textTransform: 'none',
            }}
            variant="outlined"
            color="secondary"
            startIcon={<Add />}
            onClick={() => navigate('/post-apart')}
          >
            Đăng phòng trọ
          </Button>
        </Stack>
        <Stack pt={1} alignItems="center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
              label="Đang duyệt"
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
              label="Phòng đã đăng"
              {...a11yProps(0)}
            />
          </Tabs>
        </Stack>

        <TabPanel value={value} index={0}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>STT.</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Thời gian tạo</TableCell>
                  <TableCell>Đánh giá</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apartList.length == 0 ? (
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      height: 100,
                    }}
                  >
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h6" color="text.secondary">
                        Không có dữ liệu
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  apartList.map((apart, index) => (
                    <TableRow
                      key={apart.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{apart.title}</TableCell>
                      <TableCell>{apart.address}</TableCell>
                      <TableCell>
                        {moment(apart.created_at).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{apart.total_rating}/5</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <IconButton>
                            <SvgIcon component={Edit} color="primary" />
                          </IconButton>
                          <IconButton>
                            <SvgIcon component={Delete} color="error" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>STT.</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Thời gian tạo</TableCell>
                  <TableCell>Đánh giá</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apartList.length == 0 ? (
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      height: 100,
                    }}
                  >
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h6" color="text.secondary">
                        Không có dữ liệu
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  apartList.map((apart, index) => (
                    <TableRow
                      key={apart.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{apart.title}</TableCell>
                      <TableCell>{apart.address}</TableCell>
                      <TableCell>
                        {moment(apart.created_at).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{apart.total_rating}/5</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <IconButton>
                            <SvgIcon component={Edit} color="primary" />
                          </IconButton>
                          <IconButton>
                            <SvgIcon component={Delete} color="error" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>

      {/*<CreateApartModal />*/}
    </>
  );
};

export default ApartManagement;
