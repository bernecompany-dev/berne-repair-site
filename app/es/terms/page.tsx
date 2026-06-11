import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/data/company";
import { absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = "Términos de Servicio";
const PAGE_DESCRIPTION = `Alcance del servicio, reservas, precios, garantía, pago y resolución de disputas para clientes de ${COMPANY.legalName}.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/es/terms",
    languages: {
      "en-US": absoluteUrl("/terms"),
      "es-US": absoluteUrl("/es/terms"),
      "x-default": absoluteUrl("/terms"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/es/terms", locale: "es" }),
  robots: { index: true, follow: true },
};

export default function TermsPageES() {
  return (
    <article className="container-prose py-16 sm:py-20 max-w-3xl">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/es" className="hover:text-foreground">Inicio</Link>
        <span aria-hidden>/</span>
        <span className="text-foreground/80">Términos</span>
      </nav>
      <h1 className="text-4xl font-semibold tracking-tight">Términos de Servicio</h1>
      <p className="mt-3 text-sm text-muted-foreground">Última actualización: 2026-05-20</p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
        <p>
          Estos términos rigen el servicio de reparación de electrodomésticos
          que usted solicita a {COMPANY.legalName} ("nosotros," "nuestro") a
          través de{" "}
          <a href={COMPANY.url} className="text-brand hover:underline">{COMPANY.url}</a>,
          por teléfono o por mensaje directo. Al enviar una solicitud o aceptar
          una cita programada, usted acepta estos términos.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">1. Alcance del servicio</h2>
        <p>
          Brindamos servicio en el hogar de diagnóstico, reparación y
          mantenimiento para electrodomésticos residenciales — refrigeradores,
          lavadoras, secadoras, lavavajillas, hornos, estufas, microondas,
          máquinas de hielo y cavas de vino — en Miami-Dade, Broward, Palm
          Beach y condados selectos de la Costa del Golfo (Hillsborough,
          Sarasota, Collier, Pinellas, Lee).
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">2. Reservas y despacho</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Un formulario enviado es una <em>solicitud</em> de servicio, no una cita confirmada. Confirmamos por teléfono antes de despachar.</li>
          <li>Las ventanas el mismo día se ofrecen según capacidad; el clima, la disponibilidad de partes y la carga de despacho pueden cambiar la ventana.</li>
          <li>Las ventanas de llegada típicas son de 2 horas; avisamos por llamada o texto 30 minutos antes.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">3. Tarifa de diagnóstico y precios</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>La tarifa residencial de llamada de servicio (diagnóstico) es de <strong>${COMPANY.serviceCallPrice}</strong>. Se aplica al costo de la reparación si autoriza el trabajo el mismo día.</li>
          <li>Los precios por reparación son tarifa plana y se entregan por escrito antes de iniciar el trabajo.</li>
          <li>Los costos de partes se informan por adelantado. Las partes de pedido especial pueden requerir depósito no reembolsable.</li>
          <li>Usted autoriza las reparaciones por escrito (firma digital o estimado firmado) antes de pedir partes o comenzar el trabajo.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">4. Garantía</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>{COMPANY.socialProof.warranty}</strong> sobre la mano de obra de las reparaciones completadas.</li>
          <li>Garantía del fabricante sobre las partes OEM según se suministren (típicamente 1 año).</li>
          <li>La garantía se anula si el electrodoméstico es modificado o reparado por un tercero después de nuestra reparación, si la falla no se relaciona con el trabajo original, o si el equipo sufre daño por agua, sobretensión, abuso o plagas.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">5. Limitaciones y responsabilidades del cliente</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>No transportamos, desechamos ni reciclamos electrodomésticos o partes reemplazadas a menos que se acuerde por separado.</li>
          <li>No realizamos recuperación de refrigerante más allá de lo requerido para una reparación conforme (EPA Sección 608).</li>
          <li>El servicio requiere acceso razonable. Comunidades cerradas, cuartos de servicio bajo llave y limitaciones de estacionamiento requieren aviso previo.</li>
          <li>El cliente es responsable de despejar el área de trabajo y asegurar a las mascotas antes de la llegada del técnico.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">6. Pago</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>El pago vence al completar el servicio. Aceptamos efectivo, tarjeta de crédito/débito, Zelle y Apple Pay.</li>
          <li>Los saldos vencidos pueden acumular 1.5% de interés mensual después de 30 días.</li>
          <li>Cargo por pago rechazado: $35 por ocurrencia.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">7. Cancelación y no-show</h2>
        <p>
          Puede cancelar o reprogramar sin cargo hasta 2 horas antes de la
          ventana de llegada. Cancelaciones dentro de ese plazo, o no-shows
          cuando el técnico llega, pueden generar un cargo de viaje de $59 que
          cubre el tiempo de despacho.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">8. Limitación de responsabilidad</h2>
        <p>
          Nuestra responsabilidad máxima por cualquier reclamo derivado de una
          visita de servicio se limita al monto que usted pagó por esa visita.
          No somos responsables de daños consecuentes (deterioro de alimentos,
          daño por agua, interrupción del negocio) salvo cuando sean causados
          por nuestra negligencia grave y no estén cubiertos por su seguro de
          propietario.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">9. Resolución de disputas</h2>
        <p>
          Estos términos se rigen por la ley de Florida. Cualquier disputa que
          no pueda resolverse directamente con nuestro despacho se someterá a
          arbitraje vinculante en el condado de Broward, Florida, antes de
          cualquier acción judicial. Cada parte asume sus propios costos de
          arbitraje salvo decisión contraria del árbitro.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">10. Actualizaciones</h2>
        <p>
          Podemos actualizar estos términos; los cambios materiales se publican
          aquí con una nueva fecha de "Última actualización." El uso continuado
          del servicio después de la fecha publicada constituye aceptación.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Contacto</h2>
        <p>
          Preguntas: llame al{" "}
          <a href={`tel:${COMPANY.phone.tel}`} className="text-brand hover:underline">{COMPANY.phone.display}</a>{" "}
          o escriba a{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>.
        </p>
        <p className="text-xs text-muted-foreground">
          Vea también: <Link href="/es/privacy" className="hover:text-brand">Política de Privacidad</Link>{" "}
          · <Link href="/es/cookies" className="hover:text-brand">Política de Cookies</Link>
        </p>
      </div>
    </article>
  );
}
