export enum HTMLTag {
	'a' = 'a',
	'aside' = 'aside',
	'b' = 'b',
	'br' = 'br',
	'button' = 'button',
	'details' = 'details',
	'div' = 'div',
	'em' = 'em',
	'figcaption' = 'figcaption',
	'figure' = 'figure',
	'footer' = 'footer',
	'form' = 'form',
	'h1' = 'h1',
	'h2' = 'h2',
	'h3' = 'h3',
	'h4' = 'h4',
	'h5' = 'h5',
	'h6' = 'h6',
	'header' = 'header',
	'i' = 'i',
	'img' = 'img', // special case - src
	'input' = 'input', // special case - value
	'main' = 'main',
	'mark' = 'mark',
	'nav' = 'nav',
	'p' = 'p',
	'pre' = 'pre',
	'script' = 'script', // special case - src
	'select' = 'select', // special case - options
	'span' = 'span',
	'summary' = 'summary',
	'table' = 'table',
	'tbody' = 'tbody',
	'td' = 'td',
	'textarea' = 'textarea',
	'th' = 'th',
	'thead' = 'thead',
	'tr' = 'tr',
}

// Node/Element properties that can be set with .attr()
export enum DomAttributeSetters {
	'disabled' = 'disabled',
	'height' = 'height',
	'href' = 'href',
	'htmlFor' = 'htmlFor',
	'max' = 'max',
	'min' = 'min',
	'name' = 'name',
	'placeholder' = 'placeholder',
	'size' = 'size',
	'src' = 'src',
	'step' = 'step',
	'target' = 'target',
	'type' = 'type',
	'value' = 'value',
	'width' = 'width',
}

export enum DomObjectSetters {
	'attr' = 'attr',
	'data' = 'data',
}