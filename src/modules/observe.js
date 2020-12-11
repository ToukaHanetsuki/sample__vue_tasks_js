export const observe = (obj, key, func) => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    get: () => value,
    set: (newValue) => {
      const oldValue = value;
      value = newValue;
      func(newValue, oldValue);
    },
    configurable: true
  })
}