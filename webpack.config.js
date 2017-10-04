var path = require('path');
module.exports = {
    entry: {
        app: './public/js/app/index.js',
        appWatch: './public/js/app/index.watch.js',
        appSnapshot: './public/js/app/index.snapshot.js'
    },
    output: {
        path: './public/js/bin/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, 'node_modules')],
                        },
                    },
                ],
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
