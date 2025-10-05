import style from './Button.module.scss'


const Button = (props: {text?: string, icon?: React.ReactNode, viewBox?: string}) => {
    return (
        <>
            <button className={style.button}>
                {props.icon ?
                    <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox={props.viewBox}>{props.icon}</svg>
                : null}
                
                
                {props.text ? <span className={style.text}>{props.text}</span> : null}
            </button>




        </>
    )
}

export default Button;