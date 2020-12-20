import { getElem, addEvent, hasNodeName, hasClassWith, debounce } from './imports/domHelpers.js'
import { toCurrency } from './imports/calcHelpers.js'
import { pipe, identity, mergeWith } from './imports/functional.js'
import { calculations } from './imports/payrollCalculations.js'

/* Main Calculator script */
addEvent(document, 'DOMContentLoaded', function () {

  // form helper functions

  const calculateValuesFrom = pipe(...calculations.map(mergeWith))

  const mapFieldValue = (fields, field) => ({ ...fields, [field.name]: field.value })

  const renderFrom = (source, fn = identity) => field => { field.value = fn(source[field.name]) }

  // form event handler
  const formUpdate = function (fields) {

    /* return form event handler */
    return ({ target, key }) => {
      if (!hasNodeName(target, 'input')) return

      const currentFieldValues = fields.reduce(mapFieldValue, {})
      const updatedFields = calculateValuesFrom(currentFieldValues)

      fields
        .filter(hasClassWith('form-output'))
        .forEach(renderFrom(updatedFields, toCurrency('£')))
    }
  }

  const clearForm = function (fields) {
    // store defaults in a closure
    const defaults = fields.reduce(mapFieldValue, {})

    return function (event) {
      fields.forEach(renderFrom(defaults))
    }
  }

  const form = getElem('#payroll-form')
  const reset = getElem('#reset')
  // Note Babel and IE11 has issues with [...form.elements]
  const elements = Array.from(form.elements)

  addEvent(form, 'keyup', debounce(formUpdate(elements)))
  addEvent(reset, 'click', clearForm(elements))
})
