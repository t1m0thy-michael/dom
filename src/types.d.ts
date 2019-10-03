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

export interface DomEventSubscriptionDefinition {
	[index: string]: any,
}

export interface DomEventDataProvider {
	(this: DomElement, e?: Event): any
}

export type DomEventData = DomEventDataProvider | any | null | undefined

export interface DomOnEvent {
	(type: string, fn: EventListener, topic?: string, data?: DomEventData): void
}

/*=====================================================
	Node/Element/DomElement & Collections of
=====================================================*/

export type NodeDescendant = Node & Partial<Element> &{ [index: string]: any }

// export type ElementDescendant = Element & { [index: string]: any }

export type DomElement = NodeDescendant & {
	DOM: {
		data: Map<string, any>,
		def: Partial<DomDefinition>,
		event: {
			subscriptions: DomEventSubscriptionDefinition[],
			onEvent: EventListener[]
		},
		on: { [index: string]: EventListener },
	}
}

export type ArrayLikeOfNodes = HTMLCollectionOf<ElementDescendant>
	| NodeListOf<NodeDescendant>
	| Iterable<NodeDescendant /* | ElementDescendant */>
	| Iterator<NodeDescendant /* | ElementDescendant */>
	// | NodeDescendant[] | ElementDescendant[]

export type DomInitiator = DomObject
	| ArrayLikeOfNodes
	//| ElementDescendant
	| NodeDescendant
	| null | undefined
	| Partial<DomDefinition>
	| string

export interface DomObjectPrototype {
	[index: string]: any,
}

/*=====================================================
	DOM interface
=====================================================*/

export interface DomObject extends DomObjectPrototype {
	list: DomElement[],
	element: DomElement,
	initiator: DomInitiator,
	exists: boolean,
	eventbus: EventBusInterface,
}

export interface DomSetter {
	(o: DomObject, e: DomElement, d: Partial<DomDefinition>): void
}

/*=====================================================
	Doom Definitions
=====================================================*/

export type Scalar = string | number | boolean | null | undefined

export type KeyValuePair = {
	[index: string]: Scalar
}

export interface DomInputDefinition {
	dflt?: (...args: any) => Scalar | Scalar,
}

export interface DomSelectDefinition extends DomInputDefinition{
	options?: KeyValuePair,
}

export type DomDefinition = { [index: string]: any }
& { [A in keyof DomSelectDefinition]: DomSelectDefinition[A]} 
& { [B in HTMLTag]: DomInitiator | DomInitiator[] } 
& { [C in DomAttributeSetters]: string }
& {
	attr: KeyValuePair,
	background: string,
	classes: string | string[],
	content: DomInitiator | DomInitiator[],
	data: KeyValuePair,
	on: DomOnEvent | DomOnEvent[],
	style: Partial<CSSStyleDeclaration>,
	sub: DomEventSubscriptionDefinition,
	tag: string,
	validate: (...args: any) => boolean,
}
