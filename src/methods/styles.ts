import {
	NodeDescendant,
} from '../types'

import { isUndefined, isFunction, isString } from '@t1m0thy_michael/u'
import { img } from '../utils/image'

const hasStyleProperty = (element: NodeDescendant) => (element && element.style)

const hide = (element: NodeDescendant) => {
	if (!hasStyleProperty(element)) return
	element.style.display = 'none'
}

const show = (element: NodeDescendant, showType = '') => {
	if (!hasStyleProperty(element)) return
	element.style.display = showType
}

const background = async (
	element: NodeDescendant,
	{
		color,
		path,
		brightness = false,
		position = '',
	}: {
		color?: string,
		path?: string,
		brightness?: boolean,
		position?: string,
	}) => {

	if (!hasStyleProperty(element)) return

	if (path) {

		const image = await img(path, brightness)

		if (image.status !== 'ok') return false

		element.style.backgroundImage = `url("${image.path}")`

		if (brightness && isFunction(element.setAttribute)) {
			if (image.brightness && image.brightness < 120) {
				element.setAttribute('img_avg_brightness', 'dark')
			} else {
				element.setAttribute('img_avg_brightness', 'light')
			}
		}

		if (position) element.style.backgroundPosition = position
	}

	if (color) backgroundColour(element, color)

	return true
}

const colour = (element: NodeDescendant, color: string) => {
	if (!hasStyleProperty(element)) return
	if (isUndefined(color)) return element.style.color
	element.style.color = color
}

const backgroundColour = (element: NodeDescendant, color: string) => {
	if (!hasStyleProperty(element)) return
	if (isUndefined(color)) return element.style.backgroundColor
	element.style.backgroundColor = color
}

enum Dimension {
	height = 'height',
	width = 'width',
}

const dimension = (element: NodeDescendant, dimension: Dimension, val: ((w?: string) => string) | string | number, unit = 'px'): void | number => {
	if (!hasStyleProperty(element) || !isFunction(element.getBoundingClientRect)) return
	if (isUndefined(val)) return element.getBoundingClientRect()[dimension] || 0
	if (isFunction(val)) val = val(element.style[dimension])
	if (isString(val) && /%|px|em|rem/.test(val)) {
		element.style[dimension] = val
	} else {
		element.style[dimension] = `${val}${unit}`
	}
}

const width = (element: NodeDescendant, w: ((w?: string) => string) | string | number, unit = 'px'): void | number => 
	dimension(element, Dimension.width, w, unit)

const height = (element: NodeDescendant, h: ((h?: string) => string) | string | number, unit = 'px'): void | number => 
	dimension(element, Dimension.height, h, unit)


const style = (element: NodeDescendant, key: string, val: string) => {
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
	background,
	backgroundColour,
	colour,
	height,
	hide,
	show,
	style,
	width,
}