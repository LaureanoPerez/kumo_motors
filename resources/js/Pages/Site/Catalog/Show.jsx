import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import Badge from '@/Components/Site/Badge';
import VehicleCard from '@/Components/Site/VehicleCard';
import VehiclePhotoPlaceholder from '@/Components/Site/VehiclePhotoPlaceholder';
import {
    CalendarIcon,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    FuelIcon,
    GaugeIcon,
    PaletteIcon,
    ShieldIcon,
    SparklesIcon,
} from '@/Components/Site/Icons';
import {
    formatCurrency,
    formatMileage,
    TRANSMISSION_LABELS,
    FUEL_LABELS,
    CONDITION_LABELS,
} from '@/lib/format';

export default function Show({ vehicle, similarVehicles }) {
    const { flash, dealershipSettings } = usePage().props;
    const whatsappHref = dealershipSettings?.whatsapp
        ? `https://wa.me/${dealershipSettings.whatsapp}?text=${encodeURIComponent(
              `Hola, me gustaría más información del ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`,
          )}`
        : null;
    const photos = vehicle.photos ?? [];
    const [activeIndex, setActiveIndex] = useState(0);
    const activePhoto = photos[activeIndex];
    const similarScrollerRef = useRef(null);
    const thumbRefs = useRef([]);

    useEffect(() => {
        thumbRefs.current[activeIndex]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        });
    }, [activeIndex]);

    function scrollSimilar(offset) {
        similarScrollerRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: `Hola, me interesa el ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`,
    });

    function submit(e) {
        e.preventDefault();
        post(route('catalog.inquiry', vehicle.slug), { onSuccess: () => reset('name', 'email', 'phone') });
    }

    function scrollToForm(message) {
        if (message) {
            setData('message', message);
        }
        document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function showPhoto(offset) {
        if (photos.length === 0) return;
        setActiveIndex((current) => (current + offset + photos.length) % photos.length);
    }

    const quickSpecs = [
        { icon: CalendarIcon, label: 'Año', value: vehicle.year },
        { icon: GaugeIcon, label: 'Kilometraje', value: formatMileage(vehicle.mileage) },
        { icon: FuelIcon, label: 'Combustible', value: FUEL_LABELS[vehicle.fuel_type] },
        { icon: PaletteIcon, label: 'Color', value: vehicle.color ?? '—' },
    ];

    const techSpecs = [
        ['Marca', vehicle.brand],
        ['Modelo', vehicle.model],
        ['Motor', vehicle.engine ?? '—'],
        ['Transmisión', TRANSMISSION_LABELS[vehicle.transmission]],
        ['Carrocería', vehicle.body_type ?? '—'],
        ['Puertas', vehicle.doors ?? '—'],
        ['Condición', CONDITION_LABELS[vehicle.condition]],
    ];

    return (
        <PublicLayout>
            <Head title={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`} />

            <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
                <Link href={route('catalog.index')} className="text-sm font-semibold text-kumo-600 hover:text-kumo-700">
                    ← Volver al catálogo
                </Link>

                <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <div>
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                            {activePhoto ? (
                                <img
                                    key={activePhoto.id}
                                    src={activePhoto.url}
                                    alt={vehicle.model}
                                    className="h-full w-full animate-fadeIn object-cover"
                                />
                            ) : (
                                <VehiclePhotoPlaceholder brand={vehicle.brand} model={vehicle.model} className="h-full w-full" />
                            )}

                            {photos.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => showPhoto(-1)}
                                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
                                        aria-label="Foto anterior"
                                    >
                                        <ChevronLeftIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => showPhoto(1)}
                                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
                                        aria-label="Foto siguiente"
                                    >
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </button>
                                </>
                            )}
                        </div>
                        {photos.length > 1 && (
                            <div className="mt-3 flex scroll-px-1 gap-3 overflow-x-auto p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {photos.map((photo, index) => {
                                    const isActive = index === activeIndex;
                                    return (
                                        <button
                                            key={photo.id}
                                            ref={(el) => (thumbRefs.current[index] = el)}
                                            onClick={() => setActiveIndex(index)}
                                            className={`group relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ease-out ${
                                                isActive
                                                    ? 'scale-105 border-kumo-500 shadow-md'
                                                    : 'border-transparent opacity-70 hover:scale-105 hover:opacity-100 hover:shadow-md'
                                            }`}
                                        >
                                            <img
                                                src={photo.url}
                                                alt=""
                                                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge status={vehicle.status} />
                            {vehicle.body_type && (
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                    {vehicle.body_type}
                                </span>
                            )}
                        </div>
                        <h1 className="mt-3 text-3xl font-black text-gray-900">
                            {vehicle.brand} {vehicle.model}
                        </h1>
                        <p className="text-sm text-gray-500">{vehicle.year}</p>
                        <p className="mt-2 text-3xl font-extrabold text-kumo-600">{formatCurrency(vehicle.price)}</p>

                        {vehicle.description && <p className="mt-4 text-gray-600">{vehicle.description}</p>}

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {quickSpecs.map((spec) => (
                                <div key={spec.label} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-white text-kumo-600 ring-1 ring-gray-200">
                                        <spec.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{spec.label}</p>
                                        <p className="text-sm font-bold text-gray-900">{spec.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => scrollToForm()}
                                className="rounded-md bg-kumo-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-kumo-600"
                            >
                                Solicitar información
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    scrollToForm(
                                        `Hola, me gustaría agendar una prueba de manejo para el ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`,
                                    )
                                }
                                className="rounded-md border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                            >
                                Agendar prueba de manejo
                            </button>
                            {whatsappHref && (
                                <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-md bg-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-green-600"
                                >
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.98.549 3.83 1.503 5.408L2 22l4.735-1.474a9.945 9.945 0 0 0 5.269 1.502h.001c5.517 0 10.003-4.486 10.003-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.02a8.001 8.001 0 0 1-4.084-1.117l-.293-.174-3.03.944.955-2.968-.19-.304a7.98 7.98 0 0 1-1.222-4.397c0-4.42 3.596-8.016 8.017-8.016 4.42 0 8.016 3.596 8.016 8.017 0 4.42-3.596 8.015-8.169 8.015z" />
                                    </svg>
                                    Contáctanos por WhatsApp
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-2">
                            <ShieldIcon className="h-5 w-5 text-kumo-600" />
                            <h2 className="text-lg font-bold text-gray-900">Especificaciones técnicas</h2>
                        </div>
                        <dl className="mt-4 divide-y divide-gray-100">
                            {techSpecs.map(([label, value]) => (
                                <div key={label} className="flex items-center justify-between py-2.5 text-sm">
                                    <dt className="text-gray-500">{label}</dt>
                                    <dd className="font-semibold text-gray-900">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {vehicle.feature_list?.length > 0 && (
                        <div className="rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center gap-2">
                                <SparklesIcon className="h-5 w-5 text-kumo-600" />
                                <h2 className="text-lg font-bold text-gray-900">Características destacadas</h2>
                            </div>
                            <ul className="mt-4 space-y-2.5">
                                {vehicle.feature_list.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                                        <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-kumo-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div id="inquiry-form" className="mt-8 scroll-mt-24 rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900">¿Te interesa este auto?</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Déjanos tus datos y un asesor te contactará a la brevedad.
                    </p>

                    {flash?.success && (
                        <p className="mt-4 rounded-md bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                            {flash.success}
                        </p>
                    )}

                    <form onSubmit={submit} className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-md border-gray-300 text-sm"
                                />
                                {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Correo"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-md border-gray-300 text-sm"
                                />
                                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Teléfono"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full rounded-md border-gray-300 text-sm"
                                />
                                {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                            </div>
                        </div>

                        <textarea
                            rows={3}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className="w-full rounded-md border-gray-300 text-sm"
                        />
                        {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-md bg-kumo-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-kumo-600 disabled:opacity-60 sm:w-auto"
                        >
                            Me interesa
                        </button>
                    </form>
                </div>

                {similarVehicles.length > 0 && (
                    <div className="mt-16">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-extrabold text-gray-900">Más automóviles</h2>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => scrollSimilar(-320)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-gray-50"
                                    aria-label="Ver anteriores"
                                >
                                    <ChevronLeftIcon className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollSimilar(320)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-gray-50"
                                    aria-label="Ver siguientes"
                                >
                                    <ChevronRightIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div
                            ref={similarScrollerRef}
                            className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {similarVehicles.map((v) => (
                                <div key={v.id} className="w-72 flex-shrink-0 snap-start sm:w-80">
                                    <VehicleCard vehicle={v} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
