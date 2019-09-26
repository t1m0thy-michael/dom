import Dom from './utils/prototype'
import create from './utils/create'

import { isDom, isNode, is_node_elem_array } from './utils/typeChecks'

import u from '@t1m0thy_michael/u'

let eventbus = false
			
const createDomProperties = () => {
	return { 
		data: new Map(), 
		def: {},
		event: { 
			subscriptions: [], 
			onEvent: [] 
		},
		on: {},
	}
}

const createDomElement = (node) => {
	const domElem = node
	domElem.DOM = domElem.DOM || createDomProperties()
	return domElem
}

const dom = (initiator) => {

	if (isDom(initiator)) return initiator
	
	let list  = []
	
	if (initiator) {	

		if (isNode(initiator)) {
			list[0] = createDomElement(initiator)

		} else if (initiator instanceof NodeList || initiator instanceof HTMLCollection) {
			list = Array.from(initiator).map(createDomElement)

		} else if (u.isString(initiator)) {
			list = u.makeSureItsAnArray(document.querySelectorAll(initiator)).map(createDomElement)

		} else if (is_node_elem_array(initiator)) {
			list = (initiator.map(createDomElement))

		} else if (u.isObject(initiator)) {
			list[0] = create(initiator)
		}
	}

	return Object.create(Dom, {
		list: { value: list, writable: false },
		element: { value: list[0], writable: false },
		initiator: { value: initiator, writable: false },
		exists: { value: (list.length > 0), writable: false },
		eventbus: { get: () => eventbus },
	})
}

// add setup methods directly to dom object
dom.registerPlugin = (name, fn) => Dom[name] = fn 
dom.registerEventBus = (eb) => eventbus = eb

if (typeof window !== 'undefined') (window).dom = dom

export default dom