import { assert } from 'chai'
const sinon = require('sinon')

require('jsdom-global')() // doing this here seems to stop jsdom from timing out n the before() calls.

import { Dom_Element_Definition_Error } from '../utils/errors'

import {
	attr,
	data,
	disable,
	enable,
	id,
	innerHTML,
	innerText,
} from './attributes'

describe('attributes', function() {

	it('has expected methods', () => {
		assert.isFunction(attr)
		assert.isFunction(data)
		assert.isFunction(disable)
		assert.isFunction(enable)
		assert.isFunction(id)
		assert.isFunction(innerHTML)
		assert.isFunction(innerText)
	})

	/*=================================
	  			attr()
	=================================*/

	describe('attr()', () => {

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		it('calls element.getAttribute when not passed a value', () => {
			const elem = document.createElement('div')
			elem.getAttribute = sinon.stub()
			const attributeKey = 'key'
			attr(elem, attributeKey)
			sinon.assert.calledWith(elem.getAttribute, attributeKey)
		})

		it('returns expected value when not passed a value', () => {
			const expectedResult = 'result'
			const elem = document.createElement('div')
			elem.getAttribute = sinon.stub().returns(expectedResult)
			const attributeKey = 'key'
			const result = attr(elem, attributeKey)
			assert.equal(result, expectedResult)
		})

		it('does not call element.getAttribute when passed a value', () => {
			const elem = document.createElement('div')
			elem.getAttribute = sinon.stub()
			const attributeKey = 'key'
			const attributeValue = 'value'
			attr(elem, attributeKey, attributeValue)
			sinon.assert.notCalled(elem.getAttribute)
		})

		it('calls element.setAttribute when passed a value', () => {
			const elem = document.createElement('div')
			elem.setAttribute = sinon.stub()
			const attributeKey = 'key'
			const attributeValue = 'value'
			attr(elem, attributeKey, attributeValue)
			sinon.assert.calledWith(elem.setAttribute, attributeKey, attributeValue)
		})

		it('returns false if Element does not have get/setAttribute methods', () => {
			const elem = document.createTextNode('div')
			const attributeKey = 'key'
			const result = attr(elem, attributeKey)
			assert.strictEqual(result, false)
		})
	})

	/*=================================
				data()
	=================================*/

	describe('data()', () => {

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		it('returns false when value has not been set', () => {
			const elem = document.createElement('div')
			const result = data(elem, 'key')
			assert.strictEqual(result, false)
		})


		it('sets and gets correct data', () => {
			const elem = document.createElement('div')
			// DOM info object
			elem.DOM = { 
				data: new Map(),
				def: {},
				event: { subscriptions: [], on: []},
				on: {}
			}
			const value = 123456
			data(elem, 'key', value)
			const result = data(elem, 'key')
			assert.strictEqual(result, value)
		})

		it('returns expected value when setting data', () => {
			const elem = document.createElement('div')
			data(elem, 'key', 'value')
			const result = data(elem, 'key', 'value')
			assert.equal(result, 'value')
		})
	})

	/*=================================
				disable()
	=================================*/

	describe('disable()', () => {

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		it('sets disabled property to true', () => {
			const elem = document.createElement('input')
			disable(elem)
			assert.strictEqual(elem.disabled, true)
			// does not toggle
			disable(elem)
			assert.strictEqual(elem.disabled, true)
		})
	})

	/*=================================
				enable()
	=================================*/

	describe('enable()', () => {

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		it('sets disabled property to false', () => {
			const elem = document.createElement('input')
			enable(elem)
			assert.strictEqual(elem.disabled, false)
			// does not toggle
			enable(elem)
			assert.strictEqual(elem.disabled, false)
		})
	})

	/*=================================
				id()
	=================================*/

	describe('id()', () => {

		const sandbox = sinon.createSandbox()

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		afterEach(function () {
			sandbox.restore()
		})

		it('returns ID if val not passed', () => {
			const expectedResult = 'myID'
			const elem = document.createElement('div')
			elem.id = expectedResult
			const result = id(elem)
			assert.equal(result, expectedResult)
		})

		it('returns false if val not passed and id not set', () => {
			const expectedResult = false
			const elem = document.createElement('div')
			const result = id(elem)
			assert.equal(result, expectedResult)
		})

		it('sets ID', () => {
			const myID = 'myID'
			const elem = document.createElement('div')
			id(elem, myID)
			assert.equal(elem.id, myID)
		})

		it('sets ID. Strips leading "#"', () => {
			const myID = '#myID'
			const expectedResult = 'myID'
			const elem = document.createElement('div')
			id(elem, myID)
			assert.equal(elem.id, expectedResult)
		})

		it('throws if ID already exists', () => {
			sandbox.stub(document, 'querySelectorAll').returns({ length: 1 })
			const myID = '#myID'
			const elem = document.createElement('div')
			assert.throws(() => id(elem, myID), Dom_Element_Definition_Error)
		})
	})

	/*=================================
				innerHTML()
	=================================*/

	describe('innerHTML()', () => {

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		it('returns empty string when value has not been set', () => {
			const elem = document.createElement('div')
			const result = innerHTML(elem)
			assert.strictEqual(result, '')
		})

		it('returns expected value when its been set', () => {
			const expectedResult = 'qwerty'
			const elem = document.createElement('div')
			innerHTML(elem, expectedResult)
			const result = innerHTML(elem)
			assert.equal(result, expectedResult)
		})
	})

	/*=================================
				innerText()
	=================================*/

	describe('innerText()', () => {

		before(function () {
			this.jsdom = require('jsdom-global')()
		})

		after(function () {
			this.jsdom()
		})

		it('returns empty string when value has not been set', () => {
			const elem = document.createElement('div')
			const result = innerText(elem)
			assert.strictEqual(result, '')
		})

		it('returns expected value when its been set', () => {
			const expectedResult = 'qwerty'
			const elem = document.createElement('div')
			innerText(elem, expectedResult)
			assert.equal(elem.innerText, expectedResult)
			const result = innerText(elem)
			assert.equal(result, expectedResult)
		})
	})
})