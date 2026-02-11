import { z } from "zod"

export const zoneSchema = z.object({
  x: z.number().describe("X position as percentage of image width (0-100)"),
  y: z.number().describe("Y position as percentage of image height (0-100)"),
  width: z.number().describe("Width as percentage of image width (1-50)"),
  height: z.number().describe("Height as percentage of image height (1-50)"),
  severity: z.enum(["faible", "modere", "severe"]).describe("Severity level"),
  label: z.string().describe("Short label describing the issue in French"),
})

export const diagnosticSchema = z.object({
  toitureType: z
    .string()
    .describe("Type de toiture identifie : tuiles, ardoises, zinc, bac acier, terrasse plate/bitume, toit vegetalise, fibrociment, chaume, autre. DOIT correspondre a ce qui est reellement visible sur l'image."),
  toitureDescription: z
    .string()
    .describe("Description factuelle de ce que l'on voit sur l'image satellite : forme du toit, couleur, materiaux visibles, orientation. 1-2 phrases."),
  summary: z
    .string()
    .describe("Overall summary of the roof condition in French, 2-3 sentences. Must be coherent with the roof type identified."),
  scoreGlobal: z
    .number()
    .describe("Overall roof health score from 0 (very bad) to 100 (perfect)"),
  vegetal: z.object({
    description: z
      .string()
      .describe(
        "Description of vegetation issues (lichen, moss) found, in French"
      ),
    zones: z
      .array(zoneSchema)
      .describe("Detected vegetation zones on the roof"),
    score: z
      .number()
      .describe("Vegetation health score from 0 (covered in moss) to 100 (clean)"),
  }),
  structure: z.object({
    description: z
      .string()
      .describe(
        "Description of structural issues (broken/displaced tiles) found, in French"
      ),
    zones: z
      .array(zoneSchema)
      .describe("Detected structural damage zones on the roof"),
    score: z
      .number()
      .describe(
        "Structural health score from 0 (severely damaged) to 100 (intact)"
      ),
  }),
  etancheite: z.object({
    description: z
      .string()
      .describe(
        "Description of waterproofing issues (moisture, leaks) found, in French"
      ),
    zones: z
      .array(zoneSchema)
      .describe("Detected waterproofing issue zones on the roof"),
    score: z
      .number()
      .describe(
        "Waterproofing score from 0 (major leak risk) to 100 (fully sealed)"
      ),
  }),
  recommandations: z
    .array(z.string())
    .describe("List of 3-5 recommended actions in French, ordered by priority"),
})

export type DiagnosticResult = z.infer<typeof diagnosticSchema>
export type DiagnosticZone = z.infer<typeof zoneSchema>
