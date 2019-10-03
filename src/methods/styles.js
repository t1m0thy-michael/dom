
import runFactory from '../utils/runFactory'
import runAndReturnFactory from '../utils/runAndReturnFactory'

import u from '@t1m0thy_michael/u'
import { img } from '../utils/image'

const hasStyleProperty = (e) => (e && e.style)

const hide = (element, domElement) => {
	if (!hasStyleProperty(element)) return
	element.style.display = 'none'
}

const show = (element, domElement, showType = '') => {
	if (!hasStyleProperty(element)) return
	element.style.display = showType
}

const background = async (
	element, 
	domElement,
	{
		color,
		path,
		brightness = false,
		position = '',
	}) => {

	//if (!hasStyleProperty(element)) return

	if (path) {

		const img = await img(path, brightness)

		if (img.status !== 'ok') return false

		element.style.backgroundImage = `url("${img.path}")`

		if (brightness) {
			if (img.brightness && img.brightness < 120) {
				element.setAttribute('img_avg_brightness', 'dark')
			} else {
				element.setAttribute('img_avg_brightness', 'light')
			}
		}

		if (position) element.style.backgroundPosition = position
	}

	if (color) backgroundColour(element, domElement, color)

	return true
}


const colour = (element, domElement, color) => {
	if (!hasStyleProperty(element)) return
	if (u.isUndefined(color)) return element.style.color
	element.style.color = color
}

const backgroundColour = (element, domElement, color) => {
	if (!hasStyleProperty(element)) return
	if (u.isUndefined(color)) return element.style.backgroundColor
	element.style.backgroundColor = color
}

const Dimension = {
	height: 'height',
	width: 'width',
}

const dimension = (element, dimension, val, unit = 'px') => {
	if (!hasStyleProperty(element) || !u.isFunction(element.getBoundingClientRect)) return
	if (u.isUndefined(val)) return element.getBoundingClientRect()[dimension] || 0
	if (u.isFunction(val)) val = val(element.style[dimension])
	if (u.isString(val) && /%|px|em|rem/.test(val)) {
		element.style[dimension] = val
	} else {
		element.style[dimension] = `${val}${unit}`
	}
}

const width = (element, domElement, w, unit = 'px') => 
	dimension(element, Dimension.width, w, unit)

const height = (element, domElement, h, unit = 'px') => 
	dimension(element, Dimension.height, h, unit)


const style = (element, domElement, key, val) => {
	if (!hasStyleProperty(element)) return
	let cur = element.style[key]
	if (u.isUndefined(val)) return cur
	if (u.isFunction(val)) {
		element.style[key] = val(cur)
	} else {
		element.style[key] = val
	}
}

export default {
	background: function (val) { return runAndReturnFactory(this, background)(val) },
	backgroundColour: function (color) { return runAndReturnFactory(this, backgroundColour)(color) },
	colour: function (color) { return runAndReturnFactory(this, colour)(color) },
	height: function (h, unit) { return runAndReturnFactory(this, height)(h, unit) },
	hide: function () { return runFactory(this, hide)() },
	show: function () { return runFactory(this, show)() },
	style: function (key, val) { return runAndReturnFactory(this, style)(key, val) },
	width: function (w, unit) { return runAndReturnFactory(this, width)(w, unit) },
}