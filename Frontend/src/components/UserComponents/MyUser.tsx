import React, { useEffect, useState } from 'react';
import { getUser, updateData } from '../../APIs/APIUsers.ts';
import type { User, Person, UserLoaded } from '../../APIs/APIUsers.ts';


const UserProfile = () => {
  // Para almacenar los datos del usuario
  const [userData, setUserData] = useState<UserLoaded>({
    id: '',
    password: '',
    email: '',
    username: '',
    is_active: false,
    is_superuser: false,
    is_staff: false,
    last_login: new Date(),
    person: {
      id: '',
      first_name: '',
      last_name: '',
      phone: ''
    },
    groups: [],
    user_permissions: []
  });

  
  // Para controlar si se está editando el perfil
  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
    getUser().then((data) => {
      setUserData(data);
    })
  }, []);

 
  const handleEditUser = () => {
    if(isEditing){
      setIsEditing(false);
      
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChangePerson = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      person: {
        ...prevState.person,
        [name]: value
      }
    }));
  }
  

  const handleSaveChanges = async () => {
    // Lógica para guardar los cambios del perfil
    const personUpdate: Person = {
      id: userData.person.id,
      phone: userData.person.phone,
      first_name: userData.person.first_name,
      last_name: userData.person.last_name,
    };


    const UserUpdated: User = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      person: userData.person.id,
      password: userData.password,
      is_active: userData.is_active,
      is_superuser: userData.is_superuser,
      is_staff: userData.is_staff,
      last_login: userData.last_login,
      groups: userData.groups,
      user_permissions: userData.user_permissions
    };
    
    
    const response = await updateData(`persons/${userData.person.id}`, personUpdate);
    if(response){
      const response2 = await updateData(`users/${userData.id}`,UserUpdated);
      console.log(response2);
      if(response2){
        setIsEditing(false);
      } else {
        console.log('Error al actualizar datos de USER');
      }
    } else {
      console.log('Error al actualizar datos de PERSON');
    }
  };

  return (
    <div className='flex justify-center py-5'>
      <div className='py-5 flex flex-col items-center border-2 bg-blue-500 w-80 h-80'>
        <h2 className='text-black text-2xl'>{userData.id}</h2>
        <h1><img className="w-52 h-52" src="../src/img/user.webp" alt="tilinadas" /></h1>
        <input
          className='w-60 h-11 text-2xl text-center bg-transparent'
          type="text"
          name='username'
          defaultValue={userData.username}
          readOnly={!isEditing}
          onChange={handleInputChange}
        />
        <a 
          className="translate-y-10 mt-5 bg-green-500 cursor-pointer text-center font-bold h-10 w-64 border-2 rounded-md mx-6 py-1.5 my-1 hover:bg-green-600" 
          href="">RESTAURAR CAMBIOS
        </a>
      </div>
      <div>
        <section
          className='bg-white selection:first-letter:border-2 border-black py-2 grid place-content-center'
        >
          <h1 className='text-3xl font-bold text-center'>MIS DATOS</h1>
          <div className='grid sm:grid-cols-1 lg:grid-cols-2 px-20 py-5 gap-x-10'>
            <label className='w-64 h-11 text-xl font-bold pt-2'>CORREO ELECTRÓNICO:</label>
            <input
              className='w-60 h-8 px-2 mt-2 text-lg'
              type="text"
              name="email"
              defaultValue={userData.email}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
            <label className='w-64 h-11 text-xl font-bold pt-2'>NOMBRES:</label>
            <input
              className='w-60 h-8 px-2 mt-2 text-lg'
              type="text"
              name="first_name"
              defaultValue={userData.person.first_name}
              readOnly={!isEditing}
              onChange={handleInputChangePerson}
            />
            <label className='w-64 h-11 text-xl font-bold pt-2'>APELLIDOS:</label>
            <input
              className='w-60 h-8 px-2 mt-2 text-lg'
              type="text"
              name="last_name"
              defaultValue={userData.person.last_name}
              readOnly={!isEditing}
              onChange={handleInputChangePerson}
            />
            <label className='w-64 h-11 text-xl font-bold pt-2'>TELÉFONO:</label>
            <input
              className='w-60 h-8 px-2 mt-2 text-lg'
              type="text"
              name="phone"
              defaultValue={userData.person.phone}
              readOnly={!isEditing}
              onChange={handleInputChangePerson}
            />

            <div 
              className='mt-5 bg-blue-500 cursor-pointer font-bold text-center h-10 w-48 border-2 rounded-md mx-6 py-1.5 my-1 hover:bg-blue-600'
              onClick={handleEditUser}
            >
              {isEditing ? 'CANCELAR EDICIÓN' : 'EDITAR USUARIO'}
            </div>
            {isEditing && (
              <div
                className="mt-5 bg-green-500 cursor-pointer text-center font-bold h-10 w-48 border-2 rounded-md mx-6 py-1.5 my-1 hover:bg-green-600"
                onClick={handleSaveChanges}
              >
                GUARDAR CAMBIOS
              </div>
            )}
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default UserProfile;
