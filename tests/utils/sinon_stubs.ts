import { EventBusInterface, DomObject } from '../../src/types'

const sinon = require('sinon')


export const getDocumentStub = () => ({
	querySelectorAll: sinon.stub()
} as unknown as Document)

/**
 * Properties and methods available on ANY Node/HTML element descendant 
 * All methods stubbed
 */
export const getElementStub = () => ({
	id: '',
	children: [],
	setAttribute: sinon.stub(),
	getAttribute: sinon.stub(),
	innerHTML: '',
	innerText: '',
	disabled: false,
	classList: {
		add: sinon.stub(),
		remove: sinon.stub(),
		replace: sinon.stub(),
		toggle: sinon.stub(),
		contains: sinon.stub(),
	},
	DOM: {
		data: new Map(),
		def: {},
		event: {
			subscriptions: [],
			onEvent: []
		},
		on: {},
	}
})

export const getEventbusStub = () => ({
	sub: sinon.stub().returns('a token'),
	pub: sinon.stub(),
	remove: sinon.stub(),
}) as EventBusInterface

export const getNodeStub = () => ({}) as Node

export const getDomObjStub = () => ({
	eventbus: null,
	element: getElementStub(),
}) as unknown as DomObject
