import { runFactory } from '../utils/run'
import { isDomElement, isOption, isSelect } from '../utils/typeChecks'
import { dom } from '../dom'

import { isUndefined, isFunction, makeSureItsAnArray} from '@t1m0thy_michael/u'

export const value = (element, val) => {
	if (isUndefined(val)) return element.value
	element.value = val
}

export const dflt = (element, val) => {
	const obj = dom(element)
	if (!isUndefined(val)) {
		obj.data('default', val)
		element.value = isFunction(val) ? val() : val
		return element.value
	}
	val = obj.data('default')
	element.value = isFunction(val) ? val() : val || ''
	return element.value
}

export const validate = (element, extra) => {
	if (!isFunction(element.DOM.data.validate)) return true
	return element.DOM.data.validate(element.value, extra)
}

export const select = (element) => {
	if (isOption(element)) {
		element.selected = true
		if (element.parentNode && isSelect(element.parentNode)) {
			element.parentNode.focus()
			element.parentNode.dispatchEvent(new Event('change'))
		}
	}
}

export const deselect = (element) => {
	if (isOption(element)) {
		element.selected = false
		if (element.parentNode && isSelect(element.parentNode)) {
			element.parentNode.focus()
			element.parentNode.dispatchEvent(new Event('change'))
		}
	}
}

export const updateSelect = (element, def) => {
	if (!isFunction(element.add) || !def.options) return

	let dflt
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

export const formValues = (element) => {

	const form = element.form ? element.form : element

	if (!(form instanceof HTMLInputElement) ) return

	const filteredForm = makeSureItsAnArray(form).filter((itm) =>
		['INPUT', 'TEXTAREA', 'SELECT'].includes(itm.tagName.toLowerCase())
	)

	const output = {
		form: form,
		all: {},
		input: {},
		select: {},
		textarea: {},
		submitID: form.id,
		submitValue: form.value,
		failedValidation: {}
	}

	filteredForm.forEach((item) => {
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

export const form = {
	deselect: runFactory(deselect),
	dflt: runFactory(dflt),
	formValues: runFactory(formValues),
	select: runFactory(select),
	updateSelect: runFactory(updateSelect),
	validate: runFactory(validate),
	value: runFactory(value),
}