"use client";

import style from './Header.module.scss'
import Button from '@/components/ui/button/Button'
import Badge from '@/components/ui/badge/Badge'
import { icons } from '@/components/icons/icons'

const Header = () => {


    return (
        <header className={style.header}>
            <section className={style.top}>

                <div className={style.bloc__left}>
                    <img className={style.bloc__left_logosm} src="/icons/icon-64.png" alt="" />
                    <img className={style.bloc__left_logolg} src="/img/logo-lg.png" alt="" />
                </div>

                <div className={style.bloc__middle}>
                    <Button icon={icons.arrowsSpinner} text="refresh" viewBox="0 0 256 256" />
                    <Button icon={icons.settingWheel} viewBox="0 0 16 16" />
                </div>

                <div className={style.bloc__right}>
                    <img className={style.bloc__right_avatar} src="/img/amstariga.jpg" alt="user profile cover" />
                </div>
                <ul className={style.list}>
                    <Badge count={100} text="articles" color="badge__green" />
                    <Badge count={30} text="today" separator={true} color="badge__blue" />
                    <Badge count={20} text="feed" separator={true} color="badge__purple" />
                </ul>
            </section>
        </header>
    );
}

export default Header;


