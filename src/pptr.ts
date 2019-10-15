/*
	entry point for pptr test page
*/
import { dom } from './dom'
(<any>window).dom = dom

let t1 = dom([ 
	{ h1: 'd: Dom Manipulation Awesomeness' },
	{ h3: 'pptr test page' },
]).appendTo('body')

const testElem = t1.list[0]
