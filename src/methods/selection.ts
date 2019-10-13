import {
	NodeDescendant,
	DomObject,
} from '../types'

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

export const selection = {
	child,
	isAppended,
	parent,
	is,
	not,
	sibling,
}