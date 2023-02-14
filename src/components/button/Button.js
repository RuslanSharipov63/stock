import style from './Button.module.css';
const Button = (props) => {

    return (
        <>
            <button
                className={style.btn}
                onClick={props.universalFunc}
            >
                {props.text}
            </button>
        </>
    );
}

export default Button;