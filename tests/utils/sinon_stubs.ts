const sinon = require('sinon')

export const getNodeStub = () => ({}) as Node
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

export const getDocumentStub = () => ({
	querySelectorAll: sinon.stub()
} as unknown as Document)