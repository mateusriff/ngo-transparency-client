import './modal.css';
import Button from '../button/Button';
import Input from '../Input/Input';
import { IoClose, IoCheckmark } from "react-icons/io5";
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface modalProps {
    IsOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    ngo_logo: string;
    refetch_posts: () => void;
}

export default function Modal({ IsOpen, setOpen, ngo_logo, refetch_posts }: modalProps) {
    const { id } = useParams();

    const [info, setInfo] = useState({
        description: "",
        image: null as string | null,
        type: "recebimento",
        value: 0.0
    });

    // function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     if (event.target.files && event.target.files[0]) {
    //         const file = event.target.files[0];
    //         const imageUrl = URL.createObjectURL(file);
    //         setInfo(prev => ({ ...prev, image: imageUrl }));
    //     }
    // }

    function handleChangeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    }

    function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setInfo(prev => ({ 
            ...prev, 
            type: value,
        }));
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const numericValue = info.value || 0;
        const finalValue = info.type === "pagamento" ? -numericValue : +numericValue;

        const req_body = {
            "transaction": finalValue,
            "title": "",
            "content": info.description,
            "ong": id
        }

        fetch('http://localhost:8000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro de HTTP! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Sucesso:', data);
                refetch_posts();
                setOpen(false);
            })
            .catch(error => {
                console.error('Um erro ocoreu:', error);
                alert('An error occurred while submitting the data. Please try again.');
            });
    }

    if (IsOpen) {
        return (
            <div className='background-fundo-popup' onClick={() => setOpen(false)}>
                <div className='modal-cad' onClick={(e) => e.stopPropagation()}>
                    <div className='h1-p-popup-cad'>
                        <h1>Nova Publicação</h1>
                        <p>Preencha todos os campos necessários e clique em "Publicar" para finalizar publicação.</p>
                    </div>
                    <div className='logo-description-cad'>
                        <img src={ngo_logo} alt="logo da ong" />
                        <Input 
                            className='input-component input-description-popup' 
                            placeholder='Digite Aqui...'
                            type='text'
                            name='description'
                            value={info.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* <label htmlFor='picture-input' className={`label-picture ${info.image ? "has-image" : ""}`}
                        style={info.image ? { backgroundImage: `url(${info.image})` } : {}}
                    >
                        <span className='picture-image'>
                            {!info.image && <span className="picture-image">Foto da publicação</span>}
                        </span>
                    </label>
                    <Input onChange={handleImageChange} type='file' accept='image/*' id='picture-input' /> */}

                    <div className='div-label-radio'>
                        <div className='label-radio'>
                            <input type="radio" name="type" id="pagamento" value="pagamento" checked={info.type === "pagamento"} onChange={handleRadioChange} />
                            <label htmlFor="pagamento">Pagamento</label>
                        </div>
                        <div className='label-radio'>
                            <input type="radio" name="type" id="recebimento" value="recebimento" checked={info.type === "recebimento"} onChange={handleRadioChange} />
                            <label htmlFor="recebimento">Recebimento</label>
                        </div>
                    </div>

                    <div>
                        <p>Valor(R$): </p>
                        <Input type='text' name='value' value={info.value} placeholder='Digite o valor com números...' onChange={handleChangeCurrency} />
                    </div>

                    <div className='buttons-popup-cad'>
                        <Button onClick={() => setOpen(false)} text='Cancelar' icon={<IoClose />} variant='secundary' />
                        <Button onClick={handleSubmit} text='Publicar' icon={<IoCheckmark />} variant='primary' />
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}
