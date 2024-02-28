export interface Category {
    id: string;
    name: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    isActive: boolean;
}

export interface CategoryBook {
    id: string;
    book: string;
    category: string;
}

export interface BookLoaded {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    isActive: boolean;
    categories: Category[];
}

//--------------FUNCIONES PARA LOS LIBROS A COMPRAR---------------

export async function getBooksToBuy() {
    const response = await fetch('http://localhost:8000/books/api/dataToFronted/');
    const books = await response.json();
    return books;
}

export async function getBookById(id: string) {
    const response = await fetch(`http://127.0.0.1:8000/books/api/dataToFronted/${id}`);
    const book = await response.json();
    return book;
}

//----------------------------------------------------------------

//CRUD de libros--------------------------------------------------

export async function updateBook(book: Book) {
    try {
        const jwt = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/books/api/libros/${book.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(book)
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function addNewBook(book: Book) {
    try {
        const jwt = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/books/api/libros/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(book)
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getBookToEdit(id: string) {
    try {
        const jwt = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/books/api/libros/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        });
        const book: Book = await response.json();
        return book;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//----------------------------------------------------------------

//CRUD de categorías--------------------------------------------------
export async function getCategories() {
    try {
        const response = await fetch('http://localhost:8000/books/api/categorias/')
        const categories:Category[] = await response.json();
        return categories;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addNewCategory(category:Category){
    try {
        const jwt = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/books/api/categorias/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(category)
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCategoryBy(id:string){
    try {
        const jwt = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/books/api/categorias/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });
        const category:Category = await response.json();
        return category;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteCategoryBy(category:Category){
    try {
        const jwt = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/books/api/categorias/${category.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

//----------------------------------------------------------------

export async function getCategoriesBook(){
    try {
        const response = await fetch('http://localhost:8000/books/api/libroCategoria/');
        const categoriesBook:CategoryBook[] = await response.json();
        return categoriesBook;
    } catch (error) {
        console.error(error);
        return [];
    }

}

export async function addNewCategoryBook(categoryBook:CategoryBook){
    try {
        const jwt = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/books/api/libroCategoria/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(categoryBook)
        });
        return response.ok;
    } catch (error) {
        console.log("No se pudo agregar la categoria al libro");
        return false;
    }
}

export async function deleteCategoryBookBy(id:string){
    try {
        const jwt = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/books/api/libroCategoria/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}