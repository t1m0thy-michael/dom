import event from '@t1m0thy_michael/e'
import { dom } from './dom'

dom.setEventbus(event)

// const createThingToClick = (txt, cls) => dom({
// 	p: txt,
// 	classes: cls,
// 	on: [
// 		{
// 			event: 'test/topic',
// 			fn: function (data, ctx/* , topic */) {
// 				if (ctx.element !== this.element) {
// 					this.colour('red')
// 				}
// 			}
// 		},
// 		{
// 			event: 'click',
// 			fn: function (e) {
// 				this.colour('green')
// 			},
// 			topic: 'test/topic',
// 		}
// 	]
// })

// const allMyElements = dom([
// 	createThingToClick('one - blue', 'foo'),
// 	createThingToClick('two - red', 'bar'),
// 	createThingToClick('three - red'),
// 	createThingToClick('four - red', 'bar'),
// ]).appendTo('body')

// allMyElements.is('.foo').colour('blue')
// allMyElements.not('.foo').colour('red')

// allMyElements.on({
// 	event: 'dblclick',
// 	fn: function () {
// 		this.colour('blue')
// 	}
// })

// // test plugins and dom.text while we're at it
// dom.registerPlugin('test', (element, ...args) => {
// 	return element.tagName
// })

// dom([
// 	{ h3: 'Testing dom.registerPlugin'},
// 	{ p: 'This adds a plugin that will return all of the selected tag names. Then we\'ll join them and create a new TextNode and append to the page;' },
// 	dom.text(dom('*').test().join(', ')),
// ]).appendTo('body')


// dom.registerSetter('setterTest', (o, d) => {
// 	if (o.element && o.element.setAttribute){
// 		o.element.setAttribute('setterTest', d.setterTest)
// 	}
// })

// dom([
// 	{ h3: 'Testing dom.registerSetter' },
// 	{ p: 'We\'ve registered a setter that adds DomDefinition property \'setterTest\' tothe element as an attribute;' },
// 	dom({ div: 'This P tag should have the \'setterTest\' attribute', setterTest: 'Hello World' }),
// ]).appendTo('body')

// dom.br(3).appendTo('body')

// let p1 = dom({ span: 'one' })
// let p2 = dom({ span: 'two' })
// let p3 = dom({ span: 'three' })
// let p4 = dom({ span: 'four' })

// let all4 = dom([p1, p2, p3, p4])

// let p0 = dom([
// 	{ div: ['a'] },
// 	{ div: [{ div: 'Boomy McBoom', classes: ['testclass'], id: 'boomy' }] },
// 	{ div: [{ div: 'Titty McBoob', classes: ['testclass'] }] },
// 	{ div: [p1] },
// 	{ div: [p2] },
// 	{ div: [{div: 'Boaty McBoatface', classes: ['testclass']}] },
// 	{ div: [p3] },
// 	{ div: ['c'] },
// ]).appendTo('body')

// //append one of set outside of p0
// dom(p4).appendTo('body')

// // dom(all4).parent(p0).colour('red')
// // dom(p2).parent(p0).colour('green')

// p0.child(all4).colour('blue')

// // dom('body').child(p5).colour('yellow')

// dom.hr().appendTo('body')


// dom([
// 	{ svg: []}
// ]).appendTo('body')

// dom({
// 	img: 'fakepath'
// }).appendTo('body')

// dom({
// 	tag: 'blockquote',
// 	content: 'some text here'
// }).appendTo('body')

dom({ 
	form: [
		{
			tag: 'input',
			type: 'text',
			value: '',
			//input: 'hello?',
			validate: function (val) {
				console.log(this, val)
				return true
			},
			name: 'test1'
		},
		{
			input: 'world?',
			validate: function (val) {
				console.log(this, val)
				return false
			},
			name: 'test2'
		},
		{
			input: 'Submit',
			type: 'submit',
			on: {
				event: 'click',
				fn: function () {
					console.log(this.formValues())
				}
			}
		}
	]
}).appendTo('body')

// dom.svg({
// 	svg: [
// 		{
// 			polygon: '100,100 150,25 150,75 200,0',
// 			// attr: {
// 			// 	fill: '#f00',
// 			// 	stroke: '#00f',
// 			// 	'stroke-width': 2
// 			// },
// 			style: {
// 				strokeWidth: 2,
// 				fill: '#0f0',
// 				stroke: '#00f',
// 			}
// 		}
// 	],
// 	attr: {
// 		viewBox: '0 0 300 300'
// 	},
// 	width: '200px',
// 	height: '200px'
// }).appendTo('body')

// console.log(dom([
// 	'#boomy',
// 	123,
// 	true,
// 	{
// 		div: [
// 			{ span: 123 },
// 			{ span: '#boomy'},
// 			{ span: { span: [
// 				321,
// 				'#boomy',
// 				{ a: 'click here', href: '/some/path/goes/here' },
// 			] } },

// 		]
// 	}
// ]).appendTo('body'))