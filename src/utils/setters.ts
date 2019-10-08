import {
	DomDefinition,
	DomObject,
	DomSetter,
	DomSetters,
	DomObjectPrototype,
	DomSelectDefinition,
	DomEventSubscription,
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

import dom from '../dom'

/*=======================================
	utility factory functions
=======================================*/

export const set_attr_value = (prop: keyof typeof DomAttributeSetters): DomSetter => 
	(o: DomObject, d: Partial<DomDefinition>): void => o.element[prop] = d[prop]

export const set_kv_pairs = (prop: keyof typeof DomObjectSetters): DomSetter => 
	(o: DomObject, d: Partial<DomDefinition>): void => {
		const obj = d[prop]
		if (!obj) return
		Object.keys(obj).forEach((key) => {
			if (isFunction(o[prop])) o[prop](key, obj[key] as any)
		})
}

export const call_dom_fn = (prop: keyof DomObjectPrototype): DomSetter =>
	(o: DomObject, d: Partial<DomDefinition>): void => {
		// TS insists on 2nd argument to o[prop] - thats just as likley to be wrong as one...
		(o[prop] as (a: any) => any)(d[prop])
	}

/*=======================================
	DOM Defnition Only Method
=======================================*/

export const content: DomSetter = (o, d) => {
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
const background = call_dom_fn('background')
const classes =  call_dom_fn('addClass')
const data = set_kv_pairs('data')
const dflt = call_dom_fn('dflt')
const id = call_dom_fn('id')
const on: DomSetter = (o, d) => makeSureItsAnArray(d.onEvent).forEach((item) => o.onEvent(item))
const options: DomSetter = (o, d) => { if (o.element instanceof HTMLSelectElement) { o.updateSelect(d as DomSelectDefinition) } }
const style: DomSetter = (o, d) => Object.assign(o.element.style, d.style)
const sub: DomSetter = (o, d) => makeSureItsAnArray(d.sub).forEach((item) => o.sub(item as DomEventSubscription))
const validate: DomSetter = (o, d) => o.data('validate', d.validate)

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


export const setters: DomSetters = {
	attr,
	content,
	id,
	disabled,
	background,
	classes,
	data,
	dflt,
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