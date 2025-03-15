import "./login.css"
import Button from '../../../components/button/Button'
import { IoLogInOutline } from "react-icons/io5";
import Input from '../../../components/Input/Input';
import logo from '../../img/logo-ngo.png'
import { useState } from "react";


export default function Login() {
    
    const [info, setInfo] = useState({
        email: "",
        senha: ""
    })

    const [error, setError] = useState('');

    // const [filled, setfilled] = useState(false);

    // const isfilled = Object.values(info).every((val) => val.trim() !== '');
    // setfilled(isfilled)

    const atualizarInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInfo((previnfo)=>({
            ...previnfo,
            [name]: value
        }))
    }
    
    return (
        <>
            <main className="main-login">
                <section className='section-login'>
                    <h1>Acesse a área da sua ONG</h1>

                    <img src={logo} alt="Logo bora impactar" className="img-login"/>
                
                    <div>
                        <Input 
                        title='E-mail' 
                        type='email' 
                        placeholder='Digite seu E-mail'
                        name="email"
                        onChange={atualizarInfo}
                        />

                        <Input 
                        title='Senha' 
                        type='password'
                        placeholder='Digite sua senha'
                        name="senha"
                        onChange={atualizarInfo}
                        />
                    </div>
                    <Button text="Entrar" variant="primary" icon={<IoLogInOutline />} type="submit"/>
                    {error && <p className="error-text-login">{error}</p>}
                </section>
            </main>
            
        </>
    )
}
