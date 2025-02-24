import { ReactNode, ButtonHTMLAttributes } from 'react';
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant: string;
    icon?: ReactNode;
}

function Button({text, variant, icon, ...res}: ButtonProps) {
    return(
        <>
            <button className={variant}> 
                {icon}
                {text}
            </button>
        </>
    )
}

export default Button;