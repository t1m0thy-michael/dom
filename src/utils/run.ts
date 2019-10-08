import { DomElement } from '../types'
import { clean } from '@t1m0thy_michael/u'

export const runFactory = <T extends any[], R>(fn: (o: DomElement, ...args: T) => R): ((...args: T) => DomElement) =>
	function (this: DomElement, ...args) {
		for (let i = 0; i < this.list.length; i++) {
			try {
				fn(this.list[i], ...args)
			} catch (e) {
				console.error(e)
			}
		}
		return this
	}

export const runAndReturnFactory = <T extends any[], R>(fn: (o: DomElement, ...args: T) => R): ((...args: T) => (R extends void ? DomElement : R[])) =>
	function (this: DomElement, ...args) {
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