let STORAGE = {
  TOKEN: ''
}


export function SET (key, val) {
  STORAGE[key] = val
}

export function GET (key) {
  if (!key) {
    return STORAGE
  } else {
    return STORAGE[key]
  }
}
