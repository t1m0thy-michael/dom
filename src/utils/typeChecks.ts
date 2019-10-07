import { NodeDescendant, DomObject, DomElement } from '../types'

import { DOM } from './prototype'

export const isDom = (obj: any): obj is DomObject => DOM.isPrototypeOf(obj)

export const isDomElement = (obj: any): obj is DomElement => obj.DOM

export const isNode = (obj: any): obj is NodeDescendant => obj instanceof Node
