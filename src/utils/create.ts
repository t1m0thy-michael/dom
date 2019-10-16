import { DomDefinition, DomElement } from '../types'
import { HTMLTag } from '../enum'

import { dom } from '../dom'
import { setters } from './setters'

export const create = (d: Partial<DomDefinition> = {}): DomElement => {
	if (d.tag === undefined) {
		for (let tag in HTMLTag) {
			if (d[tag] !== undefined) {
				d.tag = tag
				switch(d.tag){
					case 'img': {
						d.src = d[tag]
						break
					}
					case 'input': {
						d.value = d[tag]
						break
					}
					case 'script': {
						d.src = d[tag]
						break
					}
					case 'select': {
						d.options = d[tag]
						break
					}
					default: {
						d.content = d[tag]
					}
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
			setters[prop](obj, d)
		}
	}

	return obj.element
}