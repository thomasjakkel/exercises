import generateInvoiceOrder from "./statement.js"
import { plays, playCostInformations } from "./data/plays.js"
import { invoices } from "./data/invoices.js"

invoices.forEach((invoice) => {
  console.log(generateInvoiceOrder(invoice, plays, playCostInformations))
})
