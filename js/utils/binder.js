var binder = (function () {
	var Binder = function () {
		this.elements = [];
		this.handlers = [];
	}

	Binder.prototype.bind = function(element, eventtype, handler, useCapture) {
		var id = this.elements.indexOf(element);
		useCapture = !(!useCapture); // transform to boolean

		if (id === -1) {
			id = this.elements.length;
			this.elements.push(element);
			this.handlers[id] = {};
		}

		if (!this.handlers[id][eventtype]) {
			this.handlers[id][eventtype] = [];
		}

		this.handlers[id][eventtype].push([handler, useCapture]);

		element.addEventListener(eventtype, handler, useCapture);
	};

	Binder.prototype.unbind = function(element, eventtype, handler, useCapture) {
		var id = this.elements.indexOf(element);

		if (id !== -1) {
			if (eventtype !== undefined) {
				if (handler !== undefined) {
					if  (useCapture !== undefined) {
						useCapture = !(!useCapture); // transform to boolean
						element.removeEventListener(eventtype, handler, useCapture);

						var handlers = this.handlers[id][eventtype];
						for (var i = 0; i < handlers.length; i += 1) {
							if (handlers[i][0] === handler && handlers[i][1] === useCapture) {
								handlers.splice(i, 1);
								i -= 1;
							}
						}
					} else {
						element.removeEventListener(eventtype, handler, true);
						element.removeEventListener(eventtype, handler, false);

						var handlers = this.handlers[id][eventtype];
						for (var i = 0; i < handlers.length; i += 1) {
							if (handlers[i][0] === handler) {
								handlers.splice(i, 1);
								i -= 1;
							}
						}
					}
				} else {
					var handlers = this.handlers[id][eventtype];
					for (var i in handlers) {
						element.removeEventListener(eventtype, handlers[i][0], handlers[i][1]);
					}

					delete this.handlers[id][eventtype];
				}
			} else {
				var handlers;
				for(var type in this.handlers[id]) {
					handlers = this.handlers[id][type];
					for (var i in handlers) {
						element.removeEventListener(type, handlers[i][0], handlers[i][1]);
					}
				}

				this.handlers.splice(id, 1);
				this.elements.splice(id, 1);
			}
		}
	};

	return new Binder();
})();