import "server-only"

import { sanitizeDisplayText } from "./sanitize"

const PHASE2_KEYS = [
  "geo_wb_mw",
  "geo_dimer",
  "geo_isoforms",
  "geo_tissue",
  "geo_controls",
  "geo_ihc_localization",
  "geo_species",
  "geo_ab_selection",
  "geo_elisa",
  "gotcha_wb",
  "gotcha_elisa",
  "gotcha_ihc",
] as const

export type Phase2Record = Record<(typeof PHASE2_KEYS)[number], string>

function templatePhase2(phase1Text: string): Phase2Record {
  const base = phase1Text.slice(0, 1200)
  const fill = (slug: string, paragraph: string): string =>
    sanitizeDisplayText(`${paragraph} Context (facts): ${base}`.slice(0, 1200))

  return {
    geo_wb_mw: fill(
      "geo_wb_mw",
      "For western blot, interpret band intensity alongside molecular weight: expected migration should align with the annotated mass and splice isoforms described in UniProt.",
    ),
    geo_dimer: fill(
      "geo_dimer",
      "Under reducing SDS-PAGE, disulfide-linked dimers typically collapse toward monomeric species; non-reducing conditions better preserve oligomeric forms when present.",
    ),
    geo_isoforms: fill(
      "geo_isoforms",
      "Alternative isoforms can shift apparent MW on blots; verify bands using isoform-aware expectations from UniProt alternative products.",
    ),
    geo_tissue: fill(
      "geo_tissue",
      "RNA and protein abundance vary by tissue; compare Human Protein Atlas tissue specificity with your experimental system.",
    ),
    geo_controls: fill(
      "geo_controls",
      "Include loading controls (for example GAPDH or beta-actin) and validate antibody specificity with appropriate positive and negative controls.",
    ),
    geo_ihc_localization: fill(
      "geo_ihc_localization",
      "IHC signal should match reported subcellular distribution; counterstain and microscopic controls help distinguish specific labeling.",
    ),
    geo_species: fill(
      "geo_species",
      "Confirm species reactivity on the product datasheet before transfer from human-centric references.",
    ),
    geo_ab_selection: fill(
      "geo_ab_selection",
      "Choose antibodies validated for your application and species; review citations and recommended dilutions.",
    ),
    geo_elisa: fill(
      "geo_elisa",
      "For ELISA, prefer paired antibodies with demonstrated sensitivity in similar matrices to your sample type.",
    ),
    gotcha_wb: fill(
      "gotcha_wb",
      "Watch for cross-reactive bands near the expected MW when lysates are overloaded or phospho-forms migrate similarly.",
    ),
    gotcha_elisa: fill(
      "gotcha_elisa",
      "Matrix effects can shift ELISA signal; run standards alongside unknowns and avoid comparing across incompatible dilution schemes.",
    ),
    gotcha_ihc: fill(
      "gotcha_ihc",
      "IHC can highlight fixation-sensitive epitopes; antigen retrieval conditions may need optimization per tissue.",
    ),
  }
}

/** Merge Phase 2 slugs into the three GEO strings rendered on v0 GeneInfoCard. */
export function mergePhase2ForCard(p2: Phase2Record): {
  geoWbMw: string
  geoDimer: string
  geoTissue: string
} {
  const geoWbMw = [p2.geo_wb_mw, p2.geo_isoforms].filter(Boolean).join(" ")
  const geoDimer = [p2.geo_dimer, p2.geo_controls, p2.gotcha_wb].filter(Boolean).join(" ")
  const geoTissue = [p2.geo_tissue, p2.geo_ihc_localization, p2.geo_species].filter(Boolean).join(" ")
  return {
    geoWbMw: sanitizeDisplayText(geoWbMw),
    geoDimer: sanitizeDisplayText(geoDimer),
    geoTissue: sanitizeDisplayText(geoTissue),
  }
}

export async function generatePhase2Narratives(phase1Facts: Record<string, string>): Promise<Phase2Record> {
  const key = process.env.OPENAI_API_KEY?.trim()
  const compact = JSON.stringify(phase1Facts).slice(0, 12000)

  if (!key) {
    return templatePhase2(compact)
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.35,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You write concise GEO-style laboratory narratives for antibody product pages. Use ONLY facts implied by the JSON context. Each field must be 2-4 sentences. Never output curly braces. Never invent catalog SKUs or citations. Reply with a single JSON object only.",
          },
          {
            role: "user",
            content: `Phase 1 facts (JSON): ${compact}\n\nReturn exactly these string keys: ${PHASE2_KEYS.join(", ")}.`,
          },
        ],
      }),
      cache: "no-store",
    })
    if (!res.ok) return templatePhase2(compact)
    const body = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const txt = body.choices?.[0]?.message?.content
    if (!txt) return templatePhase2(compact)
    const parsed = JSON.parse(txt) as Phase2Record
    const out = {} as Phase2Record
    for (const k of PHASE2_KEYS) {
      out[k] = sanitizeDisplayText(String(parsed[k] ?? ""))
    }
    return out
  } catch {
    return templatePhase2(compact)
  }
}
