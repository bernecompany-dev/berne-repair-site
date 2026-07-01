"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { captureAttribution } from "@/lib/attribution"

/**
 * Invisible. Records marketing attribution (ad click IDs, utm, referrer) on the
 * landing page and on each route change, so the converting form submission can
 * report the true channel. See lib/attribution.ts.
 */
export function AttributionCapture() {
  const pathname = usePathname()
  useEffect(() => {
    captureAttribution()
  }, [pathname])
  return null
}
