"use client";

import style from './Header.module.scss'
import Button from '@/components/ui/button/Button'

const Header = () => {


    return (
        <div className={style.header}>

            <div className={style.header__bloc_left}>
            <img className={style.header__logo} src="/icons/icon-64.png" alt="" />
            </div>
            <div>
            <Button></Button>
            </div>
        </div>
    );
}

export default Header;