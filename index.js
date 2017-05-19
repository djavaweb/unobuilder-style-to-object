const tinycolor = require('tinycolor2')

const availableUnits = [
  'px',
  'pt',
  'em',
  'rem',
  'vh',
  'vw',
  '%'
]
const unitRegx = new RegExp(`(\\d+)(${availableUnits.join('|')})`)
const rgbRegx = /(rgba?)\((.*)\)/

module.exports = originStyle => {
  const nativeStyle = {}
  for (const key in originStyle) {
    if (isNaN(Number(key)) && key.indexOf('-') === -1 && key.charAt(0) !== '_' && typeof originStyle[key] !== 'function') {
      nativeStyle[key] = originStyle[key]
    }
  }

  const object = {}
  for (const key in nativeStyle) {
    if (Object.prototype.hasOwnProperty.call(nativeStyle, key) && nativeStyle[key] !== null) {
      let value = nativeStyle[key]
      let unit

      const disabled = (value === 'true' || value === 'false') && !JSON.parse(value)
      if (disabled) {
        unit = ''
        value = ''
      }

      const matchUnit = (value).toString().match(unitRegx)
      if (matchUnit) {
        const int = parseInt(matchUnit[1], 10)
        if (!isNaN(int)) {
          value = int
          unit = matchUnit[2]
        }
      }

      const matchColor = typeof value === 'string' ? (value).toString().match(rgbRegx) : null
      if (matchColor) {
        const source = matchColor[1]
        const colors = matchColor[2].split(',')
        const a = (source === 'rgba') ? colors[colors.length - 1] : 0
        const color = tinycolor(value)
        const hsl = color.toHsl()
        value = {
          hsl,
          source,
          a,
          hex: color.toHexString().toUpperCase(),
          rgba: color.toRgb(),
          hsv: color.toHsv(),
          oldHue: hsl.h
        }
      }

      object[key] = {
        disabled,
        value
      }

      if (unit) {
        object[key].unit = unit
      }
    }
  }

  return object
}
