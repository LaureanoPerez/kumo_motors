import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <div className="mt-1">{children}</div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

export default function Edit({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'patch',
        address: settings.address ?? '',
        phone: settings.phone ?? '',
        whatsapp: settings.whatsapp ?? '',
        email: settings.email ?? '',
        hours_text: settings.hours_text ?? '',
        map_embed_url: settings.map_embed_url ?? '',
        facebook_url: settings.facebook_url ?? '',
        instagram_url: settings.instagram_url ?? '',
        tiktok_url: settings.tiktok_url ?? '',
        hero_headline: settings.hero_headline ?? '',
        hero_subheadline: settings.hero_subheadline ?? '',
        testimonial_video: null,
        testimonial_video_customer_name: settings.testimonial_video_customer_name ?? '',
        testimonial_video_comment: settings.testimonial_video_comment ?? '',
        testimonial_video_rating: settings.testimonial_video_rating ?? 5,
    });

    const inputClass = 'w-full rounded-md border-gray-300 text-sm';

    function submit(e) {
        e.preventDefault();
        post(route('admin.settings.update'), { forceFormData: true });
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Ajustes del sitio</h1>}>
            <Head title="Admin - Ajustes" />

            <form onSubmit={submit} className="max-w-2xl space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <Field label="Frase principal (hero)" error={errors.hero_headline}>
                    <input type="text" value={data.hero_headline} onChange={(e) => setData('hero_headline', e.target.value)} className={inputClass} />
                </Field>

                <Field label="Subtítulo (hero)" error={errors.hero_subheadline}>
                    <input type="text" value={data.hero_subheadline} onChange={(e) => setData('hero_subheadline', e.target.value)} className={inputClass} />
                </Field>

                <Field label="Dirección" error={errors.address}>
                    <input type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} className={inputClass} />
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Teléfono" error={errors.phone}>
                        <input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className={inputClass} />
                    </Field>
                    <Field label="WhatsApp (52 + 1 + 10 dígitos, sin espacios)" error={errors.whatsapp}>
                        <input type="text" placeholder="5219981234567" value={data.whatsapp} onChange={(e) => setData('whatsapp', e.target.value)} className={inputClass} />
                        <p className="mt-1 text-xs text-gray-500">
                            Para números de México, wa.me requiere el 1 extra después del 52 (aunque no se use para llamadas).
                        </p>
                    </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Correo" error={errors.email}>
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputClass} />
                    </Field>
                    <Field label="Horario" error={errors.hours_text}>
                        <input type="text" value={data.hours_text} onChange={(e) => setData('hours_text', e.target.value)} className={inputClass} />
                    </Field>
                </div>

                <Field label="URL de mapa embebido (Google Maps → Compartir → Insertar mapa → copiar el src)" error={errors.map_embed_url}>
                    <input type="text" value={data.map_embed_url} onChange={(e) => setData('map_embed_url', e.target.value)} className={inputClass} />
                </Field>

                <div className="space-y-5 rounded-lg border border-gray-200 p-4">
                    <p className="text-sm font-bold text-gray-900">Video de testimonio (Inicio)</p>
                    <p className="-mt-3 text-xs text-gray-500">
                        Este video se muestra en la Home junto con su propio testimonio, independiente de las reseñas
                        del catálogo de Reseñas.
                    </p>

                    <Field label="Archivo de video" error={errors.testimonial_video}>
                        {settings.testimonial_video_url && (
                            <video src={settings.testimonial_video_url} controls className="mb-3 max-h-48 rounded-md bg-black" />
                        )}
                        <input
                            type="file"
                            accept="video/mp4,video/quicktime,video/webm"
                            onChange={(e) => setData('testimonial_video', e.target.files[0] ?? null)}
                            className="block w-full text-sm text-gray-600"
                        />
                        <p className="mt-1 text-xs text-gray-500">MP4, MOV o WebM. Máximo 50MB.</p>
                    </Field>

                    <Field label="Nombre del cliente en el video" error={errors.testimonial_video_customer_name}>
                        <input
                            type="text"
                            value={data.testimonial_video_customer_name}
                            onChange={(e) => setData('testimonial_video_customer_name', e.target.value)}
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Testimonio del video" error={errors.testimonial_video_comment}>
                        <textarea
                            rows={3}
                            value={data.testimonial_video_comment}
                            onChange={(e) => setData('testimonial_video_comment', e.target.value)}
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Calificación (1-5)" error={errors.testimonial_video_rating}>
                        <select
                            value={data.testimonial_video_rating}
                            onChange={(e) => setData('testimonial_video_rating', Number(e.target.value))}
                            className={inputClass}
                        >
                            {[5, 4, 3, 2, 1].map((n) => (
                                <option key={n} value={n}>{n} estrellas</option>
                            ))}
                        </select>
                    </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <Field label="Facebook" error={errors.facebook_url}>
                        <input type="text" value={data.facebook_url} onChange={(e) => setData('facebook_url', e.target.value)} className={inputClass} />
                    </Field>
                    <Field label="Instagram" error={errors.instagram_url}>
                        <input type="text" value={data.instagram_url} onChange={(e) => setData('instagram_url', e.target.value)} className={inputClass} />
                    </Field>
                    <Field label="TikTok" error={errors.tiktok_url}>
                        <input type="text" value={data.tiktok_url} onChange={(e) => setData('tiktok_url', e.target.value)} className={inputClass} />
                    </Field>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-kumo-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-kumo-600 disabled:opacity-60"
                >
                    Guardar ajustes
                </button>
            </form>
        </AdminLayout>
    );
}
