import style from './SvgButton.module.scss'


const SvgButton = (props: {icon?: React.ReactNode, viewBox?: string, svgFill?: string, svgStroke?: string}) => {
    return (
        <>
            <button className={style.button}>
                {props.icon ?
                    <svg className={style.icon} fill={props.svgFill} stroke={props.svgStroke} xmlns="http://www.w3.org/2000/svg" viewBox={props.viewBox}>{props.icon}</svg>
                : null}
            </button>
        </>
    )
}

export default SvgButton;