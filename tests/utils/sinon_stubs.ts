const sinon = require('sinon')

import { NodeDescendant } from '../../src/types'

const stubs = {
	Node: () => ({}),
	HTMLElement: () => ({
		id: '',
		children: [],
		setAttribute: sinon.stub(),
		getAttribute: sinon.stub(),
		innerHTML: '',
		innerText: '',
	}),
	DOMElement: () => ({
		id: '',
		children: [],
		setAttribute: sinon.stub(),
		getAttribute: sinon.stub(),
		innerHTML: '',
		innerText: '',
		DOM: {
			data: new Map(),
			def: {},
			event: {
				subscriptions: [],
				onEvent: []
			},
			on: {},
		}
	}),
	document: () => ({
		querySelectorAll: sinon.stub()
	})

}

export const getStub = (type: keyof typeof stubs) => stubs[type]() as unknown as NodeDescendant