import { DomObject } from './types'

import { dom } from './dom'

import { event } from '@t1m0thy_michael/e'
dom.setEventbus(event)

const test = dom([
	{ h1: ['d: Dom Manipulation Awesomeness'] },
]).appendTo('body')

// test plugings
dom.registerPlugin('test', (element, ...args) => {
	console.log(...args)
	return element.tagName
})
//dom.text('hello world').appendTo('body')




const createThingToClick = (txt: string) => {
	return dom({
		p: txt,
		on: {
			event: 'click',
			fn: function (this: DomObject, e: Event) {
				this.colour('green')
			},
			topic: 'test/topic',
		},
		sub: {
			topic: 'test/topic',
			fn: function (this: DomObject, data: any, ctx: any, topic: string) {
				if (ctx.element !== this.element) {
					this.colour('red')
				}
			}
		}
	})
}

const allMyElements = dom([
	createThingToClick('one'),
	createThingToClick('two'),
	createThingToClick('three'),
	createThingToClick('four'),
]).appendTo('body')

allMyElements.on({
	event: 'dblclick',
	fn: function (this: DomObject) {
		this.colour('blue')
	}
})