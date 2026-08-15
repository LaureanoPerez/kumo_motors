function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <div className="mt-1">{children}</div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

export default function GalleryFormFields({ data, setData, errors }) {
    const inputClass = 'w-full rounded-md border-gray-300 text-sm';

    return (
        <div className="space-y-5">
            <Field label="Tipo" error={errors.type}>
                <select value={data.type} onChange={(e) => setData('type', e.target.value)} className={inputClass}>
                    <option value="foto">Foto</option>
                    <option value="video">Video</option>
                </select>
            </Field>

            <Field label="Título" error={errors.title}>
                <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Descripción corta" error={errors.caption}>
                <input type="text" value={data.caption} onChange={(e) => setData('caption', e.target.value)} className={inputClass} />
            </Field>

            {data.type === 'foto' ? (
                <Field label="Foto" error={errors.photo}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('photo', e.target.files[0] ?? null)}
                        className="block w-full text-sm text-gray-600"
                    />
                </Field>
            ) : (
                <Field label="URL del video (embed de YouTube/Vimeo)" error={errors.video_url}>
                    <input
                        type="text"
                        placeholder="https://www.youtube.com/embed/XXXXXXXXXXX"
                        value={data.video_url}
                        onChange={(e) => setData('video_url', e.target.value)}
                        className={inputClass}
                    />
                </Field>
            )}
        </div>
    );
}
