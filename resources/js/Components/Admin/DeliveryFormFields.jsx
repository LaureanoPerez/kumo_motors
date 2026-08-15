function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <div className="mt-1">{children}</div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

export default function DeliveryFormFields({ data, setData, errors }) {
    const inputClass = 'w-full rounded-md border-gray-300 text-sm';

    return (
        <div className="space-y-5">
            <Field label="Nombre del cliente" error={errors.customer_name}>
                <input type="text" value={data.customer_name} onChange={(e) => setData('customer_name', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Foto de la entrega" error={errors.photo}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('photo', e.target.files[0] ?? null)}
                    className="block w-full text-sm text-gray-600"
                />
            </Field>

            <Field label="Testimonio corto (opcional)" error={errors.comment}>
                <textarea rows={3} value={data.comment} onChange={(e) => setData('comment', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Calificación (opcional)" error={errors.rating}>
                <select
                    value={data.rating ?? ''}
                    onChange={(e) => setData('rating', e.target.value ? Number(e.target.value) : null)}
                    className={inputClass}
                >
                    <option value="">Sin calificación</option>
                    {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>{n} estrellas</option>
                    ))}
                </select>
            </Field>

            <div className="flex items-center gap-2">
                <input
                    id="is_published"
                    type="checkbox"
                    checked={data.is_published}
                    onChange={(e) => setData('is_published', e.target.checked)}
                    className="rounded border-gray-300 text-kumo-600 focus:ring-kumo-500"
                />
                <label htmlFor="is_published" className="text-sm font-semibold text-gray-700">
                    Publicar en el sitio
                </label>
            </div>
        </div>
    );
}
