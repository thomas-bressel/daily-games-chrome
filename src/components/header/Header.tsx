"use client";

import style from './Header.module.scss'
import Button from '@/components/ui/button/Button'
import Badge from '@/components/ui/badge/Badge'
import { icons } from '@/components/icons/icons'

const Header = () => {


    return (
        <header className={style.header}>
            <section className={style.header__top}>

                <div className={style.header__bloc_left}>
                    <img className={style.header__bloc_left_logo} src="/icons/icon-64.png" alt="" />
                </div>
                <div className={style.header__bloc_middle}>
                    <Button icon={icons.arrowsSpinner} text="refresh" viewBox="0 0 256 256" />
                    <Button icon={icons.settingWheel} viewBox="0 0 16 16" />
                </div>

                <div className={style.header__bloc_right}>
                    <img className={style.header__bloc_right_avatar} src="/img/amstariga.jpg" alt="user profile cover" />
                </div>
            </section>

            <section  className={style.header__bot}>
                <ul className={style.header__list}>
                    <Badge count={100} text="articles"/>
                    <Badge count={30} text="today" separator={true}/>
                    <Badge count={20} text="feed" separator={true}/>
                </ul>
            </section>
        </header>
    );
}

export default Header;


