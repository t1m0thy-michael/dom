Error.stackTraceLimit = 50
export class Dom_EventBus_Error extends Error {
	constructor(message) {
		super(message)
		this.name = this.constructor.name
		Error.captureStackTrace(this, this.constructor)
	}
}

export class Dom_Element_Definition_Error extends Error {
	constructor(message) {
		super(message)
		this.name = this.constructor.name
		Error.captureStackTrace(this, this.constructor)
	}
}