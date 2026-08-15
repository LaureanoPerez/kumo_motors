export default function StarRating({ rating, className = '' }) {
    return (
        <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} de 5 estrellas`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 ${star <= rating ? 'fill-kumo-500' : 'fill-gray-200'}`}
                >
                    <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5z" />
                </svg>
            ))}
        </div>
    );
}
