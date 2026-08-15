import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeliveryFormFields from '@/Components/Admin/DeliveryFormFields';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        photo: null,
        comment: '',
        rating: null,
        is_published: true,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.deliveries.store'), { forceFormData: true });
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Nueva entrega</h1>}>
            <Head title="Admin - Nueva entrega" />

            <form onSubmit={submit} className="max-w-xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <DeliveryFormFields data={data} setData={setData} errors={errors} />

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-6 rounded-md bg-kumo-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-kumo-600 disabled:opacity-60"
                >
                    Guardar entrega
                </button>
            </form>
        </AdminLayout>
    );
}
