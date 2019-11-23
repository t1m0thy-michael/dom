import { runFactory } from '../utils/run'
import { makeSureItsAnArray, isNumber, isObject } from '@t1m0thy_michael/u'
import { CONST } from '../utils/const'
import { tags } from '../utils/tags'

import { 
	Dom_Invalid_Argument ,
	Dom_Not_SVG,
} from '../utils/errors'

const is_svg = (element) => {
	const tagname = element.tagName.toLowercase()
	return (tags[tagname].t & CONST.TYPES.SVG) || element.namespaceURI === CONST.NAMESPACE.SVG
}

export const points = (element, arr) => {

	if (!is_svg(element)) return

	arr = makeSureItsAnArray(arr)

	let pointsArr

	for (let i = 0; i < arr.length; i++) {

		if (arr[i])

		if (!isNumber(arr[i].x) || !isNumber(arr[i].y)) {
			throw new Dom_Invalid_Argument('points objects must be like [{x, y}]')
		}

	}
}

export const svg  = {
	points: runFactory(points)
}

export default svg