import react, { useEffect, useState } from 'react';
import {
    type Book, type BookLoaded, type Category, type CategoryBook,
    getBooksToBuy, getCategories, deleteCategoryBookBy,
    getCategoriesBook, addNewCategoryBook, addNewCategory, addNewBook, getBookToEdit, updateBook,
    getCategoryBy, deleteCategoryBy
} from '../../APIs/APIBooks';

const crudBooksToPage = () => {
    //para ver si se seleccionó la opción de actualizar
    const [update, setUpdate] = useState<boolean>(false);
    //Para ver si el libro se encuentra habilitado o no
    const [disable, setDisable] = useState<boolean>(false);
    //Para tomar los valores que se escogen para crear un CategoryBook
    const [selectedBook, setSelectedBook] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const [books, setBooks] = useState<BookLoaded[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesBook, setCategoriesBook] = useState<CategoryBook[]>([]);
    const [book, setBook] = useState<Book>({
        id: '',
        title: '',
        author: '',
        description: '',
        price: 0,
        stock: 0,
        image: '../src/img/bookImageDefault.png',
        isActive: true
    });
    const [category, setCategory] = useState<Category>({
        id: '',
        name: ''
    });

    //Verificaciones
    const [verify, setVerify] = useState<boolean>(false);

    const handleDisable = () => {
        setDisable(!disable);
    }

    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

    const [idCategoryToDelete, setIdCategoryToDelete] = useState<string>('');

    //-------PARA EXTRAER LOS DATOS-------

    useEffect(() => {
        getBooksToBuy().then((response) => {
            setBooks(response);
        });
    }, [update]);

    useEffect(() => {
        getCategories().then((response) => {
            setCategories(response);
        });
    }, []);

    useEffect(() => {
        getCategoriesBook().then((response) => {
            setCategoriesBook(response);
        });
    }, []);

    //------GENERAR ID DE BOOK-----------
    function generateIdBook() {
        return 'lib' + Math.floor(Math.random() * 1000);
    }
    //--------------------------------------------

    //------AÑADIR CATEGORY BOOK------------------
    const addBook = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Añadiendo libro");
        const newBook: Book = {
            id: generateIdBook(),
            title: book.title,
            author: book.author,
            description: book.description,
            price: book.price,
            stock: book.stock,
            image: book.image,
            isActive: true,
        };

        console.log(newBook);
        addNewBook(newBook).then((response) => {
            if (response) {
                getBooksToBuy().then((response) => {
                    setBooks(response);
                    setBook({
                        id: '',
                        title: '',
                        author: '',
                        description: '',
                        price: 0,
                        stock: 0,
                        image: '../src/img/bookImageDefault.png',
                        isActive: true
                    });
                });
            }
        });
    }

    //--------------------------------------------

    //---------TOMAR BOOK PARA ACTULIZAR----------
    const handleUpdateBook = (id: string) => {

        getBookToEdit(id).then((response) => {
            if (response) {
                console.log(response);
                setBook(response);
                setUpdate(true);
            }
        });
    };

    const handleCancelUpdate = () => {
        if (update) {
            setUpdate(!update);
            setBook({
                id: '',
                title: '',
                author: '',
                description: '',
                price: 0,
                stock: 0,
                image: '../src/img/bookImageDefault.png',
                isActive: true

            });
        }
    }

    //--------------------------------------------

    //-----------ACTUALIZAR BOOK------------------
    const handleUpdateAction = () => {
        setUpdate(!update);
        const bookToUpdate: Book = {
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            price: book.price,
            stock: book.stock,
            image: book.image,
            isActive: true,
        };
        updateBook(bookToUpdate).then((response) => {
            if (response) {
                getBooksToBuy().then((response) => {
                    setBooks(response);
                    setBook({
                        id: '',
                        title: '',
                        author: '',
                        description: '',
                        price: 0,
                        stock: 0,
                        image: '../src/img/bookImageDefault.png',
                        isActive: true

                    });

                });
            }
        });
        console.log(bookToUpdate)
    }

    //--------------------------------------------

    //----------CAMBIAR ESTADO DEL BOOK-----------
    const handleStateBook = (id: string) => {
        console.log(id);
        getBookToEdit(id).then((response) => {
            if (response) {
                console.log(response);
                response.isActive = !response.isActive;
                updateBook(response).then((response) => {
                    if (response) {
                        getBooksToBuy().then((response) => {
                            setBooks(response);
                        });
                    }
                });
            }
        }
        );
    };
    //--------------------------------------------

    //--------------------------------------------

    //------GENERAR ID DE CATEGORY BOOK-----------
    function generateIdCategoryBook() {
        return 'cb' + Math.floor(Math.random() * 10000);
    }
    //--------------------------------------------

    //------AÑADIR CATEGORY BOOK------------------ 
    const addCategoryBook = (bookId: string, categoryId: string) => {
        const empty = verifyNewCategoryBook(bookId, categoryId);
        console.log(empty);
        if (!empty) {
            const newCategoryBook: CategoryBook = {
                id: generateIdCategoryBook(),
                book: bookId,
                category: categoryId
            };
            console.log(newCategoryBook);
            addNewCategoryBook(newCategoryBook).then((response) => {
                if (response) {
                    getCategoriesBook().then((response) => {
                        setCategoriesBook(response);
                        getBooksToBuy().then((response) => {
                            setBooks(response);
                            setVerify(false);
                        });
                    });
                }
            });
        } else {
            setVerify(true);
        }
    };

    //----------VERIFICAR CASOS ERRADOS-----------
    function verifyNewCategoryBook(bookId: string, categoryId: string) {
        return categoriesBook.some((cb) => cb.book === bookId && cb.category === categoryId);
    }

    //--------------------------------------------

    //------ELIMINAR CATEGORY BOOK----------------  

    const deleteCategoryBook = (categoryId: string, bookId: string) => {
        categoriesBook.map((cb) => {
            if (cb.category === categoryId && cb.book === bookId) {
                deleteCategoryBookBy(cb.id).then((response) => {
                    if (response) {
                        getCategoriesBook().then((response) => {
                            setCategoriesBook(response);
                            getBooksToBuy().then((response) => {
                                setBooks(response);
                            });
                        });
                    }
                });
            }
        }, []);
    };

    //-------------------------------------------- 

    //---------GENERAR ID DE CATEGORY-------------
    function generateIdCategory() {
        return 'cat' + Math.floor(Math.random() * 1000);
    }
    //--------------------------------------------
    //---------AÑADIR CATEGORÍA-------------------
    const addCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCategory: Category = {
            id: generateIdCategory(),
            name: category.name
        };
        console.log(newCategory);

        addNewCategory(newCategory).then((response) => {
            if (response) {
                getCategories().then((response) => {
                    setCategories(response);
                    setCategory({
                        id: '',
                        name: ''
                    });
                });
            }
        });
    };
    //--------------------------------------------

    //------ELIMINAR CATEGORY---------------------
    const confirmDeleteCategory = (id: string) => {
        setDeleteConfirmation(true);
        setIdCategoryToDelete(id);

    }

    useEffect(() => {
        console.log(idCategoryToDelete);
    }, [idCategoryToDelete]);

    const CancelDeleteCategory = () => {
        setDeleteConfirmation(false);
        setIdCategoryToDelete('');
    }

    const deleteCategory = (id: string) => {
        setDeleteConfirmation(false);
        getCategoryBy(id).then((response) => {
            if (response) {
                console.log(response);
                deleteCategoryBy(response).then((response) => {
                    if (response) {
                        getCategories().then((response) => {
                            setCategories(response);
                            getBooksToBuy().then((response) => {
                                setBooks(response);
                            });
                        });
                    }
                });
            }
        });
    };
    //--------------------------------------------

    return (
        <div className='flex flex-col justify-center'>
            {deleteConfirmation ? (
                <div
                    className='absolute w-full h-full -translate-x-[32px] -translate-y-[242px] '
                >
                    <div className='grid place-items-center'>
                        <div className='flex flex-col bg-slate-400 mt-52 p-5'>
                            <h1>¿QUIERES ELIMINAR ESA CATEGORÍA?</h1>
                            <h2>Los libros que tienen la categoría dejarán de tenerlo</h2>
                            <div className='flex justify-center gap-x-5'>
                                <button
                                    className="bg-red-500 my-2 font-bold text-black text-center h-10 w-[120px] rounded-md hover:bg-red-600"
                                    onClick={CancelDeleteCategory}
                                >
                                    NO
                                </button>
                                <button
                                    className="bg-green-500 my-2 font-bold text-black text-center h-10 w-[120px] rounded-md hover:bg-green-600"
                                    onClick={() => deleteCategory(idCategoryToDelete)}
                                >
                                    SI
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                null
            )}
            <div className="grid md:grid-cols-1 xl:grid-cols-2">
                <div className="m-5 bg-slate-800">
                    <div className="flex flex-col">
                        {!update ? (
                            <h1
                                className="w-full bg-slate-900 text-white py-2 text-3xl font-semibold text-center border-b-2"
                            >
                                NUEVO LIBRO
                            </h1>
                        ) : (
                            <h1
                                className="w-full bg-slate-900 text-white py-2 text-3xl font-semibold text-center border-b-2"
                            >
                                ACTUALIZAR LIBRO
                            </h1>
                        )}
                        <div className="grid place-items-center">
                            <form className="py-2" onSubmit={addBook}>
                                <div className="grid xl:grid-cols-2 gap-x-5">
                                    <div className="grid">
                                        <label className="text-white">TÍTULO</label>
                                        <input
                                            type="text"
                                            className="h-10 w-[300px] rounded-md"
                                            value={book.title}
                                            onChange={(e) => setBook({ ...book, title: e.target.value })}
                                            required
                                        />
                                        <label className="text-white">AUTOR</label>
                                        <input
                                            type="text"
                                            className="h-10 w-[300px] rounded-md"
                                            value={book.author}
                                            onChange={(e) => setBook({ ...book, author: e.target.value })}
                                            required
                                        />
                                        <label className="text-white">DESCRIPCIÓN</label>
                                        <textarea
                                            className="w-[300px] rounded-md"
                                            value={book.description}
                                            onChange={(e) => setBook({ ...book, description: e.target.value })}
                                            required
                                        >
                                        </textarea>
                                        <div className="flex justify-between">
                                            <div className="grid">
                                                <label className="text-white">PRICE</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={book.price}
                                                    className="h-10 w-[120px] rounded-md text-center"
                                                    onChange={(e) => setBook({ ...book, price: parseFloat(e.target.value) })}
                                                    required
                                                />
                                            </div>
                                            <div className="grid">
                                                <label className="text-white">STOCK</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={book.stock}
                                                    className="h-10 w-[120px] rounded-md text-center"
                                                    onChange={(e) => setBook({ ...book, stock: parseInt(e.target.value) })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <label className="text-white">URL DE IMAGEN</label>
                                        <input
                                            type="text"
                                            className="h-10 w-[300px] rounded-md"
                                            value={book.image}
                                            onChange={(e) => setBook({ ...book, image: e.target.value })}
                                            required
                                        />
                                        <div className='flex justify-center p-2'>
                                            <img src={book.image} alt="" width="180px" />
                                        </div>
                                    </div>
                                </div>
                                {!update ? (
                                    <button
                                        type="submit"
                                        className="bg-green-500 my-2 font-bold text-black text-center h-10 w-[120px] rounded-md hover:bg-green-600"
                                    >
                                        AGREGAR
                                    </button>
                                ) : (
                                    <div className="flex gap-x-5">
                                        <button
                                            type="submit"
                                            className="bg-red-500 my-2 font-bold text-black text-center h-10 w-[120px] rounded-md hover:bg-red-600"
                                            onClick={handleCancelUpdate}
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-sky-500 my-2 font-bold text-black text-center h-10 w-[120px] rounded-md hover:bg-sky-600"
                                            onClick={handleUpdateAction}>
                                            UPDATE
                                        </button>
                                    </div>
                                )}
                            </form>

                        </div>
                    </div>
                </div>
                <div className="m-5 bg-slate-800">
                    <div className="flex flex-col">
                        <h1
                            className="w-full bg-slate-900 text-white py-2 text-3xl font-semibold text-center border-b-2"
                        >
                            NUEVA CATEGORÍA
                        </h1>
                        <div className='flex justify-center gap-x-10 py-2'>
                            <div className="grid place-items-center">
                                <form className="py-2" onSubmit={addCategory}>
                                    <div className="grid gap-y-2">
                                        <label className="text-white">NOMBRE</label>
                                        <input
                                            type="text"
                                            className="h-10 w-[300px] rounded-md"
                                            onChange={(e) => setCategory({ ...category, name: e.target.value })}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-green-500 font-bold text-black text-center h-10 w-[120px] rounded-md hover:bg-green-600"
                                        >
                                            AGREGAR
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h1 className="text-white">CATEGORÍAS</h1>
                                <div className="flex flex-col gap-y-2 h-28 overflow-x-auto">
                                    {categories.map((category) => (
                                        <div key={category.id} className="flex bg-gray-600 p-1 text-white gap-x-1 rounded-xl">
                                            <h1>{category.name}</h1>
                                            <button
                                                className="bg-red-600 rounded-xl px-2 text-center"
                                                onClick={() => confirmDeleteCategory(category.id)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1
                            className="w-full bg-slate-900 text-white py-2 text-3xl font-semibold text-center border-b-2"
                        >
                            ASIGNAR CATEGORÍA A UN LIBRO
                        </h1>
                        <div className="grid place-items-center">
                            <form className="py-2">
                                <div className="grid gap-y-2 xl:grid-cols-2 gap-x-3">
                                    <div className="flex flex-col">
                                        <label className="text-white">LIBRO</label>
                                        <select
                                            className='w-[300px] h-10 rounded-md'
                                            value={selectedBook}
                                            onChange={(e) => setSelectedBook(e.target.value)}
                                        >
                                            <option value="0">Seleccione un libro</option>
                                            {books.map(book => (
                                                <option key={book.id} value={book.id}>{book.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-white">CATEGORÍA</label>
                                        <select
                                            className='w-[300px] h-10 rounded-md'
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        >
                                            <option value="0">Seleccione una categoría</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {verify ? (
                                        <div>
                                            <h1 className="text-red-500">El libro ya tiene esta categoría</h1>
                                        </div>
                                    ) : (null)}
                                </div>
                            </form>

                            <button
                                type="submit"
                                className="bg-green-500 font-bold text-black text-center h-10 w-[120px] rounded-md hover:bg-green-600"
                                onClick={() => addCategoryBook(selectedBook, selectedCategory)}
                            >
                                AGREGAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <table className='border-2 border-black w-full bg-slate-500'>
                    <thead className='border-2 border-black'>
                        <tr>
                            <th className="w-[25%] border-2 border-black">TÍTULO</th>
                            <th className="w-[20%] border-2 border-black">AUTOR</th>
                            <th className="w-[28%] border-2 border-black">CATEGORÍA(S)</th>
                            <th className="w-[7%] border-2 border-black">PRECIO</th>
                            <th className="w-[5%] border-2 border-black">STOCK</th>
                            <th className="w-[15%] border-2 border-black">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td className='border-2 border-black px-2'>{book.title}</td>
                                <td className='border-2 border-black px-2'>{book.author}</td>
                                <td className='border-2 border-black px-2'>
                                    <div className='flex gap-x-2'>
                                        {book.categories.map((category) => (
                                            <div key={category.id}>
                                                <div className="flex bg-gray-600 p-1 text-white gap-x-1 rounded-xl">
                                                    <h1>{category.name}</h1>
                                                    <button
                                                        className="bg-red-600 rounded-xl px-2 text-center"
                                                        onClick={() => deleteCategoryBook(category.id, book.id)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className='text-center border-2 border-black px-2'>S/.{book.price}</td>
                                <td className='text-center border-2 border-black px-2'>{book.stock}</td>
                                <td className="grid place-items-center sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 py-2 gap-y-2">

                                    <button
                                        className="bg-blue-500 font-bold text-black text-center h-10 w-[80px] rounded-md hover:bg-blue-600"
                                        //colocar el handleUpdateBook
                                        onClick={() => handleUpdateBook(book.id)}
                                    >
                                        EDIT
                                    </button>

                                    {book.isActive ? (
                                        <button
                                            className="bg-green-500 font-bold text-black text-center h-10 w-[80px] rounded-md hover:bg-green-600"
                                            //que haga handleStateBook
                                            onClick={() => handleStateBook(book.id)}
                                        >
                                            ENABLE
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-red-500 font-bold text-black text-center h-10 w-[80px] rounded-md hover:bg-red-600"
                                            onClick={() => handleStateBook(book.id)}
                                        >
                                            DISABLE
                                        </button>
                                    )}
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default crudBooksToPage;