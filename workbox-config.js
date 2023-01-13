module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{css,bin,png,html,js,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};