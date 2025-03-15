import "./input.css"
import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
}

export default function Input({title, ...res}: InputProps) {
    return(
        <>
            <p className="p-input-component">{title}</p>
            <input className="input-component"/>
        </>
    )
}