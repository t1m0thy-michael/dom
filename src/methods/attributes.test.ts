import { assert } from 'chai'
const sinon = require('sinon')

import { getNodeStub, getElementStub, getDocumentStub } from '../../tests/utils/sinon_stubs'
import { attribute } from './attributes'
import { Dom_Element_Definition_Error } from '../utils/errors'
import { NodeDescendant } from '../types'

describe('attributes', () => {

	it('has expected methods', () => {
		assert.isFunction(attribute.attr)
		assert.isFunction(attribute.data)
		assert.isFunction(attribute.disable)
		assert.isFunction(attribute.enable)
		assert.isFunction(attribute.id)
		assert.isFunction(attribute.innerHTML)
		assert.isFunction(attribute.innerText)
	})

	/*=================================
	  			attr()
	=================================*/

	describe('attribute.attr()', () => {

		it('calls element.getAttribute when not passed a value', () => {
			const elem = getElementStub() as unknown as NodeDescendant
			const attributeKey = 'key'
			attribute.attr(elem, attributeKey)
			sinon.assert.calledWith(elem.getAttribute, attributeKey)
		})

		it('returns expected value when not passed a value', () => {
			const expectedResult = 'result'
			const elem = getElementStub() as unknown as NodeDescendant
			// @ts-ignore
			elem.getAttribute.returns(expectedResult)
			const attributeKey = 'key'
			const result = attribute.attr(elem, attributeKey)
			assert.equal(result, expectedResult)
		})

		it('does not call element.getAttribute when passed a value', () => {
			const elem = getElementStub() as unknown as NodeDescendant
			const attributeKey = 'key'
			const attributeValue = 'value'
			attribute.attr(elem, attributeKey, attributeValue)
			sinon.assert.notCalled(elem.getAttribute)
		})

		it('calls element.setAttribute when passed a value', () => {
			const elem = getElementStub() as unknown as NodeDescendant
			const attributeKey = 'key'
			const attributeValue = 'value'
			attribute.attr(elem, attributeKey, attributeValue)
			sinon.assert.calledWith(elem.setAttribute, attributeKey, attributeValue)
		})

		it('returns false if Element does not have get/setAttribute methods', () => {
			const elem = getNodeStub() as unknown as NodeDescendant
			const attributeKey = 'key'
			const result = attribute.attr(elem, attributeKey)
			assert.strictEqual(result, false)
		})
	})

	/*=================================
				data()
	=================================*/

	describe('attribute.data()', () => {

		it('returns false when value has not been set', () => {
			const elem = getElementStub() as unknown as NodeDescendant
			const result = attribute.data(elem, 'key')
			assert.strictEqual(result, false)
		})

		it('returns expected value when its been set', () => {
			const setValue = 'result'
			const elem = getElementStub() as unknown as NodeDescendant
			attribute.data(elem, 'key', 'value')
			const result = attribute.data(elem, 'key')
			assert.equal(result, 'value')
		})
	})

	/*=================================
				disable()
	=================================*/

	describe('attribute.disable()', () => {

		it('sets disabled property to true', () => {
			const elem = getElementStub() as unknown as NodeDescendant
			attribute.disable(elem)
			assert.strictEqual(elem.disabled, true)
			// does not toggle
			attribute.disable(elem)
			assert.strictEqual(elem.disabled, true)
		})
	})

	/*=================================
				enable()
	=================================*/

	describe('attribute.enable()', () => {

		it('sets disabled property to false', () => {
			const elem = getElementStub() as unknown as NodeDescendant
			attribute.enable(elem)
			assert.strictEqual(elem.disabled, false)
			// does not toggle
			attribute.enable(elem)
			assert.strictEqual(elem.disabled, false)
		})
	})

	/*=================================
				id()
	=================================*/

	describe('attribute.enable()', () => {

		const gbl = (<any>global)

		it('returns ID if val not passed', () => {
			const expectedResult = 'myID'
			gbl.document = getDocumentStub()
			const elem = getElementStub() as unknown as NodeDescendant
			elem.id = expectedResult
			const result = attribute.id(elem)
			assert.equal(result, expectedResult)
		})

		it('returns false if val not passed and id not set', () => {
			const expectedResult = false
			gbl.document = getDocumentStub()
			const elem = getElementStub() as unknown as NodeDescendant
			const result = attribute.id(elem)
			assert.equal(result, expectedResult)
		})

		it('sets ID', () => {
			const id = 'myID'
			gbl.document = getDocumentStub()
			gbl.document.querySelectorAll.returns([])
			const elem = getElementStub() as unknown as NodeDescendant
			attribute.id(elem, id)
			assert.equal(elem.id, id)
		})

		it('sets ID. Strips leading "#"', () => {
			const id = '#myID'
			const expectedResult = 'myID'
			gbl.document = getDocumentStub()
			gbl.document.querySelectorAll.returns([])
			const elem = getElementStub() as unknown as NodeDescendant
			attribute.id(elem, id)
			assert.equal(elem.id, expectedResult)
		})

		it('throws if ID already exists', () => {
			const id = '#myID'
			const expectedResult = 'myID'
			gbl.document = getDocumentStub()
			gbl.document.querySelectorAll.returns([1])
			const elem = getElementStub() as unknown as NodeDescendant
			assert.throws(() => attribute.id(elem, id), Dom_Element_Definition_Error)
		})
	})

	/*=================================
				innerHTML()
	=================================*/

	describe('attribute.innerHTML()', () => {

		it('returns empty string when value has not been set', () => {
			const elem = getElementStub() as unknown as NodeDescendant
			const result = attribute.innerHTML(elem)
			assert.strictEqual(result, '')
		})

		it('returns expected value when its been set', () => {
			const expectedResult = 'qwerty'
			const elem = getElementStub() as unknown as NodeDescendant
			attribute.innerHTML(elem, expectedResult)
			const result = attribute.innerHTML(elem)
			assert.equal(result, expectedResult)
		})
	})

	/*=================================
				innerText()
	=================================*/

	describe('attribute.innerText()', () => {

		it('returns empty string when value has not been set', () => {
			const elem = getElementStub() as unknown as NodeDescendant
			const result = attribute.innerText(elem)
			assert.strictEqual(result, '')
		})

		it('returns expected value when its been set', () => {
			const expectedResult = 'qwerty'
			const elem = getElementStub() as unknown as NodeDescendant
			attribute.innerText(elem, expectedResult)
			assert.equal(elem.innerText, expectedResult)
			const result = attribute.innerText(elem)
			assert.equal(result, expectedResult)
		})
	})
})