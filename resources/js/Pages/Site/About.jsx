import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeading from '@/Components/Site/SectionHeading';
import IconFeatureCard from '@/Components/Site/IconFeatureCard';
import VehiclePhotoPlaceholder from '@/Components/Site/VehiclePhotoPlaceholder';
import { WHY_CHOOSE_US } from '@/lib/content';

export default function About({ missionPhoto }) {
    const { dealershipSettings } = usePage().props;

    return (
        <PublicLayout>
            <Head title="Nosotros" />

            <section className="bg-gray-950 py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <span className="text-sm font-bold uppercase tracking-widest text-kumo-400">Nosotros</span>
                    <h1 className="mt-2 text-4xl font-black text-white">
                        {dealershipSettings?.hero_headline ?? 'La honestidad es nuestro motor'}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        En Kumo Motors creemos que comprar un auto seminuevo debe ser una experiencia clara,
                        transparente y sin presiones. Por eso revisamos cada unidad a fondo y te acompañamos
                        durante todo el proceso, desde la elección hasta el financiamiento.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <SectionHeading align="left" eyebrow="Quiénes somos" title="Nuestra historia" />
                <div className="mt-6 space-y-4 text-gray-600">
                    <p>
                        Kumo Motors nació de una idea simple: comprar un auto seminuevo no debería sentirse
                        como una apuesta. Empezamos como un equipo pequeño enfocado en revisar cada detalle
                        de los autos que ofrecemos, antes de siquiera pensar en publicarlos.
                    </p>
                    <p>
                        Con el tiempo, ese cuidado se volvió nuestra manera de trabajar: transparencia total
                        sobre el estado de cada unidad, asesoría honesta y acompañamiento después de la
                        compra. Así seguimos creciendo, un cliente satisfecho a la vez.
                    </p>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
                        {missionPhoto?.url ? (
                            <img src={missionPhoto.url} alt={missionPhoto.title} className="h-full w-full object-cover" />
                        ) : (
                            <VehiclePhotoPlaceholder brand="Kumo" model="Motors" className="h-full w-full" />
                        )}
                    </div>
                    <div>
                        <SectionHeading align="left" eyebrow="Nuestro compromiso" title="Nuestra misión" />
                        <p className="mt-4 text-gray-600">
                            Ofrecer a nuestros clientes acceso a autos seminuevos certificados, con historial
                            claro y condiciones justas de financiamiento, respaldados por un servicio cercano
                            de principio a fin.
                        </p>
                        <p className="mt-4 text-gray-600">
                            Nos comprometemos a que cada compra en Kumo Motors sea una experiencia honesta,
                            construida sobre la confianza que nuestro lema promete.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8">
                <SectionHeading eyebrow="Nuestros valores" title="¿Por qué elegir Kumo Motors?" />

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {WHY_CHOOSE_US.map((item) => (
                        <IconFeatureCard key={item.title} {...item} />
                    ))}
                </div>
            </section>

            <section className="bg-kumo-600">
                <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-white">
                        Conócenos en persona, te esperamos con gusto
                    </h2>
                    {dealershipSettings?.address && (
                        <p className="mt-3 text-kumo-50">{dealershipSettings.address}</p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
