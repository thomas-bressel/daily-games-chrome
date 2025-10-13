"use client";

import style from './All.module.scss'
import { icons } from '@/components/icons/icons'


const All = (props: { isActive: boolean, text: string, count: number }) => {

    const componentState = props.isActive ? "on" : "off";

    return (
        <>
            <section className={`${style.all} ${style[`all__${componentState}`]}`}>
                <div className={style.all__blocleft}>
                    <svg className={`${style[`all__blocleft__${componentState}`]}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="4.5 4.5 6 6"><path d="M7.5 5.125a2.375 2.375 0 1 1 0 4.75a2.375 2.375 0 0 1 0-4.75" /></svg>
                    <span className={`${style.all__text} ${style[`all__text__${componentState}`]}`}>{props.text}</span>
                </div>
                <div className={`${style.all__blocright} ${style[`all__blocright__${componentState}`]}`}>
                    <span className={`${style.all__number} ${style[`all__number__${componentState}`]}`}>{props.count}</span>
                </div>
            </section>
        </>
    );

}

export default All;
