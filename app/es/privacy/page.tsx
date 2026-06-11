import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/data/company";
import { absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = "Política de Privacidad";
const PAGE_DESCRIPTION = `Cómo ${COMPANY.legalName} recopila, usa y protege la información de visitantes y clientes.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/es/privacy",
    languages: {
      "en-US": absoluteUrl("/privacy"),
      "es-US": absoluteUrl("/es/privacy"),
      "x-default": absoluteUrl("/privacy"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/es/privacy", locale: "es" }),
  robots: { index: true, follow: true },
};

export default function PrivacyPageES() {
  return (
    <article className="container-prose py-16 sm:py-20 max-w-3xl">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/es" className="hover:text-foreground">Inicio</Link>
        <span aria-hidden>/</span>
        <span className="text-foreground/80">Privacidad</span>
      </nav>
      <h1 className="text-4xl font-semibold tracking-tight">Política de Privacidad</h1>
      <p className="mt-3 text-sm text-muted-foreground">Última actualización: 2026-05-16</p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
        <p>
          {COMPANY.legalName} ("nosotros," "nuestro") respeta su privacidad. Esta política explica qué
          información recopilamos cuando usted visita{" "}
          <a href={COMPANY.url} className="text-brand hover:underline">{COMPANY.url}</a>{" "}
          o nos contacta para servicio de reparación de electrodomésticos, y cómo la usamos.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Qué recopilamos</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Datos del formulario</strong>: su nombre, teléfono, correo opcional, ciudad, tipo de electrodoméstico, marca opcional y descripción libre del problema.</li>
          <li><strong>Datos técnicos</strong>: dirección IP anónima, tipo de navegador, páginas visitadas, fuente de referencia — recopilados automáticamente vía Google Analytics 4.</li>
          <li><strong>Cookies</strong>: GA4 establece cookies de primera parte para medir visitas. No usamos rastreadores publicitarios.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Cómo la usamos</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Contactarle para programar, diagnosticar y completar la reparación solicitada.</li>
          <li>Enviar recibo, confirmación de garantía y seguimiento sobre el mismo trabajo.</li>
          <li>Mejorar nuestro sitio y entender qué servicios necesitan los clientes.</li>
        </ul>
        <p>
          <strong>No vendemos, alquilamos ni comerciamos</strong> con su información. No enviamos correo
          ni SMS de marketing no solicitado a menos que usted lo autorice expresamente.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Llamadas y mensajes de texto (TCPA)</h2>
        <p>
          Al enviar nuestro formulario y marcar la casilla de consentimiento, usted acepta que{" "}
          {COMPANY.legalName} pueda contactarle por teléfono o SMS al número proporcionado sobre su
          solicitud de reparación. Pueden aplicar tarifas estándar de mensajería y datos. Puede
          cancelar en cualquier momento respondiendo STOP a cualquier texto o avisando a despacho.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Retención</h2>
        <p>
          Conservamos información del cliente durante el período de garantía (90 días después del último
          servicio) más 2 años para fines fiscales y resolución de disputas. Puede solicitar eliminación
          antes escribiendo a{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Terceros</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Resend</strong> — proveedor de correo transaccional para notificaciones de leads.</li>
          <li><strong>Vercel</strong> — alojamiento del sitio. Registra datos mínimos por ~30 días.</li>
          <li><strong>Google Analytics 4</strong> — medición de tráfico agregado.</li>
          <li><strong>Google Maps</strong> — mapas embebidos en páginas de ciudades. Sujeto a la política de Google.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Sus derechos</h2>
        <p>
          Si reside en Florida o tiene derecho a otras protecciones de privacidad del consumidor, puede
          solicitar acceso, corrección o eliminación de su información personal escribiendo a{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>
          . Responderemos dentro de 30 días.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Contacto</h2>
        <p>
          Preguntas: llame al{" "}
          <a href={`tel:${COMPANY.phone.tel}`} className="text-brand hover:underline">{COMPANY.phone.display}</a>{" "}
          o escriba a{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>.
        </p>
      </div>
    </article>
  );
}
