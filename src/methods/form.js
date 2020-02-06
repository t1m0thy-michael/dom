import { runFactory, runAndReturnFactory } from '../utils/run'
import { isOption, isSelect } from '../utils/typeChecks'
import { dom } from '../dom'

import { isUndefined, isFunction, isObject, isArray} from '@t1m0thy_michael/u'

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
	const dElement = dom(element)
	const fn = dElement.data('validate')
	if (!isFunction(fn)) return true
	return fn(element.value, extra)
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

	const dElem = dom(element)
	dElem.empty()

	let dflt
	if (d.dflt) {
		dflt = isFunction(d.dflt) ? d.dflt() : d.dflt
		dElem.data('default', d.dflt)
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

	if (isArray(d.options)) {

		const frag = new DocumentFragment()

		for (let i in d.options) {
			dom(d.options[i]).appendTo(frag)
		}

		element.appendChild(frag)
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

		let value = item.value

		if (item.tagName === 'SELECT' && item.multiple) {
			const valuesArr = []
			for (let i = 0; i < item.selectedOptions.length; i++) {
				valuesArr.push(item.selectedOptions[i].value)
			}
			value = valuesArr
		}

		if (isFunction(validateFn) && !validateFn.bind(dItem)(value)) {
			output.failedValidation[item.name] = value
		}

		output.all[item.name] = value

		switch (item.tagName) {
			case 'INPUT': output['input'][item.name] = value; break
			case 'SELECT': output['select'][item.name] = value; break
			case 'TEXTAREA': output['textarea'][item.name] = value; break
			default: /* nowt */
		}

	})
	return output
}

export const form = {
	deselect: runFactory(deselect),
	dflt: runAndReturnFactory(dflt),
	formValues: runAndReturnFactory(formValues),
	select: runFactory(select),
	updateSelect: runFactory(updateSelect),
	validate: runAndReturnFactory(validate),
	value: runAndReturnFactory(value),
}

export default form
