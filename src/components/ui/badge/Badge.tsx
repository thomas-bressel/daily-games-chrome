import style from './Badge.module.scss'


const Badge = (props: {count: number, text: string, separator?: boolean}) => {
    return (
        <>
        <li className={style.header__list}>
            {props.separator ? <span>•</span> : null }
            {props.count} {props.text}
        </li>
        </>
    )
}

export default Badge;