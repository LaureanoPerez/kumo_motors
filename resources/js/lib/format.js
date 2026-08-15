export function formatCurrency(value) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatMileage(value) {
    return `${new Intl.NumberFormat('es-MX').format(value)} km`;
}

export const TRANSMISSION_LABELS = {
    manual: 'Manual',
    automatico: 'Automático',
};

export const FUEL_LABELS = {
    gasolina: 'Gasolina',
    diesel: 'Diésel',
    hibrido: 'Híbrido',
    electrico: 'Eléctrico',
};

export const CONDITION_LABELS = {
    nuevo: 'Nuevo',
    seminuevo: 'Seminuevo',
};

export const STATUS_LABELS = {
    disponible: 'Disponible',
    apartado: 'Apartado',
    vendido: 'Vendido',
};
