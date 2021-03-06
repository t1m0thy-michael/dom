import { 
	isArray,
	isFunction, 
	isScalar,
	isObject,
	makeSureItsAnArray 
} from '@t1m0thy_michael/u'

import { dom } from '../dom'
import { CONST } from './const'

/*=======================================
	utility factory functions
=======================================*/

export const set_attr_value = (prop, dProp) => 
	(o, d, ns = CONST.NAMESPACE_HTML) => {
		o.element.setAttribute(prop, String(d[dProp || prop]))
	}

export const set_kv_pairs = (prop) => 
	(o, d) => {
		const obj = d[prop]
		if (!obj) return
		Object.keys(obj).forEach((key) => {
			if (isFunction(o[prop])) o[prop](key, obj[key])
		})
	}

export const call_dom_fn = (method, key) => 
	(o, d) => o[method](d[key || method])

/*=======================================
	DOM Defnition Only Method
=======================================*/

export const content = (o, d, ns = CONST.NAMESPACE_HTML) => {
	const arr = makeSureItsAnArray(d.content)
	for (let i = 0; i < arr.length; i++) {
		
		let item = arr[i]

		if (isScalar(item)) { 
			o.element.appendChild(document.createTextNode(item))
		} else if (item instanceof Node) {
			o.element.appendChild(item)
		} else if (dom.isDom(item)) {
			for (let d = 0; d < item.list.length; d++) {
				o.element.appendChild(dom(item.list[d], ns).element)
			}
		} else if (isObject(item)) {
			o.element.appendChild(dom(item, ns).element)
		}
	}
}

/*=======================================
Set using DomObject methods
=======================================*/

const attr = set_kv_pairs('attr')
const background = call_dom_fn('background')
const backgroundColour = call_dom_fn('backgroundColour')
const classes =  call_dom_fn('addClass', 'classes')
const data = set_kv_pairs('data')
const dflt = call_dom_fn('dflt')
const height = call_dom_fn('height')
const id = call_dom_fn('id')
const on = (o, d) => makeSureItsAnArray(d.on).forEach((item) => o.on(item))
const options = (o, d) => o.updateSelect(d)
const style = (o, d) => Object.assign(o.element.style, d.style)
const validate = (o, d) => o.data('validate', d.validate.bind(o))
const width = call_dom_fn('width')

/*=======================================
	Attributes
=======================================*/

const disabled = set_attr_value('disabled')
const href = set_attr_value('href')
const htmlFor = set_attr_value('htmlFor')
const max = set_attr_value('max')
const min = set_attr_value('min')
const name = set_attr_value('name')
const namespace = set_attr_value('xmlns', 'namespace')
const placeholder = set_attr_value('placeholder')
const src = set_attr_value('src')
const step = set_attr_value('step')
const target = set_attr_value('target')
const type = set_attr_value('type')
const value = set_attr_value('value')

export const setters = {
	attr,
	background,
	backgroundColour,
	classes,
	content,
	data,
	dflt,
	disabled,
	height,
	href,
	htmlFor,
	id,
	max,
	min,
	name,
	namespace,
	on,
	options,
	placeholder,
	src,
	step,
	style,
	target,
	type,
	validate,
	value,
	width,
}

export const registerSetter = (name, fn) => setters[name] = fn
