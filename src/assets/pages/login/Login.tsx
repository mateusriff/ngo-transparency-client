import "./login.css"
import Button from '../../../components/button/Button'
import { IoLogInOutline } from "react-icons/io5";
import Input from '../../../components/Input/Input';
import logo from '../../img/logo-ngo.png'
import { useState } from "react";
import login from "./login-utils";
import { useNavigate } from "react-router-dom";


export default function Login() {
    
    const [info, setInfo] = useState({
        email: "",
        senha: ""
    })

    const [error] = useState('');

    const navigate = useNavigate();

    // const [filled, setfilled] = useState(false);

    // const isfilled = Object.values(info).every((val) => val.trim() !== '');
    // setfilled(isfilled)

    const atualizarInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("eee");
        
        const {name, value} = e.target;
        setInfo((previnfo)=>({
            ...previnfo,
            [name]: value
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const loginResponse = await login();

            if (!loginResponse.ok) {
                throw new Error(`Erro na requisição: ${loginResponse.status}`);
            }

            const getNgoResponse = await fetch(
                `http://localhost:8000/profiles/${(await loginResponse.json()).ngo.id}`
            );
            
            // NOTE: change condition to ngoResponse.status == 404 when api is fixed
            if (!getNgoResponse.ok) {
                const ngoToCreate = (await loginResponse.json()).ngo;

                const postNgoResponse = await fetch(
                    'http://localhost:8000/profiles/', 
                    {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...ngoToCreate,
                        ngo: ngoToCreate.id,
                        username: ngoToCreate.name,
                        email: 'randomngo@email.com'
                    }),
                })

                if (!postNgoResponse.ok) {
                    throw new Error(`Erro na requisição: ${postNgoResponse.status}`);
                }

                navigate(`/transparencia/${ngoToCreate.id}`);
                localStorage.setItem("current_session_ngo_id", ngoToCreate.id.toString())
            }

            const ngo_id = (await loginResponse.json()).ngo.id;
            localStorage.setItem("current_session_ngo_id", ngo_id.toString())
            navigate(`/transparencia/${ngo_id}`);

        } catch (err) {
            console.log(err);
            // setError((err as Error).message);
        } finally {
            // setLoading(false);
        }
    }
    
    return (
        <main className="main-login">
            <form className='section-login' onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
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
                <Button 
                    text="Entrar" 
                    variant="primary" 
                    icon={<IoLogInOutline />} 
                    type="submit"
                />
                {error && <p className="error-text-login">{error}</p>}
            </form>
        </main>
    )
}
