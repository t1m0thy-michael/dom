import { DomObject, DomDefinition } from './types'

import event from '@t1m0thy_michael/e'

import { dom } from './dom'

dom.setEventbus(event)

const createThingToClick = (txt: string, cls?: string | string[]) => dom({
	p: txt,
	classes: cls,
	on: {
		event: 'click',
		fn: function (e: Event) {
			this.colour('green')
		},
		topic: 'test/topic',
	},
	sub: {
		topic: 'test/topic',
		fn: function (data: any, ctx: DomObject, topic: string) {
			if (ctx.element !== this.element) {
				this.colour('red')
			}
		}
	}
})

const allMyElements = dom([
	createThingToClick('one', 'foo'),
	createThingToClick('two', 'bar'),
	createThingToClick('three'),
	createThingToClick('four', 'bar'),
]).appendTo('body')

allMyElements.is('.foo').colour('blue')
allMyElements.not('.foo').colour('red')

allMyElements.on({
	event: 'dblclick',
	fn: function (this: DomObject) {
		this.colour('blue')
	}
})

// test plugings and dom.text while we're at it
dom.registerPlugin('test', (element, ...args) => {
	return element.tagName
})

dom([
	{ h3: 'Testing dom.registerPlugin'},
	{ p: 'This adds a plugin that will return all of the selected tag names. Then we\'ll join them and create a new TextNode and append to the page;' },
	dom.text(dom('*').test().join(', ')),
]).appendTo('body')


dom.registerSetter('setterTest', (o: DomObject, d: Partial<DomDefinition>) => {
	if (o.element && o.element.setAttribute){
		o.element.setAttribute('setterTest', d.setterTest)
	}
})

dom([
	{ h3: 'Testing dom.registerSetter' },
	{ p: 'We\'ve registered a setter that adds DomDefinition property \'setterTest\' tothe element as an attribute;' },
	dom({ div: 'This P tag should have the \'setterTest\' attribute', setterTest: 'Hello World' }),
]).appendTo('body')


let s0 = dom([
		{ h1: 'h1', classes: ['selectorTest'] },
		{ h2: 'h2', classes: ['selectorTest'] },
		{ h3: 'h3', classes: ['selectorTest'] },
		{ h4: 'h4', classes: ['selectorTest'] },
		{ h5: 'h5', classes: ['selectorTest'] },
	]
).appendTo('body')

let s1 = dom('h1.selectorTest')
let s2 = dom('h2.selectorTest')

let s2a = s1.sibling(s2).colour('red')
let s3 = s1.sibling('h3').colour('green')
let s4 = s1.sibling(['h4','h5']).colour('blue')

// dom('body').child(s0).colour('pink')

let p1 = dom({span: 'hello world'})

let p0 = dom([
	{ div: ['a'] },
	{ div: ['b'] },
	{ div: ['c'] },
	{ div: [p1] },
	{ div: ['d'] },
	{ div: ['e'] },
	{ div: ['f'] },
	{ div: ['g'] },
]).appendTo('body')

p1.parent(p0).colour('red')
