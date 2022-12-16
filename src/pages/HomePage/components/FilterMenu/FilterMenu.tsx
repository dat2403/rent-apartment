import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import styles from './FilterMenu.module.css';
import AppText from '../../../../components/AppText/AppText';
import Tippy from '@tippyjs/react/headless';

interface FilterMenuProps {
  showFilterMenu: boolean;
  clickMenuOutside: () => void;
  setShowFilterMenu: (showFilterMenu: boolean) => void;
  priceStart: string;
  priceEnd: string;
  setPriceStart: (priceStart: string) => void;
  setPriceEnd: (priceEnd: string) => void;
  areaStart: string;
  setAreaStart: (areaStart: string) => void;
  areaEnd: string;
  setAreaEnd: (areaEnd: string) => void;
  filterHandler: () => Promise<void>;
}

const FilterMenu: React.FC<FilterMenuProps> = (props) => {
  const {
    showFilterMenu,
    clickMenuOutside,
    setShowFilterMenu,
    priceStart,
    priceEnd,
    setPriceStart,
    setPriceEnd,
    areaStart,
    setAreaStart,
    areaEnd,
    setAreaEnd,
    filterHandler,
  } = props;
  return (
    <Tippy
      onClickOutside={clickMenuOutside}
      visible={showFilterMenu}
      placement="bottom-end"
      allowHTML={true}
      zIndex={99999}
      interactive={true}
      render={(attrs) => (
        <div {...attrs} className={styles.filterContainer}>
          <div className={styles.filterBar}>
            <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
              <AppText className={styles.filterBarTitle}>Filter</AppText>
            </div>
            <AppText className={styles.label}>Price (VND)</AppText>
            <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
              <input
                value={priceStart}
                onChange={(e) => setPriceStart(e.target.value)}
                className={styles.filterInput}
                placeholder={'Minimum'}
              />
              <div style={{ width: '10px' }} />
              <input
                value={priceEnd}
                onChange={(e) => setPriceEnd(e.target.value)}
                className={styles.filterInput}
                placeholder={'Maximum'}
              />
            </div>
            <AppText className={styles.label}>Area (square meters)</AppText>
            <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
              <input
                value={areaStart}
                onChange={(e) => setAreaStart(e.target.value)}
                className={styles.filterInput}
                placeholder={'Minimum'}
              />
              <div style={{ width: '10px' }} />
              <input
                value={areaEnd}
                onChange={(e) => setAreaEnd(e.target.value)}
                className={styles.filterInput}
                placeholder={'Maximum'}
              />
            </div>
            <div onClick={filterHandler} className={styles.filterSubmitButton}>
              <AppText className={styles.filterBtnText}>Done</AppText>
            </div>
          </div>
        </div>
      )}
    >
      <div
        onClick={() => {
          setShowFilterMenu(!showFilterMenu);
        }}
      >
        <FilterListIcon
          style={{
            fontSize: '30px',
            marginLeft: '100px',
          }}
        />
      </div>
    </Tippy>
  );
};

export default FilterMenu;
