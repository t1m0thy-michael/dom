import {
	NodeDescendant,
	DomObject,
} from '../types'

import { runAndReturnFactory } from '../utils/run'
import dom from '../dom'

export const child = (obj: DomObject, selector: string): DomObject => {
	if (!obj.element|| !obj.element.querySelectorAll) return dom([])
	return dom(obj.element.querySelectorAll(selector))
}

export const sibling = (obj: DomObject, selector: string): DomObject => {
	if (!obj.element.parentNode || !selector) return dom([])
	const siblings = obj.element.parentNode.querySelectorAll(selector)
	const queryResult = Array.from(siblings)
	return dom(queryResult.filter((elem) => elem !== obj.element))
}

export const parent = (obj: DomObject, selector: string): DomObject => {
	if (!obj.element || !obj.element.closest) return dom([])
	return dom(obj.element.closest(selector))
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
		return dom(results)
	}

export const selection = {
	child: runAndReturnSingleDomObjectFactory(child),
	isAppended: runAndReturnFactory(isAppended),
	not: runAndReturnSingleDomObjectFactory(not),
	parent: runAndReturnSingleDomObjectFactory(parent),
	is: runAndReturnSingleDomObjectFactory(is),
	sibling: runAndReturnSingleDomObjectFactory(sibling),
}