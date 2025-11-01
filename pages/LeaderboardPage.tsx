
import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, MenuIcon, CrownIcon } from '../components/Icons';

// NOTE: In a larger application, these shared components would be extracted into their own files.
// For this request, they are included here to maintain the existing file structure pattern.

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

const LeaderboardColumn = ({ title, users }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm w-full">
        <div className="flex items-center gap-2 mb-6">
            <CrownIcon className="w-6 h-6 text-yellow-500" />
            <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        </div>
        <div className="space-y-4">
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
    </div>
);

const LeaderboardPage = ({ onNavigate, onSearchSubmit, isLoggedIn, onLogout }) => {
    const leaderboardUsers = Array(15).fill({
        name: 'laleilmanino',
        points: '99594',
        imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format=fit=crop'
    });

    return (
        <div className="min-h-screen" style={{background: 'linear-gradient(to bottom right, #fce7f3, #f3e8ff, #faf5ff)'}}>
            <NewHomeHeader onNavigate={onNavigate} onSearchSubmit={onSearchSubmit} isLoggedIn={isLoggedIn} onLogout={onLogout} activePage="leaderboard" />
             <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                 <div className="flex justify-between items-start mb-8">
                     <h1 className="text-5xl font-extrabold text-gray-800">Prestasi Pengguna</h1>
                     <div className="w-full max-w-xs flex-shrink-0">
                        <UserProfileCard />
                     </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
                    <LeaderboardColumn title="Pengguna tercerdas" users={leaderboardUsers} />
                    <LeaderboardColumn title="Suka membantu" users={leaderboardUsers} />
                    <LeaderboardColumn title="Rajin belajar" users={leaderboardUsers} />
                    <LeaderboardColumn title="Si paling tutor" users={leaderboardUsers} />
                 </div>
            </main>
        </div>
    );
};

export default LeaderboardPage;
