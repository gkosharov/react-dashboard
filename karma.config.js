/**
 * Created by g.kosharov on 25.2.2016 ã..
 */
var webpack = require('karma-webpack');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'sinon'],
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/jasmine-sinon/lib/jasmine-sinon.js',
            'tests/**/*Spec.js'
        ],
        plugins: [webpack, 'karma-jasmine', 'karma-sinon', 'karma-phantomjs-launcher', 'karma-coverage', 'karma-spec-reporter', 'karma-babel-preprocessor'],
        browsers: ['PhantomJS', 'Chrome'],
        preprocessors: {
            '!(node_modules)/**/*.js': ['webpack'],
            'src/*.js': ['babel']
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: 'build/reports/coverage',
            reporters: [
                {type: 'html', subdir: 'report-html'},
                {type: 'lcov', subdir: 'report-lcov'},
                {type: 'cobertura', subdir: '.', file: 'cobertura.txt'}
            ]
        },
        webpack: {
            module: {
                loaders: [{
                    test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
                    loader: 'babel-loader'
                }],
                postLoaders: [{
                    test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
                    loader: 'istanbul-instrumenter'
                }]
            }
        },
        webpackMiddleware: {noInfo: true},
        externals: {
            'cheerio': 'window',
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true
        }
    });
};