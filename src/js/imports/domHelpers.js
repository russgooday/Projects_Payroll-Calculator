export const getElem = function (selector, root = document) {
  return root.querySelector(selector)
}

export const getElems = function (selector, root = document) {
  return root.querySelectorAll(selector)
}

export const addEvent = function (elem, type, fn, capture = false) {
  return elem.addEventListener(type, fn, capture)
}

export const removeEvent = function (elem, type, fn, capture = false) {
  return elem.removeEventListener(type, fn, capture)
}

export const hasClass = function (elem, className) {
  return elem.classList.contains(className)
}

export const hasClassWith = (className) => (elem) => hasClass(elem, className)

export const hasNodeName = function (elem, name) {
  return elem.nodeName && elem.nodeName === name.toUpperCase()
}

export const debounce = function (func, wait = 150) {
  let timeout = null

  return (...args) => {
    const later = () => {
      timeout = null
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

