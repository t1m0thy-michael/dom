import {
	NodeDescendant,
	DomInitiator,
	DomElement,
} from '../types'

import { 
	isString, 
	isFunction,
	makeSureItsAnArray,
} from '@t1m0thy_michael/u'

import { dom } from '../dom'

export const appendTo = (element: NodeDescendant, initiator: DomInitiator) => {
	const elem = dom(initiator)
	if (elem.list.length > 0)  elem.element.appendChild(element)
	if (isFunction(element.DOM.on.append)) element.DOM.on.append({} as Event)
}

export const insert = (element: NodeDescendant, pos: InsertPosition, initiator: DomInitiator) => {
	let e2 = dom(initiator)
	if (e2.element && e2.element.insertAdjacentElement) e2.element.insertAdjacentElement(pos, element as Element)
	if (isFunction(element.DOM.on.append)) element.DOM.on.append({} as Event)
}

export const appendAfter = (element: NodeDescendant, initiator: DomInitiator) => insert(element, 'afterend', initiator)

export const appendBefore = (element: NodeDescendant, initiator: DomInitiator) => insert(element, 'beforebegin', initiator)

export const appendFirstChild = (element: NodeDescendant, initiator: DomInitiator) => insert(element, 'afterbegin', initiator)

export const appendLastChild = (element: NodeDescendant, initiator: DomInitiator) => insert(element, 'beforeend', initiator)

export const empty = (element: NodeDescendant) => {
	Array.from(element.children as HTMLCollection).forEach((node) => {
		dom(node).remove()
	})
}

export const remove = (element: NodeDescendant, initiator?: DomInitiator) => {

	const obj = dom(element)

	// initiator will remove specified child of selected element if given
	const elems = isString(initiator) ? obj.child(initiator).list : obj.list
	// element to be removed
	elems.forEach((elem: DomElement) => {

		// first remove all children. this is to clean up event stuff
		let childNodeArr = makeSureItsAnArray(elem.children)
		for (let i = childNodeArr.length - 1; i >= 0; i--) {
			dom(childNodeArr[i]).remove()
		}

		// remove event subscriptions
		if (elem.DOM.event.subscriptions.length) {
			elem.DOM.event.subscriptions.forEach((evt) => {
				if (!evt.token) return
				obj.eventbus.remove(evt.token)
				delete evt.token
			})
		}
		
		if (elem.parentNode) elem.parentNode.removeChild(elem)
	})
}

export const replace = (element: NodeDescendant, initiator: DomInitiator) => {
	if (element.parentNode) element.parentNode.replaceChild(dom(initiator).element, element)
}

export const insertion = {
	appendAfter,
	appendBefore,
	appendFirstChild,
	appendLastChild,
	appendTo,
	empty,
	remove,
	replace,
}
