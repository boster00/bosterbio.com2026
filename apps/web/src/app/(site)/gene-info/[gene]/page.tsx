import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GeneInfoCard from "@/components/gene-info-card/GeneInfoCard"
import { BIOMARKER_GENES } from "@/lib/gene-info/biomarkers"
import { loadGeneCardProps } from "@/lib/gene-info/load-gene-card-props"

export const revalidate = 86400

type Props = { params: Promise<{ gene: string }> }

export async function generateStaticParams() {
  return BIOMARKER_GENES.map((gene) => ({ gene }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gene } = await params
  const symbol = decodeURIComponent(gene).toUpperCase()
  return {
    title: `${symbol} — Gene / protein reference | Boster Bio`,
    description: `Gene overview, western blot notes, tissue expression context, and antibody resources for ${symbol}.`,
  }
}

export default async function GeneInfoPage({ params }: Props) {
  const { gene } = await params
  const props = await loadGeneCardProps(gene)
  if (!props) notFound()
  return <GeneInfoCard {...props} />
}
