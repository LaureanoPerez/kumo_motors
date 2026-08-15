import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';

const NAV_LINKS = [
    { href: 'admin.dashboard', label: 'Dashboard' },
    { href: 'admin.vehicles.index', label: 'Autos' },
    { href: 'admin.gallery.index', label: 'Galería' },
    { href: 'admin.reviews.index', label: 'Reseñas' },
    { href: 'admin.deliveries.index', label: 'Entregas' },
    { href: 'admin.leads.index', label: 'Leads' },
    { href: 'admin.settings.edit', label: 'Ajustes' },
];

function SidebarLinks({ onNavigate }) {
    return (
        <nav className="flex flex-1 flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
                <Link
                    key={link.href}
                    href={route(link.href)}
                    onClick={onNavigate}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                        route().current(link.href) || route().current(`${link.href}.*`)
                            ? 'bg-kumo-500 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}

export default function AdminLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="hidden w-64 flex-col bg-gray-950 lg:flex">
                <Link href={route('home')} className="flex items-center px-4 py-4">
                    <img src="/images/logo.png" alt="Kumo Motors" className="h-10 w-auto brightness-0 invert" />
                </Link>
                <SidebarLinks />
            </aside>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
                    <aside className="relative flex w-64 flex-col bg-gray-950">
                        <Link href={route('home')} className="flex items-center px-4 py-4">
                            <img src="/images/logo.png" alt="Kumo Motors" className="h-10 w-auto brightness-0 invert" />
                        </Link>
                        <SidebarLinks onNavigate={() => setMobileOpen(false)} />
                    </aside>
                </div>
            )}

            <div className="flex flex-1 flex-col">
                <header className="flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <button onClick={() => setMobileOpen(true)} className="flex-shrink-0 text-gray-500 lg:hidden" aria-label="Abrir menú">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="min-w-0 flex-1 truncate lg:flex-none">{header}</div>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex flex-shrink-0 items-center gap-2 text-sm font-semibold text-gray-700">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kumo-100 text-xs font-bold text-kumo-700 sm:hidden">
                                    {auth.user.name?.charAt(0).toUpperCase()}
                                </span>
                                <span className="hidden max-w-[8rem] truncate sm:inline">{auth.user.name}</span>
                                <svg viewBox="0 0 20 20" className="hidden h-4 w-4 flex-shrink-0 fill-current sm:block">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                            <Dropdown.Link href={route('home')}>Ver sitio</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Cerrar sesión
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </header>

                <main className="flex-1 p-4 sm:p-6">
                    {flash?.success && (
                        <p className="mb-4 rounded-md bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                            {flash.success}
                        </p>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
