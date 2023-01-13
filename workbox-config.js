module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{css,png,html,js,json,bin}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};