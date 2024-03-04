import React, { useState } from 'react';
import { type User, type Person, createData } from '../APIs/APIUsers';
import { type ShoppingCart, createShoppingCart } from '../APIs/APIShop';

const CreateUserForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: any) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneChange = (event: any) => {
    setPhone(event.target.value);
  };

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function generateIdPerson() {
    //el usuario tiene que ser u0 y luego 4 números aleatorios
    let id = 'p0';
    for (let i = 0; i < 4; i++) {
      id += Math.floor(Math.random() * 10);
    }
    return id;
  }

  function generateIdUser() {
    let id = 'u';
    for (let i = 0; i < 5; i++) {
      id += Math.floor(Math.random() * 10);
    }
    return id;
  }

  function generateIdShoppingCart() {
    let id = 'sc';
    for (let i = 0; i < 4; i++) {
      id += Math.floor(Math.random() * 10);
    }
    return id;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password == confirmPassword) {
      if (validateEmail(email)) {
        const person: Person = {
          id: generateIdPerson(),
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        };

        const response = await createData('persons', person);

        if (response) {
          const user: User = {
            id: generateIdUser(),
            password: password,
            email: email,
            username: username,
            is_active: true,
            is_superuser: false,
            is_staff: false,
            last_login: new Date(),
            person: person.id,
            groups: [],
            user_permissions: [],
          };

          
          const response2 = await createData('users', user);
          if (response2) {
            const shoppingCart: ShoppingCart = {
              id: generateIdShoppingCart(),
              user: user.id,
            };
            const response3 = await createShoppingCart(shoppingCart);
            if (response3) {
              console.log('Carrito creado');
            } else {
              console.log('Error al crear carrito');
            }
          } else {
            console.log('Error al crear USER');
          }
        } else {
          console.log('Error al crear PERSON');
        }

      } else {
        console.log('Correo no válido');
      }
    } else {
      console.log('Las contraseñas no coinciden');
    }
    

  };

  return (
    <div className='flex-col border-2 p-5 bg-white bg-opacity-75 font-bold'>
      <h2 className='text-center pb-5'>CREAR NUEVO USUARIO</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-x-16 lg:grid-cols-3'>
          <div className='grid px-8 pb-5'>
            <label htmlFor="firstName">Nombre(s):</label>
            <input
              className='rounded-md p-1'
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className='grid px-8 pb-5'>
            <label htmlFor="lastName">Apellidos(s):</label>
            <input
              className='rounded-md p-1'
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </div>
          <div className='grid px-8 pb-5'>
            <label htmlFor="username">Nombre de usuario:</label>
            <input
              className='rounded-md p-1'
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className='grid px-8 pb-5'>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              className='rounded-md p-1'
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className='grid px-8 pb-5'>
            <label htmlFor="password">Contraseña:</label>
            <input
              className='rounded-md p-1'
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className='grid px-8 pb-5'>
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              className='rounded-md p-1'
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <div className='grid px-8 pb-5'>
            <label htmlFor="phone">Número de teléfono:</label>
            <input
              className='rounded-md p-1'
              type="text"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
        </div>

        <div className='flex justify-center gap-24'>
          <a
            className="bg-red-500 w-72 text-center border-2 rounded-md mx-6 py-2 my-3 hover:bg-red-600"
            href="../"
          >
            Regresar
          </a>
          <button
            className="bg-green-500 w-72 border-2 rounded-md mx-6 py-2 my-3 hover:bg-green-600"
            type="submit"
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;