import { get, set, isUndefined } from '@t1m0thy_michael/u'
import {
	runFactory,
	runAndReturnFactory,
} from '../utils/run'
import { DOM_WONT_SET } from '../utils/errors'

export const attr = (element, attr, val) => {
	if (!element.setAttribute) return null
	if (isUndefined(val)) {
		const rtn = element.getAttribute(attr)
		return isUndefined(rtn) ? null : rtn
	}
	element.setAttribute(attr, String(val))
}

export const data = (element, key, val) => {
	if (isUndefined(val)) {
		const rtn = get(element, ['DOM', 'data', key])
		return isUndefined(rtn) ? null : rtn
	}
	set(element, ['DOM', 'data', key], val)
}
export const disable = (element) => element.disabled = true

export const enable = (element) => element.disabled = false

export const id = (element, val) => {
	if (!val) return element.id || null
	if (val.substring(0, 1) === '#') val = val.substring(1)
	if (document.querySelectorAll(`#${val}`).length) {
		throw new DOM_WONT_SET(`ID [${val}] already exists in document.`)
	}
	element.id = val
}

export const innerHTML = (element, html, append) => {
	if (isUndefined(html)) return element.innerHTML || ''
	if (append) return element.innerHTML += html
	element.innerHTML = html
}

export const innerText = (element, text, append) => {
	if (isUndefined(text)) return element.innerText || ''
	if (append) return element.innerText += text
	element.innerText = text
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