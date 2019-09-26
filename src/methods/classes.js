import runFactory from '../utils/runFactory'
import runAndReturnFactory from '../utils/runAndReturnFactory'
import u from '@t1m0thy_michael/u'

const addClass = (e, domElement, className) => {
	if (!e.classList) return 
	e.classList.add(...u.makeSureItsAnArray(className))
}

const removeClass = (e, domElement, className) => {
	if (!e.classList) return 
	e.classList.remove(...u.makeSureItsAnArray(className))
}

const replaceClass = (e, domElement, oldClass, newClass) => {
	if (!e.classList) return 
	e.classList.replace(oldClass, newClass)
}

const toggleClass = (e, domElement, className) => {
	if (!e.classList) return false
	return e.classList.toggle(className)
}

const hasClass = (e, domElement, className) => {
	if (!e.classList) return false
	return e.classList.contains(className)
}

export default {
	addClass: function (c) { return runFactory(this, addClass)(c) },
	removeClass: function (c) { return runFactory(this, removeClass)(c) },
	replaceClass: function (c) { return runFactory(this, replaceClass)(c) },
	toggleClass: function (c) { return runFactory(this, toggleClass)(c) },
	hasClass: function (c) { return runAndReturnFactory(this, hasClass)(c) },
}
