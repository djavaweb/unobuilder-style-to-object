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

module.exports = nativeStyle => {
  const object = {}
  for (const key in nativeStyle) {
    if (isNaN(parseInt(key, 10))) {
      let value = nativeStyle[key]
      let unit

      if (!value) {
        continue
      }

      const matchUnit = value.match(unitRegx)
      if (matchUnit) {
        const int = parseInt(matchUnit[1], 10)
        if (!isNaN(int)) {
          value = int
          unit = matchUnit[2]
        }
      }

      const matchColor = typeof value === 'string' ? value.match(rgbRegx) : null
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
        value
      }

      if (unit) {
        object[key].unit = unit
      }
    }
  }

  return object
}
