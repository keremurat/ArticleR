"use client"

import { useReportWebVitals } from "next/web-vitals"
import { track } from "@vercel/analytics"

const WARNING_THRESHOLDS: Partial<Record<string, number>> = {
  CLS: 0.25,
  FCP: 3000,
  INP: 500,
  LCP: 4000,
  TTFB: 1800,
}

const EXCEED_WINDOW_MS = 24 * 60 * 60 * 1000
const EXCEED_ALERT_THRESHOLD = 20
const ALERT_COOLDOWN_MS = 6 * 60 * 60 * 1000
const EXCEED_STORAGE_KEY = "scholar-web-vitals-exceedances"
const ALERT_STORAGE_KEY = "scholar-web-vitals-last-alert-at"

function collectRecentExceedances(now: number): number {
  if (typeof window === "undefined") {
    return 0
  }

  const cutoff = now - EXCEED_WINDOW_MS
  const stored = localStorage.getItem(EXCEED_STORAGE_KEY)

  let timestamps: number[] = []
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as number[]
      if (Array.isArray(parsed)) {
        timestamps = parsed.filter((timestamp) => Number.isFinite(timestamp) && timestamp >= cutoff)
      }
    } catch {
      timestamps = []
    }
  }

  timestamps.push(now)
  localStorage.setItem(EXCEED_STORAGE_KEY, JSON.stringify(timestamps))
  return timestamps.length
}

function shouldEmitWindowAlert(now: number): boolean {
  if (typeof window === "undefined") {
    return false
  }

  const lastAlertRaw = localStorage.getItem(ALERT_STORAGE_KEY)
  const lastAlertAt = lastAlertRaw ? Number(lastAlertRaw) : 0

  if (!Number.isFinite(lastAlertAt) || now - lastAlertAt >= ALERT_COOLDOWN_MS) {
    localStorage.setItem(ALERT_STORAGE_KEY, String(now))
    return true
  }

  return false
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const value = Number(metric.value.toFixed(2))
    const delta = Number(metric.delta.toFixed(2))
    const threshold = WARNING_THRESHOLDS[metric.name]
    const thresholdExceeded = typeof threshold === "number" && value > threshold

    if (process.env.NODE_ENV !== "production") {
      console.debug(`[WebVitals] ${metric.name}`, {
        value,
        delta,
        rating: metric.rating,
        id: metric.id,
      })

      if (thresholdExceeded) {
        console.warn(`[WebVitals][ThresholdExceeded] ${metric.name}`, {
          value,
          threshold,
          rating: metric.rating,
          id: metric.id,
        })
      }
    }

    track("web_vital", {
      name: metric.name,
      value,
      delta,
      rating: metric.rating ?? "unknown",
      id: metric.id,
      navigationType: metric.navigationType ?? "unknown",
    })

    if (thresholdExceeded) {
      track("web_vital_threshold_exceeded", {
        name: metric.name,
        value,
        threshold,
        delta,
        rating: metric.rating ?? "unknown",
        id: metric.id,
        navigationType: metric.navigationType ?? "unknown",
      })

      const now = Date.now()
      const exceedancesLast24h = collectRecentExceedances(now)

      if (exceedancesLast24h >= EXCEED_ALERT_THRESHOLD && shouldEmitWindowAlert(now)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[WebVitals][WindowAlert] 24h exceedance threshold reached", {
            exceedancesLast24h,
            threshold: EXCEED_ALERT_THRESHOLD,
          })
        }

        track("web_vital_window_alert", {
          exceedancesLast24h,
          threshold: EXCEED_ALERT_THRESHOLD,
          windowHours: 24,
        })
      }
    }
  })

  return null
}