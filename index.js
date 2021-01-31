'use strict';

const isObject = value => typeof value === 'object' && value !== null;

const traverse = function (object, target, options) {
	for (const [key, value] of Object.entries(object)) {
		if (key === target || JSON.stringify(value) === JSON.stringify(target)) {
			options.exists = true;
			return true;
		}

		if (options.deep && typeof value === 'object') {
			traverse(value, target, options);
		}
	}

	return options.exists;
};

module.exports = (object, target, options) => {
	if (!isObject(object)) {
		throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
	}

	options = {deep: false, exists: false, ...options};
	return traverse(object, target, options);
};
