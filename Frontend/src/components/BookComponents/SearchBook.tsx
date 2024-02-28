import React, { useEffect, useState } from 'react';
import { getBooksToBuy, type Book } from '../../APIs/APIBooks';

const searchBook = () => {
    const [credentialTitle, setCredentialTitle] = useState('');
    const [data, setData] = useState<Book[]>();

    const handleSearchToTitle = (event: any) => {
        setCredentialTitle(event.target.value)
    }

    //hacer un useEffect para que se ejecute la busqueda de libros por titulo o categoria
    const searchWithCredential = () => {
        if (credentialTitle !== '') {
            getBooksToBuy().then((response) => {
                setData(response.filter((book: Book) => book.title.toLowerCase().includes(credentialTitle.toLowerCase())))
                if (response.length === 0) {
                    return <div>
                        <h1>No se encontraron libros con ese título</h1>
                    </div>
                }
            })
        } else {
            getBooksToBuy().then((response) => {
                setData(response)
            })
        }
    }


    useEffect(() => {
        getBooksToBuy().then((data) => {
            setData(data)
        })

    }, [])

    return (
        <div>
            <h1 className='w-full text-center text-3xl font-semibold'>LIBROS DISPONIBLES</h1>
            <div className='flex gap-x-5 py-1 justify-center'>
                <div className='flex-col'>
                    <h1 className='pl-2 pb-2 text-xl '>Búsqueda de un libro en específico</h1>
                    <div className='flex gap-2'>
                        <input
                            className='h-10 w-96 text-md p-2 rounded-md'
                            type="search"
                            placeholder='Ingrese nombre del libro a buscar'
                            onChange={handleSearchToTitle}
                        />
                        <button
                            className="bg-green-500 h-10 w-32 rounded-md hover:bg-green-600"
                            onClick={searchWithCredential}
                        >
                            BUSCAR
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 p-6 text-white text-center">
                {data?.filter(book => book.isActive && book.stock > 0).map((book: Book) => {
                    const displayTitle = book.title.length > 40
                        ? `${book.title.substring(0, 40)}...`
                        : book.title;

                    return (
                        <a key={book.id}
                            className="grid place-items-center bg-slate-950 p-4 rounded-md m-5 text-white hover:bg-slate-700"
                            href={`./${book.id}`}
                        >
                            <div className='flex flex-col place-items-center pb-8'>
                                <img className='w-36 border-2' src={book.image} alt="tilin" />
                            </div>
                            <h1>{displayTitle}</h1>
                            <h2>{book.author}</h2>
                            <p>S/.{book.price}</p>
                        </a>
                    );
                })}
            </div>
        </div>
    )
};

export default searchBook;

