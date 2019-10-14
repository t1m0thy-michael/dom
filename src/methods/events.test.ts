// types
import { DomElement, EventBusInterface, DomEventSubscription } from '../types'

// test utils
const sinon = require('sinon') // stubs etc...
import { assert } from 'chai'

// under test
import { Dom_EventBus_Error } from '../utils/errors'
import { dom } from '../dom'
import { 
	change,
	click,
	fireEvent,
	on,
	onEvent,
	sub,
} from './events'

const getEventbusStub = () => ({
	sub: sinon.stub().returns('a token'),
	pub: sinon.stub(),
	remove: sinon.stub(),
}) as EventBusInterface

describe('events', function() {

	it('has expected methods', () => {
		assert.isFunction(change)
		assert.isFunction(click)
		assert.isFunction(fireEvent)
		assert.isFunction(on)
		assert.isFunction(onEvent)
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
		
		it('throws if topic & fn options are missing', () => {
			const element = document.createElement('div') as unknown as DomElement
			assert.throws(() => sub(element, {
				topic: 'test/topic',
				fn: () => { },
			} as unknown as DomEventSubscription), Dom_EventBus_Error)
		})

		describe('throws with invalid options', () => {
			
			it('throws if topic & fn options are missing', () => {
				const element = document.createElement('div') as unknown as DomElement
				assert.throws(() => sub(element, {
					// topic,
					// fn,
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})

			it('throws if topic is missing', () => {
				const element = document.createElement('div') as unknown as DomElement
				assert.throws(() => sub(element, {
					// topic,
					fn: () => { },
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})

			it('throws if fn is missing', () => {
				const element = document.createElement('div') as unknown as DomElement
				assert.throws(() => sub(element, {
					topic: 'str',
					// fn,
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})

			it('throws if topic is invalid', () => {
				const element = document.createElement('div') as unknown as DomElement
				assert.throws(() => sub(element, {
					topic: 123,
					// fn,
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})

			it('throws if fn is invalid', () => {
				const element = document.createElement('div') as unknown as DomElement
				assert.throws(() => sub(element, {
					// topic,
					fn: 123,
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})
		})

		it('calls eventbus.sub with expected options', () => {
			const element = document.createElement('div') as unknown as DomElement
			const eventbus = getEventbusStub()

			dom.registerEventbus(eventbus)

			const testFn = () => { }
			const testTopic = 'testTopic'
			const subscription = {
				topic: testTopic,
				fn: testFn,
			} as unknown as DomEventSubscription

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

			dom.registerEventbus(null)
		})

		it('event subscriptions are stored in element.DOM.subscriptions', () => {
			const element = document.createElement('div') as unknown as DomElement
			const eventbus = getEventbusStub()

			dom.registerEventbus(eventbus)

			const testFn = () => { }
			const testTopic = 'testTopic'
			const subscription = {
				topic: testTopic,
				fn: testFn,
			} as unknown as DomEventSubscription

			sub(element, subscription)

			assert.strictEqual(element.DOM.event.subscriptions[0].token, 'a token', 'token stored in event subscriptions')
			assert.isObject(element.DOM.event.subscriptions[0].subscription, 'subscription stored in event subscriptions')
		})
	})
})
