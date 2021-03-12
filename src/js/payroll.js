import { getElem, addEvent, hasNodeName, hasClassWith, debounce } from './imports/domHelpers.js'
import { toCurrency } from './imports/calcHelpers.js'
import { pipe, identity, mergeWith } from './imports/functional.js'
import { calculations } from './imports/payrollCalculations.js'

/* Main Calculator script */
addEvent(document, 'DOMContentLoaded', function () {

  // form helper functions

  const calculateValuesFrom = pipe(...calculations.map(mergeWith))

  const renderFrom = (source, fn = identity) => field => { field.value = fn(source[field.name]) }

  const { fromEntries } = Object

  // form event handler
  const formUpdate = function (form) {

    const outputs = Array
      .from(form.elements)
      .filter(hasClassWith('form-output'))

    /* return form event handler */
    return ({ target }) => {
      if (!hasNodeName(target, 'input')) return

      const currentFieldValues = fromEntries(new FormData(form))
      const updatedFields = calculateValuesFrom(currentFieldValues)

      outputs.forEach(renderFrom(updatedFields, toCurrency('£')))
    }
  }

  const clearForm = function (form) {
    // store defaults in a closure
    const defaults = fromEntries(new FormData(form))
    const fields = Array.from(form.elements)

    return function (event) {
      fields.forEach(renderFrom(defaults))
    }
  }

  const form = getElem('#payroll-form')
  const reset = getElem('#reset')

  addEvent(form, 'keyup', debounce(formUpdate(form)))
  addEvent(reset, 'click', clearForm(form))
})
