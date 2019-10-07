import { 
	DomElement, 
	DomInitiator,
	DomObject,  
	DomInitiatorBasic
} from './types'

import { DOM } from './utils/prototype'
import { create } from './utils/create'
import { isDom, isNode } from './utils/typeChecks'

import { isString, isObject, isArrayLike, makeSureItsAnArray } from '@t1m0thy_michael/u'

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

const createDomElement = (node: DomInitiatorBasic): DomElement => {
	// Already a node, just add required properties
	if (node instanceof Node) {
		const domElem = node as DomElement
		domElem.DOM = domElem.DOM || createDomProperties()
		return domElem
	}
	return dom(node).element
}

export const dom = (initiator: DomInitiator): DomObject => {

	if (isDom(initiator)) return initiator
	
	let list = [] as DomElement[]
	
	if (initiator) {	

		if (isNode(initiator)) {
			list[0] = createDomElement(initiator)

		} else if (isArrayLike(initiator)) {
			list = makeSureItsAnArray(initiator as any).map(createDomElement)

		} else if (isString(initiator)) {
			list = makeSureItsAnArray(document.querySelectorAll(initiator)).map(createDomElement)

		} else if (isObject(initiator)) {
			list[0] = create(initiator)
		}
	}

	return Object.create (DOM, {
		list: { value: list, writable: false },
		element: { value: list[0], writable: false },
		initiator: { value: initiator, writable: false },
		exists: { value: (list.length > 0), writable: false },
		isAppended: { get: function (this: DomObject) { return this.list.length } },
	})
	
}

// add setup methods directly to dom object
// dom.registerPlugin = (name, fn) => Dom[name] = fn 
// dom.registerEventBus = (eb) => eventbus = eb

// if (typeof window !== 'undefined') (window).dom = dom

let test = dom('div')
test.appendAfter('sdfaf')


export default dom