import React, { useState, useEffect, useRef } from 'react';
import {
    DashboardIcon, ChatIcon, DocumentIcon, ReceiptIcon, SettingsIcon, HelpIcon,
    ClockIcon, CheckBadgeIcon, InProgressIcon, ShareIcon, PlusIcon, MoreHorizIcon,
    CheckboxUncheckedIcon, CheckboxCheckedIcon, MenuIcon
} from '../components/Icons';


// --- Shared Header Components ---
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

const DashboardHeader = ({ onNavigate, isLoggedIn, onLogout, activePage }) => {
    const NavLink = ({ text, isActive, onClick }) => (
        <button onClick={onClick} className="relative text-lg font-bold px-4 py-2 transition-colors duration-200">
            <span className={isActive ? 'text-purple-600' : 'text-gray-600 hover:text-black'}>{text}</span>
            {isActive && <div className="absolute bottom-0 left-4 right-4 h-1 bg-purple-600 rounded-full"></div>}
        </button>
    );

    return (
        <header className="bg-gradient-to-b from-purple-100/80 to-transparent backdrop-blur-sm text-gray-800 py-4 px-8 z-30 fixed top-0 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <SmallLogo onNavigate={onNavigate} />
                    <nav className="flex items-center">
                        <NavLink text="HOME" isActive={activePage === 'home'} onClick={() => onNavigate('home')} />
                        <NavLink text="COMMUNITY" isActive={activePage === 'community'} onClick={() => onNavigate('community')} />
                        <NavLink text="LEADERBOARD" isActive={activePage === 'leaderboard'} onClick={() => onNavigate('leaderboard')} />
                         {isLoggedIn && <NavLink text="MY TASK" isActive={activePage === 'dashboard'} onClick={() => onNavigate('dashboard')} />}
                    </nav>
                </div>
                
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
        </header>
    );
};


// --- Sidebar ---
const Sidebar = ({ onNavigate }) => {
    const [activeLink, setActiveLink] = useState('Dashboard');
    
    const NavLink = ({ icon, text, page }) => (
        <button
            onClick={() => {
                setActiveLink(text);
                onNavigate(page);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeLink === text
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
            {icon}
            {text}
        </button>
    );

    return (
        <aside className="w-64 bg-white/70 backdrop-blur-sm p-4 flex flex-col border-r border-gray-200/50">
            <div className="flex items-center gap-2 p-2 mb-6">
                 <div className="text-center leading-none">
                    <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">KAK</span>
                    <div className="w-full h-px bg-gray-400 my-px"></div>
                    <span className="font-bold text-sm text-gray-800 tracking-widest">UTOR</span>
                </div>
            </div>
            <nav className="flex-grow space-y-1">
                <NavLink icon={<DashboardIcon className="w-5 h-5" />} text="Dashboard" page="dashboard" />
                <NavLink icon={<ChatIcon className="w-5 h-5" />} text="Chats" page="chat" />
                <NavLink icon={<ReceiptIcon className="w-5 h-5" />} text="Receipts" page="home" />
            </nav>
            <div className="mt-auto space-y-1">
                 <NavLink icon={<SettingsIcon className="w-5 h-5" />} text="Settings" page="settings" />
                 <NavLink icon={<HelpIcon className="w-5 h-5" />} text="Help & Support" page="home" />
            </div>
        </aside>
    );
};


// --- Main Content Components ---

const ContentHeader = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <header className="flex justify-between items-center mb-6">
            <div>
                <p className="text-gray-500">{dateString}</p>
                <h1 className="text-4xl font-bold text-gray-800">Good Evening! John,</h1>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold bg-white/50 hover:bg-gray-100/50 transition-colors">
                    <ShareIcon className="w-5 h-5" /> Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    <PlusIcon className="w-5 h-5" /> Add Task
                </button>
            </div>
        </header>
    );
};

const StatCard = ({ icon, value, title, subtitle, colorClass }) => (
    <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${colorClass.bg}`}>
            {React.cloneElement(icon, { className: `w-6 h-6 ${colorClass.text}` })}
        </div>
        <div>
            <p className="text-xl font-bold text-gray-800">{value} {title}</p>
            <p className="text-gray-500">{subtitle}</p>
        </div>
    </div>
);

const StatsBar = () => {
    const stats = [
        {
            icon: <ClockIcon />,
            value: "12",
            title: "Jam",
            subtitle: "Waktu Belajar",
            colorClass: { bg: 'bg-blue-100', text: 'text-blue-600' }
        },
        {
            icon: <CheckBadgeIcon />,
            value: "24",
            title: "Kelas",
            subtitle: "Dihadiri",
            colorClass: { bg: 'bg-green-100', text: 'text-green-600' }
        },
        {
            icon: <HelpIcon />,
            value: "7",
            title: "Pertanyaan",
            subtitle: "Dijawab",
            colorClass: { bg: 'bg-yellow-100', text: 'text-yellow-600' }
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 rounded-2xl" style={{backgroundColor: '#F6F0FF'}}>
             {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

const MyClasses = () => {
    const classes = [
        {
            subject: "Dasar Pemrograman",
            tutor: "Phoenix Winters",
            time: "09:00 - 12:00",
            mode: "Online",
            location: "https://zoom.us/j/1234567890",
            attendees: ["https://i.pravatar.cc/24?u=a", "https://i.pravatar.cc/24?u=b"],
            status: "In Progress"
        },
        {
            subject: "Aljabar Linear",
            tutor: "Cohen Merritt",
            time: "13:00 - 15:00",
            mode: "Offline",
            location: "Gedung A, Ruang 201",
            attendees: ["https://i.pravatar.cc/24?u=c", "https://i.pravatar.cc/24?u=d", "https://i.pravatar.cc/24?u=e"],
            status: "Pending"
        },
        {
            subject: "Kalkulus Lanjut",
            tutor: "Lukas Jacobs",
            time: "10:00 - 12:00 (Kemarin)",
            mode: "Online",
            location: "https://zoom.us/j/0987654321",
            attendees: ["https://i.pravatar.cc/24?u=f"],
            status: "Completed"
        }
    ];
    
    const StatusPill = ({ status }) => {
        const styles = {
            "In Progress": "bg-green-100 text-green-800",
            "Pending": "bg-purple-100 text-purple-800",
            "Completed": "bg-blue-100 text-blue-800",
        };
        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">My Classes</h2>
                <button className="text-sm font-semibold text-gray-600 hover:underline">See All</button>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Kelas</th>
                            <th className="p-3 font-medium">Peserta</th>
                            <th className="p-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((c, index) => (
                            <tr key={index} className="border-t border-gray-200/80">
                                <td className="p-3 align-top">
                                    <p className="font-bold text-gray-800">{c.subject}</p>
                                    <p className="text-gray-500 text-xs">{c.time}</p>
                                    <p className="text-gray-500 text-xs">{c.tutor} • {c.mode}</p>
                                    <a href={c.location} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">{c.mode === 'Online' ? 'Zoom Link' : c.location}</a>
                                </td>
                                <td className="p-3 align-top">
                                    <div className="flex items-center -space-x-2">
                                        {c.attendees.map((img, i) => (
                                            <img key={i} src={img} alt="attendee" className="w-6 h-6 rounded-full border-2 border-white" />
                                        ))}
                                    </div>
                                </td>
                                <td className="p-3 align-top">
                                    <StatusPill status={c.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const ScheduleWidget = () => {
    const [selectedDay, setSelectedDay] = useState(17);
    
    const weekDays = [
        { day: "Mo", date: 15 },
        { day: "Tu", date: 16 },
        { day: "We", date: 17 },
        { day: "Th", date: 18 },
        { day: "Fr", date: 19 },
    ];

    const scheduleItems = [
        { time: "01:00 PM - 02:30 PM", title: "Kickoff Meeting", attendees: ["https://i.pravatar.cc/24?u=g", "https://i.pravatar.cc/24?u=h"], color: "border-green-400" },
        { time: "04:00 PM - 05:00 PM", title: "Create Wordpress website", attendees: ["https://i.pravatar.cc/24?u=i", "https://i.pravatar.cc/24?u=j"], color: "border-blue-400" },
        { time: "05:00 PM - 06:00 PM", title: "Create User flow for hotel booking", attendees: ["https://i.pravatar.cc/24?u=k", "https://i.pravatar.cc/24?u=l"], color: "border-pink-400" },
    ];

    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50 h-full">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-gray-800">Schedule</h2>
                 <button><MoreHorizIcon className="w-5 h-5 text-gray-500" /></button>
            </div>
            {/* Calendar Header */}
            <div className="flex justify-around text-center text-sm mb-4">
                 {weekDays.map(day => (
                    <button key={day.date} onClick={() => setSelectedDay(day.date)} className={`px-2 py-1 rounded-lg transition-colors ${selectedDay === day.date ? 'bg-purple-200' : 'hover:bg-gray-100'}`}>
                        <p className={`${selectedDay === day.date ? 'text-purple-700' : 'text-gray-500'}`}>{day.day}</p>
                        <p className={`font-bold ${selectedDay === day.date ? 'text-purple-800' : 'text-gray-700'}`}>{day.date}</p>
                    </button>
                ))}
            </div>
            {/* List */}
            <div className="space-y-4">
                {scheduleItems.map((item, index) => (
                    <div key={index} className={`flex items-start gap-3 pl-3 ${item.color} border-l-4`}>
                        <div className="flex-grow">
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                         <div className="flex items-center -space-x-2">
                             {item.attendees.map((img, i) => (
                                <img key={i} src={img} alt="attendee" className="w-6 h-6 rounded-full border-2 border-white" />
                             ))}
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const NotesWidget = () => {
     const notes = [
        { text: "Landing Page For Website", detail: "To get started on a landing page, could you provide a bit more detail about its purpose?", done: false },
        { text: "Fixing icons with dark backgrounds", detail: "Use icons that are easily recognizable and straightforward.", done: false },
        { text: "Discussion regarding userflow improvement", detail: "What's the main goal of the landing page?", done: true },
     ];
    
    return (
         <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50 h-full">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-gray-800">Notes</h2>
                 <button><MoreHorizIcon className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="space-y-4">
                {notes.map((note, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <button className="mt-1">
                            {note.done ? <CheckboxCheckedIcon className="w-5 h-5"/> : <CheckboxUncheckedIcon className="w-5 h-5 text-gray-400" />}
                        </button>
                        <div>
                             <p className={`font-semibold ${note.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{note.text}</p>
                             <p className="text-xs text-gray-500">{note.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Dashboard Page ---
const DashboardPage = ({ onNavigate, isLoggedIn, onLogout }) => {
    return (
        <div className="min-h-screen" style={{background: 'linear-gradient(to bottom right, #fce7f3, #f3e8ff, #faf5ff)'}}>
            <DashboardHeader onNavigate={onNavigate} isLoggedIn={isLoggedIn} onLogout={onLogout} activePage="dashboard" />
            <div className="flex h-screen pt-24">
                <Sidebar onNavigate={onNavigate} />
                <main className="flex-1 p-8 overflow-y-auto">
                    <ContentHeader />
                    <StatsBar />
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-3 lg:col-span-2">
                            <MyClasses />
                        </div>
                        <div className="col-span-3 lg:col-span-1 grid grid-rows-2 gap-8">
                            <ScheduleWidget />
                            <NotesWidget />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;