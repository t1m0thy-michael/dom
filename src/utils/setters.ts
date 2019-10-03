import {
	DomElement,
	DomDefinition,
	DomObject,
	DomSetter,
} from '../types'

import { 
	DomAttributeSetters,
	DomObjectSetters,
} from '../enum'

import { 
	isFunction, 
	isString, 
	makeSureItsAnArray 
} from '@t1m0thy_michael/u'

import dom from '../index'

/*=======================================
	utility factory functions
=======================================*/

const set_attr_value = (prop: keyof typeof DomAttributeSetters): DomSetter => 
	(o: DomObject, e: DomElement, d: Partial<DomDefinition>): void => e[prop] = d[prop]

const set_kv_pairs = (prop: keyof typeof DomObjectSetters): DomSetter => (o: DomObject, e: DomElement, d: Partial<DomDefinition>): void => 
{
	const obj = d[prop]
	if (!obj) return
	Object.keys(obj).forEach((key) => {
		if (isFunction(o[prop])) o[prop](key, obj)
	})
}

/*=======================================
	DOM Defnition Only Method
=======================================*/

const content: DomSetter = (o, e, d) => {
	const arr = makeSureItsAnArray(d.content)
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i]
		if (isString(item)) {
			o.element.appendChild(document.createTextNode(item))
		} else if (item instanceof Node) {
			o.element.appendChild(item)
		} else {
			o.element.appendChild(dom(item).element)
		}
	}
}

/*=======================================
Set using DomObject methods
=======================================*/

const attr = set_kv_pairs('attr')
const background: DomSetter = (o, e, d) => o.background(d.background)
const classes: DomSetter = (o, e, d) => o.addClass(d.classes)
const data = set_kv_pairs('data')
const dflt: DomSetter = (o, e, d) => o.dflt(d.dflt)
const id: DomSetter = (o, e, d) => o.id(d.id)
const on: DomSetter = (o, e, d) => makeSureItsAnArray(d.onEvent).forEach((item) => o.onEvent(item))
const options: DomSetter = (o, e, d) => { if (e instanceof HTMLSelectElement) { o.updateSelect(d) } }
const style: DomSetter = (o, e, d) => Object.assign(o.element.style, d.style)
const sub: DomSetter =  (o, e, d) => makeSureItsAnArray(d.sub).forEach((item) => o.sub(item))
const validate: DomSetter = (o, e, d) => o.data('validate', d.validate)

/*=======================================
	Attributes
=======================================*/

const disabled = set_attr_value('disabled')
const height = set_attr_value('height')
const href = set_attr_value('href')
const htmlFor = set_attr_value('htmlFor')
const max = set_attr_value('max')
const min = set_attr_value('min')
const name = set_attr_value('name')
const placeholder = set_attr_value('placeholder')
const size = set_attr_value('size')
const src = set_attr_value('src')
const step = set_attr_value('step')
const target = set_attr_value('target')
const tooltip = set_attr_value('tooltip')
const type = set_attr_value('type')
const value = set_attr_value('value')
const width = set_attr_value('width')


export const setters = {
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
	on,
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