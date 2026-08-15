export default function SectionHeading({ eyebrow, title, subtitle, className = '', align = 'center' }) {
    const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

    return (
        <div className={`max-w-2xl ${alignment} ${className}`}>
            {eyebrow && (
                <span className="text-sm font-bold uppercase tracking-widest text-kumo-600">
                    {eyebrow}
                </span>
            )}
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-3 text-lg text-gray-600">{subtitle}</p>}
        </div>
    );
}
