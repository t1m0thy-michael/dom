
import { dom } from './dom'

import { attribute } from './methods/attributes'

declare global {
	interface Window { dom: typeof dom; }
}
(<any>window).dom = dom

let t1 = dom([ 
	{ h1: 'd: Dom Manipulation Awesomeness' },
	{ h3: 'pptr test page' },
]).appendTo('body')

const testElem = t1.list[0]
