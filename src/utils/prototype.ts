import { selection } from '../methods/selection'
import { attribute } from '../methods/attributes'
import { classes } from '../methods/classes'
import { event } from '../methods/events'
import { insertion } from '../methods/insertion'
import { styles } from '../methods/styles'
// import viewportMethods from '../methods/viewport'
// import formMethods from '../methods/form'

import { runFactory, runAndReturnFactory } from '../utils/run'

export const DOM = {
	
	// selection methods
	child: runAndReturnFactory(selection.child),
	parent: runAndReturnFactory(selection.parent),
	sibling: runAndReturnFactory(selection.sibling),

	// attributes
	attr: runAndReturnFactory(attribute.attr),
	data: runAndReturnFactory(attribute.data),
	disable: runFactory(attribute.disable),
	enable: runFactory(attribute.enable),
	id: runFactory(attribute.id),
	innerHTML: runAndReturnFactory(attribute.innerHTML),
	innerText: runAndReturnFactory(attribute.innerText),

	// classes
	addClass: runFactory(classes.addClass),
	removeClass: runFactory(classes.removeClass),
	replaceClass: runFactory(classes.replaceClass),
	toggleClass: runFactory(classes.toggleClass),
	hasClass: runFactory(classes.hasClass),

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

	// // viewport methods
	// getBounding: viewportMethods.getBounding,
	// scrollMore: viewportMethods.scrollMore,
	// scrollTop: viewportMethods.scrollTop,

	// // form methods
	// deselect: formMethods.deselect,
	// formValues: formMethods.formValues,
	// resetDefault: formMethods.resetDefault,
	// select: formMethods.select,
	// updateSelect: formMethods.updateSelect,
	// validate: formMethods.validate,
	// value: formMethods.value,

	toString: function() { return '[object Dom]' },
	// toJson: function() { return 'AHHHHH!!!! this doesnt work' }
}