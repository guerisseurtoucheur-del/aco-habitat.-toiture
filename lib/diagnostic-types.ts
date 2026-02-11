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
  surfaceEstimeeM2: z
    .number()
    .describe("Estimation de la surface de la toiture en metres carres. Estime en fonction de la taille visible du batiment sur l'image satellite. Pour un toit en pente, prendre en compte l'inclinaison (environ +15-30% par rapport a l'emprise au sol). Donne un chiffre entier realiste."),
  surfacePrecision: z
    .string()
    .describe("Precision de l'estimation : 'haute' si batiment bien visible et isole, 'moyenne' si partiellement cache ou dense, 'faible' si difficile a delimiter. Un seul mot."),
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
  thermique: z.object({
    scoreIsolation: z
      .number()
      .describe("Score d'isolation thermique de 0 (tres mauvaise isolation, perte de chaleur massive) a 100 (excellente isolation). Base sur le type de toiture, l'age apparent, et les materiaux visibles. Tuiles anciennes sans isolation visible = 30-50. Terrasse plate non isolee = 20-40. Toiture recente avec bonne isolation apparente = 70-90."),
    pertesChaleur: z
      .array(z.object({
        x: z.number().describe("X position en pourcentage (0-100)"),
        y: z.number().describe("Y position en pourcentage (0-100)"),
        width: z.number().describe("Largeur en pourcentage (5-40)"),
        height: z.number().describe("Hauteur en pourcentage (5-40)"),
        intensite: z.number().describe("Intensite de perte de chaleur en pourcentage (5-30). Zones sombres/deteriorees = intensite elevee."),
        label: z.string().describe("Description courte de la zone de perte en francais"),
      }))
      .describe("Zones de perte de chaleur detectees sur le toit. Basees sur les zones deteriorees, les jonctions, les points faibles structurels visibles. 1-4 zones max."),
    economieEstimee: z
      .number()
      .describe("Estimation de l'economie annuelle en euros si le client refait son isolation. Base sur la surface estimee et le score d'isolation. Formule approximative : (100 - scoreIsolation) * surfaceM2 * 0.8. Donne un chiffre entier realiste entre 200 et 5000."),
    commentaire: z
      .string()
      .describe("Commentaire court (1-2 phrases) sur l'etat thermique de la toiture en francais."),
  }),
})

export type DiagnosticResult = z.infer<typeof diagnosticSchema>
export type DiagnosticZone = z.infer<typeof zoneSchema>
