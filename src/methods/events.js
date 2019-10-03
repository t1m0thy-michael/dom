import runFactory from '../utils/runFactory'
import { Dom_EventBus_Error } from '../utils/errors'
import u from '@t1m0thy_michael/u'

const sub = (
	element, 
	domElement,
	{
		topic,
		fn,
		distinct,
		once,
		minInterval,
		description,
	}
) => {

	if (!domElement.eventbus) throw new Dom_EventBus_Error('Not registered')
	if (!topic || !fn || !u.isFunction(fn)) return
	
	const subscription = {
		topic: topic,
		fn: fn.bind(element),
		distinct: distinct || false,
		once: once || false,
		minInterval: minInterval || 0,
		description: description || ''
	}

	const token = domElement.eventbus.sub(subscription)
	element.DOM.event.subscriptions.push({ subscription, token })
}

const onEvent = (
	element, 
	domElement,
	{
		event,
		topic,
		data,
		fn,
		stopPropagation = false,
		preventDefault = true,
		elementAsCtx = true,
	}
) => {
	if (u.isFunction(fn)) fn = fn.bind(element)
	if (u.isFunction(data)) data = data.bind(element)

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
	if (['append'].includes(event.toLowerCase())) {
		element.DOM.on[event] = fn
		return
	}

	const onEventHandler = async function (e) {
		if (preventDefault) e.preventDefault()
		if (stopPropagation) e.stopPropagation()
		if (u.isFunction(fn)) fn(e)
		if (topic) {
			if (domElement.eventbus) {
				domElement.eventbus.pub({
					topic: topic,
					data: u.isFunction(data) ? data(e) : data,
					ctx: elementAsCtx ? element : undefined
				})
			} else {
				if (!domElement.eventbus) throw new Dom_EventBus_Error('Not registered')
			}
		}
	}

	element.DOM.event.onEvent.push(onEventHandler)
	element.addEventListener(event, onEventHandler)
}

const on = (element, domElement, evnt, fn) => {
	onEvent(
		element,
		domElement,
		{ event: evnt, fn: fn }
	)
}

const fireEvent = (element, domElement, event) => {
	const evt = document.createEvent('HTMLEvents')
	evt.initEvent(event, false, true)
	element.dispatchEvent(evt)
}

export default {
	change: function () { return runFactory(this, fireEvent)('change') },
	click: function () { return runFactory(this, fireEvent)('click') },
	fireEvent: function (str) { return runFactory(this, fireEvent)(str) },
	on: function (evnt, fn) { return runFactory(this, on)(evnt, fn) },
	onEvent: function (opt) { return runFactory(this, onEvent)(opt) },
	sub: function (opt) { return runFactory(this, sub)(opt) },
}