/* Main calculation Methods */

export const isNumber = figure => Number.isFinite(figure)

export const toNumber = strg => isNumber(strg) ? strg : Number(strg.replace(/[^0-9-.]+/g, ''))

export const toCurrency = (symbol, amount, places = 2) => `${symbol}${amount.toFixed(places)}`

export const percentOf = (percent, from) => (percent / 100) * from

export const add = (x, y) => (x * 100 + y * 100) / 100

export const sumTotal = figures => figures.reduce(add)

// curry methods

export const percentageOf = (percent) => (from) => percentOf(percent, from)

export const addPercentage = (percent) => (amount) => amount * (1 + percent / 100)

export const subtractPercentage = (percent) => (amount) => amount / (1 + percent / 100)
