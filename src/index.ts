// export * from './methods/attributes'
// export * from './methods/classes'
// export * from './methods/events'
// export * from './methods/form'
// export * from './methods/insertion'
// export * from './methods/selection'
// export * from './methods/styles'
// export * from './methods/viewport'

import { dom } from './dom'

dom({
	span: ['hello world '],
	style: {
		color: 'red'
	}
}).appendTo('body')

const test1 = dom({
	input: 'hello world',
	dflt: 'eh?',
	style: {
		width: '10%'
	}
}).appendTo('body')

console.log(test1)
test1.dflt()
// export default dom