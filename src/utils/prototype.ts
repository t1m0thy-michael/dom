import { selection } from '../methods/selection'
import { attribute } from '../methods/attributes'
import { classes } from '../methods/classes'
import { event } from '../methods/events'
import { insertion } from '../methods/insertion'
import { styles } from '../methods/styles'
import { viewport } from '../methods/viewport'
import { form } from '../methods/form'

import { 
	runFactory, 
	runAndReturnFactory, 
	runAndReturnSingleDomObjectFactory,
	runAndReturnNeverDomObjFactory,
} from '../utils/run'

import { DomObjectPrototype } from '../types'

export const DOM: DomObjectPrototype = {

	// selection methods
	child: runAndReturnSingleDomObjectFactory(selection.child),
	isAppended: runAndReturnNeverDomObjFactory(selection.isAppended),
	not: runAndReturnSingleDomObjectFactory(selection.not),
	parent: runAndReturnSingleDomObjectFactory(selection.parent),
	selector: runAndReturnSingleDomObjectFactory(selection.selector),
	sibling: runAndReturnSingleDomObjectFactory(selection.sibling),

	// attributes
	attr: runAndReturnFactory(attribute.attr),
	data: runAndReturnFactory(attribute.data),
	disable: runFactory(attribute.disable),
	enable: runFactory(attribute.enable),
	id: runAndReturnFactory(attribute.id),
	innerHTML: runAndReturnFactory(attribute.innerHTML),
	innerText: runAndReturnFactory(attribute.innerText),

	// classes
	addClass: runFactory(classes.addClass),
	hasClass: runFactory(classes.hasClass),
	removeClass: runFactory(classes.removeClass),
	replaceClass: runFactory(classes.replaceClass),
	toggleClass: runFactory(classes.toggleClass),

	// events
	change: runFactory(event.change),
	click: runFactory(event.click),
	fireEvent: runFactory(event.fireEvent),
	on: runFactory(event.on),
	onEvent: runFactory(event.onEvent),
	sub: runFactory(event.sub),
	
	// style
	background: runAndReturnFactory(styles.background),
	backgroundColour: runAndReturnFactory(styles.backgroundColour),
	colour: runAndReturnFactory(styles.colour),
	height: runAndReturnFactory(styles.height),
	hide: runFactory(styles.hide),
	show: runFactory(styles.show),
	style: runAndReturnFactory(styles.style),
	width: runAndReturnFactory(styles.width),

	// // insertion methods
	appendAfter: runFactory(insertion.appendAfter),
	appendBefore: runFactory(insertion.appendBefore),
	appendFirstChild: runFactory(insertion.appendFirstChild),
	appendLastChild: runFactory(insertion.appendLastChild),
	appendTo: runFactory(insertion.appendTo),
	empty: runFactory(insertion.empty),
	remove: runFactory(insertion.remove),
	replace: runFactory(insertion.replace),

	// viewport methods
	getBounding: runAndReturnFactory(viewport.getBounding),
	scrollMore: runFactory(viewport.scrollMore),
	scrollTop: runAndReturnFactory(viewport.scrollTop),

	// form methods
	deselect: runFactory(form.deselect),
	dflt: runFactory(form.dflt),
	formValues: runFactory(form.formValues),
	select: runFactory(form.select),
	updateSelect: runFactory(form.updateSelect),
	validate: runFactory(form.validate),
	value: runFactory(form.value),

	eventbus: null,

	toString: function() { return '[object Dom]' },
}