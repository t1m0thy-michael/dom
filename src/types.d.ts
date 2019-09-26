import { HTMLTag } from'./enum'

export type DomMethod = {
	(...args: any): any
}

export interface FnAnyReturnsBool {
	(val: any): boolean
}

export interface DomInterfacePrototype {
	// required to allow plugins...
	// TODO: find away to get rid of this
	[index: string]: any,
	
	// other things that can be registered
	eventBus: EventBus | false,
	
	// getters...
	isAppended: boolean,

	// language feature overrides
	toString: () => string,
	toJson: () => object,

	// event methods
	change: DomMethod,
	click: DomMethod,
	fireEvent: DomMethod,
	on: DomMethod,
	onEvent: DomMethod,
	sub: DomMethod,

	// style methods
	background: DomMethod,
	backgroundColour: DomMethod,
	colour: DomMethod,
	height: DomMethod,
	hide: DomMethod,
	show: DomMethod,
	style: DomMethod,
	width: DomMethod,

	// class methods
	addClass: DomMethod,
	hasClass: DomMethod,
	removeClass: DomMethod,
	replaceClass: DomMethod,
	toggleClass: DomMethod,

	// insertion methods
	appendAfter: DomMethod,
	appendBefore: DomMethod,
	appendFirstChild: DomMethod,
	appendLastChild: DomMethod,
	appendTo: DomMethod,
	empty: DomMethod,
	remove: DomMethod,
	replace: DomMethod,

	// selection methods
	child: DomMethod,
	parent: DomMethod,
	sibling: DomMethod,

	// attribute methods
	attr: DomMethod,
	data: DomMethod,
	innerText: DomMethod,
	innerHTML: DomMethod,
	disable: DomMethod,
	enable: DomMethod,

	// viewport methods
	getBounding: DomMethod,
	scrollMore: DomMethod,
	scrollTop: DomMethod,

	// form methods
	deselect: DomMethod,
	formValues: DomMethod,
	resetDefault: DomMethod,
	select: DomMethod,
	updateSelect: DomMethod,
	validate: DomMethod,
	value: DomMethod,
}

interface DomInterface extends DomInterfacePrototype {
	list: DomElement[],
	element: DomElement, domElement: DomInterface,
	initiator: DomInitiator,
}

declare var Dom: {
	prototype: DomInterfacePrototype
	new(): DomInterface
}

export type NodeDescendant = {
	[P in keyof Node]: Node[P]
} & {
	[P in keyof Element]: Element[P]
} & {
	[P in keyof ParentNode]?: ParentNode[P]
} & {
	[P in keyof HTMLElement]?: HTMLElement[P]
} & {
	[P in keyof HTMLBaseElement]?: HTMLBaseElement[P]
} & {
	[P in keyof HTMLLabelElement]?: HTMLLabelElement[P]
} & {
	[P in keyof HTMLFormElement]?: HTMLFormElement[P]
} & {
	[P in keyof HTMLInputElement] ?: HTMLInputElement[P]
} & {
	[P in keyof HTMLSelectElement]?: HTMLSelectElement[P]
} & {
	[P in keyof HTMLTextAreaElement]?: HTMLTextAreaElement[P]
} & {
	[P in keyof HTMLOptionElement]?: HTMLOptionElement[P]
} & {
	[P in keyof SVGElement]?: SVGElement[P]
} & {
	parentNode?: { focus?: (options?: FocusOptions) => void }
}

export type DomSubscriptionRecord = {
	subscription: EventJS.Subscription,
	token?: EventBusToken[]
}

export type DomElement = {
	[P in keyof NodeDescendant]: NodeDescendant[P]
} & {
	DOM: {
		data: { [key: string]: any },
		def: DomDefinition,
		event: {
			subscriptions: DomSubscriptionRecord[],
			onEvent: EventListener[]
		},
		on: { [key: string]: any },
	},
	id: string,
	value?: string | null,
	style?: Partial<CSSStyleDeclaration>,
}

export type DomInitiator = NodeDescendant 
	| DomElement 
	| Element[]
	| HTMLCollection
	| HTMLElement
	| NodeDescendant[] 
	| NodeListOf<NodeDescendant> 
	| null
	| Partial<DomDefinition>
	| string 
	| Text
	| undefined


export type DomAttributeDefinition = {
	[index: string]: string
}

export type DomOption = {
	value: string | number,
	text: string,
}

export type DomInputDefinition = {
	default?: (() => any) | string | number,
}

export type DomSelectDefinition = {
	[P in keyof DomInputDefinition]: DomInputDefinition[P]
} & {
	options?: DomOption | DomOption[],
}

export type DomDefinition = {
	[P in keyof DomSelectDefinition]: DomSelectDefinition[P]
} & {
	[P in HTMLTag]: DomInitiator | DomInitiator[]
} & {
	[index: string]: any,
	attr: DomAttributeDefinition,
	background: string,
	classes: string | string[],
	content: DomInitiator | DomInitiator[],
	data: { [key: string]: any },
	disabled: string | boolean,
	height: string,
	href: string,
	htmlFor: string,
	id: string,
	max: string,
	min: string,
	name: string,
	onEvent: DomOnEvent | DomOnEvent[],
	placeholder: string,
	size: number,
	src: string,
	step: string,
	style: Partial<CSSStyleDeclaration>,
	sub: EventJS.Subscription,
	target: string,
	tag: string,
	tooltip: string,
	type: string,
	value: string | number,
	validate: FnAnyReturnsBool,
	width: string,
}

export interface DomSetterFn {
	(o: DomInterface, e: DomElement, d: Partial<DomDefinition>): any
}

export interface DomSetters {
	[key: string]: DomSetterFn
}

export type DomOnEvent = {
	event: string,
	topic?: string,
	data?: any,
	fn?: EventListener,
	stopPropagation?: boolean,
	preventDefault?: boolean,
	elementAsCtx?: boolean,
}

export type BackgroundOptions = {
	path: string,
	color?: string,
	position?: string,
	brightness?: boolean,
}

export type DomFormValuesResult = {
	[key: string]: { [key: string]: any} | string
	form: HTMLFormElement,
	all: { [key: string]: HTMLInputElement | HTMLSelectElement },
	input: { [key: string]: HTMLInputElement },
	select: { [key: string]: HTMLSelectElement },
	textarea: { [key: string]: HTMLTextAreaElement },
	submitID: string,
	submitValue: string,
	failedValidation: { [key: string]: any },
}


export interface EventSubscriptionBase {
	fn: Function,
	description?: string,
	distinct?: boolean,
	minInterval?: number,
	once?: boolean,
}

export interface EventSubscription extends EventSubscriptionBase {
	topic: string,
}

export interface EventBusSubscribe {
	description?: string,
	distinct?: boolean,
	fn: Function,
	minInterval?: number,
	once?: boolean,
	topic: string,
}

export interface EventBusToken {
	t: string,
	i: string,
	fn?: Function
}

export interface EventBusPublish {
	[key: string]: any,
	topic: string,
	data: any,
	ctx?: any,
}

export interface EventBus {
	[key: string]: any,
	pub: (obj: EventBusPublish) => any,
	sub: (obj: EventBusSubscribe) => EventBusToken,
}