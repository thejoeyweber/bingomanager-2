"use server"

import { PDFDocument, StandardFonts } from "pdf-lib"
// import { PostHog } from 'posthog-node'

// const client = new PostHog(process.env.POSTHOG_KEY || '')

// Mock session data for demonstration
const mockSessionData = {
  calls: ["B-7", "I-16", "N-35", "G-58", "O-62"],
  winners: ["Jane Doe", "John Smith"],
  timestamps: ["2025-01-10 09:01", "2025-01-10 09:12"]
}

/**
 * Creates a CSV string from mock session data.
 */
export async function exportSessionSummaryCSVAction(): Promise<string> {
  // Track an event with PostHog (server-side)
  // (If you only set up PostHog client side, remove this or handle differently.)
  // try {
  //   client.capture({
  //     distinctId: 'server',
  //     event: 'export_csv',
  //     properties: { source: 'ReportsPage' }
  //   })
  // } catch (error) {
  //   console.error("PostHog server capture error:", error)
  // }

  // Build CSV
  // For demonstration, each column is "calls", "winners", "timestamps"
  let csv = "calls,winners,timestamps\n"
  // Just show them as pipe-delimited if there's multiple calls or winners
  csv += `"${mockSessionData.calls.join(" | ")}","${mockSessionData.winners.join(
    " | "
  )}","${mockSessionData.timestamps.join(" | ")}"\n`

  return csv
}

/**
 * Creates a basic PDF from mock session data using pdf-lib and returns base64 string.
 */
export async function exportSessionSummaryPDFAction(): Promise<string> {
  // Track an event with PostHog (server-side)
  // try {
  //   posthog.capture("export_pdf", { source: "ReportsPage" })
  // } catch (error) {
  //   console.error("PostHog server capture error:", error)
  // }

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Title
  const title = "Session Summary (Mock)"
  page.drawText(title, {
    x: 50,
    y: height - 50,
    size: 18,
    font
  })

  // Calls
  const callsLabel = "Calls: " + mockSessionData.calls.join(", ")
  page.drawText(callsLabel, {
    x: 50,
    y: height - 80,
    size: 12,
    font
  })

  // Winners
  const winnersLabel = "Winners: " + mockSessionData.winners.join(", ")
  page.drawText(winnersLabel, {
    x: 50,
    y: height - 100,
    size: 12,
    font
  })

  // Timestamps
  const timestampsLabel = "Timestamps: " + mockSessionData.timestamps.join(", ")
  page.drawText(timestampsLabel, {
    x: 50,
    y: height - 120,
    size: 12,
    font
  })

  // Finalize the PDF
  const pdfBytes = await pdfDoc.save()
  // Return base64-encoded PDF
  return Buffer.from(pdfBytes).toString("base64")
}