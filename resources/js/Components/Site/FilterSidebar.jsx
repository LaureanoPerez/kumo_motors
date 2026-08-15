import { FUEL_LABELS, TRANSMISSION_LABELS, CONDITION_LABELS } from '@/lib/format';

const PRICE_BINS = [
    { label: 'Cualquier precio', min: '', max: '' },
    { label: 'Hasta $200,000', min: '', max: '200000' },
    { label: '$200,000 - $300,000', min: '200000', max: '300000' },
    { label: '$300,000 - $400,000', min: '300000', max: '400000' },
    { label: 'Más de $400,000', min: '400000', max: '' },
];

function priceBinValue(filters) {
    const index = PRICE_BINS.findIndex(
        (bin) => bin.min === (filters.min_price ?? '') && bin.max === (filters.max_price ?? ''),
    );
    return index === -1 ? 0 : index;
}

export default function FilterSidebar({ filters, bodyTypes, brands, onChange, onClear }) {
    const selectClass = 'w-full rounded-md border-gray-300 text-sm';

    return (
        <aside className="h-fit rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900">Filtros</h2>
                <button type="button" onClick={onClear} className="text-xs font-semibold text-kumo-600 hover:text-kumo-700">
                    Limpiar
                </button>
            </div>

            <div className="mt-4 space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Tipo de vehículo</label>
                    <select
                        value={filters.body_type ?? ''}
                        onChange={(e) => onChange({ body_type: e.target.value })}
                        className={`mt-1 ${selectClass}`}
                    >
                        <option value="">Todos los tipos</option>
                        {bodyTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Marca</label>
                    <select
                        value={filters.brand ?? ''}
                        onChange={(e) => onChange({ brand: e.target.value })}
                        className={`mt-1 ${selectClass}`}
                    >
                        <option value="">Todas las marcas</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Transmisión</label>
                    <select
                        value={filters.transmission ?? ''}
                        onChange={(e) => onChange({ transmission: e.target.value })}
                        className={`mt-1 ${selectClass}`}
                    >
                        <option value="">Todas</option>
                        {Object.entries(TRANSMISSION_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Combustible</label>
                    <select
                        value={filters.fuel_type ?? ''}
                        onChange={(e) => onChange({ fuel_type: e.target.value })}
                        className={`mt-1 ${selectClass}`}
                    >
                        <option value="">Todos</option>
                        {Object.entries(FUEL_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Condición</label>
                    <select
                        value={filters.condition ?? ''}
                        onChange={(e) => onChange({ condition: e.target.value })}
                        className={`mt-1 ${selectClass}`}
                    >
                        <option value="">Todas</option>
                        {Object.entries(CONDITION_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Rango de precio</label>
                    <select
                        value={priceBinValue(filters)}
                        onChange={(e) => {
                            const bin = PRICE_BINS[Number(e.target.value)];
                            onChange({ min_price: bin.min, max_price: bin.max });
                        }}
                        className={`mt-1 ${selectClass}`}
                    >
                        {PRICE_BINS.map((bin, index) => (
                            <option key={bin.label} value={index}>{bin.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </aside>
    );
}
