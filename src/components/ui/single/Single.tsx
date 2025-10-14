"use client";

import style from './Single.module.scss'
import { icons } from '@/components/icons/icons'


const Single = (props: { isActive: boolean, text: string, count: number }) => {

    const componentState = props.isActive ? "on" : "off";

    return (
        <>
            <section className={`${style.single} ${style[`single__${componentState}`]}`}>
                <div className={style.single__blocleft}>
                    <svg className={`${style[`single__blocleft__${componentState}`]}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="4.5 4.5 6 6"><path d="M7.5 5.125a2.375 2.375 0 1 1 0 4.75a2.375 2.375 0 0 1 0-4.75" /></svg>
                    <span className={`${style.single__text} ${style[`single__text__${componentState}`]}`}>{props.text}</span>
                </div>
                <div className={`${style.single__blocright} ${style[`single__blocright__${componentState}`]}`}>
                    <span className={`${style.single__number} ${style[`single__number__${componentState}`]}`}>{props.count}</span>
                </div>
            </section>
        </>
    );

}

export default Single;
