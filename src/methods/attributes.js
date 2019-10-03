import runFactory from '../utils/runFactory'
import runAndReturnFactory from '../utils/runAndReturnFactory'
import { Dom_Element_Definition_Error } from '../utils/errors'

import u from '@t1m0thy_michael/u'



export const attr = (element, domElement, attr, val) => {
	if (!element.getAttribute || !element.setAttribute) return false
	if (u.isUndefined(val)) return element.getAttribute(attr) || false
	element.setAttribute(attr, val)
}

export const data = (element, domElement, key, val) => {
	if (u.isUndefined(val)) return element.DOM.data.get(key) || false
	element.DOM.data.set(key, val)
}
export const disable = (element, domElement) => element.disabled = true

export const enable = (element, domElement) => element.disabled = false

export const id = (element, domElement, val) => {
	if (!val) return
	val = val.replace('#', '')
	if (document.querySelectorAll(`#${val}`).length) {
		throw new Dom_Element_Definition_Error(`ID [${val}] already exists in document.`)
	}
	element.id = val
}

export const innerHTML = (element, domElement, html) => {
	if (u.isUndefined(html)) return element.innerHTML
	element.innerHTML = html
}

export const innerText = (element, domElement, text) => {
	if (u.isUndefined(text)) return element.innerText
	element.innerText = text
}

export default {
	attr: function (att, val) { return runAndReturnFactory(this, attr)(att, val) },
	data: function (key, val) { return runAndReturnFactory(this, data)(key, val) },
	disable: function () { return runFactory(this, disable)() },
	enable: function () { return runFactory(this, enable)() },
	id: function (val) { return runAndReturnFactory(this, id)(val) },
	innerHTML: function (txt) { return runAndReturnFactory(this, innerHTML)(txt) },
	innerText: function (txt) { return runAndReturnFactory(this, innerText)(txt) },
}