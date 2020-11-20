import * as dom from './imports/domHelpers.js'
import { toCurrency } from './imports/calcHelpers.js'
import { pipe } from './imports/functional.js'
import { calculations } from './imports/calculations.js'

const { getElem, addEvent, hasNodeName, hasClass, debounce } = dom

/* Main Calculator script */
dom.addEvent(document, 'DOMContentLoaded', function () {

  const mergeField = (fn) => (field) => ({ ...field, ...fn(field) })
  const hasClassWith = (className) => (elem) => hasClass(elem, className)

  const formUpdate = function ([...elements]) {

    return ({ target, key }) => {
      if (!hasNodeName(target, 'input') || isNaN(key)) return

      const fields = elements.reduce(
        (acc, { name, value }) => ({ ...acc, [name]: value }), {}
      )

      const updatedFields = pipe(...calculations.map(mergeField))(fields)

      elements
        .filter(hasClassWith('form-output'))
        .forEach(
          (output) => (output.value = toCurrency('£', updatedFields[output.name]))
        )
    }
  }

  const form = getElem('#payroll-form')

  addEvent(form, 'keyup', debounce(formUpdate(form)))
})
