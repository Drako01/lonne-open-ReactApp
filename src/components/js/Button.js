const Button = (props) =>{
    return <button onClick={props.callback}>{props.label}{props.icon}</button>
}

export default Button