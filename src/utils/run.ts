import { DomElement } from '../types'
import { clean } from '@t1m0thy_michael/u'
import { dom } from '../index'

/**
 * Returns function without the requirement for first arg (DomElement).
 * when called fn runs for evey element in this.list
 * Returns this
 */
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

/**
 * Returns function without the requirement for first arg (DomElement).
 * when called fn runs for every element in this.list
 * Returns this (if there are no defined return values from fn
 * otherwise returns array of return values
 */
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