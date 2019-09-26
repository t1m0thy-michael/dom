/*
	Setter functions for all properties that can be part of a DomDefinition
*/

import { DomInterface, DomDefinition, DomElement, DomSetters, DomSetterFn } from '../types'

import u from '@t1m0thy_michael/u'
import dom from '../dom'

const set_object_from_keys_and_values = (o, d, prop) => {
	if (!d[prop]) return
	const obj = d[prop]
	Object.keys(obj).forEach((key) => {
		if (u.isFunction(o[prop])) o[prop](key, obj[key])
	})
}

const attr = (o, e, d) => set_object_from_keys_and_values(o, d, 'attr')

const content = (o, e, d) => {
	const arr = u.makeSureItsAnArray(d.content)
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i]
		if (u.isString(item)) {
			o.element.appendChild(document.createTextNode(item))
		} else if (item instanceof Node) {
			o.element.appendChild(item)
		} else {
			o.element.appendChild(dom(item).element)
		}
	}
}

const disabled = (o, e, d) => { if (d.disabled) { e.disabled = true } }

const background = (o, e, d) => o.background(d.background)

const classes = (o, e, d) => o.addClass(d.classes)

const data = (o, e, d) => set_object_from_keys_and_values(o, d, 'data')

const dflt = (o, e, d) => {
	o.data('default', d.default)
	e.value = u.isFunction(d.default) ? d.default() : d.default || ''
}

const height = (o, e, d) => o.height(d.height)

const href = (o, e, d) => {
	e.href = d.href
	if (!d.target) e.target = u.makeID(6)
}

const htmlFor = (o, e, d) => e.htmlFor = d.htmlFor

const id = (o, e, d) => {
	if (!d.id) return
	d.id = d.id.replace('#', '')
	if (document.querySelectorAll(`#${d.id}`).length) {
		throw `ID [${d.id}] already exists in document you twat`
	}
	e.id = d.id
}

const max = (o, e, d) => e.max = d.max || ''

const min = (o, e, d) => e.min = d.min || ''

const name = (o, e, d) => e.name = d.name

const onEvent = (o, e, d) => u.makeSureItsAnArray(d.onEvent).forEach((item) => o.onEvent(item))

const options = (o, e, d) => { if (e instanceof HTMLSelectElement) { o.updateSelect(d) } }

const placeholder =  (o, e, d) => e.placeholder = d.placeholder

const size =  (o, e, d) => e.size = d.size

const src =  (o, e, d) => e.src = d.src

const step =  (o, e, d) => e.step = d.step || ''

const style = (o, e, d) => Object.assign(o.element.style, d.style)

const sub =  (o, e, d) => u.makeSureItsAnArray(d.sub).forEach((item) => o.sub(item))

const target =  (o, e, d) => e.target = d.target

const tooltip =  (o, e, d) => d.tooltip ? o.tooltip(d.tooltip) : false

const type =  (o, e, d) => e.setAttribute('type', d.type || '')

const value =  (o, e, d) => o.value(d.value)

const validate =  (o, e, d) => o.data('validate', d.validate)

const width =  (o, e, d) => o.width(d.width)

const setters = {
	attr,
	content,
	id,
	disabled,
	background,
	classes,
	data,
	default: dflt,
	height,
	href,
	htmlFor,
	max,
	min,
	name,
	onEvent,
	options,
	placeholder,
	size,
	src,
	step,
	style,
	sub,
	target,
	tooltip,
	type,
	value,
	validate,
	width,
}

export default setters