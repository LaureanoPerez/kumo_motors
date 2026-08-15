import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import VehicleFormFields from '@/Components/Admin/VehicleFormFields';

export default function Edit({ vehicle }) {
    const [photos, setPhotos] = useState(vehicle.photos);
    const [dragIndex, setDragIndex] = useState(null);

    useEffect(() => {
        setPhotos(vehicle.photos);
    }, [vehicle.photos]);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        mileage: vehicle.mileage,
        transmission: vehicle.transmission,
        fuel_type: vehicle.fuel_type,
        body_type: vehicle.body_type ?? '',
        color: vehicle.color ?? '',
        condition: vehicle.condition,
        doors: vehicle.doors ?? '',
        engine: vehicle.engine ?? '',
        description: vehicle.description ?? '',
        features: vehicle.features ?? '',
        status: vehicle.status,
        is_featured: vehicle.is_featured,
        photos: [],
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.vehicles.update', vehicle.id), { forceFormData: true });
    }

    function deletePhoto(photoId) {
        if (confirm('¿Eliminar esta foto?')) {
            router.delete(route('admin.vehicles.photos.destroy', photoId), { preserveScroll: true });
        }
    }

    function persistPhotoOrder(list) {
        router.patch(
            route('admin.vehicles.photos.reorder', vehicle.id),
            { photo_ids: list.map((photo) => photo.id) },
            { preserveScroll: true, preserveState: true },
        );
    }

    function handlePointerDown(e, index) {
        if (e.target.closest('button')) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragIndex(index);
    }

    function handlePointerMove(e) {
        if (dragIndex === null) return;

        const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-photo-index]');
        if (!target) return;

        const overIndex = Number(target.dataset.photoIndex);
        if (Number.isNaN(overIndex) || overIndex === dragIndex) return;

        setPhotos((current) => {
            const reordered = [...current];
            const [moved] = reordered.splice(dragIndex, 1);
            reordered.splice(overIndex, 0, moved);
            return reordered;
        });
        setDragIndex(overIndex);
    }

    function handlePointerUp() {
        if (dragIndex === null) return;
        setDragIndex(null);
        persistPhotoOrder(photos);
    }

    return (
        <AdminLayout header={<h1 className="text-lg font-bold text-gray-900">Editar auto</h1>}>
            <Head title={`Admin - Editar ${vehicle.brand} ${vehicle.model}`} />

            <div className="max-w-3xl space-y-6">
                {photos.length > 0 && (
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <h2 className="text-sm font-bold text-gray-900">Fotos actuales</h2>
                        <p className="mt-1 text-xs text-gray-500">
                            Arrastra una foto para cambiar su posición. La primera es la que se usa como portada.
                        </p>
                        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                            {photos.map((photo, index) => (
                                <div
                                    key={photo.id}
                                    data-photo-index={index}
                                    onPointerDown={(e) => handlePointerDown(e, index)}
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    onPointerCancel={handlePointerUp}
                                    className={`group relative aspect-square touch-none select-none overflow-hidden rounded-md ring-2 transition ${
                                        dragIndex === index ? 'z-10 scale-105 opacity-80 ring-kumo-500' : 'cursor-grab ring-transparent'
                                    }`}
                                >
                                    <img src={photo.url} alt="" className="h-full w-full object-cover" draggable={false} />
                                    <button
                                        type="button"
                                        onClick={() => deletePhoto(photo.id)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100"
                                    >
                                        Eliminar
                                    </button>
                                    {photo.is_primary && (
                                        <span className="absolute left-1 top-1 rounded bg-kumo-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                            Principal
                                        </span>
                                    )}
                                    <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                        {index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <form onSubmit={submit} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                    <VehicleFormFields data={data} setData={setData} errors={errors} />

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-6 rounded-md bg-kumo-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-kumo-600 disabled:opacity-60"
                    >
                        Guardar cambios
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
