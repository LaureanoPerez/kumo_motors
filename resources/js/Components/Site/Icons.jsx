const base = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

export function ShieldIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

export function AwardIcon(props) {
    return (
        <svg {...base} {...props}>
            <circle cx="12" cy="8" r="5" />
            <path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5" />
        </svg>
    );
}

export function UsersIcon(props) {
    return (
        <svg {...base} {...props}>
            <circle cx="9" cy="8" r="3.25" />
            <path d="M2.75 20a6.25 6.25 0 0 1 12.5 0" />
            <path d="M15.5 5.5a3.25 3.25 0 0 1 0 6.4" />
            <path d="M17.25 14a6.2 6.2 0 0 1 4 6" />
        </svg>
    );
}

export function SparklesIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M11 3l1.4 3.9L16 8.5l-3.6 1.6L11 14l-1.4-3.9L6 8.5l3.6-1.6L11 3z" />
            <path d="M18 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
        </svg>
    );
}

export function CalendarIcon(props) {
    return (
        <svg {...base} {...props}>
            <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
            <path d="M3.5 9.5h17" />
            <path d="M8 3v4M16 3v4" />
        </svg>
    );
}

export function GaugeIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M4 15a8 8 0 1 1 16 0" />
            <path d="M12 15l4-4.5" />
            <path d="M12 15h.01" />
        </svg>
    );
}

export function FuelIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M4 20V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v14" />
            <path d="M4 20h9" />
            <path d="M13 10.5l3 2v5a1.75 1.75 0 0 0 3.5 0V9.5L17 7" />
            <path d="M6.5 7.5h4" />
        </svg>
    );
}

export function PaletteIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M12 3a9 8 0 1 0 0 16c1.1 0 2-.8 2-2 0-.5-.2-1-.5-1.3-.3-.3-.5-.8-.5-1.2 0-.8.7-1.5 1.5-1.5H16a4 4 0 0 0 4-4c0-3.3-3.6-6-8-6z" />
            <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="10.5" cy="7" r="1" fill="currentColor" stroke="none" />
            <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

export function CheckIcon(props) {
    return (
        <svg {...base} {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 12.3l2.4 2.4 4.6-4.9" />
        </svg>
    );
}

export function ChevronLeftIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M14.5 5.5L8 12l6.5 6.5" />
        </svg>
    );
}

export function ChevronRightIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M9.5 5.5L16 12l-6.5 6.5" />
        </svg>
    );
}

export function SearchIcon(props) {
    return (
        <svg {...base} {...props}>
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M20 20l-4.8-4.8" />
        </svg>
    );
}

export function PhoneIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M5 4.5h3.2l1.3 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.3V17.5a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.7 2 2 0 0 1 5 4.5z" />
        </svg>
    );
}

export function MailIcon(props) {
    return (
        <svg {...base} {...props}>
            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
            <path d="M4.5 7l7.5 6 7.5-6" />
        </svg>
    );
}

export function MapPinIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
        </svg>
    );
}

export function ClockIcon(props) {
    return (
        <svg {...base} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
        </svg>
    );
}
