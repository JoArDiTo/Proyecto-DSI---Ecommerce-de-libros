import React, { useEffect, useState } from 'react';
import {getTokenToUser, getUser} from '../APIs/APIUsers.ts'

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  

    const handleEmailChange = (event:any) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event:any) => {
      setPassword(event.target.value);
    };

    const handleSubmit = async (event:any) => {
      event.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);

      const token = await getTokenToUser(email, password);
      console.log(token)
    
      if(token){
        localStorage.setItem('token', token);
        const user = await getUser();
        if(user.is_superuser){
          window.location.href = '../AdminTemplates/crudBooks';
        } else {
          console.log('Cliente')
          window.location.href = '../ClientTemplates/home';
        }
      } else {
        setError('Correo o contraseña incorrectos');
      }
      setEmail('');
      setPassword('');
    };
  
    return (
      <div className='flex-col border-2 w-96 p-5 bg-white bg-opacity-75 font-bold'>
        <h2 className='text-center pb-5'>BIENVENIDO</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className='flex-col'>
          <div className='grid px-8 pb-5'>
            <label htmlFor="username">Correo Electrónico:</label>
            <input
              className='rounded-md p-1'
              type="text"
              id="username"
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
          <div className='grid justify-center'>
            <button
              className="bg-green-500 border-2 rounded-md mx-6 py-2 my-3 hover:bg-green-600"
              type="submit"
              >
              Iniciar sesión
              </button>
            <p className='border-black border-t-2 py-1 text-center w-72'>¿ES NUEVO CLIENTE?</p>
            <a
              className="bg-blue-500 text-center border-2 rounded-md mx-6 py-2 my-1 hover:bg-blue-600"
              href="createUser"
              >
              Registrese
            </a>
          </div>
        </form>
      </div>
    );
  };
  
  export default LoginForm;