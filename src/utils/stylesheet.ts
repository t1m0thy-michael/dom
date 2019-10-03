export const stylesheet = (path: string) => new Promise((resolve) => {

	// check if already loaded / don't load again
	const elem = document.querySelectorAll(`link[href="${path}"]`)
	if (elem.length) {
		resolve({ path, link: elem, status: 'ok' })
		return
	}

	const link = document.createElement('link')
	link.onload = () => resolve({ path, link: link, status: 'ok' })
	link.onerror = () => resolve({ path, link: null, status: 'error' })
	link.href = path
	link.rel = 'stylesheet'
	link.type = 'text/css'
	document.head.appendChild(link)
})