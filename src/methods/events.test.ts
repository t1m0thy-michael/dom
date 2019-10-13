import { DomEventSubscription, EventBusInterface } from '../types'

import { assert } from 'chai'
const sinon = require('sinon')

import { getNodeStub, getElementStub, getDomObjStub, getEventbusStub } from '../../tests/utils/sinon_stubs'
import { event } from './events'
import { Dom_EventBus_Error } from '../utils/errors'

describe('events', () => {

	it('has expected methods', () => {
		// assert.isFunction(event.change)
		// assert.isFunction(event.click)
		assert.isFunction(event.fireEvent)
		assert.isFunction(event.on)
		assert.isFunction(event.onEvent)
		assert.isFunction(event.sub)
	})

	/*=================================
	  			sub()
	=================================*/

	describe('sub()', () => {
				
		it('throws if topic & fn options are missing', () => {
			const domObj = getDomObjStub()
			assert.throws(() => event.sub(domObj, {
				topic: 'test/topic',
				fn: () => {},
			} as unknown as DomEventSubscription), Dom_EventBus_Error)
		})

		describe('throws with invalid options', () => {
			
			const domObj = getDomObjStub()
			domObj.eventbus = getEventbusStub()

			// before(() => {
			// })

			it('throws if topic & fn options are missing', () => {
				assert.throws(() => event.sub(domObj, {
					// topic,
					// fn,
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})
			
			it('throws if topic is missing', () => {
				assert.throws(() => event.sub(domObj, {
					// topic,
					fn: () => {},
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})
				
			it('throws if fn is missing', () => {
				assert.throws(() => event.sub(domObj, {
					topic: 'str',
					// fn,
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})

			it('throws if topic is invalid', () => {
				assert.throws(() => event.sub(domObj, {
					topic: 123,
					// fn,
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})
				
			it('throws if fn is invalid', () => {
				assert.throws(() => event.sub(domObj, {
					// topic,
					fn: 123,
				} as unknown as DomEventSubscription), Dom_EventBus_Error)
			})
		})

		it('calls eventbus.sub with expected options', () => {

			const domObj = getDomObjStub()
			domObj.eventbus = getEventbusStub()

			const testFn = () => { }
			const testTopic = 'testTopic'
			const subscription = {
				topic: testTopic,
				fn: testFn,
			} as unknown as DomEventSubscription

			event.sub(domObj, subscription)

			sinon.assert.calledOnce(domObj.eventbus.sub)
			// @ts-ignore
			const call = domObj.eventbus.sub.getCall(0).args[0]

			assert.isObject(call, 'eventbus.sub called with object')
			assert.isFunction(call.fn, 'eventbus.sub called with a function')
			assert.strictEqual(call.topic, testTopic, 'eventbus.sub called with correct topic')
			assert.strictEqual(call.distinct, false, 'eventbus.sub called with expected default (distinct)')
			assert.strictEqual(call.once, false, 'eventbus.sub called with expected default (once)')
			assert.strictEqual(call.minInterval, 0, 'eventbus.sub called with expected default (minInterval)')
			assert.strictEqual(call.description, '', 'eventbus.sub called with expected default (description)')
		})

		it('event subscriptions are stored in element.DOM.event.subscriptions', () => {

			const domObj = getDomObjStub()
			domObj.eventbus = getEventbusStub()

			const testFn = () => { }
			const testTopic = 'testTopic'
			const subscription = {
				topic: testTopic,
				fn: testFn,
			} as unknown as DomEventSubscription

			event.sub(domObj, subscription)

			assert.strictEqual(domObj.element.DOM.event.subscriptions[0].token, 'a token', 'token stored in event subscriptions')
			assert.isObject(domObj.element.DOM.event.subscriptions[0].subscription, 'subscription stored in event subscriptions')

		})

	})
})

