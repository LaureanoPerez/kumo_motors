import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import GalleryFormFields from '@/Components/Admin/GalleryFormFields';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        type: 'foto',
        title: '',
        caption: '',
        photo: null,
        video_url: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.gallery.store'), { forceFormData: true });
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Nuevo elemento de galería</h1>}>
            <Head title="Admin - Nueva galería" />

            <form onSubmit={submit} className="max-w-xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <GalleryFormFields data={data} setData={setData} errors={errors} />

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-6 rounded-md bg-kumo-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-kumo-600 disabled:opacity-60"
                >
                    Guardar
                </button>
            </form>
        </AdminLayout>
    );
}
