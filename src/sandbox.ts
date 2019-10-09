
import { dom } from './dom'

declare global {
	interface Window { dom: typeof dom; }
}
(<any>window).dom = dom

const test = dom([
	{ h1: ['d: Dom Manipulation Awesomeness'] },
	{ textarea: ['this is a test of dom definitions in array'] },
]).appendTo('body')

test.colour('red')

// export default dom