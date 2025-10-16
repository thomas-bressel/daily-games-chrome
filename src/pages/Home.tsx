"use client"
// Style imports
import style from './Home.module.scss'

import Header from '@/components/header/Header'
import Setting from '@/components/setting/Setting'
import Main from '@/components/main/Main'

const Home = () => {
  return (
    <>
      <Header />
      <div className={style.main}>
      <Setting />
      <Main />
      </div>
    </>
  );
};

export default Home;
