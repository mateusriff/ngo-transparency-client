import "./input.css"
import {  InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string;
}

export default function Input({title, ...rest}: InputProps) {
    return(
        <div className="container-input-component">
            <p className="p-input-component">{title}</p>
            <input className="input-component" {...rest}/>
        </div>
    )
}