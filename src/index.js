import { dom } from './dom'
export const d = (() => {
	if (!window.d) window.d = dom
	return window.d
})() 
export default d