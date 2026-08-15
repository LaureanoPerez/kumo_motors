import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/Site/SectionHeading';
import VehicleCard from '@/Components/Site/VehicleCard';
import StarRating from '@/Components/Site/StarRating';
import IconFeatureCard from '@/Components/Site/IconFeatureCard';
import Reveal from '@/Components/Site/Reveal';
import { WHY_CHOOSE_US } from '@/lib/content';

export default function Home({ featuredVehicles, deliveries, heroPhoto }) {
    const { dealershipSettings } = usePage().props;

    return (
        <PublicLayout>
            <Head title="Inicio" />

            <section className="relative overflow-hidden bg-gray-950">
                {heroPhoto?.url && (
                    <img
                        src={heroPhoto.url}
                        alt=""
                        className="absolute inset-0 h-full w-full animate-kenburns object-cover object-[60%_70%] opacity-60"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-gray-950/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(242,96,12,0.2),_transparent_60%)]" />
                <div className="relative mx-auto flex max-w-[1600px] flex-col items-start gap-6 px-4 py-24 sm:px-6 lg:px-8">
                    <Reveal delay={0}>
                        <span className="rounded-full bg-kumo-500/10 px-4 py-1 text-sm font-bold uppercase tracking-widest text-kumo-400">
                            Autos certificados
                        </span>
                    </Reveal>
                    <Reveal delay={120} as="h1" className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
                        {dealershipSettings?.hero_headline ?? 'La Manera más fácil de comprar el auto de tus sueños.'}
                    </Reveal>
                    <Reveal delay={240} as="p" className="max-w-xl text-lg text-gray-300">
                        {dealershipSettings?.hero_subheadline ??
                            'Encuentra tu próximo auto seminuevo certificado, con planes de financiamiento a tu medida.'}
                    </Reveal>
                    <Reveal delay={360} className="flex flex-wrap items-center gap-4">
                        <Link
                            href={route('catalog.index')}
                            className="rounded-md bg-kumo-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-kumo-600 hover:shadow-xl"
                        >
                            Explorar catálogo →
                        </Link>
                        <Link
                            href={route('contact.index')}
                            className="text-sm font-bold text-white transition hover:text-kumo-400"
                        >
                            Contáctanos
                        </Link>
                    </Reveal>
                </div>
            </section>

            <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8">
                <Reveal>
                    <SectionHeading
                        eyebrow="Ventajas"
                        title="Por qué elegir Kumo Motors"
                        subtitle="Compromiso con la honestidad en cada auto que ofrecemos."
                    />
                </Reveal>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {WHY_CHOOSE_US.map((item, index) => (
                        <Reveal key={item.title} delay={index * 90}>
                            <IconFeatureCard {...item} />
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <SectionHeading
                            eyebrow="Inventario"
                            title="Autos destacados"
                            subtitle="Selección de nuestro inventario disponible, revisados y listos para entregar."
                        />
                    </Reveal>

                    {featuredVehicles.length > 0 ? (
                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredVehicles.map((vehicle, index) => (
                                <Reveal key={vehicle.id} delay={index * 90}>
                                    <VehicleCard vehicle={vehicle} />
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-10 text-center text-gray-500">
                            Pronto agregaremos autos destacados. Mientras tanto, visita el catálogo completo.
                        </p>
                    )}

                    <div className="mt-10 text-center">
                        <Link
                            href={route('catalog.index')}
                            className="inline-flex items-center gap-2 font-bold text-kumo-600 hover:text-kumo-700"
                        >
                            Ver todo el catálogo →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gray-950 py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(242,96,12,0.15),_transparent_55%)]" />
                <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-center">
                        <Reveal y={16} className="lg:col-span-2">
                            <span className="text-sm font-bold uppercase tracking-widest text-kumo-500">
                                Testimonios
                            </span>
                            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                                Historias reales de nuestros clientes
                            </h2>

                            {dealershipSettings?.testimonial_video_comment ? (
                                <div className="mt-8">
                                    <svg viewBox="0 0 32 32" className="h-10 w-10 fill-kumo-500/40">
                                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
                                    </svg>
                                    <p className="mt-4 text-xl italic leading-relaxed text-gray-200">
                                        {dealershipSettings.testimonial_video_comment}
                                    </p>
                                    <div className="mt-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-kumo-500 text-lg font-black text-white">
                                            {dealershipSettings.testimonial_video_customer_name?.charAt(0) ?? '?'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">
                                                {dealershipSettings.testimonial_video_customer_name}
                                            </p>
                                            {dealershipSettings.testimonial_video_rating && (
                                                <StarRating rating={dealershipSettings.testimonial_video_rating} className="mt-1" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-4 text-gray-400">
                                    Mira la experiencia real de uno de nuestros clientes.
                                </p>
                            )}
                        </Reveal>

                        <Reveal delay={150} y={16} className="relative lg:col-span-3">
                            <div className="absolute -inset-4 -z-10 rounded-3xl bg-kumo-500/10 blur-2xl" />
                            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl ring-2 ring-kumo-500/40 transition-shadow duration-300 hover:shadow-kumo-500/20">
                                {dealershipSettings?.testimonial_video_url ? (
                                    <video
                                        src={dealershipSettings.testimonial_video_url}
                                        controls
                                        preload="metadata"
                                        className="h-full w-full bg-black"
                                    >
                                        Tu navegador no soporta la reproducción de video.
                                    </video>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-black text-sm text-gray-500">
                                        Video próximamente
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {deliveries.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <SectionHeading
                                eyebrow="Entregas"
                                title="Nuestras últimas entregas"
                                subtitle="Cada entrega es una familia más manejando con la confianza de Kumo Motors."
                            />
                        </Reveal>

                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {deliveries.map((delivery, index) => (
                                <Reveal key={delivery.id} delay={index * 90}>
                                    <div className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        <div className="overflow-hidden">
                                            <img
                                                src={delivery.photo_url}
                                                alt={delivery.customer_name}
                                                className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-5">
                                            {delivery.rating && <StarRating rating={delivery.rating} />}
                                            {delivery.comment && (
                                                <p className="mt-3 text-sm text-gray-700">&ldquo;{delivery.comment}&rdquo;</p>
                                            )}
                                            <p className="mt-3 text-sm font-bold text-gray-900">{delivery.customer_name}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <div className="mt-10 text-center">
                            <Link
                                href={`${route('reviews.index')}#entregas`}
                                className="inline-flex items-center gap-2 font-bold text-kumo-600 hover:text-kumo-700"
                            >
                                Ver más entregas →
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-kumo-600">
                <Reveal className="mx-auto max-w-[1600px] px-4 py-14 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white">¿Listo para encontrar tu próximo auto?</h2>
                    <p className="mt-3 text-kumo-50">
                        Visítanos o escríbenos, con gusto te asesoramos sin compromiso.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <Link
                            href={route('catalog.index')}
                            className="rounded-md bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-900 hover:shadow-xl"
                        >
                            Explorar inventario
                        </Link>
                        <Link
                            href={route('contact.index')}
                            className="rounded-md border border-white/60 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                        >
                            Ubicación y contacto
                        </Link>
                    </div>
                </Reveal>
            </section>
        </PublicLayout>
    );
}
