import { 
	NodeDescendant,
	DomEventSubscription,
	DomEvent,
	DomElement,
	DomObject,
} from '../types'

import { EventTypes} from '../enum'

import { isFunction, isString }from '@t1m0thy_michael/u'

import { runFactory } from '../utils/run'
import { 
	DOM_Dont_Be_Stupid,
	Dom_EventBus_Error, 
	Dom_Missing_Argument,
} from '../utils/errors'

import { dom } from '../dom'
 
// TODO: more special DOM events
const _addSpecialEvent = (obj: DomObject, {
	event,
	topic,
	data,
	fn,
	elementAsCtx = true
}: DomEvent) => {

	const e = event.toLowerCase()

	if (['append'].includes(event.toLowerCase())) {
		if (isFunction(fn) || isString(topic)) {
			obj.element.DOM.on[event] = async function () {
				if (isFunction(fn)) fn({ target: obj.element } as unknown as Event)
				if (topic && obj.eventbus) {
					obj.eventbus.pub({
						topic: topic,
						data: isFunction(data) ? data(e) : data,
						ctx: elementAsCtx ? obj.element : undefined
					})
				}
			}
		}
		return true
	}
	return false
}

const _createEventHandler = (
	obj: DomObject,
	{
		event,
		topic,
		data,
		fn,
		stopPropagation = false,
		preventDefault = true,
		elementAsCtx = true,
	}: DomEvent
) => async function (e: Event) {
	if (preventDefault) e.preventDefault()
	if (stopPropagation) e.stopPropagation()
	if (isFunction(fn)) fn(e)
	if (topic) {
		if (!obj.eventbus) throw new Dom_EventBus_Error('Not registered')
		obj.eventbus.pub({
			topic: topic,
			data: isFunction(data) ? data(e) : data,
			ctx: elementAsCtx ? obj : undefined
		})
	}
}

export const sub = (
	element: DomElement,
	{
		topic,
		fn,
		distinct = false,
		once = false,
		minInterval = 0,
		description = '',
	}: DomEventSubscription
) => {

	const obj = dom(element)

	if (!obj.eventbus) throw new Dom_EventBus_Error('Not registered')
	if (!isString(topic) || !isFunction(fn)) throw new Dom_EventBus_Error('Must provide [topic] and [fn]')
	
	const subscription = {
		topic: topic,
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
	element: DomElement,
	{
		event,
		topic,
		data,
		fn,
		stopPropagation = false,
		preventDefault = true,
		elementAsCtx = true,
	}: DomEvent
) => {

	const obj = dom(element)

	// confirm passed options
	if (!isString(event) || !event.length) throw new Dom_Missing_Argument('on: invalid [event]')
	if (!isString(topic) && !isFunction(fn)) throw new Dom_Missing_Argument('on: Must provide [topic | fn]')
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
		elementAsCtx,
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
			elementAsCtx,
		})
		
		obj.element.addEventListener(event, onHandler)
		obj.element.DOM.event.on.push(onHandler)

		return
	} 
	
	// not a standard event, assume event is an eventbs topic
	if (isFunction(fn)){
		sub( element, {
			topic: event,
			fn,
		})

		return
	}
}

export const fireEvent = (element: NodeDescendant, event: string) => {
	const evt = document.createEvent('HTMLEvents')
	evt.initEvent(event, false, true)
	element.dispatchEvent(evt)
}

export const change = (element: NodeDescendant) => fireEvent(element, 'change')

export const click = (element: NodeDescendant) => fireEvent(element, 'click')

export const event = {
	change: runFactory(change),
	click: runFactory(click),
	fireEvent: runFactory(fireEvent),
	on: runFactory(on),
	sub: runFactory(sub),
}