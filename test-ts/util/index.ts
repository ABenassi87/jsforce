export function delay(msec) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), msec);
  });
}

export function isObject(o) {
  return typeof o === 'object' && o !== null;
}

export function isString(o) {
  return typeof o === 'string';
}

export function isNumber(o) {
  return typeof o === 'number';
}

export function isBoolean(o) {
  return typeof o === 'boolean';
}

export function isUndefined(o) {
  return typeof o === 'undefined';
}

export function clone(o) {
  return JSON.parse(JSON.stringify(o));
}
