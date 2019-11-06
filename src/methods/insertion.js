import { runFactory } from '../utils/run'
import { dom } from '../dom'

import { 
	isString, 
	isFunction,
	makeSureItsAnArray,
} from '@t1m0thy_michael/u'

export const appendTo = (element, initiator) => {
	const elem = dom(initiator)
	if (elem.list.length > 0)  elem.element.appendChild(element)
	if (isFunction(element.DOM.on.append)) element.DOM.on.append({})
}

export const insert = (element, pos, initiator) => {
	let e2 = dom(initiator)
	if (e2.element && e2.element.insertAdjacentElement) e2.element.insertAdjacentElement(pos, element)
	if (isFunction(element.DOM.on.append)) element.DOM.on.append({})
}

export const appendAfter = (element, initiator) => insert(element, 'afterend', initiator)

export const appendBefore = (element, initiator) => insert(element, 'beforebegin', initiator)

export const appendFirstChild = (element, initiator) => insert(element, 'afterbegin', initiator)

export const appendLastChild = (element, initiator) => insert(element, 'beforeend', initiator)

export const empty = (element) => {
	Array.from(element.children).forEach((node) => {
		dom(node).remove()
	})
}

export const remove = (element, initiator) => {

	const obj = dom(element)

	// initiator will remove specified child of selected element if given
	const elems = isString(initiator) ? obj.child(initiator).list : obj.list
	// element to be removed
	elems.forEach((elem) => {

		// first remove all children. this is to clean up event stuff
		let childNodeArr = makeSureItsAnArray(elem.children)
		for (let i = childNodeArr.length - 1; i >= 0; i--) {
			dom(childNodeArr[i]).remove()
		}

		// remove event subscriptions
		if (elem.DOM.event.subscriptions.length) {
			elem.DOM.event.subscriptions.forEach((evt) => {
				if (!obj.eventbus || !evt.token) return
				obj.eventbus.remove(evt.token)
				delete evt.token
			})
		}
		
		if (elem.parentNode) elem.parentNode.removeChild(elem)
	})
}

export const replace = (element, initiator) => {
	if (element.parentNode) element.parentNode.replaceChild(dom(initiator).element, element)
}

export const insertion = {
	appendAfter: runFactory(appendAfter),
	appendBefore: runFactory(appendBefore),
	appendFirstChild: runFactory(appendFirstChild),
	appendLastChild: runFactory(appendLastChild),
	appendTo: runFactory(appendTo),
	empty: runFactory(empty),
	remove: runFactory(remove),
	replace: runFactory(replace),
}
