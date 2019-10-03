import {
	DomObject,
} from '../types'

import dom from '../index'
import { runAndReturnFactory } from '../utils/run'

export interface DomSelectionMethod {
	(o: DomObject, string: string): DomObject
}

export const child: DomSelectionMethod = (o, selector = '') => {
	if (!o.element|| !o.element.querySelectorAll) return dom([])
	return dom(o.element.querySelectorAll(selector))
}

export const sibling: DomSelectionMethod = (o, selector = '') => {
	if (!o.element.parentNode || !selector) return dom([])
	const siblings = o.element.parentNode.querySelectorAll(selector)
	const queryResult = Array.from(siblings)
	return dom(queryResult.filter((elem) => elem !== o.element))
}

export const parent: DomSelectionMethod = (o, selector = '') => {
	if (!o.element || !o.element.closest) return dom([])
	return dom(o.element.closest(selector))
}

export const selection = {
	child: runAndReturnFactory(child),
	sibling: runAndReturnFactory(sibling),
	parent: runAndReturnFactory(parent),
}

selection.child('div')