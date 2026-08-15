import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ReviewFormFields from '@/Components/Admin/ReviewFormFields';

export default function Edit({ review, vehicles }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        customer_name: review.customer_name,
        rating: review.rating,
        comment: review.comment,
        vehicle_id: review.vehicle_id,
        photo: null,
        is_published: review.is_published,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.reviews.update', review.id), { forceFormData: true });
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Editar reseña</h1>}>
            <Head title="Admin - Editar reseña" />

            <form onSubmit={submit} className="max-w-xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                {review.photo_path && (
                    <img src={`/storage/${review.photo_path}`} alt="" className="mb-4 h-32 w-32 rounded-full object-cover" />
                )}

                <ReviewFormFields data={data} setData={setData} errors={errors} vehicles={vehicles} />

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-6 rounded-md bg-kumo-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-kumo-600 disabled:opacity-60"
                >
                    Guardar cambios
                </button>
            </form>
        </AdminLayout>
    );
}
