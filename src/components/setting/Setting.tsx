"use client";

import style from './Setting.module.scss'
import { icons } from '@/components/icons/icons'
import Statement from '@/components/ui/statement/Statement'
import All from '../ui/all/All';

const Setting = () => {

    return (
        <>
            <aside className={`${style.container}`}>
                <header>
                    <div className={style.bloc}>
                        <h2 className={style.titleh2}>feed sources</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="4 4 16 16"><path fill="none" stroke="#00ff00" stroke-linecap="round" stroke-width="1" d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07" /></svg>
                    </div>
                    <Statement state={true} text="Live sync active" color="white" />
                </header>
                <h3 className={style.titleh3}>ACTIVE FEEDS (<span>20</span>)</h3>
                <All isActive={true} text="All feeds" count={200}/>




                <section>
                    <p>CATEGORIES</p>
                </section>
                <section>
                    <p>POPULAR TAGS</p>
                </section>
                <footer>
                    <p>daily-games</p>
                    <p>feed aggregator v2.1</p>
                </footer>
            </aside>
        </>
    )
}

export default Setting;