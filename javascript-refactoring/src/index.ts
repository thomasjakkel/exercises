import statement from "./statement.js"
import { plays } from "./data/plays.js"
import { invoices } from "./data/invoices.js"

console.log(statement(invoices[0], plays))
