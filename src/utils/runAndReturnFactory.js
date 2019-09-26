import u from '@t1m0thy_michael/u'

const runAndReturnFactory = (d, fn) =>
	function (...args) {
		let results = []
		for (let i = 0; i < d.list.length; i++) {
			try {
				results.push(fn(d.list[i], d, ...args))
			} catch (e) {
				console.error(e)
			}
		}
		results = u.clean(results, undefined)
		if (results.length === 0) return d
		if (results.length === 1) return results[0]
		return results
	}

export default runAndReturnFactory