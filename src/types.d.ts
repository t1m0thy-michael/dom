import { 
	HTMLTag, 
	DomAttributeSetters, 
	DomObjectSetters 
} from './enum'

/*=====================================================
	Event Bus Types
=====================================================*/

export interface EventBusInterface {
	pub: Function,
	sub: Function,
	remove: Function,
}

export interface DomEventSubscription {
	[index: string]: any,
	topic: string,
	fn: Function,
	distinct?: boolean,
	once?: boolean,
	minInterval?: number,
	description?: string
}

export interface DomEventSubscriptionDetail {
	subscription: DomEventSubscription,
	token: any // TODO: DOM.event.subscriptions.token
}

export interface DomEventDataProvider {
	(this: DomElement, e?: Event): any
}

export type DomEventData = DomEventDataProvider | any | null | undefined

/*=====================================================
	onEvent
=====================================================*/

export interface DomEvent {
	event: string,
	topic?: string,
	data?: any | Function,
	fn?: EventListener,
	stopPropagation?: boolean,
	preventDefault?: boolean,
	elementAsCtx?: boolean,
}

/*=====================================================
	Node/Element/DomElement & Collections of
=====================================================*/

export type NodeDescendant = Node & Partial<Element> & { [index: string]: any }

export type DomElement = NodeDescendant & {
	DOM: {
		data: Map<string, any>,
		def: Partial<DomDefinition>,
		event: {
			subscriptions: DomEventSubscriptionDetail[],
			onEvent: EventListener[]
		},
		on: { [index: string]: EventListener },
	}
}

export type DomInitiatorBasic = DomObject
	| NodeDescendant
	| null | undefined
	| Partial<DomDefinition>
	| string

export type DomInitiatorArrayLike = HTMLCollectionOf<Element>
	| (Partial<DomDefinition> | string | NodeDescendant)[]
	| Iterable<NodeDescendant>
	| Iterator<NodeDescendant>
	| NodeListOf<NodeDescendant>

export type DomInitiator = DomInitiatorBasic 
	| DomInitiatorArrayLike


/*=====================================================
	DOM interface
=====================================================*/

export type DomObjectPrototype = {

	// selection
	child: (selector: string) => DomObject,
	sibling: (selector: string) => DomObject,
	parent: (selector: string) => DomObject,

	// attributes
	attr: (attribute: string, val?: string | number) => DomObject | (boolean | string)[],
	data: (key: string, val?: any) => DomObject | (any | boolean)[],
	disable: () => DomObject,
	enable: () => DomObject,
	id: (id?: string) => DomObject | (string | boolean)[],
	innerHTML: (html?: string) => DomObject | string[],
	innerText: (text?: string) => DomObject | string[],

	// classes
	addClass: (className: string | string[]) => DomObject,
	removeClass: (className: string | string[]) => DomObject,
	replaceClass: (oldClass: string, newClass: string) => DomObject,
	toggleClass: (className: string) => DomObject,
	hasClass: (className: string) => DomObject,

	// event
	change: () => DomObject
	click: () => DomObject
	fireEvent: (evnt: string) => DomObject
	on: (evnt: string, fn: EventListener) => DomObject
	onEvent: (eventDef: DomEvent) => DomObject
	sub: (subscription: DomEventSubscription) => DomObject

	// style
	background: (bgDef: DomBackgroundDefinition) => Promise<boolean | undefined>[]
	backgroundColour: (color: string) => any[] | DomObject
	colour: (color: string) => any[] | DomObject
	height: (h: string | number | ((h?: string | undefined) => string), unit?: string | undefined) => DomObject | number[]
	hide: () => DomObject
	show: (showType?: string | undefined) => DomObject
	style: (key: string, val: string) => any[] | DomObject
	width: (w: string | number | ((w?: string | undefined) => string), unit?: string | undefined) => DomObject | number[]

	// insertion
	appendAfter: (initiator: DomInitiator) => DomObject,
	appendBefore: (initiator: DomInitiator) => DomObject,
	appendFirstChild: (initiator: DomInitiator) => DomObject,
	appendLastChild: (initiator: DomInitiator) => DomObject,
	appendTo: (initiator: DomInitiator) => DomObject,
	empty: () => DomObject,
	remove: (initiator?: DomInitiator) => DomObject,
	replace: (initiator: DomInitiator) => DomObject,

	// viewport
	scrollTop: (px: number) => DomObject | number,
	scrollMore: (px: number) => DomObject | number,
	getBounding: () => (ClientRect | DOMRect)[],

	// forms
	deselect: () => DomObject,
	dflt: (val?: any) => DomObject,
	formValues: () => DomObject,
	select: () => DomObject,
	updateSelect: (def: DomSelectDefinition) => DomObject,
	validate: (extra?: any) => DomObject,
	value: (val?: any) => DomObject,

	// misc
	isAppended: () => boolean,

	toString: () => string,
}

export type DomObject = DomObjectPrototype & {
	list: DomElement[],
	element: DomElement,
	initiator: DomInitiator,
	exists: boolean,
	eventbus: EventBusInterface,
}

export interface DomSetter {
	(o: DomObject, d: Partial<DomDefinition>): void
}

export interface DomSetters {
	[key: string]: DomSetter
}

/*=====================================================
	Dom Definitions
=====================================================*/

export type Scalar = string | number | boolean | null | undefined

export type KeyValuePair = {
	[index: string]: Scalar
}

export interface DomInputDefinition {
	dflt: ((...args: any) => Scalar) | Scalar,
}

export type  DomBackgroundDefinition = {
	color ?: string | undefined;
	path ?: string | undefined;
	brightness ?: boolean | undefined;
	position ?: string | undefined;
}

export interface DomSelectDefinition extends DomInputDefinition{
	options: KeyValuePair,
}

export type DomDefinition = { [index: string]: any }
& { [A in keyof DomSelectDefinition]?: DomSelectDefinition[A]} 
& { [B in HTMLTag]?: DomInitiator | DomInitiator[] } 
& { [C in DomAttributeSetters]?: string }
& {
	attr: KeyValuePair,
	background: DomBackgroundDefinition,
	classes: string | string[],
	content: DomInitiator | DomInitiator[],
	data: KeyValuePair,
	on: DomEvent | DomEvent[],
	style: Partial<CSSStyleDeclaration>,
	sub: DomEventSubscription,
	tag: string,
	validate: (...args: any) => boolean,
}
