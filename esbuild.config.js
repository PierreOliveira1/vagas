const esbuild = require('esbuild');

esbuild.buildSync({
	entryPoints: ['src/app.js'],
	bundle: true,
	minify: true,
	platform: 'node',
	packages: 'external',
	outfile: 'dist/index.js',
});
