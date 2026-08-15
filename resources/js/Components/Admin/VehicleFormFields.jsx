import { CONDITION_LABELS, FUEL_LABELS, TRANSMISSION_LABELS } from '@/lib/format';

const STATUS_OPTIONS = { disponible: 'Disponible', apartado: 'Apartado', vendido: 'Vendido' };

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <div className="mt-1">{children}</div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

export default function VehicleFormFields({ data, setData, errors }) {
    const inputClass = 'w-full rounded-md border-gray-300 text-sm';

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Marca" error={errors.brand}>
                <input type="text" value={data.brand} onChange={(e) => setData('brand', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Modelo" error={errors.model}>
                <input type="text" value={data.model} onChange={(e) => setData('model', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Año" error={errors.year}>
                <input type="number" value={data.year} onChange={(e) => setData('year', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Precio (MXN)" error={errors.price}>
                <input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Kilometraje" error={errors.mileage}>
                <input type="number" value={data.mileage} onChange={(e) => setData('mileage', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Color" error={errors.color}>
                <input type="text" value={data.color} onChange={(e) => setData('color', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Transmisión" error={errors.transmission}>
                <select value={data.transmission} onChange={(e) => setData('transmission', e.target.value)} className={inputClass}>
                    {Object.entries(TRANSMISSION_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </Field>

            <Field label="Combustible" error={errors.fuel_type}>
                <select value={data.fuel_type} onChange={(e) => setData('fuel_type', e.target.value)} className={inputClass}>
                    {Object.entries(FUEL_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </Field>

            <Field label="Condición" error={errors.condition}>
                <select value={data.condition} onChange={(e) => setData('condition', e.target.value)} className={inputClass}>
                    {Object.entries(CONDITION_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </Field>

            <Field label="Estatus" error={errors.status}>
                <select value={data.status} onChange={(e) => setData('status', e.target.value)} className={inputClass}>
                    {Object.entries(STATUS_OPTIONS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </Field>

            <Field label="Carrocería" error={errors.body_type}>
                <input type="text" placeholder="Sedán, SUV, Hatchback..." value={data.body_type} onChange={(e) => setData('body_type', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Puertas" error={errors.doors}>
                <input type="number" value={data.doors} onChange={(e) => setData('doors', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Motor" error={errors.engine}>
                <input type="text" placeholder="1.6L 4 cil." value={data.engine} onChange={(e) => setData('engine', e.target.value)} className={inputClass} />
            </Field>

            <div className="flex items-center gap-2 pt-6">
                <input
                    id="is_featured"
                    type="checkbox"
                    checked={data.is_featured}
                    onChange={(e) => setData('is_featured', e.target.checked)}
                    className="rounded border-gray-300 text-kumo-600 focus:ring-kumo-500"
                />
                <label htmlFor="is_featured" className="text-sm font-semibold text-gray-700">
                    Destacar en inicio
                </label>
            </div>

            <div className="sm:col-span-2">
                <Field label="Descripción" error={errors.description}>
                    <textarea rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} className={inputClass} />
                </Field>
            </div>

            <div className="sm:col-span-2">
                <Field label="Características destacadas (una por línea)" error={errors.features}>
                    <textarea
                        rows={4}
                        placeholder={'Sistema de navegación\nAsientos de piel\nCámara de reversa'}
                        value={data.features}
                        onChange={(e) => setData('features', e.target.value)}
                        className={inputClass}
                    />
                </Field>
            </div>

            <div className="sm:col-span-2">
                <Field label="Agregar fotos" error={errors.photos}>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setData('photos', Array.from(e.target.files))}
                        className="block w-full text-sm text-gray-600"
                    />
                </Field>
            </div>
        </div>
    );
}
