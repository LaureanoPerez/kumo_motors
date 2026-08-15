import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/Site/SectionHeading';
import VehicleCard from '@/Components/Site/VehicleCard';
import FilterSidebar from '@/Components/Site/FilterSidebar';
import { SearchIcon } from '@/Components/Site/Icons';

const EMPTY_FILTERS = {
    search: '',
    brand: '',
    body_type: '',
    transmission: '',
    fuel_type: '',
    condition: '',
    min_price: '',
    max_price: '',
};

export default function Index({ vehicles, filters, brands, bodyTypes }) {
    const [form, setForm] = useState({ ...EMPTY_FILTERS, ...filters });
    const isFirstRender = useRef(true);

    function apply(next) {
        router.get(route('catalog.index'), next, { preserveState: true, preserveScroll: true, replace: true });
    }

    function updateFilter(patch) {
        const next = { ...form, ...patch };
        setForm(next);
        apply(next);
    }

    function clear() {
        setForm(EMPTY_FILTERS);
        apply(EMPTY_FILTERS);
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => apply(form), 400);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.search]);

    return (
        <PublicLayout>
            <Head title="Catálogo de autos" />

            <section className="bg-gray-950 py-14">
                <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        align="left"
                        eyebrow="Inventario"
                        title="Nuestro catálogo"
                        subtitle="Explora nuestra selección de autos seminuevos certificados. Usa los filtros para encontrar exactamente lo que buscas."
                        className="text-white [&_h2]:text-white [&_span]:text-kumo-400 [&_p]:text-gray-300"
                    />
                </div>
            </section>

            <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                    <FilterSidebar filters={form} brands={brands} bodyTypes={bodyTypes} onChange={updateFilter} onClear={clear} />

                    <div>
                        <div className="relative">
                            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por modelo o marca..."
                                value={form.search}
                                onChange={(e) => setForm({ ...form, search: e.target.value })}
                                className="w-full rounded-md border-gray-300 pl-10 text-sm"
                            />
                        </div>

                        <p className="mt-4 text-sm text-gray-500">{vehicles.total} vehículos encontrados</p>

                        {vehicles.data.length > 0 ? (
                            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                {vehicles.data.map((vehicle) => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                ))}
                            </div>
                        ) : (
                            <p className="mt-10 text-center text-gray-500">
                                No encontramos autos con esos filtros. Intenta ajustarlos o contáctanos directamente.
                            </p>
                        )}

                        {vehicles.links.length > 3 && (
                            <nav className="mt-10 flex flex-wrap justify-center gap-2">
                                {vehicles.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        preserveScroll
                                        className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                                            link.active
                                                ? 'bg-kumo-500 text-white'
                                                : link.url
                                                  ? 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50'
                                                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
