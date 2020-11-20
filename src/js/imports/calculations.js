import * as calc from './calcHelpers.js'

const addVat = calc.addPercentage(20)

const vatOff = calc.subtractPercentage(20)

const natInsurance = calc.percentageOf(12)

const holidayPayment = calc.percentageOf(12.07)

const { percentOf, toNumber, sumTotal } = calc

export const calculations = [

  function basePay (fields) {
    return ({
      basePay: toNumber(fields.hoursWorked) * toNumber(fields.hourlyRate)
    })
  },

  function target (fields) {
    return ({
      target: addVat(toNumber(fields.basePay) * toNumber(fields.targetMulti))
    })
  },

  function netEarnings (fields) {
    return ({
      netEarnings: vatOff(toNumber(fields.weeklyTakings))
    })
  },

  function commissionOn (fields) {
    return ({
      commissionOn: toNumber(fields.weeklyTakings) - toNumber(fields.netEarnings)
    })
  },

  function commission (fields) {
    return ({
      commission: percentOf(toNumber(fields.commissionOn), toNumber(fields.commissionRate))
    })
  },

  function wage (fields) {
    return ({
      wage: toNumber(fields.basePay) + toNumber(fields.commission)
    })
  },

  function holidayPay (fields) {
    return ({
      holidayPay: holidayPayment(toNumber(fields.hoursWorked) * toNumber(fields.hourlyRate))
    })
  },

  function pension (fields) {
    return ({
      pension: percentOf(toNumber(fields.wage), toNumber(fields.pensionContrib))
    })
  },

  function nationalInsurance (fields) {
    return ({
      nationalInsurance: natInsurance(fields.wage)
    })
  },

  function total (fields) {
    return ({
      total: sumTotal([fields.wage, fields.holidayPay, fields.pension, fields.nationalInsurance])
    })
  }
]
