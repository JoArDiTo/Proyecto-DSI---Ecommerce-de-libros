import React, { useState, useEffect } from 'react';
import { type CreditCard, getCreditCardsByUser, addCreditCard, deleteCreditCard } from '../../APIs/APIShop';
import { getDecoded } from '../../APIs/APIUsers';

export const MyCreditCard = () => {

    const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
    const [idUser, setIdUser] = useState('');
    //para el formulario:
    const [showForm, setShowForm] = useState(false);
    //nueva tarjeta
    const [newCard, setNewCard] = useState<CreditCard>({
        number: '',
        expirationDate: '',
        cvv: '',
        holderName: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCard({
            ...newCard,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        const decoded = getDecoded()
        setIdUser(decoded.user_id)
    }, []);

    useEffect(() => {
        getCreditCardsByUser(idUser).then((data) => {
            setCreditCards(data);
        });
    }, [idUser]);

    const formatCardNumber = (cardNumber: string) => {
        const groups = cardNumber.match(/.{1,4}/g);
        return groups ? groups.join(' ') : cardNumber;
    };

    const addCard = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const cartToAdd = {
            number: newCard.number,
            expirationDate: newCard.expirationDate,
            cvv: newCard.cvv,
            holderName: idUser
        }

        const response = await addCreditCard(cartToAdd);
        if(response){
            console.log('Tarjeta añadida');
            window.location.reload();
        }
        
    }

    const deleteCard = async () => {
        creditCards.map((card, index) => {
            deleteCreditCard(card.number);
        }, []);

        window.location.reload();
    }

    return (
        <div>
            {creditCards.length === 0 ?
                (
                    <div className='flex flex-col w-full items-center p-10'>
                        {showForm ? (
                            <div>
                                <form className='grid place-items-center' onSubmit={addCard}>
                                    <p className='text-3xl font-semibold p-8'>INGRESE LOS DATOS DE LA TARJETA</p>
                                    <input
                                        name="number"
                                        type="text"
                                        placeholder="Número de tarjeta"
                                        className='h-10 w-96 m-2 rounded-md border-2 border-black px-2'
                                        maxLength={16}
                                        minLength={16}
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        name="expirationDate"
                                        type="Date"
                                        placeholder="Fecha de expiración"
                                        className='h-10 w-96 m-2 rounded-md border-2 border-black px-2'
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        name="cvv"
                                        type="text"
                                        placeholder="Código de seguridad"
                                        className='h-10 w-96 m-2 rounded-md border-2 border-black px-2'
                                        maxLength={3}
                                        minLength={3}
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        className='bg-blue-500 h-10 w-44 rounded-md hover:bg-blue-600 p-2 m-5'
                                        type="submit"
                                    >
                                        AÑADIR TARJETA
                                    </button>
                                </form>

                            </div>
                        ) : (
                            <div className='flex flex-col w-full items-center p-10'>
                                <p className='text-3xl font-semibold'>NO HAY TARJETA REGISTRADA EN ESTE USUARIO</p>
                                <button
                                    className='bg-green-500 h-10 w-44 rounded-md hover:bg-green-600 p-2 m-5'
                                    onClick={() => setShowForm(true)}
                                >
                                    AGREGAR TARJETA
                                </button>
                            </div>
                        )}
                    </div>
                ) :
                (
                    <div className='flex flex-col w-full items-center p-10'>
                        {creditCards.map((card, index) => (
                            <div key={index}>
                                <div className=" relative w-[500px] h-[300px] bg-blue-700 rounded-xl py-3">
                                    <p className='text-5xl text-white font-semibold tracking-wider mx-6 pb-2'>CREDIT CARD</p>
                                    <p className='bg-yellow-500 w-20 h-16 rounded-md mx-6 my-2'></p>
                                    <p className='absolute border-y-2 w-20 h-12 border-black translate-x-6 -translate-y-[60px]'></p>
                                    <p className=' absolute border-l-2 border-black h-[64px] w-0 translate-x-11 -translate-y-[72px]'></p>
                                    <p className='text-yellow-200 tracking-[8px] text-center py-2 mx-5 text-[28px] font-bold'>
                                        {formatCardNumber(card.number)}
                                    </p>
                                    <div className='flex justify-between mx-10 place-items-center'>
                                        <p className='text-2xl text-yellow-200 font-bold'>{card.expirationDate}</p>
                                        <img src="https://www.mastercard.com.co/content/dam/mccom/global/logos/logo-mastercard-mobile.svg" alt="Mastercard" width="200px" />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            className='bg-red-500 h-10 w-44 rounded-md hover:bg-red-600 p-2 m-5'
                            onClick={ deleteCard }
                        >
                            ELIMINAR TARJETA
                        </button>
                    </div>
                )
            }

        </div>
    );
}

export default MyCreditCard;