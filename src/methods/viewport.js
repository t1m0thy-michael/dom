import runFactory from '../utils/runFactory'
import runAndReturnFactory from '../utils/runAndReturnFactory'


import u from '@t1m0thy_michael/u'

const scrollTop = (element, domElement, px) => {
	if (u.isUndefined(px)) return element.scrollTop
	element.scrollTop = px
}

const scrollMore = (element, domElement, px) => element.scrollTop += px

const getBounding = (element, domElement) => element.getBoundingClientRect()

export default {
	scrollTop: function (this, px) { return runAndReturnFactory(this, scrollTop)(px) },
	scrollMore: function (this, px) { return runFactory(this, scrollMore)(px) },
	getBounding: function (this) { return runAndReturnFactory(this, getBounding)() },
}