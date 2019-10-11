import { NodeDescendant } from '../types'
import { Dom_Element_Definition_Error } from '../utils/errors'
import { isUndefined } from '@t1m0thy_michael/u'

export const attr = (element: NodeDescendant, attr: string, val?: string | number): boolean | string | void => {
	if (!element.getAttribute || !element.setAttribute) return false
	if (isUndefined(val)) return element.getAttribute(attr) || false
	element.setAttribute(attr, String(val))
}

export const data = (element: NodeDescendant, key: string, val?: any): any | false | void => {
	if (isUndefined(val)) return element.DOM.data.get(key) || false
	element.DOM.data.set(key, val)
}
export const disable = (element: NodeDescendant) => element.disabled = true

export const enable = (element: NodeDescendant) => element.disabled = false

export const id = (element: NodeDescendant, val?: string) => {
	if (!val) return element.id || false
	val = val.replace('#', '')
	if (document.querySelectorAll(`#${val}`).length) {
		throw new Dom_Element_Definition_Error(`ID [${val}] already exists in document.`)
	}
	element.id = val
}

export const innerHTML = (element: NodeDescendant, html?: string): string | void => {
	if (isUndefined(html)) return element.innerHTML
	element.innerHTML = html
}

export const innerText = (element: NodeDescendant, text?: string): string | void => {
	if (isUndefined(text)) return element.innerText
	element.innerText = text
}

export const attribute = {
	attr,
	data,
	disable,
	enable,
	id,
	innerHTML,
	innerText,
}