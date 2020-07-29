export const addCommas = (value: string): string =>
  value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const removeCommas = (value: string): string => value.replace(/,/g, '')

export const checkIsValidNumber = (input: string): boolean => {
  if (Number(input) < 0 || isNaN(Number(input))) {
    return false
  }
  return true
}

/**
 * Remove prefix, commas and extra decimals from value
 */
export const cleanValue = (
  value: string,
  allowDecimals: boolean,
  decimalsLimit: number,
  prefix?: string
): string => {
  const withoutPrefix = prefix ? value.replace(prefix, '') : value
  const withoutCommas = removeCommas(withoutPrefix)
  const parsed = parseAbbrValue(withoutCommas) || withoutCommas

  if (String(parsed).includes('.')) {
    const [int, decimals] = withoutCommas.split('.')
    const includeDecimals = allowDecimals
      ? `.${decimalsLimit ? decimals.slice(0, decimalsLimit) : decimals}`
      : ''

    return `${int}${includeDecimals}`
  }

  return String(parsed)
}

export const padTrimValue = (value: string, precision?: number): string => {
  if (!precision) {
    return value
  }

  const [int, decimals] = value.split('.')
  let newValue = decimals || ''

  if (newValue.length < precision) {
    while (newValue.length < precision) {
      newValue += '0'
    }
  } else {
    newValue = newValue.slice(0, precision)
  }

  return `${int}.${newValue}`
}

/**
 * Format value with commas and prefix
 */
export const formatValue = (value: string, prefix?: string): string => {
  const [int, decimals] = value.split('.')
  const includePrefix = prefix ? prefix : ''
  const includeDecimals = value.includes('.') ? `.${decimals}` : ''
  return `${includePrefix}${addCommas(int)}${includeDecimals}`
}

/**
 * Abbreviate number eg. 1000 = 1k
 *
 * Source: https://stackoverflow.com/a/9345181
 */
export const abbrValue = (value: number, _decimalPlaces = 10): string => {
  if (value > 999) {
    let valueLength = ('' + value).length
    const p = Math.pow
    const d = p(10, _decimalPlaces)
    valueLength -= valueLength % 3

    return (
      Math.round((value * d) / p(10, valueLength)) / d +
      ' kMGTPE'[valueLength / 3]
    )
  }

  return String(value)
}

type AbbrMap = { [key: string]: number }

const abbrMap: AbbrMap = { k: 1000, m: 1000000, b: 1000000000 }

/**
 * Parse a value with abbreviation e.g 1k = 1000
 */
export const parseAbbrValue = (value: string): undefined | number => {
  const match = value.match(/(\d+(.\d+)?)([kmb])$/i)

  if (match) {
    const [, digits, , abbr] = match
    const multiplier = abbr ? abbrMap[abbr.toLowerCase()] : null
    if (digits && multiplier) {
      return Number(digits) * multiplier
    }
  }

  return undefined
}
