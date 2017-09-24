/**
 * @sakaijun
 * single led-state (getter, setter)
 */

export class Led {

	constructor() {
		//init led with certain opacity, color

		this.private = {
			on: {
				opacity: 0,
				color: ""
			},
			off: {
				opacity: 0,
				color: ""
			}
		};
	}


	setOn(opacity, color) {
		this.private.on = {
			color: color,
			opacity: opacity
		};
	}

	getOn() {
		return this.private.on;
	}

	setOff(opacity, color) {
		this.private.off = {
			color: color,
			opacity: opacity
		};
	}

	getOff() {
		return this.private.off;
	}

}


