
import React from 'react';
import { ChevronDownIcon } from '../components/Icons';

const PageHeader = ({ onNavigate }) => (
    <header className="py-4 px-8 w-full">
        <div className="container mx-auto flex items-center">
            <button onClick={() => onNavigate('community')} className="text-gray-700 hover:text-black transition-colors font-semibold">&larr; Kembali ke Komunitas</button>
        </div>
    </header>
);


const AskQuestionPage = ({ onNavigate }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit question
        console.log("Question submitted");
        onNavigate('community'); // Go back to community after asking
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4" style={{ background: 'radial-gradient(ellipse at top right, rgba(233, 213, 255, 0.4), transparent 50%), radial-gradient(ellipse at bottom left, rgba(219, 234, 254, 0.4), transparent 50%)' }}>
            <PageHeader onNavigate={onNavigate} />
             <div className="flex-grow flex items-center justify-center w-full">
                <div className="w-full max-w-lg">
                    <h1 className="text-2xl font-bold text-gray-400 text-center mb-4 uppercase tracking-widest">Ajukan Pertanyaan</h1>
                    <div className="bg-white p-8 rounded-2xl shadow-xl animate-fade-in">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-xl font-bold text-center text-gray-800">Ajukan pertanyaan</h2>
                            <div>
                                <textarea
                                    id="question"
                                    name="question"
                                    rows={5}
                                    placeholder="Tulis pertanyaanmu di sini (pertanyaan simpel lebih cepat dijawab)"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition shadow-sm text-gray-900 placeholder-gray-500"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-4">
                                <button type="button" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-fuchsia-100 text-fuchsia-700 font-semibold rounded-lg hover:bg-fuchsia-200 transition-colors">
                                    Pilih mata pelajaran
                                    <ChevronDownIcon className="w-5 h-5" />
                                </button>
                                 <button type="submit" className="flex-1 bg-fuchsia-200 text-fuchsia-800 font-bold py-2.5 px-6 rounded-lg hover:bg-fuchsia-300 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                                    TANYAKAN PERTANYAANMU
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskQuestionPage;
