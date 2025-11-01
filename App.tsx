

import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, HomeIcon, MailIcon, GithubIcon, MenuIcon, CrownIcon } from './components/Icons';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import TutorDetailPage from './pages/TutorDetailPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AskQuestionPage from './pages/AskQuestionPage';
import AnswerQuestionPage from './pages/AnswerQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';


// --- Reusable Components (can be moved to their own files later) ---
const TutorCard = ({ name, description, imgSrc, onClick }) => (
  <div onClick={onClick} className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/20 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
    <img src={imgSrc} alt={name} className="w-full h-60 object-cover rounded-lg" />
    <h3 className="text-xl font-semibold mt-4 text-gray-800">{name}</h3>
    <p className="text-gray-700 mt-1">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role, avatarSrc }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <p className="text-gray-800 font-medium">"{quote}"</p>
        <div className="flex items-center mt-4">
            <img src={avatarSrc} alt={name} className="w-12 h-12 rounded-full object-cover" />
            <div className="ml-4">
                <p className="font-bold text-gray-900">{name}</p>
                <p className="text-gray-500 text-sm">{role}</p>
            </div>
        </div>
    </div>
);


// --- UI Components for Logged In State ---

const LoggedInUserMenu = ({ onLogout, onNavigate }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-purple-300 cursor-pointer" />
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 p-1 rounded-md hover:bg-black/10 transition-colors">
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>
            {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-black animate-fade-in" style={{animationDuration: '0.2s'}}>
                    <button onClick={() => { onNavigate('settings'); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Pengaturan</button>
                    <button onClick={() => { onLogout(); setMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Keluar
                    </button>
                </div>
            )}
        </div>
    );
};


// --- Homepage Section Components ---
const SmallLogo = ({ onNavigate }) => (
    <button onClick={() => onNavigate('home')} className="flex items-center justify-center p-2 rounded-lg">
        <div className="text-center leading-none">
            <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">KAK</span>
            <div className="w-full h-px bg-gray-400 my-px"></div>
            <span className="font-bold text-sm text-gray-800 tracking-widest">UTOR</span>
        </div>
    </button>
);


const NewHomeHeader = ({ onNavigate, onSearchSubmit, isLoggedIn, onLogout, activePage }) => {
    const NavLink = ({ text, isActive, onClick }) => (
        <button onClick={onClick} className="relative text-lg font-bold px-4 py-2 transition-colors duration-200">
            <span className={isActive ? 'text-purple-600' : 'text-gray-600 hover:text-black'}>{text}</span>
            {isActive && <div className="absolute bottom-0 left-4 right-4 h-1 bg-purple-600 rounded-full"></div>}
        </button>
    );

    return (
        <header className="bg-gradient-to-b from-purple-100 to-transparent text-gray-800 py-4 px-8 z-30 fixed top-0 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <SmallLogo onNavigate={onNavigate} />
                    <nav className="flex items-center">
                        <NavLink text="HOME" isActive={activePage === 'home'} onClick={() => onNavigate('home')} />
                        <NavLink text="COMMUNITY" isActive={activePage === 'community'} onClick={() => onNavigate('community')} />
                        <NavLink text="LEADERBOARD" isActive={activePage === 'leaderboard'} onClick={() => onNavigate('leaderboard')} />
                         {isLoggedIn && <NavLink text="MY TASK" isActive={activePage === 'dashboard' || activePage === 'chat'} onClick={() => onNavigate('dashboard')} />}
                    </nav>
                </div>
                
                <div className="flex items-center gap-6">
                     <form onSubmit={onSearchSubmit} className="relative w-full max-w-xs">
                        <input name="search" type="text" placeholder="Search..." className="bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-md py-1.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                            <SearchIcon className="w-4 h-4" />
                        </button>
                    </form>
                    <div className="flex items-center">
                        {isLoggedIn ? (
                            <LoggedInUserMenu onLogout={onLogout} onNavigate={onNavigate} />
                        ) : (
                            <div className="flex items-center gap-2">
                                <button onClick={() => onNavigate('signin')} className="text-sm font-semibold hover:text-black text-gray-700 transition-colors">Masuk</button>
                                <button onClick={() => onNavigate('signup')} className="bg-purple-500 text-white font-semibold py-1.5 px-4 rounded-md hover:bg-purple-600 transition-colors text-sm">Daftar</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};


const heroSlides = [
  {
    name: "Alexander Wang",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam justo, scelerisque non felis porta, placerat vestibulum nisi.",
    imgSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    position: "object-bottom"
  },
  {
    name: "Sofia Chen",
    description: "A passionate physics tutor dedicated to making complex concepts intuitive and exciting for all students.",
    imgSrc: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop"
  },
  {
    name: "David Rodriguez",
    description: "Bringing history to life with engaging stories and a deep understanding of the past's impact on our present.",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop"
  }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(slideInterval); // Cleanup on unmount
    }, []);

    return (
        <section className="relative h-[600px] text-white flex items-center overflow-hidden pt-28">
            <div className="absolute inset-0 bg-black z-0">
                 {heroSlides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.imgSrc}
                        alt="Hero Background"
                        className={`absolute inset-0 w-full h-full object-cover ${slide.position || 'object-center'} transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-40' : 'opacity-0'}`}
                    />
                ))}
            </div>
            <div className="absolute inset-0" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/connect-four.png), linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)'}}></div>

            <div className="relative container mx-auto px-8 z-10">
                <div className="max-w-xl">
                    <div key={currentSlide} className="animate-fade-in">
                        <h1 className="text-5xl font-extrabold leading-tight">{heroSlides[currentSlide].name}</h1>
                        <p className="mt-4 text-lg text-gray-200">
                            {heroSlides[currentSlide].description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};


const MainContent = ({ onNavigate, onSearchSubmit }) => (
    <div 
        className="relative z-10 -mt-12 rounded-t-3xl pt-20 pb-16"
        style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(231, 161, 233, 0.15), transparent 50%), radial-gradient(ellipse at top, #faf5ff, #ffffff)'
        }}
    >
        <div className="container mx-auto px-8">
            {/* Tutors Section */}
            <section id="tutors">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Tutor of The Week</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TutorCard onClick={() => onNavigate('tutorDetail')} name="Mr. Amba" description="Kelas Tutor dasar pemrograman." imgSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" />
                    <TutorCard onClick={() => onNavigate('tutorDetail')} name="Sofia Chen" description="Tutor Fisika Kuantum & Astrofisika." imgSrc="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=300&auto=format&fit=crop" />
                    <TutorCard onClick={() => onNavigate('tutorDetail')} name="David Rodriguez" description="Pakar Sejarah Dunia & Peradaban Kuno." imgSrc="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop" />
                    <TutorCard onClick={() => onNavigate('tutorDetail')} name="Emily Carter" description="Spesialis Biologi Molekuler." imgSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop" />
                    <TutorCard onClick={() => onNavigate('tutorDetail')} name="Michael Brown" description="Mentor Desain Grafis & UI/UX." imgSrc="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop" />
                    <TutorCard onClick={() => onNavigate('tutorDetail')} name="Jessica Lee" description="Ahli Ekonomi Makro dan Keuangan." imgSrc="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop" />
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="mt-24 flex flex-col md:flex-row items-center gap-16 bg-white/60 backdrop-blur-md p-12 rounded-2xl shadow-xl">
                <div className="md:w-1/3 text-center md:text-left">
                    <h2 className="text-5xl font-bold leading-tight text-gray-900">Temukan Mata kuliah yang Ingin Anda Kuasai</h2>
                </div>
                <div className="md:w-2/3 flex flex-wrap gap-4 justify-center">
                    {['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Sejarah', 'Ekonomi', 'Geografi', 'Sosiologi', 'Bahasa Inggris', 'Pemrograman', 'Desain Grafis', 'Musik'].map(subject => (
                        <button key={subject} onClick={() => onSearchSubmit(subject)} className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors shadow-lg">{subject}</button>
                    ))}
                </div>
            </section>
        </div>
    </div>
);


const Testimonials = () => (
    <section className="py-24 px-8 bg-white">
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Section heading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard quote="A terrific place of praise" name="Jane Doe" role="Student" avatarSrc="https://placehold.co/100x100/fca5a5/4b5563" />
                <TestimonialCard quote="A fantastic bit of feedback" name="John Smith" role="Student" avatarSrc="https://placehold.co/100x100/818cf8/ffffff" />
                <TestimonialCard quote="A genuinely glowing review" name="Emily White" role="Parent" avatarSrc="https://placehold.co/100x100/a78bfa/ffffff" />
                <TestimonialCard quote="A terrific place of praise" name="Michael Brown" role="Student" avatarSrc="https://placehold.co/100x100/fcd34d/4b5563" />
                <TestimonialCard quote="A fantastic bit of feedback" name="Sarah Green" role="Parent" avatarSrc="https://placehold.co/100x100/6ee7b7/4b5563" />
                <TestimonialCard quote="A genuinely glowing review" name="David Black" role="Student" avatarSrc="https://placehold.co/100x100/9ca3af/ffffff" />
            </div>
        </div>
    </section>
);

const HomeFooter = () => (
    <footer className="bg-white py-16 px-8 border-t border-gray-200">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 text-gray-600">
            <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-black">Site name</h3>
                <div className="flex gap-4 mt-4 text-gray-500">
                    <a href="#" className="hover:text-black"><HomeIcon className="w-5 h-5"/></a>
                    <a href="#" className="hover:text-black"><MailIcon className="w-5 h-5"/></a>
                    <a href="#" className="hover:text-black"><GithubIcon className="w-5 h-5"/></a>
                </div>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-black">Topic</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Page</a></li>
                    <li><a href="#" className="hover:underline">Page</a></li>
                    <li><a href="#" className="hover:underline">Page</a></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-4 text-black">Topic</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Page</a></li>
                    <li><a href="#" className="hover:underline">Page</a></li>
                    <li><a href="#" className="hover:underline">Page</a></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-4 text-black">Topic</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Page</a></li>
                    <li><a href="#" className="hover:underline">Page</a></li>
                    <li><a href="#" className="hover:underline">Page</a></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-4 text-black">Topic</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Page</a></li>
                    <li><a href="#" className="hover:underline">Page</a></li>
                    <li><a href="#" className="hover:underline">Page</a></li>
                </ul>
            </div>
        </div>
    </footer>
);

const HomePage = ({ onNavigate, onSearchSubmit, isLoggedIn, onLogout }) => (
    <>
        <NewHomeHeader onNavigate={onNavigate} onSearchSubmit={onSearchSubmit} isLoggedIn={isLoggedIn} onLogout={onLogout} activePage="home" />
        <Hero />
        <MainContent onNavigate={onNavigate} onSearchSubmit={onSearchSubmit} />
        <Testimonials />
        <HomeFooter />
    </>
);


// --- Community Page Components ---

const QuestionCard = ({ userName, userImage, subject, timestamp, points, questionTitle, onClick }) => (
    <div onClick={onClick} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200">
        <img src={userImage} alt={userName} className="w-10 h-10 rounded-full flex-shrink-0 mt-1" />
        
        <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-md">{userName}</span>
                    <span className="text-gray-500 text-sm">{subject} • {timestamp}</span>
                </div>
                <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">+{points} poin</span>
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg mt-2 mb-3">{questionTitle}</h3>
            
            <div className="text-right">
                <div 
                    className="inline-block border border-gray-300 rounded-full px-6 py-1.5 text-sm font-semibold text-gray-700 bg-white"
                >
                    JAWAB
                </div>
            </div>
        </div>
    </div>
);


const UserProfileCard = () => (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=100" alt="TyanSarkozy" className="w-16 h-16 rounded-full object-cover" />
            <div>
                <h3 className="font-bold text-lg">TyanSarkozy</h3>
                <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-1 rounded-md">Rookie</span>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-pink-100 text-pink-800 rounded-lg p-2 text-center">
                <p className="font-bold">50 poin</p>
            </div>
            <div className="bg-pink-100 text-pink-800 rounded-lg p-2 flex items-center justify-center gap-2">
                <CrownIcon className="w-5 h-5" />
                <p className="font-bold">0</p>
            </div>
        </div>
    </div>
);

const LeaderboardCard = ({ users }) => (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <CrownIcon className="w-6 h-6 text-yellow-500" />
            <h3 className="font-bold text-lg">Pengguna tercerdas</h3>
        </div>
        <div className="space-y-3">
            {users.map((user, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                        <img src={user.imgSrc} alt={user.name} className="w-8 h-8 rounded-full" />
                        <span className="font-semibold text-gray-800">{user.name}</span>
                    </div>
                    <span className="font-bold text-gray-600">{user.points} points</span>
                </div>
            ))}
        </div>
        <div className="text-center mt-4">
            <button className="text-sm text-gray-500 hover:underline">selengkapnya</button>
        </div>
    </div>
);


const CommunityPage = ({ onNavigate, onSearchSubmit, isLoggedIn, onLogout }) => {
    // Dummy data from image
    const questions = Array(8).fill({
        userName: 'Mitchel Sugianto',
        userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        subject: 'Basic Statistic',
        timestamp: '13 menit yang lalu',
        points: 5,
        questionTitle: 'Bantuin dong kak cara selesain soal ini...'
    });

    const leaderboardUsers = Array(10).fill({
        name: 'laleilmanino',
        points: '99594',
        imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format=fit-crop'
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <NewHomeHeader onNavigate={onNavigate} onSearchSubmit={onSearchSubmit} isLoggedIn={isLoggedIn} onLogout={onLogout} activePage="community" />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Questions */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
                            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Punya Pertanyaan?</h2>
                            <button onClick={() => onNavigate('askQuestion')} className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-colors shadow-lg">
                                TANYA SEKARANG!
                            </button>
                        </div>
                        {questions.map((q, i) => <QuestionCard key={i} {...q} onClick={() => onNavigate('questionDetail')} />)}
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="space-y-6">
                        <UserProfileCard />
                        <LeaderboardCard users={leaderboardUsers} />
                    </aside>
                </div>
            </main>
        </div>
    );
};


function App() {
    const [page, setPage] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleNavigate = (targetPage) => {
        setPage(targetPage);
        window.scrollTo(0, 0);
    };
    
    const handleLogin = () => {
        setIsLoggedIn(true);
        handleNavigate('home');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        handleNavigate('home');
    };

    const handleSearchSubmit = (query) => {
        let newQuery = '';
        if (typeof query === 'string') {
            newQuery = query;
        } else {
            query.preventDefault();
            newQuery = query.target.elements.search.value;
        }

        if (newQuery.trim()) {
            setSearchQuery(newQuery);
            setPage('search');
            window.scrollTo(0, 0);
        }
    };
    
    const renderPage = () => {
        switch(page) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} onSearchSubmit={handleSearchSubmit} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
            case 'signup':
                return <SignUpPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'signin':
                return <SignInPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'search':
                return <SearchPage searchQuery={searchQuery} onNavigate={handleNavigate} onSearchSubmit={handleSearchSubmit} isLoggedIn={isLoggedIn} onLogout={handleLogout} activePage="" />;
            case 'settings':
                 return <SettingsPage onNavigate={handleNavigate} />;
            case 'tutorDetail':
                return <TutorDetailPage onNavigate={handleNavigate} />;
            case 'payment':
                return <PaymentPage onNavigate={handleNavigate} />;
            case 'orderSuccess':
                return <OrderSuccessPage onNavigate={handleNavigate} />;
            case 'community':
                return <CommunityPage onNavigate={handleNavigate} onSearchSubmit={handleSearchSubmit} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
            case 'askQuestion':
                return <AskQuestionPage onNavigate={handleNavigate} />;
            case 'answerQuestion':
                return <AnswerQuestionPage onNavigate={handleNavigate} />;
            case 'questionDetail':
                return <QuestionDetailPage onNavigate={handleNavigate} />;
            case 'leaderboard':
                return <LeaderboardPage onNavigate={handleNavigate} onSearchSubmit={handleSearchSubmit} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
            case 'dashboard':
                return <DashboardPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
            case 'chat':
                return <ChatPage onNavigate={handleNavigate} />;
            default:
                return <HomePage onNavigate={handleNavigate} onSearchSubmit={handleSearchSubmit} isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
        }
    };

    return (
        <div className="bg-white">
            <main>{renderPage()}</main>
        </div>
    );
}

export default App;
