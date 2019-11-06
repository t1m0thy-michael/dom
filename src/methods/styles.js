import { runFactory, runAndReturnFactory } from '../utils/run'
import { img } from '../utils/image'
import { dom } from '../dom'

import { isUndefined, isFunction, isString } from '@t1m0thy_michael/u'

const hasStyleProperty = (element) => (element && element.style)

export const hide = (element) => {
	if (!hasStyleProperty(element)) return
	element.style.display = 'none'
}

export const show = (element, showType = '') => {
	if (!hasStyleProperty(element)) return
	element.style.display = showType
}

export const background = async (
	element,
	{
		colour,
		path,
		brightness = false,
		position = '',
	}) => {

	if (!hasStyleProperty(element)) return

	const obj = dom(element)

	if (path) {

		const image = await img(path, brightness)

		if (image.status !== 'ok') return false

		element.style.backgroundImage = `url("${image.path}")`

		if (brightness) {
			if (image.brightness && image.brightness < 120) {
				obj.attr('avg_brightness', 'dark')
			} else {
				obj.attr('avg_brightness', 'light')
			}
		}

		if (position) element.style.backgroundPosition = position
	}

	if (colour) backgroundColour(element, colour)

	return true
}

export const colour = (element, color) => {
	if (!hasStyleProperty(element)) return
	if (isUndefined(color)) return element.style.color
	element.style.color = color
}

export const backgroundColour = (element, colour) => {
	if (!hasStyleProperty(element)) return
	if (isUndefined(colour)) return element.style.backgroundColor
	element.style.backgroundColor = colour
}

// enum - more to const.js
const Dimension = {
	height: 'height',
	width: 'width',
}

export const dimension = (element, dimension, val, unit = 'px') => {
	if (!hasStyleProperty(element) || !isFunction(element.getBoundingClientRect)) return
	if (isUndefined(val)) return element.getBoundingClientRect()[dimension] || 0
	if (isFunction(val)) val = val(element.style[dimension])
	if (isString(val) && /%|px|em|rem/.test(val)) {
		element.style[dimension] = val
	} else {
		element.style[dimension] = `${val}${unit}`
	}
}

export const width = (element, w, unit = 'px') => 
	dimension(element, Dimension.width, w, unit)

export const height = (element, h, unit = 'px') => 
	dimension(element, Dimension.height, h, unit)


export const style = (element, key, val) => {
	if (!hasStyleProperty(element)) return
	let cur = element.style[key]
	if (isUndefined(val)) return cur
	if (isFunction(val)) {
		element.style[key] = val(cur)
	} else {
		element.style[key] = val
	}
}

export const styles = {
	background: runAndReturnFactory(background),
	backgroundColour: runAndReturnFactory(backgroundColour),
	colour: runAndReturnFactory(colour),
	height: runAndReturnFactory(height),
	hide: runFactory(hide),
	show: runFactory(show),
	style: runAndReturnFactory(style),
	width: runAndReturnFactory(width),
}