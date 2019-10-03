import { 
	DomInitiator,
	NodeDescendant, 
	DomObject, 
	DomObjectPrototype, 
	ArrayLikeOfNodes } from '../types'

import { makeSureItsAnArray } from '@t1m0thy_michael/u'

import { DOM } from './prototype'

export const isDom = (obj: any): obj is DomObject => DOM.isPrototypeOf(obj)

export const isNode = (obj: any): obj is NodeDescendant => obj instanceof Node

export const isArrayLikeOfNodes = (obj: any): obj is ArrayLikeOfNodes => makeSureItsAnArray(obj).every(isNode)
