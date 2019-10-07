import { NodeDescendant, DomSelectDefinition, Scalar, DomElement } from '../types'

import { dom } from '../index'
import { isDomElement } from '../utils/typeChecks'

import { isUndefined, isFunction, makeSureItsAnArray} from '@t1m0thy_michael/u'

const value = (element: NodeDescendant, val: any) => {
	if (isUndefined(val)) return element.value
	element.value = val
}

const dflt = (element: NodeDescendant, val: any) => {
	if (!isUndefined(val)) {
		const obj = dom(element)
		obj.data('default', val)
		element.value = isFunction(val) ? val() : val
	}
	val = element.DOM.data['default']
	element.value = isFunction(val) ? val() : val || ''
}

const validate = (element: NodeDescendant, extra: any) => {
	if (!isFunction(element.DOM.data.validate)) return true
	return element.DOM.data.validate(element.value, extra)
}

const isOption = (element: NodeDescendant): element is HTMLOptionElement => element.tagName === 'OPTION'
const isSelect = (element: NodeDescendant): element is HTMLSelectElement => element.tagName === 'SELECT'

const select = (element: NodeDescendant) => {
	if (isOption(element)) {
		element.selected = true
		if (element.parentNode && isSelect(element.parentNode)) {
			element.parentNode.focus()
			element.parentNode.dispatchEvent(new Event('change'))
		}
	}
}

const deselect = (element: NodeDescendant) => {
	if (isOption(element)) {
		element.selected = false
		if (element.parentNode && isSelect(element.parentNode)) {
			element.parentNode.focus()
			element.parentNode.dispatchEvent(new Event('change'))
		}
	}
}

const updateSelect = (element: NodeDescendant, def: DomSelectDefinition) => {
	if (!isFunction(element.add) || !def.options) return

	let dflt: Scalar
	if (def.dflt) {
		dflt = isFunction(def.dflt) ? def.dflt() : def.dflt
		element.DOM.data['default'] = def.dflt
	}

	Object.keys(def.options).forEach((key) => {
		const opt = document.createElement('option')
		opt.text = String(def.options[key])
		opt.value = String(key)
		if (dflt === opt.value)	opt.selected = true
		element.add(opt, null)
	})
}

const formValues = (element: NodeDescendant) => {

	const form = element.form ? element.form : element

	if (!(form instanceof HTMLInputElement) ) return

	const filteredForm = makeSureItsAnArray(form).filter((itm) =>
		['INPUT', 'TEXTAREA', 'SELECT'].includes(itm.tagName.toLowerCase())
	)

	const output = {
		form: form,
		all: {} as { [index: string]: Scalar },
		input: {} as { [index: string]: Scalar },
		select: {} as { [index: string]: Scalar },
		textarea: {} as { [index: string]: string },
		submitID: form.id,
		submitValue: form.value,
		failedValidation: {} as {[index: string]: Scalar}
	}

	filteredForm.forEach((item: NodeDescendant) => {
		if (!item.name) return

		if (isDomElement(item)) {
			const validateFn = item.DOM.data.get('validate')
			if (!isFunction(validateFn) || !validateFn()) {
				output.failedValidation[item.name] = item.value
			}
		} 

		output.all[item.name] = item.value
		switch (item.tagName) {
			case 'INPUT': output['input'][item.name] = item.value; break
			case 'SELECT': output['select'][item.name] = item.value; break
			case 'TEXTAREA': output['textarea'][item.name] = item.value; break
			default: /* nowt */
		}

	})
	return output
}

export default {
	deselect,
	formValues,
	dflt,
	select,
	updateSelect,
	validate,
	value,
}