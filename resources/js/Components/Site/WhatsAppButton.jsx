import { usePage } from '@inertiajs/react';

export default function WhatsAppButton() {
    const { dealershipSettings } = usePage().props;

    if (!dealershipSettings?.whatsapp) {
        return null;
    }

    const href = `https://wa.me/${dealershipSettings.whatsapp}?text=${encodeURIComponent('Hola, me gustaría más información sobre sus autos.')}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-105 hover:bg-green-600"
            aria-label="Escríbenos por WhatsApp"
        >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.98.549 3.83 1.503 5.408L2 22l4.735-1.474a9.945 9.945 0 0 0 5.269 1.502h.001c5.517 0 10.003-4.486 10.003-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.02a8.001 8.001 0 0 1-4.084-1.117l-.293-.174-3.03.944.955-2.968-.19-.304a7.98 7.98 0 0 1-1.222-4.397c0-4.42 3.596-8.016 8.017-8.016 4.42 0 8.016 3.596 8.016 8.017 0 4.42-3.596 8.015-8.169 8.015z" />
            </svg>
        </a>
    );
}
