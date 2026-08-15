import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StarRating from '@/Components/Site/StarRating';

export default function Index({ deliveries }) {
    function destroy(delivery) {
        if (confirm(`¿Eliminar la entrega de ${delivery.customer_name}?`)) {
            router.delete(route('admin.deliveries.destroy', delivery.id));
        }
    }

    function togglePublish(delivery) {
        router.put(
            route('admin.deliveries.update', delivery.id),
            {
                customer_name: delivery.customer_name,
                comment: delivery.comment,
                rating: delivery.rating,
                is_published: !delivery.is_published,
            },
            { preserveScroll: true },
        );
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Entregas</h1>}>
            <Head title="Admin - Entregas" />

            <div className="mb-4 flex justify-end">
                <Link
                    href={route('admin.deliveries.create')}
                    className="rounded-md bg-kumo-500 px-4 py-2 text-sm font-bold text-white hover:bg-kumo-600"
                >
                    + Nueva entrega
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {deliveries.map((delivery) => (
                    <div key={delivery.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                        <img src={delivery.photo_url} alt="" className="h-40 w-full object-cover" />
                        <div className="p-5">
                            <div className="flex items-center justify-between">
                                {delivery.rating ? <StarRating rating={delivery.rating} /> : <span />}
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                        delivery.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    {delivery.is_published ? 'Publicada' : 'Oculta'}
                                </span>
                            </div>
                            {delivery.comment && <p className="mt-3 text-sm text-gray-700">&ldquo;{delivery.comment}&rdquo;</p>}
                            <p className="mt-3 text-sm font-bold text-gray-900">{delivery.customer_name}</p>

                            <div className="mt-4 flex gap-3 text-sm">
                                <button onClick={() => togglePublish(delivery)} className="font-semibold text-kumo-600 hover:text-kumo-700">
                                    {delivery.is_published ? 'Ocultar' : 'Publicar'}
                                </button>
                                <Link href={route('admin.deliveries.edit', delivery.id)} className="font-semibold text-gray-600 hover:text-gray-800">
                                    Editar
                                </Link>
                                <button onClick={() => destroy(delivery)} className="font-semibold text-red-600 hover:text-red-700">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {deliveries.length === 0 && <p className="text-sm text-gray-500">Aún no hay entregas.</p>}
        </AdminLayout>
    );
}
