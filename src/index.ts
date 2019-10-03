import { 
	NodeDescendant, 
	DomElement, 
	DomInitiator,
	DomObject  
} from './types'

import { isString, isObject,makeSureItsAnArray } from '@t1m0thy_michael/u'

import { DOM } from './utils/prototype'
import create from './utils/create'
import { isDom, isNode, isArrayLikeOfNodes } from './utils/typeChecks'

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

const createDomElement = (node: NodeDescendant): DomElement => {
	const domElem = node as DomElement
	domElem.DOM = domElem.DOM || createDomProperties()
	return domElem
}

const nodesToArray = (arr: any): (NodeDescendant)[] => makeSureItsAnArray(arr as any[])

const dom = (initiator: DomInitiator): DomObject => {

	if (isDom(initiator)) return initiator
	
	let list = [] as DomElement[]
	
	if (initiator) {	

		if (isNode(initiator)) {
			list[0] = createDomElement(initiator)

		} else if (isArrayLikeOfNodes(initiator)) {
			list = nodesToArray(initiator).map(createDomElement)

		} else if (isString(initiator)) {
			list = makeSureItsAnArray(document.querySelectorAll(initiator)).map(createDomElement)

		} else if (isObject(initiator)) {
			list[0] = create(initiator)
		}
	}

	return Object.create(DOM, {
		list: { value: list, writable: false },
		element: { value: list[0], writable: false },
		initiator: { value: initiator, writable: false },
		exists: { value: (list.length > 0), writable: false },
	})
}

// add setup methods directly to dom object
// dom.registerPlugin = (name, fn) => Dom[name] = fn 
// dom.registerEventBus = (eb) => eventbus = eb

// if (typeof window !== 'undefined') (window).dom = dom

export default dom