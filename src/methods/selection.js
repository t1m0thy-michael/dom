import dom from '../dom'
import runAnReturnFactory from '../utils/runAndReturnFactory'

const child = (e, domElement, selector = '') => {
	if (!e || !e.querySelectorAll) return dom([])
	return dom(e.querySelectorAll(selector))
}

const sibling = (e, domElement, selector = '') => {
	if (!e.parentNode || !selector) return dom([])
	const siblings = e.parentNode.querySelectorAll(selector)
	const queryResult = Array.from(siblings)
	return dom(queryResult.filter((elem) => elem !== e))
}

const parent = (e, domElement, selector = '') => {
	if (!e || !e.closest) return dom([])
	return dom(e.closest(selector))
}

export default {
	child: function (selector) { return runAnReturnFactory(this, child)(selector) },
	sibling: function (selector) { return runAnReturnFactory(this, sibling)(selector) },
	parent: function (selector) { return runAnReturnFactory(this, parent)(selector) },
}