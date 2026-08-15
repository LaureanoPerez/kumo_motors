import { Head, useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/Site/SectionHeading';

export default function Contact() {
    const { dealershipSettings, flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('contact.store'), { onSuccess: () => reset() });
    }

    return (
        <PublicLayout>
            <Head title="Ubicación y contacto" />

            <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Contacto"
                    title="Ubicación y contacto"
                    subtitle="Visítanos, llámanos o mándanos un mensaje. Con gusto te atendemos."
                />

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <div className="space-y-6">
                        <div className="overflow-hidden rounded-xl ring-1 ring-gray-200">
                            {dealershipSettings?.map_embed_url ? (
                                <iframe
                                    src={dealershipSettings.map_embed_url}
                                    title="Ubicación de Kumo Motors"
                                    className="h-80 w-full"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex h-80 w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
                                    Mapa próximamente
                                </div>
                            )}
                        </div>

                        <dl className="grid grid-cols-1 gap-4 rounded-xl bg-gray-50 p-6 ring-1 ring-gray-100 sm:grid-cols-2">
                            {dealershipSettings?.address && (
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Dirección</dt>
                                    <dd className="text-sm font-semibold text-gray-900">{dealershipSettings.address}</dd>
                                </div>
                            )}
                            {dealershipSettings?.phone && (
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Teléfono</dt>
                                    <dd className="text-sm font-semibold text-gray-900">{dealershipSettings.phone}</dd>
                                </div>
                            )}
                            {dealershipSettings?.email && (
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Correo</dt>
                                    <dd className="text-sm font-semibold text-gray-900">{dealershipSettings.email}</dd>
                                </div>
                            )}
                            {dealershipSettings?.hours_text && (
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Horario</dt>
                                    <dd className="text-sm font-semibold text-gray-900">{dealershipSettings.hours_text}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900">Envíanos un mensaje</h2>

                        {flash?.success && (
                            <p className="mt-4 rounded-md bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                                {flash.success}
                            </p>
                        )}

                        <form onSubmit={submit} className="mt-4 space-y-3">
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-md border-gray-300 text-sm"
                            />
                            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Correo"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-md border-gray-300 text-sm"
                                    />
                                    {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Teléfono"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full rounded-md border-gray-300 text-sm"
                                    />
                                    {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                                </div>
                            </div>

                            <textarea
                                rows={4}
                                placeholder="¿En qué te podemos ayudar?"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full rounded-md border-gray-300 text-sm"
                            />
                            {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-md bg-kumo-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-kumo-600 disabled:opacity-60"
                            >
                                Enviar mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
