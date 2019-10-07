import { NodeDescendant } from '../types'

import { isUndefined, isFunction } from '@t1m0thy_michael/u'

const scrollTop = (element: NodeDescendant, px: number): number | undefined => {
	if (isUndefined(px) || isUndefined(element.scrollTop)) return undefined
	element.scrollTop = px
}

const scrollMore = (element: NodeDescendant, px: number) => {
	if (isUndefined(px) || isUndefined(element.scrollTop)) return
	element.scrollTop = (element.scrollTop || 0) + px
}

const getBounding = (element: NodeDescendant): ClientRect | DOMRect => {
	if (!isFunction(element.getBoundingClientRect)) return DOMRectReadOnly.fromRect()
	return element.getBoundingClientRect()
}

export default {
	scrollTop,
	scrollMore,
	getBounding,
}