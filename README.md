# :golf: Unobuilder Style to Object
Convert native CSS properties to unobuilder object

# Install
Using NPM:  
`npm install unobuilder-style-to-object`

Using Yarn:  
`yarn add unobuilder-style-to-object`

# Usage
Native CSS Properties are object that should be generated from `getComputedStyle`
```javascript
import cssToProps from 'unobuilder-style-to-object'

const nativeProps = window.getComputedStyle(document.querySelector('#my-element'))
const cssProps = cssToProps(nativeProps)

console.log(cssProps)
/*
{
  backgroundColor: {
    value: {
      hsl: {
        h:0,
        s:0,
        l:0,
        a:1
      },
      hex: '#000000',
      rgba: {
        r:0,
        g:0,
        b:0,
        a:1
      },
      hsv: {
        h:0,
        s:0,
        v:0,
        a:1
      },
      oldHue: 0
      source: 'rgb',
      a:1
    }
  },
  display: {
    value: 'block'
  },
  width: {
    value: 10,
    unit: 'px'
  }
}
*/
```

# License
MIT © [https://github.com/djavaweb](djavaweb)
