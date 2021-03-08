'use strict';

const isObject = value => value !== null && typeof value === 'object';

const traversePrimitive = function (object, target, options) {
	for (const [key, value] of Object.entries(object)) {
		if (key === target || value === target) {
			return true;
		}

		if (options.deep && typeof value === 'object') {
			return traversePrimitive(value, target, options);
		}
	}

	return false;
};

const traverseObject = function (object, target, options) {
	for (const [, value] of Object.entries(object)) {
		if (JSON.stringify(value) === target) {
			return true;
		}

		if (options.deep && typeof value === 'object') {
			return traverseObject(value, target, options);
		}
	}

	return false;
};

module.exports = (object, target, options) => {
	if (!isObject(object)) {
		throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
	}

	options = {deep: false, ...options};
	return typeof target === 'object' ? traverseObject(object, JSON.stringify(target), options) : traversePrimitive(object, target, options);
};
