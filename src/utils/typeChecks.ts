import { NodeDescendant, DomObject, DomElement } from '../types'

export const isDom = (obj: any): obj is DomObject => obj && obj.toString() === '[object Dom]'

export const isDomElement = (obj: any): obj is DomElement => obj.DOM

export const isNode = (obj: any): obj is NodeDescendant => obj instanceof Node

export const isOption = (element: NodeDescendant): element is HTMLOptionElement => element.tagName === 'OPTION'

export const isSelect = (element: NodeDescendant): element is HTMLSelectElement => element.tagName === 'SELECT'
