import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import GalleryFormFields from '@/Components/Admin/GalleryFormFields';

export default function Edit({ item }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        type: item.type,
        title: item.title,
        caption: item.caption ?? '',
        photo: null,
        video_url: item.video_url ?? '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.gallery.update', item.id), { forceFormData: true });
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Editar elemento</h1>}>
            <Head title="Admin - Editar galería" />

            <form onSubmit={submit} className="max-w-xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                {item.path && (
                    <img src={item.url} alt="" className="mb-4 h-40 w-full rounded-md object-cover" />
                )}

                <GalleryFormFields data={data} setData={setData} errors={errors} />

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
