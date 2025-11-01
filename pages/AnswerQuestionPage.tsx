
import React from 'react';

const PageHeader = ({ onNavigate }) => (
    <header className="py-4 px-8 w-full">
        <div className="container mx-auto flex items-center">
            <button onClick={() => onNavigate('community')} className="text-gray-700 hover:text-black transition-colors font-semibold">&larr; Kembali ke Komunitas</button>
        </div>
    </header>
);

const AnswerQuestionPage = ({ onNavigate }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit answer
        console.log("Answer submitted");
        onNavigate('community'); // Go back to community after answering
    };
    
    // This would be dynamic data passed as props in a real app
    const question = {
        title: "Apakah Mitchel adalah manusia asli atau AI?",
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4" style={{ background: 'radial-gradient(ellipse at top right, rgba(233, 213, 255, 0.4), transparent 50%), radial-gradient(ellipse at bottom left, rgba(219, 234, 254, 0.4), transparent 50%)' }}>
            <PageHeader onNavigate={onNavigate} />
            <div className="flex-grow flex items-center justify-center w-full">
                <div className="w-full max-w-xl">
                     <h1 className="text-2xl font-bold text-gray-400 text-center mb-4 uppercase tracking-widest">Jawab Pertanyaan</h1>
                    <div className="bg-white p-8 rounded-2xl shadow-xl animate-fade-in">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Pertanyaan</h3>
                                <p className="mt-1 text-gray-600">{question.title}</p>
                            </div>

                            <div>
                                <label htmlFor="answer" className="block text-lg font-bold text-gray-900 mb-2">Jawaban :</label>
                                <textarea
                                    id="answer"
                                    name="answer"
                                    rows={5}
                                    placeholder="Tulis jawabanmu di sini (jawaban simpel lebih cepat dipahami)"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition shadow-sm text-gray-900 placeholder-gray-500"
                                    required
                                ></textarea>
                            </div>
                            
                             <div>
                                <label htmlFor="explanation" className="block text-lg font-bold text-gray-900 mb-2">Penjelasan :</label>
                                <textarea
                                    id="explanation"
                                    name="explanation"
                                    rows={5}
                                    placeholder="Tulis penjelasanmu di sini (sertakan langkah-langkah jika perlu)"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition shadow-sm text-gray-900 placeholder-gray-500"
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                 <button type="submit" className="w-full bg-fuchsia-200 text-fuchsia-800 font-bold py-3 px-6 rounded-lg hover:bg-fuchsia-300 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                                    KIRIM JAWABAN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerQuestionPage;
