"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
// import posthog from "posthog-js"
import {
  exportSessionSummaryCSVAction,
  exportSessionSummaryPDFAction
} from "@/actions/reports-actions"

export default function ReportsPage() {
  // Mock session data for demonstration
  const [calls] = useState(["B-7", "I-16", "N-35", "G-58", "O-62"])
  const [winners] = useState(["Jane Doe", "John Smith"])
  const [timestamps] = useState(["2025-01-10 09:01", "2025-01-10 09:12"])

  // Client side track
  const handleExportPDF = async () => {
    // Track with PostHog client side (optional or in addition to server)
    // posthog.capture("export_pdf_client", { source: "ReportsPage" })

    try {
      const pdfBase64 = await exportSessionSummaryPDFAction()
      const pdfBlob = base64ToBlob(pdfBase64, "application/pdf")
      const url = URL.createObjectURL(pdfBlob)

      // Trigger download
      const link = document.createElement("a")
      link.href = url
      link.download = "session-summary.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Error exporting PDF:", err)
    }
  }

  const handleExportCSV = async () => {
    // Track with PostHog client side (optional or in addition to server)
    // posthog.capture("export_csv_client", { source: "ReportsPage" })

    try {
      const csvString = await exportSessionSummaryCSVAction()
      // Create a downloadable blob for CSV
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)

      // Trigger download
      const link = document.createElement("a")
      link.href = url
      link.download = "session-summary.csv"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Error exporting CSV:", err)
    }
  }

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Reports & Analytics</h2>

      <div className="mb-4 text-sm">
        <p>
          <strong>Calls:</strong> {calls.join(", ")}
        </p>
        <p>
          <strong>Winners:</strong> {winners.join(", ")}
        </p>
        <p>
          <strong>Timestamps:</strong> {timestamps.join(", ")}
        </p>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleExportCSV}>Export CSV</Button>
        <Button variant="outline" onClick={handleExportPDF}>
          Export PDF
        </Button>
      </div>
    </div>
  )
}

// Utility to convert base64 to Blob
function base64ToBlob(base64: string, contentType: string) {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: contentType })
}
