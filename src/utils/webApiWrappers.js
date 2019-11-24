import { CONST } from './const'

export const createElementByNs = {
	[CONST.NAMESPACE_HTML]: (tag) => document.createElement(tag),
	[CONST.NAMESPACE_SVG]: (tag) => document.createElementNS(CONST.NAMESPACE_SVG, tag),
	[CONST.NAMESPACE_MATHML]: (tag) => document.createElementNS(CONST.NAMESPACE_MATHML, tag),
}

export default {
	createElementByNs
}