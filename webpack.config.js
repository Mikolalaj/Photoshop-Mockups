const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: "production",
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            browsers: ['> 1%', 'last 2 versions', 'ie >= 11'],
                                        },
                                    },
                                ],
                            ],
                        },
                    },
                    'ts-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
        photoshop: 'commonjs2 photoshop',
        uxp: 'commonjs2 uxp',
        os: 'commonjs2 os',
    },
    output: {
        filename: 'Mockupy.jsx',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        // Disable compressions that turn `if` statements into ternary operators
                        conditionals: false,
                    },
                    mangle: true, // Keep mangle enabled to minimize the code
                },
            }),
        ],
    },
};