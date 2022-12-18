import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadAllPost } from '../../api/service';
import AppLoading from '../../components/AppLoading/AppLoading';
import AppText from '../../components/AppText/AppText';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import useScreenState from '../../hook/useScreenState';
import { ApartModel } from '../../model/ApartModel';
import ApartListItem from './components/ApartListItem';
import FilterMenu from './components/FilterMenu/FilterMenu';
import Posts from './components/Posts/Posts';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState('');
  const [priceStart, setPriceStart] = useState('');
  const [priceEnd, setPriceEnd] = useState('');
  const [areaStart, setAreaStart] = useState('');
  const [areaEnd, setAreaEnd] = useState('');
  const [apartList, setApartList] = useState<ApartModel[]>([]);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const { setLoading, loading, error, setError } = useScreenState();

  const navigateToLogIn = () => {
    navigate('/login');
  };

  useEffect(() => {
    loadHomePageData().finally(() => {});
  }, []);

  const loadHomePageData: () => Promise<void> = async () => {
    try {
      setLoading(true);
      const res = await loadAllPost({
        searchValue: searchKey,
        priceStart: Number(priceStart),
        priceEnd: Number(priceEnd),
        areaStart: Number(areaStart),
        areaEnd: Number(areaEnd),
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
    <DefaultLayout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={styles.body}>
          <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
            <AppText className={styles.listTitle}>Danh sách Nhà trọ</AppText>

            <FilterMenu
              showFilterMenu={showFilterBar}
              clickMenuOutside={() => {
                setShowFilterBar(!showFilterBar);
              }}
              setShowFilterMenu={() => {
                setShowFilterBar(!showFilterBar);
              }}
              priceStart={priceStart}
              priceEnd={priceEnd}
              setPriceStart={setPriceStart}
              setPriceEnd={setPriceEnd}
              areaStart={areaStart}
              setAreaStart={setAreaStart}
              areaEnd={areaEnd}
              setAreaEnd={setAreaEnd}
              filterHandler={async () => {
                await loadHomePageData();
                setAreaEnd('');
                setAreaStart('');
                setPriceStart('');
                setPriceEnd('');
                setShowFilterBar(false);
              }}
            />
          </div>
          {/* <div className={styles.listContainerGrid}>
            {apartList?.map((item) => {
              return (
                <ApartListItem
                  onClick={() => {
                    navigate(`/apart-detail/${item.id}`);
                  }}
                  key={item.id}
                  item={item}
                />
              );
            })}
          </div> */}
          <Posts listApart={apartList} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
