import { NodeDescendant } from '../types'

import { runFactory, runAndReturnFactory } from '../utils/run'

import u from '@t1m0thy_michael/u'

const addClass = (element: NodeDescendant, className: string | string[]): void => {
	if (!element.classList) return 
	element.classList.add(...u.makeSureItsAnArray(className))
}

const removeClass = (element: NodeDescendant, className: string | string[]): void => {
	if (!element.classList) return 
	element.classList.remove(...u.makeSureItsAnArray(className))
}

const replaceClass = (element: NodeDescendant, oldClass: string, newClass: string): void => {
	if (!element.classList) return 
	element.classList.replace(oldClass, newClass)
}

const toggleClass = (element: NodeDescendant, className: string): boolean | void => {
	if (!element.classList) return false
	return element.classList.toggle(className)
}

const hasClass = (element: NodeDescendant, className: string): boolean | void => {
	if (!element.classList) return false
	return element.classList.contains(className)
}

export const classes = {
	addClass,
	removeClass,
	replaceClass,
	toggleClass,
	hasClass,
}
