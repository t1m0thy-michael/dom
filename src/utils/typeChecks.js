export const isDom = (obj) => Dom.isPrototypeOf(obj)

export const isNode = (obj) => obj instanceof Node

export const is_node_elem_array = (arr) =>
	(u.isArray(arr) && u.every((val) => val instanceof Node, arr))