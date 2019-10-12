import { assert } from 'chai'
const sinon = require('sinon')

import { getNodeStub, getElementStub } from '../../tests/utils/sinon_stubs'
import { classes } from './classes'
import { NodeDescendant } from '../types'

describe('classes', () => {

	it('has expected methods', () => {
		assert.isFunction(classes.addClass)
		assert.isFunction(classes.removeClass)
		assert.isFunction(classes.replaceClass)
		assert.isFunction(classes.toggleClass)
		assert.isFunction(classes.hasClass)
	})

	/*=================================
	  			addClass()
	=================================*/

	describe('addClass()', () => {

		it('calls classList.add with correct value', () => {
			const elem = getElementStub()
			const myClass = 'myClass'
			classes.addClass(elem as unknown as NodeDescendant, myClass)
			sinon.assert.calledWith(elem.classList.add, myClass)
		})

		it('calls classList.add with multiple correct values', () => {
			const elem = getElementStub()
			const myClasses = ['myClass1', 'myClass2', 'myClass3']
			classes.addClass(elem as unknown as NodeDescendant, myClasses)
			sinon.assert.calledWith(elem.classList.add, ...myClasses)
		})

		it('does not throw if classList does not exist on element', () => {
			const elem = getNodeStub()
			const myClass = 'myClass'
			assert.doesNotThrow(() => classes.addClass(elem as unknown as NodeDescendant, myClass), Error)
		})
	})

	/*=================================
	  			removeClass()
	=================================*/

	describe('removeClass()', () => {

		it('calls classList.remove with correct value', () => {
			const elem = getElementStub()
			const myClass = 'myClass'
			classes.removeClass(elem as unknown as NodeDescendant, myClass)
			sinon.assert.calledWith(elem.classList.remove, myClass)
		})

		it('calls classList.remove with multiple correct values', () => {
			const elem = getElementStub()
			const myClasses = ['myClass1', 'myClass2', 'myClass3']
			classes.removeClass(elem as unknown as NodeDescendant, myClasses)
			sinon.assert.calledWith(elem.classList.remove, ...myClasses)
		})

		it('does not throw if classList does not exist on element', () => {
			const elem = getNodeStub()
			const myClass = 'myClass'
			assert.doesNotThrow(() => classes.removeClass(elem as unknown as NodeDescendant, myClass), Error)
		})
	})

	/*=================================
	  			replaceClass()
	=================================*/

	describe('replaceClass()', () => {

		it('calls classList.replace with correct value', () => {
			const elem = getElementStub()
			const myOldClass = 'old'
			const myNewClass = 'new'
			classes.replaceClass(elem as unknown as NodeDescendant, myOldClass, myNewClass)
			sinon.assert.calledWith(elem.classList.replace, myOldClass, myNewClass)
		})

		it('does not throw if classList does not exist on element', () => {
			const elem = getNodeStub()
			const myOldClass = 'old'
			const myNewClass = 'new'
			assert.doesNotThrow(() => classes.replaceClass(elem as unknown as NodeDescendant, myOldClass, myNewClass), Error)
		})
	})

	/*=================================
	  			toggleClass()
	=================================*/

	describe('toggleClass()', () => {

		it('calls classList.toggle with correct value', () => {
			const elem = getElementStub()
			const myClass = 'myClass'
			classes.toggleClass(elem as unknown as NodeDescendant, myClass)
			sinon.assert.calledWith(elem.classList.toggle, myClass)
		})

		it('does not throw if classList does not exist on element', () => {
			const elem = getNodeStub()
			const myClass = 'myClass'
			assert.doesNotThrow(() => classes.toggleClass(elem as unknown as NodeDescendant, myClass), Error)
		})
	})

	/*=================================
	  			hasClass()
	=================================*/

	describe('hasClass()', () => {

		it('calls classList.contains with correct value and returns its response', () => {
			const elem = getElementStub()
			elem.classList.contains.returns(true)
			const myClass = 'myClass'
			const result = classes.hasClass(elem as unknown as NodeDescendant, myClass)
			sinon.assert.calledWith(elem.classList.contains, myClass)
			assert.strictEqual(result, true)
		})

		it('returns false if classList does not exist on element', () => {
			const elem = getNodeStub()
			const myClass = 'myClass'
			const result = classes.hasClass(elem as unknown as NodeDescendant, myClass)
			assert.strictEqual(result, false)
		})
	})
})
