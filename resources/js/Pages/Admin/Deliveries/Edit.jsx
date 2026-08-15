import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeliveryFormFields from '@/Components/Admin/DeliveryFormFields';

export default function Edit({ delivery }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        customer_name: delivery.customer_name,
        photo: null,
        comment: delivery.comment ?? '',
        rating: delivery.rating,
        is_published: delivery.is_published,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.deliveries.update', delivery.id), { forceFormData: true });
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Editar entrega</h1>}>
            <Head title="Admin - Editar entrega" />

            <form onSubmit={submit} className="max-w-xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                {delivery.photo_url && (
                    <img src={delivery.photo_url} alt="" className="mb-4 h-40 w-full rounded-md object-cover" />
                )}

                <DeliveryFormFields data={data} setData={setData} errors={errors} />

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
