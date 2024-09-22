import { Invoice, Play } from "./data/types"
import { Plays } from "./data/types"

const format = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100)
}

/**
 *
 * @param invoice   An invoice for each customer with his performances
 * @param plays     Information of all plays to map the playID from the invoice.performances
 * @returns         String with the total invoice order
 */
const statement = (invoice: Invoice, plays: Plays) => {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`

  invoice.performances.forEach(({ playID, audience }) => {
    if (!plays[playID]) throw new Error(`${playID} not found in plays`)

    const play = plays[playID]
    const { playAmount, playResult, playVolumeCredits } = calculatePlayCosts(
      play,
      audience
    )
    result += playResult
    totalAmount += playAmount
    volumeCredits += playVolumeCredits
  })

  // for (let perf of invoice.performances) {
  //   const play = plays[perf.playID]
  //   let thisAmount = 0

  //   switch (play.type) {
  //     case "tragedy":
  //       thisAmount = 40000
  //       if (perf.audience > 30) {
  //         thisAmount += 1000 * (perf.audience - 30)
  //       }
  //       break
  //     case "comedy":
  //       thisAmount = 30000
  //       if (perf.audience > 20) {
  //         thisAmount += 10000 + 500 * (perf.audience - 20)
  //       }
  //       thisAmount += 300 * perf.audience
  //       break
  //     default:
  //       throw new Error(`unknown type: ${play.type}`)
  //   }

  //   // add volume credits
  //   volumeCredits += Math.max(perf.audience - 30, 0)
  //   // add extra credit for every ten comedy attendees
  //   if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5)

  //   // print line for this order
  //   result += `  ${play.name}: ${format(thisAmount)} (${perf.audience} seats)\n`
  //   totalAmount += thisAmount
  // }
  result += `Amount owed is ${format(totalAmount)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result
}

export default statement

function calculatePlayCosts(
  play: Play,
  audience: number
): { playAmount: number; playResult: string; playVolumeCredits: number } {
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

  // print line for this order
  const result = `  ${play.name}: ${format(thisAmount)} (${audience} seats)\n`
  return {
    playAmount: thisAmount,
    playResult: result,
    playVolumeCredits: volumeCredits,
  }
}
