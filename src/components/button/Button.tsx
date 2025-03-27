import { ReactNode, ButtonHTMLAttributes } from 'react';
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant: string;
    icon?: ReactNode;
}

function Button({text, variant, icon, ...rest}: ButtonProps) {
    return(
        <>
            <button className={variant} {...rest}> 
                {icon}
                {text}
            </button>
        </>
    )
}

export default Button;