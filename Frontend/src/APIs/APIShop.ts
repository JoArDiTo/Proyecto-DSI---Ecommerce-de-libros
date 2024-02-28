export type ShoppingCart = {
  id: string;
  user: string;
}

export type ItemCart = {
  id: string;
  quantity: number;
  shoppingCart: string;
  book: string;
  date: string;
}

export type CreditCard = {
  number: string;
  expirationDate: string;
  cvv: string;
  holderName: string;
}


//FUNCIÓN PARA CREAR CARRITO
export async function createShoppingCart(shoppingCart: ShoppingCart) {
  try {
    const response = await fetch('http://localhost:8000/shop/api/ShoppingCart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shoppingCart)
    });
    if (!response.ok) {
      throw new Error('Error al crear el carrito de compras');
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//FUNCION PARA EXTRAER EL CARRITO
export const getShoppingCartByUser = async (userId: string): Promise<ShoppingCart> => {
  try {
    const response = await fetch('http://localhost:8000/shop/api/ShoppingCart/');
    if (!response.ok) {
      throw new Error('Error al obtener el carrito de compras');
    }
    //sacar el carrito de compras con el id userId
    const shoppingCarts: ShoppingCart[] = await response.json();
    const shoppingCart = shoppingCarts.find(cart => cart.user === userId);
    return shoppingCart || { id: '', user: '' };
  } catch (error) {
    console.error(error);
    return { id: '', user: '' };
  }
}

//FUNCIONES PARA LA TARJETA DE CRÉDITO

export const getCreditCardsByUser = async (userId: string): Promise<CreditCard[]> => {
  try {
    const response = await fetch('http://localhost:8000/shop/api/creditCard/');
    if (!response.ok) {
      throw new Error('Error al obtener las tarjetas de crédito');
    }

    const creditCards: CreditCard[] = await response.json();

    // Filtrar las tarjetas de crédito que pertenecen al usuario
    const userCreditCards = creditCards.filter(card => card.holderName === userId);

    return userCreditCards;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function addCreditCard(creditCard: CreditCard) {
  const jwt = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/shop/api/creditCard/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify(creditCard)
  });
  return response.ok;
}

export async function deleteCreditCard(id: string) {
  const jwt = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8000/shop/api/creditCard/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  });
  return response.ok;
}

//FUNCIONES PARA LOS ITEMS DEL CARRITO

export async function addItemCart(item: ItemCart) {
  try {
    const jwt = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/shop/api/itemCart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify(item)
    });
    if(!response.ok){
      console.log("ERROR AL AÑADIR ITEM AL SISTEMA");
    }
    return response.ok;
  } catch (error) {
    console.error(`NO SE PUDO REALIZAR LA COMPRA DE ${item.book}`, error);
    return false;
  }
}

export async function getItemsByUser(cart: string) {
  const jwt = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/shop/api/itemCart/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  });
  if (!response.ok) {
    throw new Error('Error al obtener los items del carrito');
  }
  const items: ItemCart[] = await response.json();
  //mapear todos los items i guardarlo en un array los que tengan id igual al del carrito
  const itemsCart = items.filter(item => item.shoppingCart === cart);
  return itemsCart;
}