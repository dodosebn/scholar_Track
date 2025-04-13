'use client';
import Logo from '@/utils/logo';
import React, { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState('');
    
    const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    return (
        <footer className='bg-[#1e1e26] text-white py-8 px-4 lg:px-8'>
            <div className='container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='flex justify-center lg:justify-start'>
                    <Logo />
                </div>

                <div className='flex justify-center'>
                    <ul className='grid grid-cols-2 '>
                        {["Home", "About", "News", "CGPA Calculator"].map((item, index) => (
                            <li key={index} className='hover:text-green-400 cursor-pointer'>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='flex flex-col items-center lg:items-end gap-4'>
                    <form onSubmit={handleSubmit} className='flex w-full max-w-xs'>
                        <input 
                            type="email" 
                            value={email}
                            onChange={handleEmailChange}
                            placeholder='Get updates' 
                            className='px-4 py-2 rounded-l-full w-full text-gray-800 focus:outline-none'
                            required
                        />
                        <button 
                            type="submit" 
                            className='bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-full transition-colors'
                        >
                            Go
                        </button>
                    </form>
                    <div className='text-sm text-gray-400'>
                        © ScholarHub 2025. All rights reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;