import React from 'react';
import styles from './SearchInput.module.css';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string | number | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const SearchInput: React.FunctionComponent<SearchInputProps> = (props) => {
  const { value, onChange } = props;
  return (
    <div className={styles.inputContainer}>
      <SearchIcon className={styles.icon} fontSize={'large'} />
      <input
        {...props}
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder={'Search'}
        type={'text'}
      />
    </div>
  );
};

export default SearchInput;
