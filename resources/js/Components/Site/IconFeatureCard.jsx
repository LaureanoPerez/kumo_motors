import { ShieldIcon, AwardIcon, UsersIcon, SparklesIcon } from '@/Components/Site/Icons';

const ICONS = {
    shield: ShieldIcon,
    award: AwardIcon,
    users: UsersIcon,
    sparkles: SparklesIcon,
};

export default function IconFeatureCard({ icon, title, description }) {
    const Icon = ICONS[icon] ?? ShieldIcon;

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-kumo-50 text-kumo-600">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
    );
}
