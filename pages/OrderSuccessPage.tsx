
import React from 'react';
import { CheckCircleIcon } from '../components/Icons';

const OrderSuccessPage = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #e9f1f8 100%)'}}>
            <div className="bg-white p-10 rounded-2xl shadow-2xl animate-fade-in" style={{animationDuration: '0.5s'}}>
                <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto" />
                <h1 className="text-4xl font-extrabold text-gray-800 mt-6">Order Successful!</h1>
                <p className="text-gray-600 mt-2">Thank you for your purchase. Your booking is confirmed.</p>
                <button 
                    onClick={() => onNavigate('home')} 
                    className="mt-8 bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
