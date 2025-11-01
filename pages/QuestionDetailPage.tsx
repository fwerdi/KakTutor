
import React from 'react';
import { BackArrowIcon, CheckCircleIcon } from '../components/Icons';

const QuestionDetailCard = ({ userName, userImage, subject, timestamp, points, questionTitle, questionBody }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center mb-4">
            <img src={userImage} alt={userName} className="w-10 h-10 rounded-full mr-4" />
            <div>
                <span className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-md">{userName}</span>
                <p className="text-gray-500 text-sm mt-1">{subject} • {timestamp}</p>
            </div>
            <span className="ml-auto bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full">+{points} poin</span>
        </div>
        <h2 className="font-bold text-xl text-gray-800 mb-2">{questionTitle}</h2>
        <p className="text-gray-600">{questionBody || "Tidak ada deskripsi tambahan."}</p>
    </div>
);

const AnswerCard = ({ userName, userImage, answer, explanation, isBestAnswer }) => (
    <div className={`p-5 rounded-xl border ${isBestAnswer ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <img src={userImage} alt={userName} className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-gray-800">{userName}</span>
            </div>
            {isBestAnswer && (
                <div className="flex items-center gap-2 bg-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                    <CheckCircleIcon className="w-4 h-4" />
                    Jawaban Terbaik
                </div>
            )}
        </div>
        
        <div>
            <h4 className="font-bold text-gray-700">Jawaban:</h4>
            <p className="text-gray-600 mb-3">{answer}</p>
            <h4 className="font-bold text-gray-700">Penjelasan:</h4>
            <p className="text-gray-600">{explanation}</p>
        </div>
    </div>
);


const QuestionDetailPage = ({ onNavigate }) => {
    // Dummy data
    const question = {
        userName: 'Mitchel Sugianto',
        userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        subject: 'Basic Statistic',
        timestamp: '13 menit yang lalu',
        points: 5,
        questionTitle: 'Bantuin dong kak cara selesain soal ini...',
        questionBody: 'Jadi aku dapet soal statistik dasar tapi bingung banget sama rumusnya, ada yang bisa bantu jelasin langkah-langkahnya nggak? Soalnya terlampir ya.'
    };
    
    const answers = [
        {
            userName: 'Jane Doe',
            userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
            answer: 'Tentu, pertama kamu harus menggunakan rumus standar deviasi.',
            explanation: 'Rumus standar deviasi untuk sampel adalah akar kuadrat dari varians. Varians dihitung dengan menjumlahkan kuadrat selisih setiap data dengan rata-rata, lalu dibagi dengan jumlah data dikurangi satu (n-1).',
            isBestAnswer: true
        },
        {
            userName: 'John Smith',
            userImage: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=100&auto=format&fit=crop',
            answer: 'Bisa pake kalkulator statistik online juga kalau mau cepet.',
            explanation: 'Banyak website yang menyediakan kalkulator statistik. Kamu tinggal masukkan datanya, nanti hasilnya langsung keluar. Tapi baiknya tetap ngerti konsep dasarnya sih.',
            isBestAnswer: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-b from-purple-100 to-transparent py-4 px-8 sticky top-0 z-30">
                 <div className="container mx-auto flex justify-between items-center">
                    <button onClick={() => onNavigate('community')} className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors font-semibold">
                        <BackArrowIcon className="w-5 h-5" />
                        Kembali
                    </button>
                    <button onClick={() => onNavigate('home')} className="flex items-center justify-center p-2 rounded-lg">
                        <div className="text-center leading-none">
                            <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">KAK</span>
                            <div className="w-full h-px bg-gray-400 my-px"></div>
                            <span className="font-bold text-sm text-gray-800 tracking-widest">UTOR</span>
                        </div>
                    </button>
                    <div className="w-24"></div> {/* Spacer */}
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <QuestionDetailCard {...question} />
                    
                    <div className="my-8 flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-gray-800">Jawaban ({answers.length})</h3>
                        <button onClick={() => onNavigate('answerQuestion')} className="bg-fuchsia-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-fuchsia-600 transition-colors shadow-md">
                            + Jawab Pertanyaan
                        </button>
                    </div>

                    <div className="space-y-6">
                        {answers.map((ans, i) => <AnswerCard key={i} {...ans} />)}
                    </div>
                </div>
            </main>
        </div>
    );
};
export default QuestionDetailPage;
