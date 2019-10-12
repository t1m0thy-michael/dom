
import { dom } from './dom'

const test = dom([
	{ h1: ['d: Dom Manipulation Awesomeness'] },
	{ textarea: ['this is a test of dom definitions in array'] },
	{ div: [{ div: 'one' }], id: 'testid' },
	{ div: [{ div: 'two' , classes: ['myClass']}] },
	{ div: [{ div: 'three' }] },
	{ div: [{ div: 'four', classes: ['myClass'] }] },
	{ div: [{ span: 'five', classes: ['myClass'] }] },
]).appendTo('body')

test.colour('red')

dom.registerPlugin('test', (element, ...args) => {
	console.log(...args)
	return element.tagName
})

console.log(dom('*').test(1,2,3))

let t1 = dom({div: 'from def'})
let t2 = document.querySelectorAll('h1')[0]
let t3 = '#testid'
let t4 = 'not a selector'
let t5 = 'div'
let t6 = [
	'span',
	'h1',
	[
		{ h3: 'h3 one', classes: ['myClass'] },
		{ h3: 'h3 two' },
		{ h3: 'h3 three', classes: ['myClass'] },
	]
]

const domFromArray = dom([t1, t2, t3, t4, t5, t6])
console.log(domFromArray.list)

console.log(domFromArray.isAppended())

domFromArray.not('.myClass').appendTo('body')

console.log(domFromArray.selector('.myClass').colour('blue'))



// export default dom