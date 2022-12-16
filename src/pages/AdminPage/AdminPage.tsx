import React, { useEffect, useState } from 'react';
import styles from './AdminPage.module.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import { ApartModel } from '../../model/ApartModel';
import {
  deletePostAPI,
  getAllReport,
  getReportDetail,
  loadAllPost,
} from '../../api/service';
import Logo from '../HomePage/components/logo1.png';
import SearchInput from '../../components/Header/components/SearchInput/SearchInput';
import ProfileMenu from '../HomePage/components/ProfileMenu/ProfileMenu';
import AppText from '../../components/AppText/AppText';
import AdminPageItem from './components/AdminPageItem/AdminPageItem';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentItem from './components/CommentItem/CommentItem';
import useScreenState from '../../hook/useScreenState';
import AppLoading from '../../components/AppLoading/AppLoading';
import { toast } from 'react-toastify';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user;

  const [searchKey, setSearchKey] = useState('');
  // const [priceStart, setPriceStart] = useState("")
  // const [priceEnd, setPriceEnd] = useState("")
  // const [areaStart, setAreaStart] = useState("")
  // const [areaEnd, setAreaEnd] = useState("")
  const [apartList, setApartList] = useState<ApartModel[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  // const [showFilterBar, setShowFilterBar] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showListApart, setShowListApart] = useState(true);
  const [showReportComment, setShowReportComment] = useState(true);
  const [needRefresh, setNeedRefresh] = useState(false);
  const { loading, setLoading, error, setError } = useScreenState();

  const navigateToLogIn = () => {
    navigate('/login');
  };

  const fetchAllReports = async () => {
    try {
      setLoading(true);
      const token = user?.token;
      const res = await getAllReport(token!);
      if (res.status === 200) {
        console.log('HTD', res.data);
        setReports(res.data);
        // console.log(reports)
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReportDetail = async (reportId: string) => {
    try {
      const token = user?.token;
      const res = await getReportDetail(reportId, token!);
      if (res.status === 200) {
      }
    } catch (e) {
    } finally {
    }
  };

  useEffect(() => {
    Promise.all([loadHomePageData(), fetchAllReports()]).finally(() => {});
    // loadHomePageData().finally(() => {
    // })
    // fetchAllReports().finally(() => {})
  }, [needRefresh]);

  const loadHomePageData: () => Promise<void> = async () => {
    try {
      setLoading(true);
      const res = await loadAllPost({
        searchValue: searchKey,
        // priceStart: Number(priceStart),
        // priceEnd: Number(priceEnd),
        // areaStart: Number(areaStart),
        // areaEnd: Number(areaEnd)
      });
      if (res.status === 201) {
        const newApartList = res.data.map((item) => {
          const newImage = item.image.map((_imageLink) => {
            return 'http://' + _imageLink;
          });
          return {
            ...item,
            image: [...newImage],
          };
        });
        setApartList(newApartList);
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      console.log(user?.token);
      const res = await deletePostAPI(postId, user?.token!);
      console.log(res);
      if (res.status === 200) {
        console.log('Deleted successfully');
        toast.success('Deleted successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // navigate("/admin")
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const searchApart = async () => {
    try {
      const res = await loadAllPost({
        searchValue: searchKey,
      });

      if (res.status === 201) {
        const newApartList = res.data.map((item) => {
          const newImage = item.image.map((_imageLink) => {
            return 'http://' + _imageLink;
          });
          return {
            ...item,
            image: [...newImage],
          };
        });
        setApartList(newApartList);
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
    }
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
    // <DefaultLayout>
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={styles.headerContainer}>
          <div onClick={() => navigate('/')} id="logo_header">
            <img src={Logo} alt="logo" height="60" />
          </div>
          <SearchInput
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <ProfileMenu
            showProfileMenu={showProfileMenu}
            clickMenuOutside={() => setShowProfileMenu(!showProfileMenu)}
            setShowProfileMenu={() => setShowProfileMenu(!showProfileMenu)}
          />
          {/* {user ? (
            <>
              <ProfileMenu
                showProfileMenu={showProfileMenu}
                clickMenuOutside={() => setShowProfileMenu(!showProfileMenu)}
                setShowProfileMenu={() => setShowProfileMenu(!showProfileMenu)}
              />
            </>
          ) : (
            <Button
              onClick={navigateToLogIn}
              sx={{
                borderRadius: '20px',
                padding: '6px 20px',
                alignSelf: 'center',
              }}
              variant="contained"
              type={'button'}
              style={{
                fontSize: '14px',
                textTransform: 'none',
                justifySelf: 'flex-end',
              }}
            >
              Log in
            </Button>
          )} */}
        </div>
        <div className={styles.body}>
          <div>
            <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
              <AppText className={styles.listTitle}>Danh sách Nhà trọ</AppText>
              <div
                onClick={() => setShowListApart((prev) => !prev)}
                className={styles.alignRow}
              >
                <AppText>{showListApart ? 'Thu gọn' : 'Mở rộng'}</AppText>
                {showListApart ? (
                  <ExpandLessIcon
                    style={{
                      fontSize: '30px',
                    }}
                  />
                ) : (
                  <ExpandMoreIcon
                    style={{
                      fontSize: '30px',
                    }}
                  />
                )}
              </div>
            </div>
            {showListApart && (
              <div className={styles.listContainerGrid}>
                {apartList?.map((item) => {
                  return (
                    <AdminPageItem
                      onDelete={async () => {
                        await deletePost(item.id.toString());
                        setNeedRefresh((prev) => !prev);
                      }}
                      key={item.id}
                      item={item}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
              <AppText className={styles.listTitle}>
                Danh sách Report Comment
              </AppText>
              <div
                onClick={() => setShowReportComment((prev) => !prev)}
                className={styles.alignRow}
              >
                <AppText>{showReportComment ? 'Thu gọn' : 'Mở rộng'}</AppText>
                {showReportComment ? (
                  <ExpandLessIcon
                    style={{
                      fontSize: '30px',
                    }}
                  />
                ) : (
                  <ExpandMoreIcon
                    style={{
                      fontSize: '30px',
                    }}
                  />
                )}
              </div>
            </div>
            {showReportComment && (
              <div>
                {reports?.map((item) => {
                  return (
                    <CommentItem
                      key={item.id}
                      id={item.id}
                      reporter={item.reporter.name}
                      createdAt={item.created_at}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
