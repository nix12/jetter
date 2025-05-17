import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/index';

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout()).then(() => router.push('/'));
  }, []);

  return null;
};

export const getStaticProps = async () => {
  return { props: {} };
};

export default Logout;
