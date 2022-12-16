import React from 'react';
import styles from '../LoginPage.module.css';
import AppText from '../../../components/AppText/AppText';
import { EMAIL_REGEX } from '../../../utils/utils';
import { Button } from '@mui/material';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldErrors } from 'react-hook-form';

interface LoginFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { onSubmit, register, errors } = props;
  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <input
        className={styles.input}
        {...register('email', {
          required: true,
          pattern: EMAIL_REGEX,
        })}
        name={'email'}
        placeholder={'Your email'}
        type={'email'}
      />
      {errors.email?.type === 'required' && (
        <AppText className={styles.errorText} role="alert">
          Email is required
        </AppText>
      )}
      <input
        className={styles.input}
        {...register('password', { required: true, minLength: 8 })}
        type={'password'}
        name={'password'}
        placeholder={'Your password'}
      />
      {errors.password?.type === 'required' && (
        <AppText className={styles.errorText} role="alert">
          Password is required
        </AppText>
      )}
      <Button
        sx={{
          borderRadius: '10px',
          padding: '10px 0',
          width: '380px',
          alignSelf: 'center',
        }}
        variant="contained"
        type={'submit'}
        style={{
          fontSize: '16px',
          margin: '40px 0',
        }}
      >
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
