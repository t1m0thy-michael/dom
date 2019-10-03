import attributeMethods from '../methods/attributes'
import classMethods from '../methods/classes'
import eventMethods from '../methods/events'
import insertionMethods from '../methods/insertion'
import selectionMethods from '../methods/selection'
import styleMethods from '../methods/styles'
import viewportMethods from '../methods/viewport'
import formMethods from '../methods/form'

import u from '@t1m0thy_michael/u'

export interface DomObjectPrototype {

	[index: string]: any,

	// getters...
	isAppended: boolean,

	// language feature overrides
	toString: () => string,
	toJson: () => object,
}

export const DOM: DomObjectPrototype = {

	// // event methods
	// change: eventMethods.change,
	// click: eventMethods.click,
	// fireEvent: eventMethods.fireEvent,
	// on: eventMethods.on,
	// onEvent: eventMethods.onEvent,
	// sub: eventMethods.sub,

	// // style methods
	// background: styleMethods.background,
	// backgroundColour: styleMethods.backgroundColour,
	// colour: styleMethods.colour,
	// height: styleMethods.height,
	// hide: styleMethods.hide,
	// show: styleMethods.show,
	// style: styleMethods.style,
	// width: styleMethods.width,

	// // class methods
	// addClass: classMethods.addClass,
	// hasClass: classMethods.hasClass,
	// removeClass: classMethods.removeClass,
	// replaceClass: classMethods.replaceClass,
	// toggleClass: classMethods.toggleClass,

	// // insertion methods
	// appendAfter: insertionMethods.appendAfter,
	// appendBefore: insertionMethods.appendBefore,
	// appendFirstChild: insertionMethods.appendFirstChild,
	// appendLastChild: insertionMethods.appendLastChild,
	// appendTo: insertionMethods.appendTo,
	// empty: insertionMethods.empty,
	// remove: insertionMethods.remove,
	// replace: insertionMethods.replace,

	// selection methods
	child: selectionMethods.child,
	parent: selectionMethods.parent,
	sibling: selectionMethods.sibling,

	// // attribute methods
	// attr: attributeMethods.attr,
	// data: attributeMethods.data,
	// innerText: attributeMethods.innerText,
	// innerHTML: attributeMethods.innerHTML,
	// disable: attributeMethods.disable,
	// enable: attributeMethods.enable,

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

	eventBus: false,

	get isAppended() { return this.list.length > 0 && document.contains(this.element) },

	toString: function() { return '[object Dom]' },
	toJson: function() { return u.decycle(this) }
}