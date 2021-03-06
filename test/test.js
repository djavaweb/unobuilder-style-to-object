import test from 'ava'
import cssToProps from '../index'

const testDiv = document.createElement('div')
testDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)'
testDiv.style.width = '900px'
testDiv.style.fontSize = '13px'
testDiv.style.minWidth = false
testDiv.style.maxWidth = false

document.body.appendChild(testDiv)

const nativeProps = window.getComputedStyle(testDiv)
const object = cssToProps(nativeProps)

test('backgroundColor is an object', t => {
  t.is(typeof object, 'object')
})

test('backgroundColor is transparent', t => {
  t.is(object.backgroundColor.value.a, 0)
})

test('backgroundColor rgba is an object', t => {
  t.is(typeof object.backgroundColor.value.rgba, 'object')
})

test('backgroundColor rgba.r is a number', t => {
  const typeOfRed = typeof object.backgroundColor.value.rgba.r
  t.is(typeOfRed, 'number')
  t.true(object.backgroundColor.value.rgba.r > -1)
})

test('display should be `block`', t => {
  t.is(object.display.value, 'block')
})

test('width should have a unit', t => {
  const unitType = typeof object.width.unit
  t.is(unitType, 'string')
  t.true(object.width.unit.length > 0)
})

test('fontSize should have a unit', t => {
  const unitType = typeof object.fontSize.unit
  t.is(unitType, 'string')
  t.true(object.fontSize.unit.length > 0)
})

test('minWidth should be disabled', t => {
  t.is(typeof object.minWidth.disabled, 'boolean')
  t.is(object.minWidth.disabled, true)
})

test('maxWidth should be disabled', t => {
  t.is(typeof object.maxWidth.disabled, 'boolean')
  t.is(object.maxWidth.disabled, true)
})
