"use client";

import style from './Header.module.scss'
import Button from '@/components/ui/button/Button'
import {icons} from '@/components/icons/icons'

const Header = () => {


    return (
        <div className={style.header}>

            <div className={style.header__bloc_left}>
                <img className={style.header__logo} src="/icons/icon-64.png" alt="" />
            </div>
            <div className={style.header__bloc_middle}>
                <Button icon={icons.arrowsSpinner} text="refresh" viewBox="0 0 256 256"/>
                <Button icon={icons.settingWheel} viewBox="0 0 16 16"/>
            </div>
        </div>
    );
}

export default Header;


