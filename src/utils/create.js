import { isFunction } from '@t1m0thy_michael/u'
import { tags } from './tags'
import { dom } from '../dom'
import { setters } from './setters'
import { createElementByNs } from './webApiWrappers'
import { CONST } from './const'

export const create = (d = {}, namespace = CONST.NAMESPACE_HTML) => {

	namespace = d.namespace || namespace

	// make sure we have a 'tag' property
	if (d.tag === undefined) {
		for (let tag in tags[namespace]) {
			// tag exists in dom definition and is allowed as shorthand prop
			if (d[tag] !== undefined && !(tags[namespace][tag].t & CONST.TAG.NO_SHORTHAND)) {
				d.tag = tag
			}
		}
		d.tag = d.tag || 'div'
	}

	// modify definition to 'fix' shorthand props
	if (isFunction(tags[namespace][d.tag].beforeCreate)) {
		tags[namespace][d.tag].beforeCreate(d)
	} else if (d[d.tag]) {
		d.content = d.content || d[d.tag]
		delete d[d.tag]
	}

	const elem = createElementByNs[namespace](d.tag)
	const obj = dom(elem, namespace)

	for (let prop in d) {
		if (setters[prop]) {
			setters[prop](obj, d, namespace)
		}
	}

	return obj.element
}