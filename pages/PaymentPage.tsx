import React, { useState } from 'react';
import { WalletIcon, BankIcon, RadioUncheckedIcon, CheckCircleIcon } from '../components/Icons';

const PageHeader = ({ onNavigate, onBack }) => (
    <header className="bg-gradient-to-b from-purple-100 to-transparent py-4 px-8 sticky top-0 z-30">
        <div className="container mx-auto flex justify-between items-center">
             <button onClick={() => onNavigate(onBack)} className="text-gray-700 hover:text-black transition-colors font-semibold">&larr; Back</button>
            <button onClick={() => onNavigate('home')} className="flex items-center justify-center p-2 rounded-lg">
                <div className="text-center leading-none">
                    <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">KAK</span>
                    <div className="w-full h-px bg-gray-400 my-px"></div>
                    <span className="font-bold text-sm text-gray-800 tracking-widest">UTOR</span>
                </div>
            </button>
             <div className="w-16"></div> {/* Spacer */}
        </div>
    </header>
);

const ToggleSwitch = ({ label, id, defaultChecked = false }) => (
    <div className="flex items-center justify-between py-3">
        <label htmlFor={id} className="text-gray-700 font-medium">{label}</label>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name={id} id={id} defaultChecked={defaultChecked} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label htmlFor={id} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
        <style>{`.toggle-checkbox:checked { right: 0; border-color: #6D28D9; } .toggle-checkbox:checked + .toggle-label { background-color: #6D28D9; }`}</style>
    </div>
);

const PaymentMethodModal = ({ onClose, onSelect }) => {
    const [selected, setSelected] = useState(null);

    const selectOption = (option) => {
        setSelected(option);
        onSelect(option);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" style={{animationDuration: '0.2s'}}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
                <h2 className="text-xl font-bold text-center mb-6">Payment Method</h2>
                <div className="space-y-4">
                    {/* E-Wallet */}
                    <button className="w-full text-left flex items-center gap-4 p-4 rounded-lg bg-blue-100 text-blue-800 font-semibold">
                        <WalletIcon /> E-Wallet
                    </button>
                    <div className="p-4 border rounded-lg space-y-3">
                        <div onClick={() => selectOption('GoPay')} className="flex justify-between items-center cursor-pointer p-2 rounded-md hover:bg-gray-100">
                           <div className="flex items-center gap-2">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/1200px-Gopay_logo.svg.png" alt="GoPay" className="h-6" />
                           </div>
                           {selected === 'GoPay' ? <CheckCircleIcon className="text-blue-600" /> : <RadioUncheckedIcon className="text-gray-400" />}
                        </div>
                        <div onClick={() => selectOption('OVO')} className="flex justify-between items-center cursor-pointer p-2 rounded-md hover:bg-gray-100">
                           <div className="flex items-center gap-2">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_OVO_PNG.png/1200px-Logo_OVO_PNG.png" alt="OVO" className="h-5" />
                           </div>
                           {selected === 'OVO' ? <CheckCircleIcon className="text-blue-600" /> : <RadioUncheckedIcon className="text-gray-400" />}
                        </div>
                         <div onClick={() => selectOption('ShopeePay')} className="flex justify-between items-center cursor-pointer p-2 rounded-md hover:bg-gray-100">
                           <div className="flex items-center gap-2">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/ShopeePay_logo.svg/2560px-ShopeePay_logo.svg.png" alt="ShopeePay" className="h-6" />
                           </div>
                           {selected === 'ShopeePay' ? <CheckCircleIcon className="text-blue-600" /> : <RadioUncheckedIcon className="text-gray-400" />}
                        </div>
                         <div onClick={() => selectOption('DANA')} className="flex justify-between items-center cursor-pointer p-2 rounded-md hover:bg-gray-100">
                           <div className="flex items-center gap-2">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png" alt="DANA" className="h-5" />
                           </div>
                           {selected === 'DANA' ? <CheckCircleIcon className="text-blue-600" /> : <RadioUncheckedIcon className="text-gray-400" />}
                        </div>
                    </div>

                    {/* Bank Transfer */}
                    <button className="w-full text-left flex items-center gap-4 p-4 rounded-lg bg-blue-100 text-blue-800 font-semibold">
                        <BankIcon /> Bank
                    </button>
                     <div className="p-4 border rounded-lg space-y-3">
                        <div onClick={() => selectOption('BCA')} className="flex justify-between items-center cursor-pointer p-2 rounded-md hover:bg-gray-100">
                           <div className="flex items-center gap-3">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia_logo.svg/2560px-Bank_Central_Asia_logo.svg.png" alt="BCA" className="h-4" />
                               <span>Bank Central Asia</span>
                           </div>
                           {selected === 'BCA' ? <CheckCircleIcon className="text-blue-600" /> : <RadioUncheckedIcon className="text-gray-400" />}
                        </div>
                         {/* Add other banks here */}
                    </div>
                </div>
                <button onClick={onClose} className="mt-6 w-full text-center text-gray-600 font-semibold py-2">Close</button>
            </div>
        </div>
    );
};

const PaymentPage = ({ onNavigate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50" style={{background: 'linear-gradient(135deg, #e0f2f1 0%, #f5fffe 100%)'}}>
            {isModalOpen && <PaymentMethodModal onClose={() => setIsModalOpen(false)} onSelect={setPaymentMethod} />}
            <PageHeader onNavigate={onNavigate} onBack="tutorDetail" />
            <main className="py-12 px-4 flex items-center justify-center">
                <div 
                    className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl animate-fade-in"
                    style={{boxShadow: '0 0 50px rgba(46, 204, 113, 0.2)'}}
                >
                    {/* Order Summary */}
                    <div className="p-5 border border-gray-200 rounded-lg bg-white/50">
                        <h2 className="text-lg font-bold text-gray-800 mb-3">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                            <p className="font-semibold text-gray-700">Kelas bblablablaa</p>
                            <p className="text-gray-500">09:00-12:00</p>
                            <p className="text-gray-500">Mr. Amba</p>
                            <p className="text-gray-500">Online Class</p>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="p-5 border border-gray-200 rounded-lg bg-white/50">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Summary</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Kelas bblablablaa</span>
                                <span className="font-medium text-gray-800">Rp. 30,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Admin Fee</span>
                                <span className="font-medium text-gray-800">Rp. 3,000</span>
                            </div>
                            <hr className="my-2"/>
                            <div className="flex justify-between font-bold text-base">
                                <span className="text-gray-800">Total Payment</span>
                                <span className="text-gray-900">Rp. 33,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Points */}
                    <div className="p-3 border border-gray-200 rounded-lg bg-white/50">
                         <ToggleSwitch label="Gunakan poin 83" id="use-points" />
                    </div>

                    {/* Actions */}
                    <div className="pt-4 space-y-4">
                        <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center gap-3 text-left py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                            <WalletIcon className="w-5 h-5 text-gray-500"/>
                            <span className="font-semibold text-gray-700">{paymentMethod ? `Selected: ${paymentMethod}` : 'Payment Method'}</span>
                        </button>
                        <button onClick={() => onNavigate('orderSuccess')} className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400" disabled={!paymentMethod}>
                            Pay
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PaymentPage;