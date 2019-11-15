import { runFactory, runAndReturnFactory } from '../utils/run'
import { isDomElement, isOption, isSelect } from '../utils/typeChecks'
import { dom } from '../dom'

import { isUndefined, isFunction, isObject, makeSureItsAnArray} from '@t1m0thy_michael/u'

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

export const updateSelect = (element, d) => {
	if (!isFunction(element.add)) return

	dom(element).empty()

	let dflt
	if (d.dflt) {
		dflt = isFunction(d.dflt) ? d.dflt() : d.dflt
		element.DOM.data['dault'] = d.dflt
	}

	if (isObject(d.options)) {
		Object.keys(d.options).forEach((key) => {
			const opt = document.createElement('option')
			opt.value = String(d.options[key])
			opt.text = String(key)
			if (dflt === opt.value)	opt.selected = true
			element.add(opt, null)
		})
	}
}

export const formValues = (element) => {
	
	const form = (element.form ? dom(element.form) : dom(element))

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

	const filteredForm = form.child('input, select, textarea')

	filteredForm.list.forEach((item) => {
		if (!item.name) return
		const dItem = dom(item)
		const validateFn = dItem.data('validate')
		if (isFunction(validateFn) && !validateFn.bind(dItem)(item.value)) {
			output.failedValidation[item.name] = item.value
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
	formValues: runAndReturnFactory(formValues),
	select: runFactory(select),
	updateSelect: runFactory(updateSelect),
	validate: runFactory(validate),
	value: runAndReturnFactory(value),
}

export default form
