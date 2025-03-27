import './modal.css';
import Button from '../button/Button';
import Input from '../Input/Input';
import { IoClose, IoCheckmark } from "react-icons/io5";
import { useState } from 'react';

interface modalProps {
    IsOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    ngo_logo: string;
}

export default function Modal({ IsOpen, setOpen, ngo_logo }: modalProps) {
    const [info, setInfo] = useState({
        description: "",
        image: null as string | null,
        type: "recebimento",
        value: ""
    });

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setInfo(prev => ({ ...prev, image: imageUrl }));
        }
    }

    function formatCurrency(value: string, isNegative: boolean) {
        const numericValue = parseFloat(value.replace(/\D/g, "")) / 100;
        const formattedValue = (isNegative ? -numericValue : numericValue).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        return formattedValue;
    }

    function handleChangeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
        const rawValue = event.target.value;
        setInfo(prev => ({ 
            ...prev, 
            value: rawValue ? formatCurrency(rawValue, prev.type === "pagamento") : "" 
        }));
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
            value: prev.value ? formatCurrency(prev.value, value === "pagamento") : ""
        }));
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const numericValue = parseFloat(info.value.replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
        const finalValue = info.type === "pagamento" ? -numericValue : numericValue;
        const updatedInfo = { ...info, value: finalValue };
        console.log(updatedInfo);
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

                    <label htmlFor='picture-input' className={`label-picture ${info.image ? "has-image" : ""}`}
                        style={info.image ? { backgroundImage: `url(${info.image})` } : {}}
                    >
                        <span className='picture-image'>
                            {!info.image && <span className="picture-image">Foto da publicação</span>}
                        </span>
                    </label>
                    <Input onChange={handleImageChange} type='file' accept='image/*' id='picture-input' />

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
