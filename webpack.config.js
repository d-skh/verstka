const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve(__dirname, 'src'),
                'components': path.resolve(__dirname, 'src/components'),
                'layouts': path.resolve(__dirname, 'src/layouts'),
                'pages': path.resolve(__dirname, 'src/pages'),
                'assets': path.resolve(__dirname, 'src/assets'),
                'quasar': path.resolve(__dirname, 'node_modules/quasar/dist/quasar.esm.js'),
                '@quasar': path.resolve(__dirname, 'node_modules/@quasar/')
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                // УДАЛЕНО правило для .sass, так как используем SCSS
                {
                    test: /\.styl$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: 'stylus-loader',
                            options: {
                                import: [path.resolve(__dirname, 'src/quasar.variables.styl')]
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'public'),
                        to: path.resolve(__dirname, 'dist'),
                        globOptions: {
                            ignore: ['**/index.html']
                        }
                    }
                ]
            }),
            ...(isProduction ? [
                new MiniCssExtractPlugin({
                    filename: 'css/[name].[contenthash].css'
                })
            ] : [])
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: isProduction
                        }
                    }
                }),
                new OptimizeCSSAssetsPlugin()
            ],
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 8080,
            hot: true,
            historyApiFallback: true
        }
    };
};