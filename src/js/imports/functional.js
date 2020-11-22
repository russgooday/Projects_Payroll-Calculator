// functional helpers
export const identity = x => x

export const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value)

export const tap = fn => x => (fn(x), x)

export const mergeWith = fn => x => ({ ...x, ...fn(x) })
