import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/Site/SectionHeading';

export default function Gallery({ items }) {
    return (
        <PublicLayout>
            <Head title="Galería" />

            <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Multimedia"
                    title="Galería"
                    subtitle="Conoce nuestras instalaciones y equipo a través de fotos y videos."
                />

                {items.length > 0 ? (
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <div key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                                <div className="aspect-video w-full bg-gray-100">
                                    {item.type === 'video' ? (
                                        <iframe
                                            src={item.video_url}
                                            title={item.title}
                                            className="h-full w-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <img src={item.url} alt={item.title} className="h-full w-full object-cover" />
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                                    {item.caption && <p className="mt-1 text-sm text-gray-500">{item.caption}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-10 text-center text-gray-500">Muy pronto compartiremos fotos y videos aquí.</p>
                )}
            </section>
        </PublicLayout>
    );
}
