const runFactory = (d, fn) =>
	function (...args) {
		for (let i = 0; i < d.list.length; i++) {
			try {
				fn(d.list[i], d, ...args)
			} catch (e) {
				console.error(e)
			}
		}
		return d
	}

export default runFactory