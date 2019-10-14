/*
	Run factories are duplicated with minor changes for specific use cases.
	This is to simplify TS annotations and make code more readable.
*/

import { DomElement, DomObject } from '../types'
import { clean } from '@t1m0thy_michael/u'


// always returns DomObject (this)
export const runFactory = <T extends any[], R>(fn: (o: DomElement, ...args: T) => R): ((...args: T) => DomObject) =>
	function (this: DomObject, ...args) {
		for (let i = 0; i < this.list.length; i++) {
			try {
				fn(this.list[i], ...args)
			} catch (e) {
				console.error(e)
			}
		}
		return this
	}

// returns single result, array of results (Throws aways undefined) or DomObject (this) if no results.
export const runAndReturnFactory = <T extends any[], R>(fn: (o: DomElement, ...args: T) => R): ((...args: T) => (R extends void ? DomObject : R[])) =>
	function (this: DomObject, ...args) {
		let results = []
		for (let i = 0; i < this.list.length; i++) {
			try {
				results.push(fn(this.list[i], ...args))
			} catch (e) {
				console.error(e)
			}
		}
		results = clean(undefined, results)
		if (results.length === 0) return this
		if (results.length === 1) return results[0]
		return results
	}