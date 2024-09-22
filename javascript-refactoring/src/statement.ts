import { Invoice, Play, Plays } from "./data/types"

/**
 * Generates a total invoice order for a customer with his booked performances
 * @param {Invoice} invoice   An invoice for each customer with all booked performances
 * @param {Plays} plays       Information of all plays to map the playID from the invoice.performances
 * @returns {string}          String with the total invoice order
 */

const generateInvoiceOrder = (invoice: Invoice, plays: Plays) => {
  let totalAmount = 0
  let volumeCredits = 0
  let invoiceOrderLog = ""

  // Calculate costs and credits for each play
  invoice.performances.forEach(({ playID, audience }) => {
    if (!plays[playID]) {
      throw new Error(`Performance with Play ID: ${playID} not found in plays`)
    }

    const play = plays[playID]
    const { playCosts, playVolumeCredits } = calculatePlayCosts(play, audience)

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
 * Calculates costs and credits for a booked play
 *
 * @param {Play} play
 * @param {number} audience Number of the audience in a play
 * @returns {{ playCosts: number; playVolumeCredits: number }}
 */
function calculatePlayCosts(
  play: Play,
  audience: number
): { playCosts: number; playVolumeCredits: number } {
  let thisAmount = 0
  let volumeCredits = 0
  switch (play.type) {
    case "tragedy":
      thisAmount = 40000
      if (audience > 30) {
        thisAmount += 1000 * (audience - 30)
      }
      break
    case "comedy":
      thisAmount = 30000
      if (audience > 20) {
        thisAmount += 10000 + 500 * (audience - 20)
      }
      thisAmount += 300 * audience
      break
    default:
      throw new Error(`unknown type: ${play.type}`)
  }

  // add volume credits
  volumeCredits += Math.max(audience - 30, 0)
  // add extra credit for every ten comedy attendees
  if ("comedy" === play.type) volumeCredits += Math.floor(audience / 5)

  return {
    playCosts: thisAmount,
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
