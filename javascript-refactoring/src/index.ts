import generateInvoiceOrder from "./statement.js"
import { plays, playCostInformations } from "./data/plays.js"
import { invoices } from "./data/invoices.js"

console.log(generateInvoiceOrder(invoices[0], plays, playCostInformations))
