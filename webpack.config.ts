import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const config = () => {
    return {
        entry: {
            background: path.join(__dirname, 'src', 'background.ts'),
            content_script: path.join(__dirname, 'src', 'content_script.ts'),
            option_page_script: path.join(__dirname, 'src', 'option_page_script.ts')
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /.ts$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        plugins: [
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