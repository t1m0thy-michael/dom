export const img = (path, getBrightness = false) => new Promise((resolve) => {
	const img = new Image()
	img.onerror = () => resolve({
		path,
		img: null,
		status: 'error',
		brightness: 0,
		r: 0,
		g: 0,
		b: 0,
		a: 0
	})
	
	img.onload = function () {

		let brightness = 0
		let r = 0
		let g = 0
		let b = 0
		let a = 0

		if (getBrightness) {
			const canvas = document.createElement('canvas')
			canvas.width = this.width
			canvas.height = this.height

			const ctx = canvas.getContext('2d')
			if (!ctx) return
			ctx.drawImage(this, 0, 0)

			const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

			for (let i = 0; i < data.length; i += 20) {
				r += data[i]
				g += data[i + 1]
				b += data[i + 2]
				a += data[i + 3]
			}

			brightness = Math.floor(((r + g + b) / 3) / (this.width * this.height) * 5)
			r = Math.floor(r / (data.length / 4))
			g = Math.floor(g / (data.length / 4))
			b = Math.floor(b / (data.length / 4))
			a = Math.floor(a / (data.length / 4))
		}

		resolve({
			path: path,
			img: img,
			status: 'ok',
			brightness,
			r, g, b, a
		})
	}
	img.src = path
})