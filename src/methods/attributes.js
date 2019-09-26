import runFactory from '../utils/runFactory'
import runAndReturnFactory from '../utils/runAndReturnFactory'
import u from '@t1m0thy_michael/u'

const attr = (element, domElement, attr, val) => {
	if (!element.getAttribute || !element.setAttribute) return false
	if (u.isUndefined(val)) return element.getAttribute(attr) || false
	element.setAttribute(attr, val)
}

const data = (element, domElement, key, val) => {
	if (u.isUndefined(val)) return element.DOM.data.get(key) || false
	element.DOM.data.set(key, val)
}

const innerText = (element, domElement, text) => {
	if (u.isUndefined(text)) return element.innerText
	element.innerText = text
}

const innerHTML = (element, domElement, html) => {
	if (u.isUndefined(html)) return element.innerHTML
	element.innerHTML = html
}

const disable = (element, domElement) => element.disabled = true

const enable = (element, domElement) => element.disabled = false

export default {
	attr: function (att, val) { return runAndReturnFactory(this, attr)(att, val) },
	data: function (key, val) { return runAndReturnFactory(this, data)(key, val) },
	innerText: function (txt) { return runAndReturnFactory(this, innerText)(txt) },
	innerHTML: function (txt) { return runAndReturnFactory(this, innerHTML)(txt) },
	disable: function () { return runFactory(this, disable)() },
	enable: function () { return runFactory(this, enable)() },
}