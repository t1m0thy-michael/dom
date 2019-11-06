import { DomObject, DomDefinition } from './types'

import event from '@t1m0thy_michael/e'

import { dom } from './dom'

dom.setEventbus(event)

const createThingToClick = (txt: string, cls?: string | string[]) => dom({
	p: txt,
	classes: cls,
	on: [
		{
			event: 'test/topic',
			fn: function (this: DomObject, data: any, ctx: DomObject/* , topic: string */) {
				if (ctx.element !== this.element) {
					this.colour('red')
				}
			}
		},
		{
			event: 'click',
			fn: function (this: DomObject, e: Event) {
				this.colour('green')
			},
			topic: 'test/topic',
		}
	]
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

dom.br(3).appendTo('body')

let p1 = dom({ span: 'one' })
let p2 = dom({ span: 'two' })
let p3 = dom({ span: 'three' })
let p4 = dom({ span: 'four' })

let all4 = dom([p1, p2, p3, p4])

let p0 = dom([
	{ div: ['a'] },
	{ div: [{ div: 'Boomy McBoom', classes: ['testclass'] }] },
	{ div: [{ div: 'Titty McBoob', classes: ['testclass'] }] },
	{ div: [p1] },
	{ div: [p2] },
	{ div: [{div: 'Cockface Cuntington', classes: ['testclass']}] },
	{ div: [p3] },
	{ div: ['c'] },
]).appendTo('body')

//append one of set outside of p0
dom(p4).appendTo('body')

// dom(all4).parent(p0).colour('red')
// dom(p2).parent(p0).colour('green')

p0.child(all4).colour('blue')

// dom('body').child(p5).colour('yellow')

dom.hr().appendTo('body')

dom([
	{ span: 'hello' },
	dom.br(2),
	{ del: 'hello' },
	dom.br(2),
	{ ins: 'hello' },
]).appendTo('body')

// dom([
// 	{ svg: [
// 		{ polygon:  }
// 	]}
// ])