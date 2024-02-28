import React, { useState } from 'react';
import { type Book } from '../../APIs/APIBooks';

interface AddBookToCartProps {
    book: Book;
}

const AddBookToCart: React.FC<AddBookToCartProps> = ({ book }) => {
    const [message, setMessage] = useState<string>('');

    const addToCart = () => {
        try {
          const existingCart = localStorage.getItem('cart');
      
          const cart = existingCart ? JSON.parse(existingCart) : [];
      
          const isBookInCart = cart.some((cartBook: Book) => cartBook.id === book.id);
      
          if (!isBookInCart) {
            cart.push({ ...book, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            setMessage('LIBRO AGREGADO AL CARRITO');
          } else {
            setMessage('EL LIBRO SE ENCUENTRA EN EL CARRITO');
          }
        } catch (error) {
          console.error('Error al agregar el libro al carrito:', error);
        }
      }
  
    return (
      <div className="grid place-items-center gap-y-2">
        <div className='h-10'>
            {message && <p className='text-center text-red-700 font-bold'>{message}</p>} 
        </div>
        <button 
          className="bg-green-500 h-10 w-44 rounded-md hover:bg-green-600 p-2"
          onClick={addToCart}>
          AGREGAR AL CARRITO
        </button>
        <a 
            className="bg-green-500 h-10 w-44 rounded-md hover:bg-green-600 p-2 text-center"
            href="../ClientTemplates/lookCategories"
            >
                REGRESAR
        </a>
      </div>
    );
};

export default AddBookToCart;