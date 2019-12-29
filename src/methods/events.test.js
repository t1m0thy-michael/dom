// test utils
const sinon = require('sinon') // stubs etc...
import { assert } from 'chai'

// under test
import { dom } from '../dom'

import { 
	change,
	click,
	fireEvent,
	on,
	sub,
} from './events'

import { 
	Dom_EventBus_Error, 
	Dom_Missing_Argument
} from '../utils/errors'

const getEventbusStub = () => ({
	sub: sinon.stub().returns('a token'),
	pub: sinon.stub(),
	remove: sinon.stub(),
})

const getDomElemDomStub = () => ({
	data: new Map(),
	def: {},
	event: { subscriptions: [], on: [] },
	on: {}
})

describe('events', function() {

	it('has expected methods', () => {
		assert.isFunction(change)
		assert.isFunction(click)
		assert.isFunction(fireEvent)
		assert.isFunction(on)
		assert.isFunction(on)
		assert.isFunction(sub)
	})

	/*=================================
	  			sub()
	=================================*/

	describe('sub()', () => {
		
		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})	
		
		describe('throws with invalid options', () => {
			
			it('throws if topic & fn options are missing', () => {
				const element = document.createElement('div')
				assert.throws(() => sub(element, {
					// topic,
					// fn,
				}), Dom_EventBus_Error)
			})

			it('throws if topic is missing', () => {
				const element = document.createElement('div')
				assert.throws(() => sub(element, {
					// topic,
					fn: () => { },
				}), Dom_EventBus_Error)
			})

			it('throws if fn is missing', () => {
				const element = document.createElement('div')
				assert.throws(() => sub(element, {
					topic: 'str',
					// fn,
				}), Dom_EventBus_Error)
			})

			it('throws if topic is invalid', () => {
				const element = document.createElement('div')
				assert.throws(() => sub(element, {
					topic: 123,
					// fn,
				}), Dom_EventBus_Error)
			})

			it('throws if fn is invalid', () => {
				const element = document.createElement('div')
				assert.throws(() => sub(element, {
					// topic,
					fn: 123,
				}), Dom_EventBus_Error)
			})
		})

		it('calls eventbus.sub with expected options', () => {
			const element = document.createElement('div')
			const eventbus = getEventbusStub()

			dom.setEventbus(eventbus)

			const testFn = () => { }
			const testTopic = 'testTopic'
			const subscription = {
				topic: testTopic,
				fn: testFn,
			}

			sub(element, subscription)
			sinon.assert.calledOnce(eventbus.sub)
			
			// @ts-ignore
			const call = eventbus.sub.getCall(0).args[0]

			assert.isObject(call, 'eventbus.sub called with object')
			assert.isFunction(call.fn, 'eventbus.sub called with a function')
			assert.strictEqual(call.topic, testTopic, 'eventbus.sub called with correct topic')
			assert.strictEqual(call.distinct, false, 'eventbus.sub called with expected default (distinct)')
			assert.strictEqual(call.once, false, 'eventbus.sub called with expected default (once)')
			assert.strictEqual(call.minInterval, 0, 'eventbus.sub called with expected default (minInterval)')
			assert.strictEqual(call.description, '', 'eventbus.sub called with expected default (description)')

			dom.setEventbus(null)
		})

		it('event subscriptions are stored in element.DOM.subscriptions', () => {
			const element = document.createElement('div')
			const eventbus = getEventbusStub()

			dom.setEventbus(eventbus)

			const testFn = () => { }
			const testTopic = 'testTopic'
			const subscription = {
				topic: testTopic,
				fn: testFn,
			}

			sub(element, subscription)

			assert.strictEqual(element.DOM.event.subscriptions[0].token, 'a token', 'token stored in event subscriptions')
			assert.isObject(element.DOM.event.subscriptions[0].subscription, 'subscription stored in event subscriptions')
		})
	})

	/*=================================
	  			on()
	=================================*/

	describe('on()', () => {

		const sandbox = sinon.createSandbox()

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		afterEach(function () {
			sandbox.restore()
		})

		it('throws when it should', () => {
			const elem = document.createElement('div')
			elem.DOM = getDomElemDomStub()

			assert.throws(() => { on(elem, { /*no options*/ }) }, Dom_Missing_Argument)
			assert.throws(() => { on(elem, { event: 'click' }) }, Dom_Missing_Argument)
			assert.throws(() => { on(elem, { topic: 'topic' }) }, Dom_Missing_Argument)
			assert.throws(() => { on(elem, { topic: 'topic', event: [] }) }, Dom_Missing_Argument)
			assert.throws(() => { on(elem, { topic: 'topic', event: [123] }) }, Dom_Missing_Argument)
			assert.throws(() => { on(elem, { topic: 'topic', event: [''] }) }, Dom_Missing_Argument)
			assert.throws(() => { on(elem, { topic: 'topic', event: '' }) }, Dom_Missing_Argument)
		})

		it('event handler is stored & addEventListener is called', () => {
			const elem = document.createElement('div')
			elem.DOM = getDomElemDomStub()
			sandbox.stub(elem, 'addEventListener')

			on(elem, { event: 'click', topic: 'topic' })
			assert.ok(elem.DOM.event.on.length > 0, 'event handler stored')
			sinon.assert.calledOnce(elem.addEventListener)

			on(elem, {
				event: 'click', 
				topic: 'topic', 
				data: function () {},
				stopPropagation: true,
				preventDefault: false,
				elementAsCtx: false, 
			})
			assert.ok(elem.DOM.event.on.length > 0, 'event handler stored')
			sinon.assert.calledTwice(elem.addEventListener)
		})

		//
		// Dom special events
		//
		it('event handler is NOT stored & addEventListener is NOT called when DOM special event name passed', () => {
			const elem = document.createElement('div')
			elem.DOM = getDomElemDomStub()
			sandbox.stub(elem, 'addEventListener')

			on(elem, { event: 'append', fn: () => { }, topic: 'topic' })
			assert.ok(elem.DOM.event.on.length === 0, 'event handler NOT stored')
			sinon.assert.notCalled(elem.addEventListener)

			on(elem, { event: 'append', topic: 'topic' })
			assert.ok(elem.DOM.event.on.length === 0, 'event handler NOT stored')
			sinon.assert.notCalled(elem.addEventListener)

			on(elem, { event: 'append', topic: 'topic', elementAsCtx: false })
			assert.ok(elem.DOM.event.on.length === 0, 'event handler NOT stored')
			sinon.assert.notCalled(elem.addEventListener)
		})
	})


	/*=================================
				fireEvent()
	=================================*/
	describe('fireEvent()', () => {

		const sandbox = sinon.createSandbox()

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		afterEach(function () {
			sandbox.restore()
		})

		it('throws when it should', () => {
			const elem = document.createElement('div')
			sandbox.stub(elem, 'dispatchEvent')

			fireEvent(elem, 'click')

			sinon.assert.calledOnce(elem.dispatchEvent)
		})
	})
})
