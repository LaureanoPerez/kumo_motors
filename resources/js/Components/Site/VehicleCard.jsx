import { Link } from '@inertiajs/react';
import Badge from '@/Components/Site/Badge';
import VehiclePhotoPlaceholder from '@/Components/Site/VehiclePhotoPlaceholder';
import { ChevronRightIcon } from '@/Components/Site/Icons';
import { formatCurrency, formatMileage, TRANSMISSION_LABELS } from '@/lib/format';

export default function VehicleCard({ vehicle }) {
    const primaryPhoto = vehicle.photos?.find((p) => p.is_primary) ?? vehicle.photos?.[0];

    return (
        <Link
            href={route('catalog.show', vehicle.slug)}
            className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                {primaryPhoto ? (
                    <img
                        src={primaryPhoto.url}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <VehiclePhotoPlaceholder brand={vehicle.brand} model={vehicle.model} className="h-full w-full" />
                )}
                <div className="absolute left-3 top-3 flex gap-2">
                    <Badge status={vehicle.status} />
                    {vehicle.body_type && (
                        <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                            {vehicle.body_type}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-kumo-600">{vehicle.brand}</p>
                <h3 className="text-lg font-bold text-gray-900">{vehicle.model}</h3>
                <p className="text-sm text-gray-500">
                    {vehicle.year} · {formatMileage(vehicle.mileage)} · {TRANSMISSION_LABELS[vehicle.transmission]}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                    <p className="text-xl font-extrabold text-kumo-600">{formatCurrency(vehicle.price)}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-700 transition group-hover:text-kumo-600">
                        Ver detalles
                        <ChevronRightIcon className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
