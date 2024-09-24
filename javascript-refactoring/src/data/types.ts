export type Invoice = {
  customer: string
  performances: { playID: string; audience: number }[]
}

export type Play = {
  name: string
  type: PlayTypes
}

export type Plays = {
  [key: string]: Play
}

export type PlayCostInformation = {
  baseCosts: number
  audienceTreshold: number
  audienceTresholdBaseCosts: number
  audienceTresholdCostsFactor: number
  extraCostsFactor: number
  volumeCreditsBonus: number
  volumeCreditsTreshold: number
}

export type PlayCostInformations = {
  [key in PlayTypes]: PlayCostInformation
}

type PlayTypes = "tragedy" | "comedy"
