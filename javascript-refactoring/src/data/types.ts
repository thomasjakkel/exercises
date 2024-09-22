type Invoice = {
  customer: string
  performances: { playID: string; audience: number }[]
}

export type Invoices = {
  [index: number]: Invoice
}

type Play = {
  name: string
  type: "tragedy" | "comedy"
}

export type Plays = {
  [key: string]: Play
}
