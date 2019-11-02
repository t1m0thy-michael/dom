// @ts-ignore
Error.stackTraceLimit = 50
export class Dom_EventBus_Error extends Error {
	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
		// @ts-ignore
		Error.captureStackTrace(this, this.constructor)
	}
}

export class Dom_Element_Definition_Error extends Error {
	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
		// @ts-ignore
		Error.captureStackTrace(this, this.constructor)
	}
}

export class Dom_Missing_Argument extends Error {
	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
		// @ts-ignore
		Error.captureStackTrace(this, this.constructor)
	}
}

export class DOM_Dont_Be_Stupid extends Error {
	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
		// @ts-ignore
		Error.captureStackTrace(this, this.constructor)
	}
}

// export class Dom_Not_Supported_Error extends Error {
// 	constructor(message: string) {
// 		super(message)
// 		this.name = this.constructor.name
// 		// @ts-ignore
// 		Error.captureStackTrace(this, this.constructor)
// 	}
// }