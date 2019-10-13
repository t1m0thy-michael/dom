/*
	Run factories are duplicated with minor changes for specific use cases.
	This is to simplify TS annotations and make code more readable.
*/

import { DomElement, DomObject } from '../types'
import { clean } from '@t1m0thy_michael/u'
import { dom } from '../dom'

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

// always returns DomObject (this). Passes this (DomObject) instead of element
// prevents circular deps which break test
export const runWithDomObjFactory = <T extends any[], R>(fn: (o: DomObject, ...args: T) => R): ((...args: T) => DomObject) =>
	function (this: DomObject, ...args) {
		for (let i = 0; i < this.list.length; i++) {
			try {
				fn(dom(this.list[i]), ...args)
			} catch (e) {
				console.error(e)
			}
		}
		return this
	}

// returns single result, array of results or DomObject (this) if no results. Throws aways undefined.
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

// returns single result, array of results. Throws aways undefined.
export const runAndReturnNeverDomObjFactory = <T extends any[], R>(fn: (o: DomElement, ...args: T) => R): ((...args: T) => R[]) =>
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
		if (results.length === 1) return results[0]
		return results
	}

// Returns single new DomObject created from result.list arrays
// only for use with methods that always return DomObjects
export const runAndReturnSingleDomObjectFactory = <T extends any[]>(fn: (o: DomObject, ...args: T) => DomObject): ((...args: T) => DomObject) =>
	function (this: DomObject, ...args) {
		let results = []
		for (let i = 0; i < this.list.length; i++) {
			try {
				results.push(...fn(dom(this.list[i]), ...args).list)
			} catch (e) {
				console.error(e)
			}
		}
		return dom(results)
	}