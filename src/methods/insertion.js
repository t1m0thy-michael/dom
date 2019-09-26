import u from '@t1m0thy_michael/u'
import dom from '../dom'
import eventJS from '@t1m0thy_michael/e'

import runFactory from '../utils/runFactory'

const appendTo = (e, domElement, initiator) => {
	const elem = dom(initiator)
	if (elem.list.length > 0)  elem.element.appendChild(e)
	if (u.isFunction(e.DOM.on.append)) e.DOM.on.append(e)
}

const insert = (e, pos, initiator) => {
	let e2 = dom(initiator)
	if (e2.element && e2.element.insertAdjacentElement) e2.element.insertAdjacentElement(pos, e)
	if (u.isFunction(e.DOM.on.append)) e.DOM.on.append()
}

const appendAfter = (e, domElement, initiator) => insert(e, 'afterend', initiator)

const appendBefore = (e, domElement, initiator) => insert(e, 'beforebegin', initiator)

const appendFirstChild = (e, domElement, initiator) => insert(e, 'afterbegin', initiator)

const appendLastChild = (e, domElement, initiator) => insert(e, 'beforeend', initiator)

const empty = (element, domElement) => {
	Array.from(element.children).forEach((node) => {
		dom(node).remove()
	})
}

const remove = (element, domElement, initiator) => {
	// initiator will remove specified child of selected element if given
	const elems = initiator ? dom(element).child(initiator).list : dom(element).list
	// element to be removed
	elems.forEach((elem) => {

		// first remove all children. this is to clean up event stuff
		let childNodeArr = u.makeSureItsAnArray(elem.children)
		for (let i = childNodeArr.length - 1; i >= 0; i--) {
			dom(childNodeArr[i]).remove()
		}

		// remove event subscriptions
		if (elem.DOM.event.subscriptions.length) {
			elem.DOM.event.subscriptions.forEach((evt) => {
				if (!evt.token) return
				eventJS.remove(evt.token)
				delete evt.token
			})
		}
		
		if (elem.parentNode) elem.parentNode.removeChild(elem)
	})
}

const replace = (element, domElement, initiator) => {
	if (element.parentNode) element.parentNode.replaceChild(dom(initiator).element, element)
}

export default {
	appendAfter: function (initiator) { return runFactory(this, appendAfter)(initiator) },
	appendBefore: function (initiator) { return runFactory(this, appendBefore)(initiator) },
	appendFirstChild: function (initiator) { return runFactory(this, appendFirstChild)(initiator) },
	appendLastChild: function (initiator) { return runFactory(this, appendLastChild)(initiator) },
	appendTo: function (initiator) { return runFactory(this, appendTo)(initiator) },
	empty: function () { return runFactory(this, empty)() },
	remove: function (initiator) { return runFactory(this, remove)(initiator) },
	replace: function (initiator) { return runFactory(this, replace)(initiator) },
}
