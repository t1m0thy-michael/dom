import { assert } from 'chai'
const sinon = require('sinon')

import { 
	addClass,
	hasClass,
	removeClass,
	replaceClass,
	toggleClass,
} from './classes'

describe('classes', () => {

	it('has expected methods', () => {
		assert.isFunction(addClass)
		assert.isFunction(removeClass)
		assert.isFunction(replaceClass)
		assert.isFunction(toggleClass)
		assert.isFunction(hasClass)
	})

	/*=================================
	  			addClass()
	=================================*/

	describe('addClass()', () => {

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

		it('calls classList.add with correct value', () => {
			const elem = document.createElement('div')
			sandbox.stub(elem.classList, 'add')
			const myClass = 'myClass'
			addClass(elem, myClass)
			sinon.assert.calledWith(elem.classList.add, myClass)
		})

		it('calls classList.add with multiple correct values', () => {
			const elem = document.createElement('div')
			sandbox.stub(elem.classList, 'add')
			const myClasses = ['myClass1', 'myClass2', 'myClass3']
			addClass(elem, myClasses)
			sinon.assert.calledWith(elem.classList.add, ...myClasses)
		})

		it('does not throw if classList does not exist on element', () => {
			const elem = document.createTextNode('Node without classList')
			const myClass = 'myClass'
			assert.doesNotThrow(() => addClass(elem, myClass), Error)
		})
	})
	/*=================================
	  			removeClass()
	=================================*/

	describe('removeClass()', () => {

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

		it('calls classList.remove with correct value', () => {
			const elem = document.createElement('div')
			sandbox.stub(elem.classList, 'remove')
			const myClass = 'myClass'
			removeClass(elem, myClass)
			sinon.assert.calledWith(elem.classList.remove, myClass)
		})

		it('calls classList.remove with multiple correct values', () => {
			const elem = document.createElement('div')
			sandbox.stub(elem.classList, 'remove')
			const myClasses = ['myClass1', 'myClass2', 'myClass3']
			removeClass(elem, myClasses)
			sinon.assert.calledWith(elem.classList.remove, ...myClasses)
		})

		it('does not throw if classList does not exist on element', () => {
			const elem = document.createTextNode('Node without classList')
			const myClass = 'myClass'
			assert.doesNotThrow(() => removeClass(elem, myClass), Error)
		})
	})

	/*=================================
	  			replaceClass()
	=================================*/

	describe('replaceClass()', () => {

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

		it('calls classList.replace with correct value', () => {
			const elem = document.createElement('div')
			sandbox.stub(elem.classList, 'replace')
			const myOldClass = 'old'
			const myNewClass = 'new'
			replaceClass(elem, myOldClass, myNewClass)
			sinon.assert.calledWith(elem.classList.replace, myOldClass, myNewClass)
		})

		it('does not throw if classList does not exist on element', () => {
			const elem = document.createTextNode('Node without classList')
			const myOldClass = 'old'
			const myNewClass = 'new'
			assert.doesNotThrow(() => replaceClass(elem, myOldClass, myNewClass), Error)
		})
	})

	/*=================================
	  			toggleClass()
	=================================*/

	describe('toggleClass()', () => {

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

		it('calls classList.toggle with correct value', () => {
			const elem = document.createElement('div')
			sandbox.stub(elem.classList, 'toggle')
			const myClass = 'myClass'
			toggleClass(elem, myClass)
			sinon.assert.calledWith(elem.classList.toggle, myClass)
		})

		it('does not throw if classList does not exist on element', () => {
			const elem = document.createTextNode('Node without classList')
			const myClass = 'myClass'
			assert.doesNotThrow(() => toggleClass(elem, myClass), Error)
		})
	})

	/*=================================
	  			hasClass()
	=================================*/

	describe('hasClass()', () => {

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

		it('calls classList.contains with correct value and returns its response', () => {
			const elem = document.createElement('div')
			sandbox.stub(elem.classList, 'contains').returns(true)
			const myClass = 'myClass'
			const result = hasClass(elem, myClass)
			sinon.assert.calledWith(elem.classList.contains, myClass)
			assert.strictEqual(result, true)
		})

		it('returns false if classList does not exist on element', () => {
			const elem = document.createTextNode('Node without classList')
			const myClass = 'myClass'
			const result = hasClass(elem, myClass)
			assert.strictEqual(result, false)
		})
	})
})
