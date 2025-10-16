"use client"

import style from './Card.module.scss'
import { icons } from '@/components/icons/icons'
import SvgButton from '@/components/ui/svg-button/SvgButton'


const Card = () => {
    return (
        <li className={style.card}>
            <header>
                <p className={style.category}>HOMEBREW</p>
                <div>
                    <img className={style.cover} src="cards/image.png" alt=" Elder Scrolls Online devs make their bets on the world-first clear of the MMO's Writhing Wall event, watching entire servers fight a rift in the world map itself " loading="lazy"/>
                </div>
            </header>

            <main>

                <div className={style.header}>
                    <svg className={style.header__icon} viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h4 className={style.header__website}>Game Radar</h4>
                    <time className={style.header__time}>18 minutes ago</time>
                </div>



                <div className={style.article}>
                    <h3 className={style.article__title}> Stranger Things creators studied legendary TV finales like Six Feet Under, Friday Night Lights and The Sopranos for the shows final episode</h3>
                    <p className={style.article__description}>The Duffer brothers dug into some of the most acclaimed series finales of all time in preparation for the end of the show</p>
                </div>


                <ul className={style.tags}>
                    <li className={style.tags__item}>
                        <p>#HOMEBREW</p>
                    </li>
                    <li className={style.tags__item}>
                        <p>#HARDWARE</p>
                    </li>
                    <li className={style.tags__item}>
                        <p>#COMMUNITY</p>
                    </li>
                </ul>


            </main>

            <footer className={style.footer}>

                <div className={style.views}>
                    <svg className={style.views__eye} fill="none" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    <span className={style.views__count}>89</span>
                </div>


                <SvgButton icon={icons.bookmark} viewBox="0 0 24 24" svgFill="none" svgStroke="currentColor"/>

                <SvgButton icon={icons.share} viewBox="0 0 24 24" svgFill="none" svgStroke="currentColor"/>


            </footer>





        </li>
    )
}


export default Card;