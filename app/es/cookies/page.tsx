import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/data/company";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: `Qué cookies establece ${COMPANY.legalName}, para qué sirven y cómo desactivarlas.`,
  alternates: {
    canonical: "/es/cookies",
    languages: {
      "en-US": absoluteUrl("/cookies"),
      "es-US": absoluteUrl("/es/cookies"),
      "x-default": absoluteUrl("/cookies"),
    },
  },
  robots: { index: true, follow: true },
};

export default function CookiesPageES() {
  return (
    <article className="container-prose py-16 sm:py-20 max-w-3xl">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/es" className="hover:text-foreground">Inicio</Link>
        <span aria-hidden>/</span>
        <span className="text-foreground/80">Cookies</span>
      </nav>
      <h1 className="text-4xl font-semibold tracking-tight">Política de Cookies</h1>
      <p className="mt-3 text-sm text-muted-foreground">Última actualización: 2026-05-20</p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
        <p>
          Esta página explica qué cookies y tecnologías de almacenamiento
          similares usa {COMPANY.legalName} en{" "}
          <a href={COMPANY.url} className="text-brand hover:underline">{COMPANY.url}</a>{" "}
          y cómo controlarlas. Mantenemos el uso de cookies al mínimo: no
          ejecutamos rastreadores publicitarios de terceros.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos de texto que un sitio guarda en su
          navegador. Permiten al sitio recordar preferencias (como el idioma),
          medir tráfico agregado y proteger formularios del abuso automatizado.
          También usamos almacenamiento de navegador relacionado (localStorage,
          sessionStorage) para los mismos fines.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Cookies que establecemos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Esenciales</strong> — protección anti-spam del formulario
            (un token único) y una cookie de enrutamiento que evita envíos
            duplicados. Las establecemos nosotros y no pueden desactivarse sin
            romper el formulario.
          </li>
          <li>
            <strong>Funcionales</strong> — su elección de idioma (inglés o
            español) se guarda en localStorage para servir la versión correcta
            en visitas posteriores. Ningún tercero la lee.
          </li>
          <li>
            <strong>Analítica</strong> — Google Analytics 4 establece cookies
            de primera parte (<code>_ga</code>, <code>_ga_*</code>) con IP
            anonimizada para ver páginas vistas agregadas, fuentes de tráfico
            y qué servicios consultan los clientes. No se envían identificadores
            personales.
          </li>
          <li>
            <strong>Mapas embebidos</strong> — Google Maps puede establecer sus
            propias cookies cuando un mapa se carga en páginas de ciudades.
            Desactive bloqueando cookies de terceros; el mapa simplemente no se
            renderizará.
          </li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Lo que no usamos</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Sin Facebook Pixel ni rastreo de Meta.</li>
          <li>Sin cookies de retargeting / publicidad.</li>
          <li>Sin píxeles de rastreo entre sitios.</li>
          <li>Sin venta de datos de ningún tipo.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Cómo controlar las cookies</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Bloquee o elimine cookies en la configuración del navegador (Chrome, Safari, Firefox, Edge — todos soportan control por sitio).</li>
          <li>Active "Do Not Track" o la señal "Global Privacy Control" del navegador — honramos ambas.</li>
          <li>Opte por no participar de Google Analytics instalando la <a className="text-brand hover:underline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">extensión oficial de exclusión de GA</a>.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Actualizaciones</h2>
        <p>
          Si agregamos o eliminamos cookies actualizaremos esta página. Vea la{" "}
          <Link href="/es/privacy" className="text-brand hover:underline">Política de Privacidad</Link>{" "}
          para el cuadro completo de lo que recopilamos y por qué.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Contacto</h2>
        <p>
          Preguntas: escriba a{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>{" "}
          o llame al{" "}
          <a href={`tel:${COMPANY.phone.tel}`} className="text-brand hover:underline">{COMPANY.phone.display}</a>.
        </p>
      </div>
    </article>
  );
}
