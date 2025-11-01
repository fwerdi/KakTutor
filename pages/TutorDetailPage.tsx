
import React from 'react';
import { StarIcon } from '../components/Icons';

const PageHeader = ({ onNavigate }) => (
    <header className="bg-gradient-to-b from-purple-100 to-transparent py-4 px-8 sticky top-0 z-30">
        <div className="container mx-auto flex justify-center items-center">
            <button onClick={() => onNavigate('home')} className="flex items-center justify-center p-2 rounded-lg">
                <div className="text-center leading-none">
                    <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">KAK</span>
                    <div className="w-full h-px bg-gray-400 my-px"></div>
                    <span className="font-bold text-sm text-gray-800 tracking-widest">UTOR</span>
                </div>
            </button>
        </div>
    </header>
);

const FormInput = ({ id, label, type = 'text' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 sr-only">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            placeholder={label}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-sm text-gray-900 placeholder-gray-500"
            required
        />
    </div>
);

const TutorDetailPage = ({ onNavigate }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onNavigate('payment');
    };

    return (
        <div className="min-h-screen bg-gray-50" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'}}>
            <PageHeader onNavigate={onNavigate} />
            <main className="py-12 px-4 flex items-center justify-center">
                <div 
                    className="w-full max-w-lg p-8 space-y-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl animate-fade-in"
                    style={{boxShadow: '0 0 40px rgba(52, 152, 219, 0.2)'}}
                >
                    {/* Tutor Info Card */}
                    <div className="p-6 bg-white rounded-xl shadow-lg flex items-start gap-5">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto-format&fit=crop" alt="Mr. Amba" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-800">Kelas Tutor dasar pemrograman</h1>
                            <p className="text-gray-500 text-sm mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam justo, scelerisque non felis porta, placerat vestibulum nisi. Vestibulum ac ante vitae ex maximus faucibus. Quisque secundum dolor dolor, aca pellentesque elit consectetur, laoreet. </p>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Mr. Amba</h2>
                        <div className="flex items-center justify-center mt-2">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                            <span className="ml-2 text-gray-600 font-medium">(5)</span>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                         <textarea
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="Pesan Anda"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-sm text-gray-900 placeholder-gray-500"
                        ></textarea>
                        <FormInput id="phone" label="No. Telepon" type="tel" />
                        <FormInput id="email" label="Email" type="email" />
                        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default TutorDetailPage;
