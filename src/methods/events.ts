import { 
	NodeDescendant,
	DomEventSubscription,
	DomEvent,
	DomElement,
	DomObject,
 } from '../types'

import { dom } from '../dom'
import { Dom_EventBus_Error } from '../utils/errors'
import { isFunction }from '@t1m0thy_michael/u'

const sub = (
	element: NodeDescendant,
	{
		topic,
		fn,
		distinct,
		once,
		minInterval,
		description,
	}: DomEventSubscription
) => {

	const obj = dom(element)

	if (!obj.eventbus) throw new Dom_EventBus_Error('Not registered')
	if (!topic || !fn || !isFunction(fn)) return
	
	const subscription = {
		topic: topic,
		fn: fn.bind(element),
		distinct: distinct || false,
		once: once || false,
		minInterval: minInterval || 0,
		description: description || ''
	}

	const token = obj.eventbus.sub(subscription)
	element.DOM.event.subscriptions.push({ subscription, token })
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
	}: DomEvent) => async function (e: Event) {
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

const onEvent = (
	element: NodeDescendant,
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

	if (isFunction(fn)) fn = fn.bind(element)
	if (isFunction(data)) data = data.bind(element)

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

	element.DOM.event.onEvent.push(onEventHandler)
	element.addEventListener(event, onEventHandler)
}

const on = (element: NodeDescendant, evnt: string, fn: EventListener) => onEvent(element, { event: evnt, fn: fn })

const fireEvent = (element: NodeDescendant, event: string) => {
	const evt = document.createEvent('HTMLEvents')
	evt.initEvent(event, false, true)
	element.dispatchEvent(evt)
}

export const event = {
	change: (element: NodeDescendant) => fireEvent(element, 'change'),
	click: (element: NodeDescendant) => fireEvent(element, 'click'),
	fireEvent,
	on,
	onEvent,
	sub,
}