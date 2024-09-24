import { Plays, PlayCostInformations } from "./types"

export const plays: Plays = {
  "hamlet": {
    name: "Hamlet",
    type: "tragedy",
  },
  "as-like": {
    name: "As You Like It",
    type: "comedy",
  },
  "othello": {
    name: "Othello",
    type: "tragedy",
  },
}

export const playCostInformations: PlayCostInformations = {
  "comedy": {
    baseCosts: 30000,
    audienceTreshold: 20,
    audienceTresholdBaseCosts: 10000,
    audienceTresholdCostsFactor: 500,
    extraCostsFactor: 300,
    volumeCreditsBonus: 10,
    volumeCreditsTreshold: 30,
  },
  "tragedy": {
    baseCosts: 40000,
    audienceTreshold: 30,
    audienceTresholdBaseCosts: 0,
    audienceTresholdCostsFactor: 1000,
    extraCostsFactor: 0,
    volumeCreditsBonus: 0,
    volumeCreditsTreshold: 30,
  },
}
