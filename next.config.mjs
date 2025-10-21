/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has TypeScript type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	experimental: {
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js',
				},
			},
		},
	},

	reactStrictMode: false,
	webpack: config => {
		config.cache = true;

		// Handle Quill modules
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		// Ignore specific modules that cause issues
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
		};

		return config;
	},
};

export default nextConfig;
