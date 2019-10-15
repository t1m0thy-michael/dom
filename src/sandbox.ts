/*
	For quick manual testing and examples...
*/

import { dom } from './dom'

const test = dom([
	{ h1: ['d: Dom Manipulation Awesomeness'] },
	{ textarea: ['this is a test of dom definitions in array'] },
	{ div: 'one', id: 'testid'},
	{ div: 'two' , classes: ['myClass']},
	{ div: 'three' },
	{ div: 'four', classes: ['myClass'] },
	{ span: 'five', classes: ['myClass'] },
]).appendTo('body')

test.is('textarea').colour('red')
test.is('.myClass').colour('blue')
test.not('.myClass').colour('green')

// test plugings
dom.registerPlugin('test', (element, ...args) => {
	console.log(...args)
	return element.tagName
})
console.log(dom('*').test(1,2,3))

dom.text('hello world').appendTo('body')

dom.setEventbus({
	pub: console.log,
	sub: console.log,
	remove: console.log,
})
dom('h1').on({event: 'click', topic: 'click!'})
