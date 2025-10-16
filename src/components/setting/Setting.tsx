"use client";

import style from './Setting.module.scss'
import { icons } from '@/components/icons/icons'
import Statement from '@/components/ui/statement/Statement'
import All from '../ui/all/All'
import Single from '../ui/single/Single'
import { useSettingStore } from '@/stores/settingStore'

const Setting = () => {

    // Subscribe to isSettingOpen - re render component if it changes
    const isSettingOpen = useSettingStore((state) => state.isSettingOpen);

    // If on click then run the closeSetting function
    const closeSetting = useSettingStore((state) => state.closeSetting);

    return (
        <>
            <aside className={`${style.container} ${isSettingOpen ? style.active : ''}`}>

                {/* Header top of the overlay */}
                <header className={style.bloc}>
                    <h2 className={style.titleh2}>feed sources</h2>
                    <button onClick={closeSetting} className={style.closeButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="4 4 16 16">
                            <path fill="none" stroke="#00ff00" strokeLinecap="round" strokeWidth="1" d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07" />
                        </svg>
                    </button>
                </header>
                <Statement state={true} text="Live sync active" color="white" />

                {/* Main part containint */}
                <h3 className={style.titleh3}>ACTIVE FEEDS (<span>20</span>)</h3>
                <All isActive={true} text="All feeds" count={200} />
                <ul className={style.feeds__list}>
                    <li>
                        <Single isActive={false} text="64 nops" count={5} />
                    </li>
                    <li>
                        <Single isActive={false} text="Abandonware France" count={5} />
                    </li>
                    <li>
                        <Single isActive={true} text="Amstrad.eu" count={5} />
                    </li>
                    <li>
                        <Single isActive={false} text="Jeux Video.com" count={5} />
                    </li>
                    <li>
                        <Single isActive={false} text="Itch Io" count={5} />
                    </li>
                </ul>

                {/* Categories Bloc Filter */}
                <section>
                    <h2 className={style.titleh2}>Categories</h2>
                    <All isActive={true} text="All categories" count={200} />
                    <ul className={style.feeds__list}>
                        <li>
                            <Single isActive={false} text="nextgen" count={5} />
                        </li>
                        <li>
                            <Single isActive={false} text="retrogaming" count={5} />
                        </li>
                        <li>
                            <Single isActive={false} text="homebrew" count={5} />
                        </li>
                        <li>
                            <Single isActive={false} text="Amstrad CPC" count={5} />
                        </li>
                    </ul>
                </section>

                {/* Popular Tags Bloc Filter */}
                <section>
                    {/* Selected Tags */}
                    <h3 className={style.titleh3}>Selected tags</h3>
                    <ul className={style.tags}>
                        <li>
                            <span className={style.tags__selected}>#amstrad <button type="button" >
                                <svg viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button></span>
                        </li>
                        <li>
                            <span className={style.tags__selected}>#amstrad <button type="button" >
                                <svg viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button></span>
                        </li>
                    </ul>

                    {/* Tags list */}
                    <h2 className={style.titleh2}>Popular Tags</h2>
                    <ul className={style.tags__list}>
                        <li>
                            <button className={style.tags__item}>#amstrad<span>(25)</span></button>
                        </li>
                        <li>
                            <button className={style.tags__item}>#atari<span>(25)</span></button>
                        </li>
                        <li>
                            <button className={style.tags__item}>#demo<span>(25)</span></button>
                        </li>
                        <li>
                            <button className={style.tags__item}>#coding<span>(25)</span></button>
                        </li>
                        <li>
                            <button className={style.tags__item}>#news<span>(25)</span></button>
                        </li>
                        <li>
                            <button className={style.tags__item}>#sales<span>(25)</span></button>
                        </li>
                        <li>
                            <button className={style.tags__item}>#amiga<span>(25)</span></button>
                        </li>
                        <li>
                            <button className={style.tags__item}>#comodore<span>(25)</span></button>
                        </li>
                    </ul>
                </section>

                {/* Footer Bloc */}
                <footer className={style.footer}>
                    <p className={style.footer__title}>daily-games</p>
                    <p className={style.footer__description}>feed aggregator v2.1</p>
                </footer>
            </aside>
        </>
    )
}

export default Setting;