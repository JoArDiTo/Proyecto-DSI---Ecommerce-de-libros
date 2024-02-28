import React, { useEffect, useState } from 'react'
import {
    type ItemCart, getItemsByUser,
    type ShoppingCart, getShoppingCartByUser
} from '../../APIs/APIShop';
import { type Book, getBooksToBuy } from '../../APIs/APIBooks';
import { getDecoded } from '../../APIs/APIUsers';

export const MyPurchaseHistory = () => {
    const [items, setItems] = useState<ItemCart[]>([]);
    const [idUser, setIdUser] = useState('');
    const [carrito, setCarrito] = useState<ShoppingCart>({
        id: '',
        user: ''
    });

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooksToBuy().then((data) => {
            setBooks(data);
        });
    }, []);

    useEffect(() => {
        const decoded = getDecoded()
        setIdUser(decoded.user_id)
    }, []);

    useEffect(() => {
        getShoppingCartByUser(idUser).then((data) => {
            setCarrito(data);
        });
    }, [idUser]);

    useEffect(() => {
        getItemsByUser(carrito.id).then((data) => {
            setItems(data);
        });
    }, [carrito]);

    return (
        <div >
            <div className='w-full bg-slate-600 rounded-lg h-full my-5 py-2'>
                <h1 className='text-white w-full text-center text-3xl'>HISTORIAL DE COMPRAS</h1>
            </div>
            <div>
                <ul>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className='flex w-full bg-slate-500 p-2 rounded-lg text-white justify-between items-center px-5'
                        >
                            {books.map((book) => {
                                if (book.id === item.book) {
                                    return <div key={book.id} className='flex w-[600px] justify-between'>
                                        <div className='pt-4 pr-5 text-xl'>
                                            <p>TÍTULO:</p>
                                            <p>{book.title}</p>
                                        </div>
                                        <img src={book.image} alt={book.title} className='w-16' />
                                    </div>
                                }
                            })}
                            <p className='w-24 text-xl'>Cantidad: {item.quantity}</p>
                            <div className='text-xl'>
                                <p>FECHA:</p>
                                <p>{item.date}</p>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MyPurchaseHistory;