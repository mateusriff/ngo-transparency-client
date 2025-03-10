import Button from '../../components/button/Button'
import { IoLogInOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";


export default function Login() {
    return (
        <>
            <h1>Tela Login</h1> 
            <Button text="Entrar" variant="primary" icon={<IoLogInOutline />
}/>
            <Button text="Sair" variant="secundary" icon={<BiLogOut />
}/>
        </>
    )
}
