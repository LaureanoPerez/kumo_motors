import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/Site/SectionHeading';
import StarRating from '@/Components/Site/StarRating';

export default function Reviews({ reviews, deliveries }) {
    const { dealershipSettings } = usePage().props;

    return (
        <PublicLayout>
            <Head title="Reseñas" />

            <section className="relative overflow-hidden bg-gray-950 py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(242,96,12,0.15),_transparent_55%)]" />
                <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-center">
                        <div className="lg:col-span-2">
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
                        </div>

                        <div className="relative lg:col-span-3">
                            <div className="absolute -inset-4 -z-10 rounded-3xl bg-kumo-500/10 blur-2xl" />
                            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl ring-2 ring-kumo-500/40">
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
                        </div>
                    </div>
                </div>
            </section>

            {deliveries.length > 0 && (
                <section id="entregas" className="scroll-mt-24 bg-gray-50 py-16">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            eyebrow="Entregas"
                            title="Nuestras últimas entregas"
                            subtitle="Cada entrega es una familia más manejando con la confianza de Kumo Motors."
                        />

                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {deliveries.map((delivery) => (
                                <div key={delivery.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                                    <img src={delivery.photo_url} alt={delivery.customer_name} className="aspect-[4/3] w-full object-cover" />
                                    <div className="p-5">
                                        {delivery.rating && <StarRating rating={delivery.rating} />}
                                        {delivery.comment && (
                                            <p className="mt-3 text-sm text-gray-700">&ldquo;{delivery.comment}&rdquo;</p>
                                        )}
                                        <p className="mt-3 text-sm font-bold text-gray-900">{delivery.customer_name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Clientes"
                    title="Lo que dicen nuestros clientes"
                    subtitle="Reseñas reales de personas que ya encontraron su auto con nosotros."
                />

                {reviews.length > 0 ? (
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {reviews.map((review) => (
                            <div key={review.id} className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                                <StarRating rating={review.rating} />
                                <p className="text-sm text-gray-700">&ldquo;{review.comment}&rdquo;</p>
                                <div className="mt-auto">
                                    <p className="text-sm font-bold text-gray-900">{review.customer_name}</p>
                                    {review.vehicle && (
                                        <Link
                                            href={route('catalog.show', review.vehicle.slug)}
                                            className="text-xs font-semibold text-kumo-600 hover:text-kumo-700"
                                        >
                                            {review.vehicle.brand} {review.vehicle.model}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-10 text-center text-gray-500">Aún no hay reseñas publicadas.</p>
                )}
            </section>
        </PublicLayout>
    );
}
