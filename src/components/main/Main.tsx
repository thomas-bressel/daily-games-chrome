"use client";

import style from './Main.module.scss'
import Card from '@/components/card/Card'


const Main = () => {
    return (
        <main className={style.main}>
            <ul  className={style.main__cards}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </ul>
        </main>
    )

}


export default Main;