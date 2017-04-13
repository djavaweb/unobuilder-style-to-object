import test from 'ava'
import cssToProps from '../index'
import nativeProps from './native-props'

const object = cssToProps(nativeProps)

test('backgroundColor is an object', t => {
  t.is(typeof object, 'object')
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
