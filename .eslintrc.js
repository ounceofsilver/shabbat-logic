module.exports = {
	env: {
		node: true,
		mocha: true,
	},

	"extends": "airbnb-base",

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
