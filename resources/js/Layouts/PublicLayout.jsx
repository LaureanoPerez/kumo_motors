import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import WhatsAppButton from '@/Components/Site/WhatsAppButton';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/Components/Site/Icons';

const NAV_LINKS = [
    { href: 'home', label: 'Inicio' },
    { href: 'catalog.index', label: 'Catálogo' },
    { href: 'about', label: 'Nosotros' },
    { href: 'gallery.index', label: 'Galería' },
    { href: 'reviews.index', label: 'Reseñas' },
    { href: 'contact.index', label: 'Ubicación' },
];

function Logo() {
    return <img src="/images/logo.png" alt="Kumo Motors" className="h-12 w-auto brightness-0 invert" />;
}

export default function PublicLayout({ children }) {
    const { dealershipSettings } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <header className="sticky top-0 z-30 bg-gray-950 shadow-lg">
                <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={route('home')}>
                        <Logo />
                    </Link>

                    <nav className="hidden items-center gap-8 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={route(link.href)}
                                className={`text-sm font-semibold transition hover:text-kumo-400 ${
                                    route().current(link.href) ? 'text-kumo-500' : 'text-gray-200'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href={route('catalog.index')}
                            className="rounded-md bg-kumo-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-kumo-600"
                        >
                            Ver autos
                        </Link>
                    </nav>

                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        className="text-gray-200 lg:hidden"
                        aria-label="Abrir menú"
                    >
                        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="2">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {mobileOpen && (
                    <nav className="flex flex-col gap-1 border-t border-gray-800 px-4 pb-4 lg:hidden">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={route(link.href)}
                                className={`rounded-md px-3 py-2 text-sm font-semibold ${
                                    route().current(link.href)
                                        ? 'bg-gray-900 text-kumo-500'
                                        : 'text-gray-200 hover:bg-gray-900'
                                }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="bg-gray-950 text-gray-300">
                <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
                    <div>
                        <Logo />
                        <p className="mt-4 max-w-xs text-sm text-gray-400">
                            {dealershipSettings?.hero_headline ?? 'La honestidad es nuestro motor'}. Autos
                            seminuevos certificados con planes de financiamiento a tu medida.
                        </p>
                        <div className="mt-4 flex gap-3">
                            {dealershipSettings?.facebook_url && (
                                <a
                                    href={dealershipSettings.facebook_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-gray-300 transition hover:bg-kumo-500 hover:text-white"
                                    aria-label="Facebook"
                                >
                                    FB
                                </a>
                            )}
                            {dealershipSettings?.instagram_url && (
                                <a
                                    href={dealershipSettings.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-gray-300 transition hover:bg-kumo-500 hover:text-white"
                                    aria-label="Instagram"
                                >
                                    IG
                                </a>
                            )}
                            {dealershipSettings?.tiktok_url && (
                                <a
                                    href={dealershipSettings.tiktok_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-gray-300 transition hover:bg-kumo-500 hover:text-white"
                                    aria-label="TikTok"
                                >
                                    TT
                                </a>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Enlaces rápidos</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link href={route(link.href)} className="hover:text-kumo-500">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Contacto</h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-400">
                            {dealershipSettings?.address && (
                                <li className="flex gap-2">
                                    <MapPinIcon className="h-5 w-5 flex-shrink-0 text-kumo-500" />
                                    {dealershipSettings.address}
                                </li>
                            )}
                            {dealershipSettings?.phone && (
                                <li className="flex gap-2">
                                    <PhoneIcon className="h-5 w-5 flex-shrink-0 text-kumo-500" />
                                    {dealershipSettings.phone}
                                </li>
                            )}
                            {dealershipSettings?.email && (
                                <li className="flex gap-2">
                                    <MailIcon className="h-5 w-5 flex-shrink-0 text-kumo-500" />
                                    {dealershipSettings.email}
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Horario</h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-400">
                            {dealershipSettings?.hours_text && (
                                <li className="flex gap-2">
                                    <ClockIcon className="h-5 w-5 flex-shrink-0 text-kumo-500" />
                                    {dealershipSettings.hours_text}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Kumo Motors. Todos los derechos reservados.
                </div>
            </footer>

            <WhatsAppButton />
        </div>
    );
}
