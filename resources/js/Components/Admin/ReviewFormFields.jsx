function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <div className="mt-1">{children}</div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

export default function ReviewFormFields({ data, setData, errors, vehicles }) {
    const inputClass = 'w-full rounded-md border-gray-300 text-sm';

    return (
        <div className="space-y-5">
            <Field label="Nombre del cliente" error={errors.customer_name}>
                <input type="text" value={data.customer_name} onChange={(e) => setData('customer_name', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Calificación (1-5)" error={errors.rating}>
                <select value={data.rating} onChange={(e) => setData('rating', Number(e.target.value))} className={inputClass}>
                    {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>{n} estrellas</option>
                    ))}
                </select>
            </Field>

            <Field label="Comentario" error={errors.comment}>
                <textarea rows={4} value={data.comment} onChange={(e) => setData('comment', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Auto relacionado (opcional)" error={errors.vehicle_id}>
                <select
                    value={data.vehicle_id ?? ''}
                    onChange={(e) => setData('vehicle_id', e.target.value || null)}
                    className={inputClass}
                >
                    <option value="">Ninguno</option>
                    {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>{v.brand} {v.model} {v.year}</option>
                    ))}
                </select>
            </Field>

            <Field label="Foto del cliente (opcional)" error={errors.photo}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('photo', e.target.files[0] ?? null)}
                    className="block w-full text-sm text-gray-600"
                />
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
