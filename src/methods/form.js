import runFactory from '../utils/runFactory'
import runAndReturnFactory from '../utils/runAndReturnFactory'

import u from '@t1m0thy_michael/u'

const value = (element, domElement, val) => {
	if (u.isUndefined(val)) return element.value
	element.value = val
}

const resetDefault = (element, domElement) => {
	const val = element.DOM.data['default']
	element.value = u.isFunction(val) ? val() : val || ''
}

const validate = (element, domElement, extra) => {
	if (!u.isFunction(element.DOM.data.validate)) return true
	return element.DOM.data.validate(element.value, extra)
}

const select = (element, domElement) => {
	if (element.tagName === 'OPTION') {
		element.selected = true
		if (element.parentNode && u.isFunction(element.parentNode.focus)) element.parentNode.focus()
		if (element.parentNode) element.parentNode.dispatchEvent(new Event('change'))
	}
}

const deselect = (element, domElement) => {
	if (element.tagName === 'OPTION') {
		element.selected = false
		if (element.parentNode && element.parentNode.focus) element.parentNode.focus()
		if (element.parentNode) element.parentNode.dispatchEvent(new Event('change'))
	}
}

const updateSelect = (element, domElement, def) => {
	if (!element.add || !u.isFunction(element.add) || !def.options) return

	let dflt
	if (def.default) {
		dflt = u.isFunction(def.default) ? def.default() : def.default
		element.DOM.data['default'] = def.default
	}

	const options = u.makeSureItsAnArray(def.options)
	for (let i = 0; i < options.length; i++) {

		const opt = document.createElement('option')

		opt.text = String(options[i].text)
		opt.value = String(options[i].value)

		if (dflt === opt.value)	opt.selected = true

		element.add(opt, null)
	}
}

const formValues = (element, domElement) => {

	const form = element.form ? element.form : element

	if (!(form instanceof HTMLFormElement) ) return

	const filteredForm = u.makeSureItsAnArray(form).filter((itm) =>
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
		if (!u.isFunction(item.DOM.data.validate) || !item.DOM.data.validate()) {
			output.failedValidation[item.name] = item.value
		} else {
			output.all[item.name] = item.value
			switch (item.tagName) {
				case 'INPUT': output['input'][item.name] = item.value; break
				case 'SELECT': output['select'][item.name] = item.value; break
				case 'TEXTAREA': output['textarea'][item.name] = item.value; break
				default: /* nowt */
			}
		}
	})
	return output
}

export default {
	deselect: function (px) { return runFactory(this, deselect)() },
	formValues: function (px) { return runAndReturnFactory(this, formValues)(px) },
	resetDefault: function () { return runFactory(this, resetDefault)() },
	select: function (px) { return runFactory(this, select)() },
	updateSelect: function (def) { return runFactory(this, updateSelect)(def) },
	validate: function (extra) { return runAndReturnFactory(this, validate)(extra) },
	value: function (val) { return runFactory(this, value)(val) },
}