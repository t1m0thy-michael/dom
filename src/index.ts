// export * from './methods/attributes'
// export * from './methods/classes'
// export * from './methods/events'
// export * from './methods/form'
// export * from './methods/insertion'
// export * from './methods/selection'
// export * from './methods/styles'
// export * from './methods/viewport'

import { dom } from './dom'

const test = dom({
	span: ['hello world'],
	style: {
		color: 'red'
	}
}).appendTo('body')

console.log(test)

console.log(test.isAppended)

// export default dom