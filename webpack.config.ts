import path from 'path'
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

import CopyWebpackPlugin from 'copy-webpack-plugin'

const config = () => {
    return {
        entry: {
            background: path.join(__dirname, 'src', 'background.ts'),
            content_script: path.join(__dirname, 'src', 'content_script.ts'),
            options: path.join(__dirname, 'src', 'option_page.tsx'),
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /.(ts|tsx)$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ['options'],
                filename: 'options.html',
                title: 'Options',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'public', to: '.' },
                    { from: 'dist/background.js', to: '../background.js' }
                ]
            })
        ]
    }
}

export default config