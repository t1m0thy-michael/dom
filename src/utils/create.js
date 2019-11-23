import { isFunction } from '@t1m0thy_michael/u'
import { tags } from './tags'
import { dom } from '../dom'
import { setters } from './setters'
import { CONST } from './const'

export const create = (d = {}) => {

	// make sure we have a 'tag' property
	if (d.tag === undefined) {
		for (let tag in tags) {
			if (d[tag] !== undefined) {
				d.tag = tag
			}
		}
		d.tag = d.tag || 'div'
	}

	// modify definition to fix shorthand props
	if (isFunction(tags[d.tag].beforeCreate)) {
		tags[d.tag].beforeCreate(d)
	} else if (d[d.tag]) {
		d.content = d.content || d[d.tag]
		delete d[d.tag]
	}

	// add namespace to SVG elements
	if ((tags[d.tag].t & CONST.TYPES.SVG)) {
		d.namespace = d.namespace || CONST.NAMESPACE.SVG
	}

	const elem = d.namespace ? document.createElementNS(d.namespace, d.tag) : document.createElement(d.tag)
	const obj = dom(elem)

	for (let prop in d) {
		if (setters[prop]) {
			setters[prop](obj, d)
		}
	}

	return obj.element
}