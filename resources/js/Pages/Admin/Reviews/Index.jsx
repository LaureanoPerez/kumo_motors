import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StarRating from '@/Components/Site/StarRating';

export default function Index({ reviews }) {
    function destroy(review) {
        if (confirm(`¿Eliminar la reseña de ${review.customer_name}?`)) {
            router.delete(route('admin.reviews.destroy', review.id));
        }
    }

    function togglePublish(review) {
        router.put(
            route('admin.reviews.update', review.id),
            {
                customer_name: review.customer_name,
                rating: review.rating,
                comment: review.comment,
                vehicle_id: review.vehicle_id,
                is_published: !review.is_published,
            },
            { preserveScroll: true },
        );
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Reseñas</h1>}>
            <Head title="Admin - Reseñas" />

            <div className="mb-4 flex justify-end">
                <Link
                    href={route('admin.reviews.create')}
                    className="rounded-md bg-kumo-500 px-4 py-2 text-sm font-bold text-white hover:bg-kumo-600"
                >
                    + Nueva reseña
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                    <div key={review.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-center justify-between">
                            <StarRating rating={review.rating} />
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                    review.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                                {review.is_published ? 'Publicada' : 'Oculta'}
                            </span>
                        </div>
                        <p className="mt-3 text-sm text-gray-700">&ldquo;{review.comment}&rdquo;</p>
                        <p className="mt-3 text-sm font-bold text-gray-900">{review.customer_name}</p>
                        {review.vehicle && (
                            <p className="text-xs text-gray-500">{review.vehicle.brand} {review.vehicle.model}</p>
                        )}

                        <div className="mt-4 flex gap-3 text-sm">
                            <button onClick={() => togglePublish(review)} className="font-semibold text-kumo-600 hover:text-kumo-700">
                                {review.is_published ? 'Ocultar' : 'Publicar'}
                            </button>
                            <Link href={route('admin.reviews.edit', review.id)} className="font-semibold text-gray-600 hover:text-gray-800">
                                Editar
                            </Link>
                            <button onClick={() => destroy(review)} className="font-semibold text-red-600 hover:text-red-700">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {reviews.length === 0 && <p className="text-sm text-gray-500">Aún no hay reseñas.</p>}
        </AdminLayout>
    );
}
