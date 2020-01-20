import e from '@t1m0thy_michael/e'
import d from './index'

d.setEventbus(e)
window.e = e

// const createThingToClick = (txt, cls) => d({
// 	p: txt,
// 	classes: cls,
// 	on: [
// 		{
// 			event: 'test/topic',
// 			uid: `test_TOPIC_${txt}`,
// 			fn: function (data, ctx/* , topic */) {
// 				console.log(data, ctx)
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
// 			//ctx: 123
// 		}
// 	]
// })

// const allMyElements = d([
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

// // test plugins and d.text while we're at it
// d.registerPlugin('test', (element, ...args) => {
// 	return element.tagName
// })

// d([
// 	{ h3: 'Testing d.registerPlugin'},
// 	{ p: 'This adds a plugin that will return all of the selected tag names. Then we\'ll join them and create a new TextNode and append to the page;' },
// 	d.text(d('*').test().join(', ')),
// ]).appendTo('body')


// d.registerSetter('setterTest', (o, d) => {
// 	if (o.element && o.element.setAttribute){
// 		o.element.setAttribute('setterTest', d.setterTest)
// 	}
// })

// d([
// 	{ h3: 'Testing d.registerSetter' },
// 	{ p: 'We\'ve registered a setter that adds dDefinition property \'setterTest\' tothe element as an attribute;' },
// 	d({ div: 'This P tag should have the \'setterTest\' attribute', setterTest: 'Hello World' }),
// ]).appendTo('body')

// d.br(3).appendTo('body')

// let p1 = d({ span: 'one' })
// let p2 = d({ span: 'two' })
// let p3 = d({ span: 'three' })
// let p4 = d({ span: 'four' })

// let all4 = d([p1, p2, p3, p4])

// let p0 = d([
// 	{ div: ['a'] },
// 	{ div: [{ div: 'Boomy McBoom', classes: ['testclass'], id: 'boomy' }] },
// 	{ div: [{ div: 'Titty McBoob', classes: ['testclass'] }] },
// 	{ div: [p1] },
// 	{ div: [p2] },
// 	{ div: [{div: 'Boaty McBoatface', classes: ['testclass']}] },
// 	{ div: [p3] },
// 	{ div: ['c'] },
// 	{
// 		div: (new Date()),
// 		classes: ['date']
// 	},
// 	{
// 		div: function () {},
// 		classes: ['function']
// 	},
// 	{
// 		div: undefined,
// 		classes: ['undefined']
// 	},
// 	{
// 		div: null,
// 		classes: ['null']
// 	},
// 	{
// 		div: 123,
// 		classes: ['123']
// 	},
// 	{
// 		div: NaN,
// 		classes: ['NaN']
// 	},
// 	{ div: ['d'] }
// ]).appendTo('body')

// //append one of set outside of p0
// d(p4).appendTo('body')

// // d(all4).parent(p0).colour('red')
// // d(p2).parent(p0).colour('green')

// p0.child(all4).colour('blue')

// // d('body').child(p5).colour('yellow')

// d.hr().appendTo('body')


// d([
// 	{ svg: []}
// ]).appendTo('body')

// d({
// 	img: 'fakepath'
// }).appendTo('body')

// d({
// 	tag: 'blockquote',
// 	content: 'some text here'
// }).appendTo('body')

// d({ 
// 	form: [
// 		{
// 			dflt: 'Hello Ellie',
// 			id: 'test',
// 			input: 'hello?',
// 			validate: function (val) {
// 				console.log(this, val)
// 				return true
// 			},
// 			name: 'test1',
// 			attr: {
// 				test: 'test',
// 				zero: 0,
// 				'null': null,
// 				'undef': undefined,
// 			},
// 		},
// 		{
// 			input: 'world?',
// 			id: 'test2',
// 			validate: function (val) {
// 				console.log(this, val)
// 				return false
// 			},
// 			name: 'test2',
// 			on:[
// 				{
// 					event: ['keydown', 'keyup', 'click'],
// 					fn: (...args) => console.log(...args)
// 				}
// 			]
// 		}, {
// 			button: 'Submit',
// 			on: {
// 				event: 'click',
// 				fn: function () {
// 					console.log(this.formValues())
// 				}
// 			}
// 		},
// 		{
// 			button: 'Reset',
// 			on: {
// 				event: 'click',
// 				fn: function () {
// 					d(this.element.form).child('input').not().dflt()
// 				}
// 			}
// 		}
// 	]
// }).appendTo('body')



// d.svg({
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

// console.log(d([
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

// d({ div: { div: [{ span: 'with ID', id: 'testDuplicateId' }, {span: 'also' }]}}).appendTo('body')
// try {
// 	d({
// 		div: {
// 			div: [{
// 				span: 'with ID',
// 				id: 'testDuplicateId',
// 			}, {
// 				span: 'also'
// 			}]
// 		}
// 	}).appendTo('body')
// } catch (e) {

// 	console.log('Error caught!')

// }




const testArrayInitiated1 = d([
	{ span: '8' },
	{ span: '9' },
	{ span: 'a' },
])

const testArrayInitiated2 = d([
	{ span: '2' },
	{ span: '3' },
	{ span: '4' },
	d([
		{ span: '5' },
		{ span: '6' },
		{ span: '7' },
		testArrayInitiated1
	])
])

const res = d({

	div: [
		{ span: '1'},
		testArrayInitiated2
	]

}).appendTo('body')

console.log(res)

d({
	input: 'placeholder',
	on: [{
		event: 'focusin',
		fn: function (e) { console.log('focusin', this, e) }
	}, {
		event: 'focusout',
		fn: function (e) { console.log('focusout', this, e)}
	}]
}).appendTo('body')