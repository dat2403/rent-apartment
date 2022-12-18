import React, { useState } from 'react';
import useAuth from '../../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import AppText from '../../components/AppText/AppText';
import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { logInAPI, signUpAPI } from '../../api/service';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const loginHandler = async (data: any) => {
    try {
      const res = await logInAPI(data?.email, data?.password);
      console.log({ res });
      const resData = res.data;
      if (res.status === 201) {
        signIn({
          user: {
            ...resData?.user_info,
            // id: resData?.user_info?.email,
            token: resData?.access_token,
          },
        });
        toast.success('Login successfully', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/');
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e?.response?.data?.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const registerHandler = async (data: any) => {
    let role: string | undefined = undefined;
    if (data?.seller) {
      role = 'SELLER';
    }
    try {
      const res = await signUpAPI({
        name: data?.name,
        email: data?.email,
        password: data?.password,
        address: data?.address,
        phone: data?.phone,
        role: role,
      });
      const resData = res.data;
      if (res.status === 201) {
        signIn({
          user: {
            ...resData?.user_info,
            // id: resData?.user_info?.email,
            token: resData?.access_token,
          },
        });
        toast.success('Sign up successfully', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/');
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e?.response?.data?.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalContainer}>
          <AppText className={styles.loginLogo} font={'bold'}>
            {!showRegisterForm ? 'Log in' : 'Sign up'}
          </AppText>

          {!showRegisterForm ? (
            <LoginForm
              onSubmit={handleSubmit(loginHandler)}
              register={register}
              errors={errors}
            />
          ) : (
            <RegisterForm
              onSubmit={handleSubmit(registerHandler)}
              register={register}
              errors={errors}
            />
          )}
          <div onClick={() => setShowRegisterForm(!showRegisterForm)}>
            <AppText className={styles.needRegister}>
              {!showRegisterForm
                ? "Don't have an account yet? Sign up now"
                : 'Already have an account? Sign in'}
            </AppText>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
