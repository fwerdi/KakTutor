
import React, { useState } from 'react';

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

const FileInput = ({ id, label }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                    <label htmlFor={id} className="relative cursor-pointer bg-white rounded-md font-medium text-fuchsia-600 hover:text-fuchsia-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-fuchsia-500">
                        <span>Upload a file</span>
                        <input id={id} name={id} type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
        </div>
    </div>
);


const SignUpPage = ({ onNavigate, onLogin }) => {
    const [role, setRole] = useState('mentee'); // 'mentee' or 'tutor'

    const subtitles = {
        mentee: 'Buat akun baru untuk mulai booking tutor.',
        tutor: 'Buat akun baru untuk mulai menjadi tutor.'
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Form submitted for role:', role);
        onLogin();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to top right, #f3e8ff, #faf5ff, #ffffff, #e0f2fe)' }}>
             <button onClick={() => onNavigate('home')} className="absolute top-6 left-6 text-gray-600 hover:text-black transition-colors z-20 font-semibold">&larr; Kembali</button>
            <div className="relative w-full max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-2xl my-12" style={{boxShadow: '0 25px 50px -12px rgba(192, 132, 252, 0.25)'}}>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Daftar</h1>
                    <p className="text-gray-600 mt-2">{subtitles[role]}</p>
                </div>

                <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-full w-max mx-auto">
                     <button
                        onClick={() => setRole('mentee')}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${role === 'mentee' ? 'bg-white text-fuchsia-600 shadow-md' : 'bg-transparent text-gray-500'}`}
                    >
                        Sebagai Mentee
                    </button>
                    <button
                        onClick={() => setRole('tutor')}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${role === 'tutor' ? 'bg-white text-fuchsia-600 shadow-md' : 'bg-transparent text-gray-500'}`}
                    >
                        Sebagai Tutor
                    </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput id="firstName" label="First name*" placeholder="Jane" />
                        <FormInput id="lastName" label="Last name*" placeholder="Smitherton" />
                    </div>
                    <FormInput id="email" label="Email address*" type="email" placeholder="email@janesfakedomain.net" />
                    <FormInput id="password" label="Password*" type="password" placeholder="Enter your password" />
                    <FormInput id="confirmPassword" label="Confirm Password*" type="password" placeholder="Enter your password" />
                    <FileInput id="studentCard" label="Upload Kartu Mahasiswa*" />

                    <div className="pt-4">
                        <button type="submit" className="w-full bg-fuchsia-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-fuchsia-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                            Daftar
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        <p>
                            Apakah Anda sudah memiliki akun?{' '}
                            <button type="button" onClick={() => onNavigate('signin')} className="font-medium text-fuchsia-600 hover:underline">Masuk</button>
                        </p>
                        <p className="mt-4 text-xs text-gray-500">
                            Dengan mendaftar melalui e-mail atau Facebook, Anda menerima{' '}
                            <a href="#" className="underline">syarat dan ketentuan kami</a>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
