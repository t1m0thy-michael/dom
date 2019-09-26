import { HTMLTag } from '../enum'

import dom from '../dom'
import u from '@t1m0thy_michael/u'
import setters from './setters'

const create = (d = {}) => {
	if (d.tag === undefined) {
		for (let tag in HTMLTag) { // HTMLTag enum defined in types.d.ts
			if (!u.isUndefined(d[tag])) {
				d.tag = tag
				if (d.tag === 'select') {
					d.options = d[tag]
				} else {
					d.content = d[tag]
				}
				delete d[tag]
				break
			}
		}
		d.tag = d.tag || 'div'
	}

	d.tag = d.tag.toLowerCase()
	const elem = document.createElement(d.tag)
	const obj = dom(elem)

	for (let prop in d) {
		if (setters[prop]) {
			setters[prop](obj, obj.element, d)
		}
	}

	return obj.element
}

export default create