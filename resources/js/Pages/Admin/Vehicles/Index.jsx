import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/Site/Badge';
import { formatCurrency } from '@/lib/format';

export default function Index({ vehicles }) {
    function destroy(vehicle) {
        if (confirm(`¿Eliminar ${vehicle.brand} ${vehicle.model}?`)) {
            router.delete(route('admin.vehicles.destroy', vehicle.id));
        }
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Autos</h1>}>
            <Head title="Admin - Autos" />

            <div className="mb-4 flex justify-end">
                <Link
                    href={route('admin.vehicles.create')}
                    className="rounded-md bg-kumo-500 px-4 py-2 text-sm font-bold text-white hover:bg-kumo-600"
                >
                    + Nuevo auto
                </Link>
            </div>

            <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200 sm:block">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-500">Auto</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-500">Precio</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-500">Estatus</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-500">Destacado</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {vehicles.data.map((vehicle) => {
                            const photo = vehicle.photos?.[0];
                            return (
                                <tr key={vehicle.id}>
                                    <td className="flex items-center gap-3 px-4 py-3">
                                        <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                            {photo && <img src={photo.url} alt="" className="h-full w-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{vehicle.brand} {vehicle.model}</p>
                                            <p className="text-xs text-gray-500">{vehicle.year}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(vehicle.price)}</td>
                                    <td className="px-4 py-3"><Badge status={vehicle.status} /></td>
                                    <td className="px-4 py-3">{vehicle.is_featured ? 'Sí' : 'No'}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={route('admin.vehicles.edit', vehicle.id)}
                                            className="mr-3 font-semibold text-kumo-600 hover:text-kumo-700"
                                        >
                                            Editar
                                        </Link>
                                        <button onClick={() => destroy(vehicle)} className="font-semibold text-red-600 hover:text-red-700">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-3 sm:hidden">
                {vehicles.data.map((vehicle) => {
                    const photo = vehicle.photos?.[0];
                    return (
                        <div key={vehicle.id} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex h-16 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100 ring-1 ring-inset ring-gray-200">
                                {photo ? (
                                    <img src={photo.url} alt="" className="h-full w-full object-cover" />
                                ) : (
                                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-gray-400" strokeWidth="1.5">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5V10a2 2 0 012-2h1.3l1-2h9.4l1 2H19a2 2 0 012 2v6.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 16.5z"
                                        />
                                        <circle cx="12" cy="12" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-gray-900">{vehicle.brand} {vehicle.model}</p>
                                        <p className="text-xs text-gray-500">{vehicle.year}</p>
                                    </div>
                                    <Badge status={vehicle.status} />
                                </div>
                                <p className="mt-1 font-semibold text-gray-900">{formatCurrency(vehicle.price)}</p>
                                <p className="text-xs text-gray-500">Destacado: {vehicle.is_featured ? 'Sí' : 'No'}</p>
                                <div className="mt-2 flex gap-4">
                                    <Link
                                        href={route('admin.vehicles.edit', vehicle.id)}
                                        className="text-sm font-semibold text-kumo-600 hover:text-kumo-700"
                                    >
                                        Editar
                                    </Link>
                                    <button onClick={() => destroy(vehicle)} className="text-sm font-semibold text-red-600 hover:text-red-700">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {vehicles.data.length === 0 && <p className="mt-4 text-sm text-gray-500">Aún no hay autos registrados.</p>}

            {vehicles.links.length > 3 && (
                <nav className="mt-6 flex flex-wrap justify-center gap-2">
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
        </AdminLayout>
    );
}
