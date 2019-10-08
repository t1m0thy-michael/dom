import { NodeDescendant, DomObject, DomElement } from '../types'

import { DOM } from './prototype'

export const isDom = (obj: any): obj is DomObject => DOM.isPrototypeOf(obj)

export const isDomElement = (obj: any): obj is DomElement => obj.DOM

export const isNode = (obj: any): obj is NodeDescendant => obj instanceof Node

export const isOption = (element: NodeDescendant): element is HTMLOptionElement => element.tagName === 'OPTION'

export const isSelect = (element: NodeDescendant): element is HTMLSelectElement => element.tagName === 'SELECT'
