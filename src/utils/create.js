import { isFunction } from '@t1m0thy_michael/u'
import { Tags } from './tags'
import { dom } from '../dom'
import { setters } from './setters'

export const create = (d = {}) => {

	// make sure we have a 'tag' property
	if (d.tag === undefined) {
		for (let tag in Tags) {
			if (d[tag] !== undefined) {
				d.tag = tag
			}
		}
		d.tag = d.tag || 'div'
	}

	// modify definition to fix shorthand props
	if (isFunction(Tags[d.tag].beforeCreate)) {
		Tags[d.tag].beforeCreate(d)
	} else if (d[d.tag]) {
		d.content = d.content || d[d.tag]
		delete d[d.tag]
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