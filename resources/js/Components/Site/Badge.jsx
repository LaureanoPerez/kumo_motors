import { STATUS_LABELS } from '@/lib/format';

const STYLES = {
    disponible: 'bg-green-100 text-green-800',
    apartado: 'bg-amber-100 text-amber-800',
    vendido: 'bg-gray-200 text-gray-700',
};

export default function Badge({ status }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STYLES[status] ?? STYLES.disponible}`}
        >
            {STATUS_LABELS[status] ?? status}
        </span>
    );
}
