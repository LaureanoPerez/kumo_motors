import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const STAT_CARDS = [
    { key: 'vehicles', label: 'Autos en catálogo' },
    { key: 'vehiclesAvailable', label: 'Disponibles' },
    { key: 'newLeads', label: 'Contactos nuevos' },
    { key: 'pendingReviews', label: 'Reseñas por publicar' },
];

export default function Dashboard({ stats, recentLeads }) {
    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Dashboard</h1>}>
            <Head title="Admin - Dashboard" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STAT_CARDS.map((card) => (
                    <div key={card.key} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
                        <p className="text-sm text-gray-500">{card.label}</p>
                        <p className="mt-1 text-3xl font-black text-kumo-600">{stats[card.key]}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Contactos recientes</h2>
                    <Link href={route('admin.leads.index')} className="text-sm font-semibold text-kumo-600 hover:text-kumo-700">
                        Ver todos
                    </Link>
                </div>

                {recentLeads.length > 0 ? (
                    <ul className="mt-4 divide-y divide-gray-100">
                        {recentLeads.map((lead) => (
                            <li key={lead.id} className="py-3">
                                <p className="text-sm font-semibold text-gray-900">
                                    {lead.name}{' '}
                                    {lead.vehicle && (
                                        <span className="font-normal text-gray-500">
                                            · interesado en {lead.vehicle.brand} {lead.vehicle.model}
                                        </span>
                                    )}
                                </p>
                                <p className="text-sm text-gray-500">{lead.email} · {lead.phone}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-sm text-gray-500">Aún no hay contactos.</p>
                )}
            </div>
        </AdminLayout>
    );
}
