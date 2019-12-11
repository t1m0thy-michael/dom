import { clean } from '@t1m0thy_michael/u'

// always returns DomObject (this)
export const runFactory = (fn) =>
	function (...args) {
		for (let i = 0; i < this.list.length; i++) {
			fn(this.list[i], ...args)
		}
		return this
	}

// returns single result, array of results (Throws aways undefined) or DomObject (this) if no results.
export const runAndReturnFactory = (fn) =>
	function (...args) {
		let results = []
		for (let i = 0; i < this.list.length; i++) {
			results.push(fn(this.list[i], ...args))
		}
		results = clean(undefined, results)
		if (results.length === 0) return this
		if (results.length === 1) return results[0]
		return results
	}