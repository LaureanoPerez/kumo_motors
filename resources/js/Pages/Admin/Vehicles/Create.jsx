import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import VehicleFormFields from '@/Components/Admin/VehicleFormFields';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: '',
        mileage: '',
        transmission: 'manual',
        fuel_type: 'gasolina',
        body_type: '',
        color: '',
        condition: 'seminuevo',
        doors: '',
        engine: '',
        description: '',
        features: '',
        status: 'disponible',
        is_featured: false,
        photos: [],
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.vehicles.store'), { forceFormData: true });
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Nuevo auto</h1>}>
            <Head title="Admin - Nuevo auto" />

            <form onSubmit={submit} className="max-w-3xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <VehicleFormFields data={data} setData={setData} errors={errors} />

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-6 rounded-md bg-kumo-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-kumo-600 disabled:opacity-60"
                >
                    Guardar auto
                </button>
            </form>
        </AdminLayout>
    );
}
