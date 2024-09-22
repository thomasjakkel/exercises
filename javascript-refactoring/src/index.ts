import statement from "./statement.js"
import plays from "./data/plays.json" with {type: "json"}
import invoices from "./data/invoices.json" with {type: "json"}

console.log(statement(invoices[0], plays))
