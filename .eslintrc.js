module.exports = {
	"env": {
		"node": true,
		// "browser": true,
		"es6": true,
		"mocha": true,
	},

	"parser": "babel-eslint",

	"extends": "airbnb",

	"globals": {
		"expect": true,
		"local": true,
		"DateTime": true,
		"sinon": true,
		"proxyquire": true,
	},

	"rules": {
		"indent": ["error", "tab"],
		"no-tabs": "off",
	}
};
