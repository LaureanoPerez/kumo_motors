import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const STATUS_LABELS = { nuevo: 'Nuevo', contactado: 'Contactado', cerrado: 'Cerrado' };
const STATUS_STYLES = {
    nuevo: 'bg-kumo-100 text-kumo-700',
    contactado: 'bg-blue-100 text-blue-700',
    cerrado: 'bg-gray-100 text-gray-500',
};

export default function Index({ leads }) {
    function updateStatus(lead, status) {
        router.patch(route('admin.leads.update', lead.id), { status }, { preserveScroll: true });
    }

    function destroy(lead) {
        if (confirm(`¿Eliminar el contacto de ${lead.name}?`)) {
            router.delete(route('admin.leads.destroy', lead.id));
        }
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Leads</h1>}>
            <Head title="Admin - Leads" />

            <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200 sm:block">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-500">Contacto</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-500">Mensaje</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-500">Origen</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-500">Estatus</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leads.data.map((lead) => (
                            <tr key={lead.id}>
                                <td className="px-4 py-3">
                                    <p className="font-semibold text-gray-900">{lead.name}</p>
                                    <p className="text-xs text-gray-500">{lead.email} · {lead.phone}</p>
                                </td>
                                <td className="max-w-xs px-4 py-3 text-gray-600">{lead.message}</td>
                                <td className="px-4 py-3 text-gray-600">
                                    {lead.source === 'vehiculo' && lead.vehicle
                                        ? `${lead.vehicle.brand} ${lead.vehicle.model}`
                                        : 'Contacto general'}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={lead.status}
                                        onChange={(e) => updateStatus(lead, e.target.value)}
                                        className={`rounded-full border-0 text-xs font-semibold ${STATUS_STYLES[lead.status]}`}
                                    >
                                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button onClick={() => destroy(lead)} className="font-semibold text-red-600 hover:text-red-700">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-3 sm:hidden">
                {leads.data.map((lead) => (
                    <div key={lead.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <p className="truncate font-semibold text-gray-900">{lead.name}</p>
                                <p className="truncate text-xs text-gray-500">{lead.email} · {lead.phone}</p>
                            </div>
                            <button onClick={() => destroy(lead)} className="flex-shrink-0 text-sm font-semibold text-red-600 hover:text-red-700">
                                Eliminar
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{lead.message}</p>
                        <p className="mt-1 text-xs text-gray-500">
                            {lead.source === 'vehiculo' && lead.vehicle
                                ? `${lead.vehicle.brand} ${lead.vehicle.model}`
                                : 'Contacto general'}
                        </p>
                        <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead, e.target.value)}
                            className={`mt-2 rounded-full border-0 text-xs font-semibold ${STATUS_STYLES[lead.status]}`}
                        >
                            {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            {leads.data.length === 0 && <p className="mt-4 text-sm text-gray-500">Aún no hay contactos.</p>}

            {leads.links.length > 3 && (
                <nav className="mt-6 flex flex-wrap justify-center gap-2">
                    {leads.links.map((link, index) => (
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
