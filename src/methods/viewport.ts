import { NodeDescendant } from '../types'

import { runFactory, runAndReturnFactory } from '../utils/run'

import { isUndefined, isFunction } from '@t1m0thy_michael/u'

export const scrollTop = (element: NodeDescendant, px: number): number | void => {
	if (isUndefined(px) || isUndefined(element.scrollTop)) return
	element.scrollTop = px
}

export const scrollMore = (element: NodeDescendant, px: number): void => {
	if (isUndefined(px) || isUndefined(element.scrollTop)) return
	element.scrollTop = (element.scrollTop || 0) + px
}

export const getBounding = (element: NodeDescendant): ClientRect | DOMRect => {
	if (!isFunction(element.getBoundingClientRect)) return DOMRectReadOnly.fromRect()
	return element.getBoundingClientRect()
}

export const viewport = {
	getBounding: runAndReturnFactory(getBounding),
	scrollMore: runFactory(scrollMore),
	scrollTop: runAndReturnFactory(scrollTop),
}