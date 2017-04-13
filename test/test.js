import test from 'ava'
import cssToProps from '../index'
import nativeProps from './native-props'

const object = cssToProps(nativeProps)

test('backgroundColor is an object', t => {
  t.true(typeof object === 'object')
})

test('backgroundColor.rgba is an object', t => {
  t.true(typeof object.value.rgba === 'object')
})

test('backgroundColor.rgba.r is a number', t => {
  t.true(typeof object.value.rgba.r === 'number')
  t.true(typeof object.value.rgba.r > -1)
})

test('display should be `block`', t => {
  t.true(object.display.value === 'block')
})

test('width should have a unit', t => {
  t.true(object.width.unit)
})
