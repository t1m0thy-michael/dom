import {
	NodeDescendant,
	DomObject,
} from '../types'

import dom from '../dom'

export const child = (element: NodeDescendant, selector: string): DomObject => {
	if (!element|| !element.querySelectorAll) return dom([])
	return dom(element.querySelectorAll(selector))
}

export const sibling = (element: NodeDescendant, selector: string): DomObject => {
	if (!element.parentNode || !selector) return dom([])
	const siblings = element.parentNode.querySelectorAll(selector)
	const queryResult = Array.from(siblings)
	return dom(queryResult.filter((elem) => elem !== element))
}

export const parent = (element: NodeDescendant, selector: string): DomObject => {
	if (!element || !element.closest) return dom([])
	return dom(element.closest(selector))
}

export const selection = {
	child,
	sibling,
	parent,
}