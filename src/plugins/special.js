import runFactory from '../utils/runFactory'

const tooltip = (element, domElement, txt) => element.setAttribute('tooltip', txt)

export default {
	tooltip: function (val) { return runFactory(this, tooltip)(val) },
}