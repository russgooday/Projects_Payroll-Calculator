import * as calc from './calcHelpers.js'

// Calculation helpers

const addVat = calc.addPercentage(20)

const vatOff = calc.subtractPercentage(20)

const natInsurance = calc.percentageOf(12)

const holidayPayment = calc.percentageOf(12.07)

const { percentOf, toNumber, sumTotal } = calc

// Calculations

const basePay = ({ hoursWorked, hourlyRate }) => ({
  basePay: toNumber(hoursWorked) * toNumber(hourlyRate)
})

const target = ({ basePay, targetMulti }) => ({
  target: addVat(toNumber(basePay) * toNumber(targetMulti))
})

const netEarnings = ({ weeklyTakings }) => ({
  netEarnings: vatOff(toNumber(weeklyTakings))
})

const commissionOn = ({ weeklyTakings, netEarnings }) => ({
  commissionOn: toNumber(weeklyTakings) - toNumber(netEarnings)
})

const commission = ({ commissionOn, commissionRate }) => ({
  commission: percentOf(toNumber(commissionOn), toNumber(commissionRate))
})

const wage = ({ basePay, commission }) => ({
  wage: toNumber(basePay) + toNumber(commission)
})

const holidayPay = ({ hoursWorked, hourlyRate }) => ({
  holidayPay: holidayPayment(toNumber(hoursWorked) * toNumber(hourlyRate))
})

const pension = ({ wage, pensionContrib }) => ({
  pension: percentOf(toNumber(wage), toNumber(pensionContrib))
})

const nationalInsurance = ({ wage }) => ({
  nationalInsurance: natInsurance(wage)
})

const total = ({ wage, holidayPay, pension, nationalInsurance }) => ({
  total: sumTotal([wage, holidayPay, pension, nationalInsurance])
})

// Calulations in sequence
export const calculations = [
  basePay,
  target,
  netEarnings,
  commissionOn,
  commission,
  wage,
  holidayPay,
  pension,
  nationalInsurance,
  total
]

