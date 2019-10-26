import { 
	DomElement, 
	DomInitiator,
	DomObject,  
	DomInitiatorBasic,
	EventBusInterface,
	DomObjectPrototype,
} from './types'

import { create } from './utils/create'
import { isDom, isNode } from './utils/typeChecks'
import { runAndReturnFactory } from './utils/run'
import { registerSetter } from './utils/setters'
import { isString, isObject, isArrayLike, makeSureItsAnArray } from '@t1m0thy_michael/u'

import { attribute } from './methods/attributes'
import { classes } from './methods/classes'
import { event } from './methods/events'
import { form } from './methods/form'
import { insertion } from './methods/insertion'
import { selection } from './methods/selection'
import { styles } from './methods/styles'
import { viewport } from './methods/viewport'

// dynamic getter - deals with circular deps within method modules
export const getPrototype = (()=> {
	let DOM = false as unknown as DomObjectPrototype
	return (): DomObjectPrototype => {
		if(!DOM){
			DOM = Object.assign(
				{
					eventbus: null,
					toString: function () { return '[object Dom]' },
				},
				attribute,
				classes,
				event,
				form,
				insertion,
				selection,
				styles,
				viewport,
			)
		}
		return DOM
	}
})()

export const createDomProperties = () => {
	return { 
		data: new Map(), 
		def: {},
		event: { 
			subscriptions: [], 
			on: [] 
		},
		on: {},
	}
}

export const createDomElement = (initiator: DomInitiatorBasic): DomElement => {
	// Already a node, just add required properties
	if (initiator instanceof Node) {
		const domElem = initiator as DomElement
		domElem.DOM = domElem.DOM || createDomProperties()
		return domElem
	}
	return dom(initiator).element
}

export const dom = (initiator: DomInitiator): DomObject => {

	if (isDom(initiator)) return initiator
	
	let list = [] as DomElement[]
			
	if (isNode(initiator)) {
		list[0] = createDomElement(initiator)

	} else if (isString(initiator)) {
		list = makeSureItsAnArray(document.querySelectorAll(initiator))
			.map(createDomElement)

	} else if (isArrayLike(initiator)) {
		makeSureItsAnArray(initiator as any)
			.map(dom)
			.forEach(item => list.push(...item.list))
		
	} else if (isObject(initiator)) {
		list[0] = create(initiator)
	}

	return Object.create(getPrototype(), {
		list: { value: list, writable: false },
		element: { value: list[0], writable: false },
		initiator: { value: initiator, writable: false },
		exists: { value: (list.length > 0), writable: false },
	})
	
}

dom.br = { br: 1 }

dom.text = (txt: string) => dom(document.createTextNode(txt))

// add setup methods directly to dom object
dom.registerPlugin = (name: string, fn: (this: DomElement, ...args: any[]) => any) => {
	getPrototype()[name] = runAndReturnFactory(fn)
}

dom.registerSetter = registerSetter

dom.setEventbus = (eb: EventBusInterface | null) => getPrototype().eventbus = eb
dom.getEventbus = () => getPrototype().eventbus

dom.isDom = isDom

 
const gbl = (<any>globalThis) || (<any>window) || (<any>self) || (<any>global) || {} // node and browser compatible
if (!gbl.dom) {
	gbl.dom = dom
}