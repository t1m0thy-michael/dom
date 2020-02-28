import { isObject } from '@t1m0thy_michael/u'
import { CONST } from './const'

// bitwise
// tag definitions
const HTML = CONST.TAG.HTML
const SVG = CONST.TAG.SVG
const EMPTY_HTML = CONST.TAG.EMPTY_HTML
const NO_SHORTHAND = CONST.TAG.NO_SHORTHAND

/**
 * Creates function that accepts domDefinition
 * and sets ```prop1``` to itself or ```prop2```
 * the purpose is to allow shorthand prop to have custom behaviour
 * 
 * eg 
 * 	{ polygon: [] } is expected to contain points values, not contents as is default
 * 
 * @param {string} prop1 
 * @param {string} prop2 
 * @return {DomDefinition}
 */
const beforeCreateFactory = (prop1, prop2) => (d) => {
	d[prop1] = d[prop1] || d[prop2]
	return d
}

/**
 * t: type
 * beforeCreate: fn recieves domDefinition
 */
export const tags = {
	[CONST.NAMESPACE_HTML]: {
		a: { t: HTML },
		abbr: { t: HTML },
		address: { t: HTML },
		area: { t: HTML },
		article: { t: HTML },
		aside: { t: HTML },
		audio: { t: HTML },
		b: { t: EMPTY_HTML },
		base: { t: HTML },
		bdi: { t: HTML },
		bdo: { t: HTML },
		blockquote: { t: HTML },
		br: { t: HTML },
		button: { t: HTML },
		canvas: { t: HTML },
		caption: { t: HTML },
		cite: { t: HTML },
		code: { t: HTML },
		col: { t: HTML },
		colgroup: { t: HTML },
		datalist: { t: HTML },
		dd: { t: HTML },
		del: { t: HTML },
		details: { t: HTML },
		dfn: { t: HTML },
		dialog: { t: HTML },
		div: { t: HTML },
		dl: { t: HTML },
		dt: { t: HTML },
		em: { t: HTML },
		fieldset: { t: HTML },
		figcaption: { t: HTML },
		figure: { t: HTML },
		footer: { t: HTML },
		form: { t: HTML },
		h1: { t: HTML },
		h2: { t: HTML },
		h3: { t: HTML },
		h4: { t: HTML },
		h5: { t: HTML },
		h6: { t: HTML },
		head: { t: HTML },
		header: { t: HTML },
		hgroup: { t: HTML },
		hr: { t: EMPTY_HTML },
		i: { t: HTML },
		iframe: {
			t: HTML,
			beforeCreate: beforeCreateFactory('src', 'iframe')
		},
		img: {
			t: HTML,
			beforeCreate: beforeCreateFactory('src', 'img')
		},
		input: {
			t: HTML,
			beforeCreate: beforeCreateFactory('value', 'input')
		},
		ins: { t: HTML },
		kbd: { t: HTML },
		label: { t: HTML },
		legend: { t: HTML },
		li: { t: HTML },
		link: { t: HTML },
		main: { t: HTML },
		map: { t: HTML },
		mark: { t: HTML },
		menu: { t: HTML },
		menuitem: { t: HTML },
		meta: { t: HTML },
		meter: { t: HTML },
		nav: { t: HTML },
		ol: { t: HTML },
		optgroup: { t: HTML },
		option: { t: HTML },
		output: { t: HTML },
		p: { t: HTML },
		picture: { t: HTML },
		pre: { t: HTML },
		progress: { t: HTML },
		q: { t: HTML },
		rb: { t: HTML },
		rp: { t: HTML },
		rt: { t: HTML },
		rtc: { t: HTML },
		ruby: { t: HTML },
		s: { t: HTML },
		samp: { t: HTML },
		script: {
			t: HTML,
			beforeCreate: beforeCreateFactory('src', 'script')
		},
		select: {
			t: HTML,
			beforeCreate: beforeCreateFactory('options', 'select')
		},
		selection: { t: HTML },
		small: { t: HTML },
		span: { t: HTML },
		strong: { t: HTML },
		style: { t: HTML | NO_SHORTHAND },
		sub: { t: HTML },
		summary: { t: HTML },
		sup: { t: HTML },
		table: { t: HTML },
		tbody: { t: HTML },
		td: { t: HTML },
		textarea: { t: HTML },
		tfoot: { t: HTML },
		th: { t: HTML },
		thead: { t: HTML },
		title: { t: HTML },
		tr: { t: HTML },
		track: { t: HTML },
		tt: { t: HTML },
		u: { t: HTML },
		ul: { t: HTML },
		var: { t: HTML },
		video: { t: HTML },
		wbr: { t: HTML },
	},
	[CONST.NAMESPACE_SVG]: {
		a: { t: SVG },
		altGlyph: { t: SVG },
		altGlyphDef: { t: SVG },
		altGlyphItem: { t: SVG },
		animate: { t: SVG },
		animateColor: { t: SVG },
		animateMotion: { t: SVG },
		animateTransform: { t: SVG },
		circle: { t: SVG },
		clipPath: { t: SVG },
		'color-profile': { t: SVG },
		cursor: { t: SVG },
		defs: { t: SVG },
		desc: { t: SVG },
		discard: { t: SVG },
		ellipse: { t: SVG },
		feBlend: { t: SVG },
		feColorMatrix: { t: SVG },
		feComponentTransfer: { t: SVG },
		feComposite: { t: SVG },
		feConvolveMatrix: { t: SVG },
		feDiffuseLighting: { t: SVG },
		feDisplacementMap: { t: SVG },
		feDistantLight: { t: SVG },
		feDropShadow: { t: SVG },
		feFlood: { t: SVG },
		feFuncA: { t: SVG },
		feFuncB: { t: SVG },
		feFuncG: { t: SVG },
		feFuncR: { t: SVG },
		feGaussianBlur: { t: SVG },
		feImage: { t: SVG },
		feMerge: { t: SVG },
		feMergeNode: { t: SVG },
		feMorphology: { t: SVG },
		feOffset: { t: SVG },
		fePointLight: { t: SVG },
		feSpecularLighting: { t: SVG },
		feSpotLight: { t: SVG },
		feTile: { t: SVG },
		feTurbulence: { t: SVG },
		filter: { t: SVG },
		font: { t: SVG },
		'font-face-format': { t: SVG },
		'font-face-src': { t: SVG },
		'font-face-uri': { t: SVG },
		'font-face': { t: SVG },
		'font-face-name': { t: SVG },
		foreignObject: { t: SVG },
		g: { t: SVG },
		glyph: { t: SVG },
		glyphRef: { t: SVG },
		hatch: { t: SVG },
		hatchpath: { t: SVG },
		hkern: { t: SVG },
		image: { t: SVG },
		line: { t: SVG },
		linearGradient: { t: SVG },
		marker: { t: SVG },
		mask: { t: SVG },
		mesh: { t: SVG },
		meshgradient: { t: SVG },
		metadata: { t: SVG },
		'missing-glyph': { t: SVG },
		mpath: { t: SVG },
		path: { t: SVG },
		pattern: { t: SVG },
		polygon: {
			t: SVG,
			beforeCreate: (d) => {
				if (!isObject(d.attr)) d.attr = {}
				d.attr.points = d.attr.points || d.polygon
			}
		},
		polyline: { t: SVG },
		radialGradient: { t: SVG },
		rect: { t: SVG },
		set: { t: SVG },
		solidcolor: { t: SVG },
		stop: { t: SVG },
		style: { t: SVG | NO_SHORTHAND },
		svg: { t: SVG },
		switch: { t: SVG },
		symbol: { t: SVG },
		text: { t: SVG },
		textPath: { t: SVG },
		tref: { t: SVG },
		tspan: { t: SVG },
		use: { t: SVG },
		view: { t: SVG },
		vkern: { t: SVG },
	},
	[CONST.NAMESPACE_MATHML]: {}
}