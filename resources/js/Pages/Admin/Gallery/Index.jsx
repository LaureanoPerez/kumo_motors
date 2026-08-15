import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ items }) {
    function destroy(item) {
        if (confirm(`¿Eliminar "${item.title}"?`)) {
            router.delete(route('admin.gallery.destroy', item.id));
        }
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Galería</h1>}>
            <Head title="Admin - Galería" />

            <div className="mb-4 flex justify-end">
                <Link
                    href={route('admin.gallery.create')}
                    className="rounded-md bg-kumo-500 px-4 py-2 text-sm font-bold text-white hover:bg-kumo-600"
                >
                    + Nuevo elemento
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                        <div className="flex aspect-video items-center justify-center bg-gray-100">
                            {item.type === 'foto' ? (
                                <img src={item.url} alt={item.title} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-sm font-semibold text-gray-500">Video</span>
                            )}
                        </div>
                        <div className="p-4">
                            <p className="font-semibold text-gray-900">{item.title}</p>
                            <p className="text-xs uppercase tracking-wide text-gray-400">{item.type}</p>
                            <div className="mt-3 flex gap-3 text-sm">
                                <Link href={route('admin.gallery.edit', item.id)} className="font-semibold text-kumo-600 hover:text-kumo-700">
                                    Editar
                                </Link>
                                <button onClick={() => destroy(item)} className="font-semibold text-red-600 hover:text-red-700">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {items.length === 0 && <p className="text-sm text-gray-500">Aún no hay elementos en la galería.</p>}
        </AdminLayout>
    );
}
