import { 
	DomElement, 
	DomInitiator,
	DomObject,  
	DomInitiatorBasic,
	EventBusInterface,
} from './types'

import { DOM } from './utils/prototype'
import { create } from './utils/create'
import { isDom, isNode } from './utils/typeChecks'
import { runAndReturnFactory } from './utils/run'
import { isString, isObject, isArray, isArrayLike, makeSureItsAnArray } from '@t1m0thy_michael/u'

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

		} else if (isString(initiator)) {
			list = makeSureItsAnArray(document.querySelectorAll(initiator)).map(createDomElement)

		} else if (isArrayLike(initiator)) {
			makeSureItsAnArray(initiator as any)
				.map(dom)
				.forEach(item => list.push(...item.list))
			
		} else if (isObject(initiator)) {
			list[0] = create(initiator)
		}
	}

	return Object.create (DOM, {
		list: { value: list, writable: false },
		element: { value: list[0], writable: false },
		initiator: { value: initiator, writable: false },
		exists: { value: (list.length > 0), writable: false },
	})
	
}

dom.text = (txt: string) => dom(document.createTextNode(txt))

// add setup methods directly to dom object
dom.registerPlugin = (name: string, fn: (this: DomElement, ...args: any[]) => any) => 
	(<any>DOM)[name] = runAndReturnFactory(fn)

dom.registerEventbus = (eb: EventBusInterface) => DOM.eventbus = eb
 
declare global { interface Window { dom: typeof dom; } }
if (window && !window.dom) window.dom = dom

export default dom