
import { assert } from 'chai'
const sinon = require('sinon')

require('jsdom-global')()

import {
	dom,
	getPrototype,
} from './dom'

describe('dom', () => {

	it('is a function', () => {
		assert.isFunction(dom, 'is a function')
	})

	describe('has expected extra functions as properties', () => {
		it('has setEventbus', () => {
			assert.isFunction(dom.setEventbus, 'setEventbus')
		})

		it('has getEventbus', () => {
			assert.isFunction(dom.getEventbus, 'getEventbus')
		})

		it('has registerPlugin', () => {
			assert.isFunction(dom.registerPlugin, 'registerPlugin')
		})

		it('has text', () => {
			assert.isFunction(dom.text, 'text')
		})
	})

	/*=================================
	  			attr()
	=================================*/

	describe('getPrototype()', () => {

		it('is a function', () => {
			assert.isFunction(getPrototype, 'is a function')
		})

		it('returns an object', () => {
			assert.isObject(getPrototype(), 'is an object the first time its called')
			assert.isObject(getPrototype(), 'is an object the second time its called')
		})

		it('returned object as the expected properties', () => {
			const prototype = getPrototype()
			// test one method from each methods module
			assert.isFunction(prototype.attr, 'attr()')
			assert.isFunction(prototype.addClass, 'addClass()')
			assert.isFunction(prototype.on, 'on()')
			assert.isFunction(prototype.dflt, 'dflt()')
			assert.isFunction(prototype.appendTo, 'appendTo()')
			assert.isFunction(prototype.child, 'child()')
			assert.isFunction(prototype.colour, 'colour()')
			assert.isFunction(prototype.getBounding, 'getBounding()')
			// misc
			assert.isFunction(prototype.toString, 'toString()')
		})
	})

	describe('dom()', () => {

		describe('creates expected object from DomDefinition', () => {

			before(function () {
				this.jsdom = require('jsdom-global')()
			})

			after(function () {
				this.jsdom()
			})

			it('has list', () => {
				let result = dom({ div: 'hello test' })
				assert.isArray(result.list)
			})

			it('has element', () => {
				let result = dom({ div: 'hello test' })
				assert.isDefined(result.element)
			})

			it('has initiator', () => {
				let result = dom({ div: 'hello test' })
				assert.isObject(result.initiator)
			})

			it('has exists', () => {
				let result = dom({ div: 'hello test' })
				assert.strictEqual(result.exists, true)
			})

			it('has correct prototype', () => {
				let result = dom({ div: 'hello test' })
				assert.ok(getPrototype().isPrototypeOf(result))
			})

		})

	})

	describe('dom.text()', () => {

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		it('returns a Text Node', () => {
			const result = dom.text('hello world')
			assert.ok(result.element instanceof Text)
		})
	})
})