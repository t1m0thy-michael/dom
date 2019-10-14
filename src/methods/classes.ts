import { NodeDescendant } from '../types'

import u from '@t1m0thy_michael/u'

import { runFactory } from '../utils/run'

export const addClass = (element: NodeDescendant, className: string | string[]): void => {
	if (!element.classList) return
	element.classList.add(...u.makeSureItsAnArray(className))
}

export const removeClass = (element: NodeDescendant, className: string | string[]): void => {
	if (!element.classList) return 
	element.classList.remove(...u.makeSureItsAnArray(className))
}

export const replaceClass = (element: NodeDescendant, oldClass: string, newClass: string): void => {
	if (!element.classList) return 
	element.classList.replace(oldClass, newClass)
}

export const toggleClass = (element: NodeDescendant, className: string): void => {
	if (!element.classList) return
	element.classList.toggle(className)
}

export const hasClass = (element: NodeDescendant, className: string): boolean => {
	if (!element.classList) return false
	return element.classList.contains(className)
}

export const classes = {
	addClass: runFactory(addClass),
	hasClass: runFactory(hasClass),
	removeClass: runFactory(removeClass),
	replaceClass: runFactory(replaceClass),
	toggleClass: runFactory(toggleClass),
}
