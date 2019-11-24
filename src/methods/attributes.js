import { get, set, isUndefined } from '@t1m0thy_michael/u'
import { runFactory, runAndReturnFactory } from '../utils/run'
import { Dom_Element_Definition_Error } from '../utils/errors'

export const attr = (element, attr, val) => {
	if (!element.setAttribute) return undefined
	if (isUndefined(val)) return element.getAttribute(attr) || undefined
	element.setAttribute(attr, val || '')
}

export const data = (element, key, val) => {
	if (isUndefined(val)) return get(element, ['DOM', 'data', key])
	set(element, ['DOM', 'data', key], val)
	return val
}
export const disable = (element) => element.disabled = true

export const enable = (element) => element.disabled = false

export const id = (element, val) => {
	if (!val) return element.id || false
	if (val.substring(0, 1) === '#') val = val.substring(1)
	if (document.querySelectorAll(`#${val}`).length) {
		throw new Dom_Element_Definition_Error(`ID [${val}] already exists in document.`)
	}
	element.id = val
}

export const innerHTML = (element, html, append) => {
	if (isUndefined(html)) return element.innerHTML || ''
	if (append) return element.innerHTML += html
	return element.innerHTML = html
}

export const innerText = (element, text, append) => {
	if (isUndefined(text)) return element.innerText || ''
	if (append) return element.innerText += text
	return element.innerText = text
}

export const attribute = {
	attr: runAndReturnFactory(attr),
	data: runAndReturnFactory(data),
	disable: runFactory(disable),
	enable: runFactory(enable),
	id: runAndReturnFactory(id),
	innerHTML: runAndReturnFactory(innerHTML),
	innerText: runAndReturnFactory(innerText),
}

export default attribute