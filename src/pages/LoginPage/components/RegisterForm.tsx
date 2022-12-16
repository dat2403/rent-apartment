import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldErrors } from 'react-hook-form';
import styles from '../LoginPage.module.css';
import AppText from '../../../components/AppText/AppText';
import { EMAIL_REGEX } from '../../../utils/utils';
import { Button } from '@mui/material';

interface RegisterFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { onSubmit, register, errors } = props;

  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <input
        className={styles.input}
        {...register('name', {
          required: true,
        })}
        name={'name'}
        placeholder={'Your name'}
        type={'text'}
      />
      {errors.name?.type === 'required' && (
        <AppText className={styles.errorText} role="alert">
          Name is required
        </AppText>
      )}
      <input
        className={styles.input}
        {...register('address', {
          required: true,
        })}
        name={'address'}
        placeholder={'Your address'}
        type={'text'}
      />
      {errors.address?.type === 'required' && (
        <AppText className={styles.errorText} role="alert">
          Address is required
        </AppText>
      )}
      <input
        className={styles.input}
        {...register('phone', {
          required: true,
        })}
        name={'phone'}
        placeholder={'Your phone'}
        type={'phone'}
      />
      {errors.phone?.type === 'required' && (
        <AppText className={styles.errorText} role="alert">
          Phone is required
        </AppText>
      )}
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
      <div className={styles.checkBoxContainer}>
        <input {...register('seller')} name={'seller'} type={'checkbox'} />
        <AppText>Are you an landlord?</AppText>
      </div>
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
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;
