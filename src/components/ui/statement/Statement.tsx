import style from './Statement.module.scss'


const Statement = (props: {state: boolean, text: string, color: string} ) => {
    return (
        <>
            <div className={style.container}>
                {props.state ?
                    <svg className={style.container__icon} xmlns="http://www.w3.org/2000/svg" viewBox="4 4 8 8"><path className={style.container__icon_on} d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" /></svg> :
                    <svg className={style.container__icon} xmlns="http://www.w3.org/2000/svg" viewBox="4 4 8 8"><path className={style.container__icon_off} d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" /></svg>}
            {props.text ?
            <span className={`${style.text} ${style[`text__${props.color}`]}`}>{props.text}</span> : null
            }
            </div>
        </>
    )
}

export default Statement;