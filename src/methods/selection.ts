import {
	NodeDescendant,
	DomObject,
	DomInitiator,
	DomElement
} from '../types'

import { isString, makeID, unique } from '@t1m0thy_michael/u'
import { runAndReturnFactory } from '../utils/run'
import { dom } from '../dom'

// adds classes to the elements we're searching for then uses querySelectorAll
export const child = (obj: DomObject, needle: DomInitiator | DomObject): DomObject => {
	if (!obj.element|| !obj.element.querySelectorAll) return dom([])
	const identifier = makeID(10,'_')
	needle = dom(needle)
	needle.addClass(identifier)
	const result = dom(obj.element.querySelectorAll(`.${identifier}`))
	needle.removeClass(identifier)
	return result
}

export const sibling = (obj: DomObject, needle: DomInitiator | DomObject): DomObject => {
	if (!obj.element.parentNode || !needle) return dom([])
	const queryResult = dom(needle).list
	return dom(queryResult.filter((elem) => elem !== obj.element))
}

export const parent = (obj: DomObject, needle: DomInitiator | DomObject): DomObject => {
	if (!obj.element || !obj.element.closest) return dom([])
	if (isString(needle)) return dom(obj.element.closest(needle))

	needle = dom(needle)
	const results = [] as DomElement[]
	needle.list.forEach((n:  DomElement) => {
		if (dom(n).child(obj).list.length) results.push(n)
	})
	return dom(results)
}

export const isAppended = (element: NodeDescendant): boolean => document.body.contains(element)

export const is = (obj: DomObject, selector: string): DomObject => {
	if (!obj.element.matches || !obj.element.matches(selector)) return dom([])
	return dom(obj.element)
}

export const not = (obj: DomObject, selector: string): DomObject => {
	if (obj.element.matches && obj.element.matches(selector)) return dom([])
	return dom(obj.element)
}

// Returns single new DomObject created from result.list arrays
// only for use with methods that always return DomObjects
export const runAndReturnSingleDomObjectFactory = <T extends any[]>(fn: (o: DomObject, ...args: T) => DomObject): ((...args: T) => DomObject) =>
	function (this: DomObject, ...args) {
		let results = []
		for (let i = 0; i < this.list.length; i++) {
			try {
				results.push(...fn(dom(this.list[i]), ...args).list)
			} catch (e) {
				console.error(e)
			}
		}
		return dom(unique(results))
	}

export const selection = {
	child: runAndReturnSingleDomObjectFactory(child),
	isAppended: runAndReturnFactory(isAppended),
	not: runAndReturnSingleDomObjectFactory(not),
	parent: runAndReturnSingleDomObjectFactory(parent),
	is: runAndReturnSingleDomObjectFactory(is),
	sibling: runAndReturnSingleDomObjectFactory(sibling),
}