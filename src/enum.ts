export enum HTMLTag {
	'a',
	'aside',
	'b',
	'button',
	'details',
	'div',
	'em',
	'figcaption',
	'figure',
	'footer',
	'form',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'header',
	'i',
	'img', // special case - src
	'input', // special case - value
	'main',
	'mark',
	'nav',
	'p',
	'pre',
	'script', // special case - src
	'select', // special case - options
	'span',
	'summary',
	'table',
	'tbody',
	'td',
	'textarea',
	'th',
	'thead',
	'tr',
}

// Node/Element properties that can be set with .attr()
export enum DomAttributeSetters {
	'disabled',
	'height',
	'href',
	'htmlFor',
	'max',
	'min',
	'name',
	'placeholder',
	'size',
	'src',
	'step',
	'target',
	'type',
	'value',
	'width',
}

export enum DomObjectSetters {
	'attr',
	'data',
}