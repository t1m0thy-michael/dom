export const script = (path: string) => new Promise((resolve) => {

	// check if already loaded / don't load again
	const elem = document.querySelectorAll(`[src="${path}"]`)
	if (elem.length) {
		resolve({ path, script: elem, status: 'ok' })
		return
	}

	const script = document.createElement('script')
	script.onload = () => resolve({ path, script: script, status: 'ok' })
	script.onerror = () => resolve({ path, script: null, status: 'error' })
	script.src = path
	document.head.appendChild(script)
})