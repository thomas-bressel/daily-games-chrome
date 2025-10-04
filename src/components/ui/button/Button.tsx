import style from './Button.module.scss'


const Button = () => {
    return (
        <>
            <button className={style.button}>
                <img className={style.button__icon} src="svg/green/arrow-spinner.svg" alt="" />
                <span className={style.button__text}>refresh</span>

            </button>




        </>
    )
}

export default Button;