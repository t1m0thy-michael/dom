import { DomDefinition, DomElement } from '../types'
import { HTMLTag, SVGElements } from './enum'
import { CONST } from './const'
import { dom } from '../dom'
import { setters } from './setters'

export const create = (d: Partial<DomDefinition> = {}): DomElement => {
	if (d.tag === undefined) {
		for (let tag in HTMLTag) {
			if (d[tag] !== undefined) {
				d.tag = tag
				switch (d.tag) {
					case 'br': 
					case 'hr': {
						break
					}
					case 'input': {
						d.value = d[tag]
						break
					}
					case 'iframe':
					case 'img':
					case 'script': {
						d.src = d[tag]
						break
					}
					case 'select': {
						d.options = d[tag]
						break
					}
					case 'svg': {
						d.namespace = d.namespace || CONST.NAMESPACE_SVG
					}
					default: {
						d.content = d[tag]
					}
				}
				delete d[tag]
			}
		}
		d.tag = d.tag || 'div'
	}

	d.tag = d.tag.toLowerCase()
	const elem = d.namespace ? document.createElementNS(d.namespace, d.tag) : document.createElement(d.tag)
	const obj = dom(elem)

	for (let prop in d) {
		if (setters[prop]) {
			setters[prop](obj, d)
		}
	}

	return obj.element
}