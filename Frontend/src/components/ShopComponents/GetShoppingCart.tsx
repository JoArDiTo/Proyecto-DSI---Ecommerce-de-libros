import React, { useEffect, useState } from 'react';
import { type Book, updateBook } from '../../APIs/APIBooks';
import { type ShoppingCart, getShoppingCartByUser, type CreditCard, getCreditCardsByUser, type ItemCart, addItemCart } from '../../APIs/APIShop';
import { getDecoded } from '../../APIs/APIUsers';

interface CartBook extends Book {
  quantity: number;
}

const GetShoppingCartByUser: React.FC = () => {
  const [cart, setCart] = useState<CartBook[]>([]);
  //------recuperar la tarjeta--------------
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [idUser, setIdUser] = useState('');
  //------Calcular el total--------------
  const [total, setTotal] = useState(0);
  //------recuperar el carrito--------------
  const [carrito, setCarrito] = useState<ShoppingCart>({
    id: '',
    user: ''
  });

  useEffect(() => {
    const decoded = getDecoded()
    setIdUser(decoded.user_id)
  }, []);

  useEffect(() => {
    getCreditCardsByUser(idUser).then((data) => {
      setCreditCards(data);
    });
  }, [idUser]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const cleanCart = () => {
    localStorage.removeItem('cart');
    window.location.reload();
  }

  const deleteBook = (bookId: string) => {
    const updatedCart = cart.filter(book => book.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  useEffect(() => {
    getShoppingCartByUser(idUser).then((data) => {
      setCarrito(data);
    });
  }, [idUser]);


  //generar id del item
  const generateId = () => {
    const characters = '0123456789';
    let result = 'i';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


  const buyBooks = () => {
    // Mapear los libros del carrito y generar las ids
    cart.map((book) => {
      const item: ItemCart = {
        id: generateId(),
        quantity: book.quantity,
        shoppingCart: carrito.id,
        book: book.id,
        date: new Date().toISOString()
      }
      // Aquí usamos 'i' en lugar de 'item'
      addItemCart(item).then((data) => {
        if (data) {
          // Actualizar el stock de los libros
          book.stock -= book.quantity;
          //crear instancia de Book
          const m: Book = {
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            price: book.price,
            stock: book.stock,
            image: book.image,
            isActive: book.isActive
          }

          updateBook(m).then((data) => {
          });
          window.location.reload();
          localStorage.removeItem('cart');
        }
      });
    });
  }




  //------

  useEffect(() => {
    const total = cart.reduce((acc: number, book: CartBook) => {
      if (book.price && book.quantity) {
        return acc + Number(book.price) * Number(book.quantity);
      } else {
        return acc;
      }
    }, 0);
    setTotal(total);
  }, [cart]);

  const updateQuantity = (bookId: string, quantity: number) => {
    const updatedCart = cart.map(book =>
      book.id === bookId ? { ...book, quantity } : book
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }


  //------

  return (
    <div className='grid place-items-center'>
      {cart.length > 0 ? (
        <>
          <div className='flex'>
            <div>
              {cart.map((book, index) => (
                <div key={index} className="flex m-1 p-2 bg-slate-600 px-10 py-5 rounded-xl text-white space-x-20">
                  <h2 className='w-32 text-center'>{book.title}</h2>
                  <h2 className='w-64 text-center'>{book.author}</h2>
                  <input
                    className='w-16 h-8 text-center rounded-xl text-black'
                    type="number"
                    min="1"
                    max={book.stock}
                    value={book.quantity}
                    onChange={(e) => updateQuantity(book.id, Number(e.target.value))}
                  />
                  <button
                    className='w-32'
                    onClick={() => deleteBook(book.id)}
                  >
                    ELIMINAR LIBRO DEL CARRITO
                  </button>
                </div>
              ))}
            </div>
            <div className='bg-sky-500 w-96 p-2 rounded-xl m-1 h-[300px]'>
              {creditCards.length === 0 ? (
                <div>NO HAY TARJETA PARA PAGAR</div>
              ) :
                (
                  <div className='flex flex-col items-center text-center'>
                    {creditCards.map((card, index) => (
                      <div key={index}>
                        <div >
                          <p
                            className='py-2 mx-5 text-xl font-bold'>
                            CREDIT CARD
                          </p>
                          <p
                            className='my-2 mx-5 text-xl font-bold'>
                            {card.number}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className='font-bold'>
                      TOTAL: S/{total.toFixed(2)}
                    </div>
                    <div>
                      <button
                        className='bg-green-500 h-10 w-44 rounded-md hover:bg-green-600 p-2 m-5'
                        onClick={buyBooks}
                      >
                        PAGAR
                      </button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          <div>
            <button
              className='bg-red-500 h-10 w-44 rounded-md hover:bg-red-600 p-2 m-5'
              onClick={cleanCart}
            >
              LIMPIAR CARRITO
            </button>
          </div>
        </>
      ) : (
        <div className='text-xl font-bold'>
          SU CARRITO ESTÁ VACÍO
        </div>
      )}
    </div>
  );
};

export default GetShoppingCartByUser;