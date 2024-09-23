import { Invoice, Play, Plays, PlayCostInformations } from "./data/types"

/**
 * Generates a total invoice order for a customer with his booked performances
 * @param {Invoice} invoice   An invoice of a customer with all his booked performances
 * @param {Plays} plays       Information of all plays to map the playID from the performances of an invoice
 * @param {PlayCostInformations} playCostInformations Holds additional information for the costs of all plays
 * @returns {string}          String with the total invoice order
 */

const generateInvoiceOrder = (
  invoice: Invoice,
  plays: Plays,
  playCostInformations: PlayCostInformations
) => {
  let totalAmount = 0
  let volumeCredits = 0
  let invoiceOrderLog = ""

  // Calculate costs and credits for each play
  invoice.performances.forEach(({ playID, audience }) => {
    if (!plays[playID]) {
      throw new Error(`Performance with Play ID: ${playID} not found in plays`)
    }

    const play = plays[playID]
    const { playCosts, playVolumeCredits } = calculatePlayCosts(
      play,
      playCostInformations,
      audience
    )

    // Update variables for this play
    invoiceOrderLog += `  ${play.name}: ${format(
      playCosts
    )} (${audience} seats)\n`
    totalAmount += playCosts
    volumeCredits += playVolumeCredits
  })

  // Add final sum and credits to statement
  return (
    `Statement for ${invoice.customer}\n` +
    `${invoiceOrderLog}` +
    `Amount owed is ${format(totalAmount)}\n` +
    `You earned ${volumeCredits} credits\n`
  )
}

/**
 * Calculates costs and credits for a booked play of an invoice
 *
 * @param {Play} play The booked play for which the costs are being calculated
 * @param {PlayCostInformations} playCostInformations   Holds additional information for the costs of all plays
 * @param {number} audience Number of the audience in a play
 * @returns {{ playCosts: number; playVolumeCredits: number }} Object with calculated costs of the booked play and credits earned
 */
const calculatePlayCosts = (
  play: Play,
  playCostInformations: PlayCostInformations,
  audience: number
): { playCosts: number; playVolumeCredits: number } => {
  const costInformation = playCostInformations[play.type]
  if (!costInformation) {
    throw new Error(`Playtype: ${play.type} not found in playCostInformations`)
  }

  // Calculate costs for a play based on the playCostInformations
  let extraCosts = 0
  if (audience > costInformation.audienceTreshold) {
    extraCosts =
      costInformation.audienceTresholdBaseCosts +
      costInformation.audienceTresholdCostsFactor *
        (audience - costInformation.audienceTreshold)
  }

  const playCosts =
    costInformation.baseCosts +
    costInformation.extraCostsFactor * audience +
    extraCosts

  // Add volume credits and extra credit based on attendees bonus number
  let extraCredits = 0
  if (costInformation.volumeCreditsBonus > 0) {
    extraCredits = Math.floor(audience / costInformation.volumeCreditsBonus)
  }
  const volumeCredits = Math.max(audience - 30, 0) + extraCredits

  return {
    playCosts: playCosts,
    playVolumeCredits: volumeCredits,
  }
}

const format = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100)
}

export default generateInvoiceOrder
