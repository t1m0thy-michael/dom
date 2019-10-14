import { 
	NodeDescendant,
	DomEventSubscription,
	DomEvent,
	DomElement,
	DomObject,
} from '../types'

import { isFunction, isString }from '@t1m0thy_michael/u'

import { dom } from '../dom'
import { runFactory } from '../utils/run'
import { Dom_EventBus_Error } from '../utils/errors'
 
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
		fn: fn.bind(obj.element),
		distinct: distinct,
		once: once,
		minInterval: minInterval,
		description: description,
	}

	const token = obj.eventbus.sub(subscription)
	obj.element.DOM.event.subscriptions.push({ subscription, token })
}

const _addSpecialEvent = (element: DomElement, event: string, fn: EventListener | undefined) => {
	// TODO: special DOM events
	// move array of events somewhere else...
	// this is intended as improvement over Mutation events
	// will fire when DOM is used to initiate the event
	/*
		DOMAttrModified
		DOMAttributeNameChanged
		DOMCharacterDataModified
		DOMElementNameChanged
		DOMNodeInserted 			** implemented in DOM
		DOMNodeInsertedIntoDocument
		DOMNodeRemoved
		DOMNodeRemovedFromDocument
		DOMSubtreeModified
	*/
	if (isFunction(fn) && ['append'].includes(event.toLowerCase())) {
		element.DOM.on[event] = fn
	}
	return element
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
			ctx: elementAsCtx ? obj.element : undefined
		})
	}
}

export const onEvent = (
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

	if (isFunction(fn)) fn = fn.bind(obj.element)
	if (isFunction(data)) data = data.bind(obj.element)

	_addSpecialEvent(obj.element, event, fn)

	const onEventHandler = _createEventHandler(obj, {
		event,
		topic,
		data,
		fn,
		stopPropagation,
		preventDefault,
		elementAsCtx,
	})

	obj.element.DOM.event.onEvent.push(onEventHandler)
	obj.element.addEventListener(event, onEventHandler)
}

export const on = (element: DomElement, evnt: string, fn: EventListener) => onEvent(element, { event: evnt, fn: fn })

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
	onEvent: runFactory(onEvent),
	sub: runFactory(sub),
}