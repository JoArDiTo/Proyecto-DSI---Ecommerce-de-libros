import React, { useState } from 'react';
import MyUser from '../../components/UserComponents/MyUser'
import MyCreditCard from '../../components/UserComponents/MyCreditCard'
import MyPurchaseHistory from '../../components/UserComponents/MyPurchaseHistory'

const Settings = () => {
    const [section, setSection] = useState('user');

    return (
        <div>
            <div className='flex gap-x-20 text center bg-slate-900 text-white py-3 justify-center rounded-xl'>
                <button
                    className='bg-slate-500 px-5 rounded-md w-64 text-center hover:bg-slate-700 transition-all'
                    onClick={() => setSection('user')}
                >
                    MI PERFIL
                </button>
                <button
                    className='bg-slate-500 px-5 rounded-md w-64 text-center hover:bg-slate-700 transition-all'
                    onClick={() => setSection('creditCard')}>
                    MI TARJETA DE CRÉDITO
                </button>
                <button
                    className='bg-slate-500 px-5 rounded-md w-64 text-center hover:bg-slate-700 transition-all'
                    onClick={() => setSection('purchaseHistory')}>
                    MI HISTORIAL DE COMPRAS
                </button>
            </div>
            {section === 'user' && <MyUser />}
            {section === 'creditCard' && <MyCreditCard />}
            {section === 'purchaseHistory' && <MyPurchaseHistory />}
        </div>
    )
}

export default Settings;