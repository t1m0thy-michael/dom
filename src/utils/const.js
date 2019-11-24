export const CONST = {
	NAMESPACE_HTML: 'http://www.w3.org/1999/xhtml',
	NAMESPACE_MATHML: 'http://www.w3.org/1998/math/mathml',
	NAMESPACE_SVG: 'http://www.w3.org/2000/svg',
	TAG: {
		//values used for bitwise comparrison
		HTML: 1,
		SVG: 2,
		MATHML: 4,
		EMPTY_HTML: 8,
		NO_SHORTHAND: 16, // tags with naming conflicts, preventing use as shorthand prop
	}
}