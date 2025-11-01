
import React from 'react';
import { GoogleIcon, FacebookIcon } from '../components/Icons';

const FormInput = ({ id, label, type = 'text', placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition"
            required
        />
    </div>
);


const SignInPage = ({ onNavigate, onLogin }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Login form submitted');
        onLogin();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to top right, #f3e8ff, #faf5ff, #ffffff, #e0f2fe)' }}>
             <button onClick={() => onNavigate('home')} className="absolute top-6 left-6 text-gray-600 hover:text-black transition-colors z-20 font-semibold">&larr; Kembali</button>
            <div className="relative w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-2xl my-12" style={{boxShadow: '0 25px 50px -12px rgba(192, 132, 252, 0.25)'}}>
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900">Masuk</h1>
                </div>

                <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <button className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-600 bg-white hover:bg-gray-50 font-semibold transition-colors">
                            <GoogleIcon className="w-5 h-5 mr-2" />
                            Google
                        </button>
                        <button className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg text-white bg-[#1877F2] hover:bg-[#166e_dd] font-semibold transition-colors">
                            <FacebookIcon className="w-5 h-5 mr-2" />
                            Facebook
                        </button>
                     </div>

                    <div className="flex items-center">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-4 text-gray-500">atau</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <FormInput id="email" label="Email address*" type="email" placeholder="email@janesfakedomain.net" />
                    <FormInput id="password" label="Password*" type="password" placeholder="Enter your password" />
                    
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-fuchsia-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-fuchsia-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                            Masuk
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        <p>
                            Apakah Anda belum memiliki akun?{' '}
                            <button type="button" onClick={() => onNavigate('signup')} className="font-medium text-fuchsia-600 hover:underline">Daftar</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
