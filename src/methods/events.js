import { EventTypes} from '../utils/eventTypes'

import { isFunction, isString, makeSureItsAnArray }from '@t1m0thy_michael/u'

import { runFactory } from '../utils/run'
import { 
	DOM_Dont_Be_Stupid,
	Dom_EventBus_Error, 
	Dom_Missing_Argument,
} from '../utils/errors'

import { dom } from '../dom'
 
const domSpecialEvents = ['append']

// TODO: more special DOM events
const _addSpecialEvent = (obj, {
	event,
	topic,
	data,
	fn,
	ctx,
}) => {

	const e = event.toLowerCase()

	if (domSpecialEvents.includes(event.toLowerCase())) {
		if (isFunction(fn) || isString(topic)) {
			obj.element.DOM.on[event] = async function () {
				if (isFunction(fn)) fn({ target: obj.element })
				if (topic && obj.eventbus) {
					obj.eventbus.pub({
						topic: topic,
						data: isFunction(data) ? data(e) : data,
						ctx: ctx || obj.element
					})
				}
			}
		}
		return true
	}
	return false
}

const _createEventHandler = (
	obj,
	{
		topic,
		ctx,
		data,
		fn,
		stopPropagation = false,
		preventDefault = true,
	}
) => async function (e) {
	if (preventDefault) e.preventDefault()
	if (stopPropagation) e.stopPropagation()
	if (isFunction(fn)) fn(e)
	if (topic) {
		obj.eventbus.pub({
			topic: topic,
			data: isFunction(data) ? data(e) : data,
			ctx: ctx || obj,
		})
	}
}

export const sub = (
	element,
	{
		topic,
		fn,
		uid,
		distinct = false,
		once = false,
		minInterval = 0,
		description = '',
	}
) => {

	const obj = dom(element)

	if (!isString(topic) || !isFunction(fn)) throw new Dom_EventBus_Error(`Must provide topic [${topic}] and fn [${(fn || {}).name}]`)
	
	const subscription = {
		topic: topic,
		uid: uid,
		fn: fn.bind(obj),
		distinct: distinct,
		once: once,
		minInterval: minInterval,
		description: description,
	}

	const token = obj.eventbus.sub(subscription)
	obj.element.DOM.event.subscriptions.push({ subscription, token })
}

export const on = (
	element,
	{
		event,
		topic,
		ctx,
		uid,
		data,
		fn,
		stopPropagation = false,
		preventDefault = true,
	}
) => {
	
	if (!isString(topic) && !isFunction(fn)) throw new Dom_Missing_Argument(`on: Must provide topic [${topic}] OR fn [${(fn || {}).name}]`)
	if (!event || !event.length) throw new Dom_Missing_Argument(`on: invalid event [${event}] (1)`)

	const obj = dom(element)

	makeSureItsAnArray(event).forEach((event) => {

		// confirm passed options
		if (!isString(event) || !event.length) throw new Dom_Missing_Argument(`on: invalid event [${event}] (2)`)
		if (event === topic) throw new DOM_Dont_Be_Stupid('event === topic will lead to infinite loop.')

		// bind dom OBJECT to all functions
		if (isFunction(fn)) fn = fn.bind(obj)
		if (isFunction(data)) data = data.bind(obj)

		// dom special events (append, etc...)
		if (_addSpecialEvent(obj, {
			event,
			topic,
			data,
			fn,
			ctx,
		})) return

		// standard event types
		if (event in EventTypes){
			const onHandler = _createEventHandler(obj, {
				event,
				topic,
				data,
				fn,
				stopPropagation,
				preventDefault,
				ctx,
			})
		
			obj.element.addEventListener(event, onHandler)
			obj.element.DOM.event.on.push(onHandler)

			return
		} 
	
		// not a standard event, assume event is an eventbus topic
		if (isFunction(fn)){
			sub( element, {
				topic: event,
				fn,
				uid,
			})

			return
		}

	})
}

export const fireEvent = (element, event) => {
	const evt = document.createEvent('HTMLEvents')
	evt.initEvent(event, false, true)
	element.dispatchEvent(evt)
}

export const change = (element) => fireEvent(element, 'change')

export const click = (element) => fireEvent(element, 'click')

export const event = {
	change: runFactory(change),
	click: runFactory(click),
	fireEvent: runFactory(fireEvent),
	on: runFactory(on),
}

export default event