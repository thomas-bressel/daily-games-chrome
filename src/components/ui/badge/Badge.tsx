import style from './Badge.module.scss'


const Badge = (props: { count: number, text: string, separator?: boolean, color: string }) => {
    return (
        <>
            <li className={style.container}>
                {props.separator ? <span className={style.separator}>•</span> : null}
                <div className={`${style.badge} ${style[props.color]}`}>
                <span className={style.count}>{props.count}</span>
                <pre> </pre>
                <span className={style.text}>{props.text}</span>
                </div>
            </li>
        </>
    )
}

export default Badge;