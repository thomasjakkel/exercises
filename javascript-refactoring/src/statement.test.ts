import { playCostInformations, plays } from "./data/plays"
import { Invoice, PlayCostInformations } from "./data/types"
import generateInvoiceOrder, { calculatePlayCosts } from "./statement"

const mockInvoiceWrongPlayID: Invoice = {
  customer: "bad customer",
  performances: [{ audience: 0, playID: "wrongID" }],
}

const mockInvoice: Invoice = {
  customer: "mock customer",
  performances: [
    { audience: 100, playID: "hamlet" },
    { audience: 100, playID: "hamlet" },
  ],
}

const mockPlayCostInformations: PlayCostInformations = {
  comedy: {
    baseCosts: 1,
    audienceTreshold: 2,
    audienceTresholdBaseCosts: 1,
    audienceTresholdCostsFactor: 1,
    extraCostsFactor: 1,
    volumeCreditsBonus: 1,
    volumeCreditsTreshold: 1,
  },
  tragedy: {
    baseCosts: 1,
    audienceTreshold: 2,
    audienceTresholdBaseCosts: 1,
    audienceTresholdCostsFactor: 1,
    extraCostsFactor: 1,
    volumeCreditsBonus: 1,
    volumeCreditsTreshold: 1,
  },
}

describe("Generate invoice order", () => {
  it("Should throw an error when a performance of an invoice has the wrong playID", () => {
    const wrongPlayIDError = () => {
      generateInvoiceOrder(mockInvoiceWrongPlayID, plays, playCostInformations)
    }

    expect(wrongPlayIDError).toThrow()
  })

  it("Should only calculate base costs and extra costs if the treshold is greater or equal than the audience", () => {
    const { playCosts } = calculatePlayCosts(
      plays["hamlet"],
      mockPlayCostInformations,
      2
    )

    expect(playCosts).toBe(3)
  })

  it("Should calculate additional costs if the audience is greater than the treshold", () => {
    const { playCosts } = calculatePlayCosts(
      plays["hamlet"],
      mockPlayCostInformations,
      3
    )

    expect(playCosts).toBe(4 + 2)
  })

  it("Should calculate volume credits correctly", () => {
    const { playVolumeCredits } = calculatePlayCosts(
      plays["hamlet"],
      mockPlayCostInformations,
      2
    )

    expect(playVolumeCredits).toBe(1 + 2)
  })

  it("Should generate a correct invoice order", () => {
    const invoiceOrder = generateInvoiceOrder(
      mockInvoice,
      plays,
      mockPlayCostInformations
    )

    const exprectedOrder = `
    Statement for mock customer
      Hamlet: $2.00 (100 seats)
      Hamlet: $2.00 (100 seats)
    Amount owed is $4.00
    You earned 398 credits`

    // Remove whitespace characters
    expect(invoiceOrder.replace(/\s/g, "")).toEqual(
      exprectedOrder.replace(/\s/g, "")
    )
  })
})
