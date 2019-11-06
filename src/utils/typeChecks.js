export const isDom = (obj) => obj && obj.toString() === '[object Dom]'

export const isDomElement = (obj) => obj.DOM

export const isNode = (obj) => obj instanceof Node

export const isOption = (element) => element.tagName === 'OPTION'

export const isSelect = (element) => element.tagName === 'SELECT'
