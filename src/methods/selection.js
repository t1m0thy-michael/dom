import { isString, makeID, unique } from '@t1m0thy_michael/u'
import { runAndReturnFactory } from '../utils/run'
import { dom } from '../dom'

// adds classes to the elements we're searching for then uses querySelectorAll
export const child = (element, needle) => {
	if (!element || !element.querySelectorAll) return dom([])
	const identifier = makeID(10,'_')
	needle = dom(needle)
	needle.addClass(identifier)
	const result = dom(element.querySelectorAll(`.${identifier}`))
	needle.removeClass(identifier)
	return result
}

export const sibling = (element, needle) => {
	if (!element.parentNode || !needle) return dom([])
	const queryResult = dom(needle).list
	return dom(queryResult.filter((elem) => elem !== element))
}

export const parent = (element, needle) => {
	if (!element || !element.closest) return dom([])
	if (isString(needle)) return dom(element.closest(needle))

	needle = dom(needle)
	const results = []
	needle.list.forEach((n) => {
		if (dom(n).child(element).list.length) results.push(n)
	})
	return dom(results)
}

export const isAppended = (element) => document.body.contains(element)

const isKeywords = {}
isKeywords[':visible'] = (element) => (element.offsetWidth > 0 && element.offsetHeight > 0)
isKeywords[':hidden'] = (element) => !isKeywords[':visible'](element)
isKeywords[':button'] = (element) => element.matches('button, input[type=button]')

export const is = (element, selector) => {
	if (String(selector).toLowerCase() in isKeywords) {
		if (!isKeywords[selector](element)) return dom([])
	} else {
		if (!element.matches || !element.matches(selector)) return dom([])
	}
	return dom(element)
}

export const not = (element, selector) => {
	if (String(selector).toLowerCase() in isKeywords) {
		if (isKeywords[selector](element)) return dom([])
	} else {
		if (element.matches && element.matches(selector)) return dom([])
	}
	return dom(element)
}

// Returns single new DomObject created from result.list arrays
// only for use with methods that always return DomObjects
export const runAndReturnSingleDomObjectFactory = (fn) =>
	function (...args) {
		let results = []
		for (let i = 0; i < this.list.length; i++) {
			try {
				results.push(...fn(this.list[i], ...args).list)
			} catch (e) {
				console.error(e)
			}
		}
		return dom(unique(results))
	}

export const selection = {
	child: runAndReturnSingleDomObjectFactory(child),
	isAppended: runAndReturnFactory(isAppended),
	not: runAndReturnSingleDomObjectFactory(not),
	parent: runAndReturnSingleDomObjectFactory(parent),
	is: runAndReturnSingleDomObjectFactory(is),
	sibling: runAndReturnSingleDomObjectFactory(sibling),
}

export default selection