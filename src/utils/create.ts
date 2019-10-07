import { DomDefinition, DomElement } from '../types'
import { HTMLTag } from '../enum'

import dom from '../index'
import { setters } from './setters'

export interface Create {
	(d: Partial<DomDefinition>): DomElement
}

export const create: Create = (d: Partial<DomDefinition> = {}) => {
	if (d.tag === undefined) {
		for (let tag in HTMLTag) {
			if (d[tag] !== undefined) {
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