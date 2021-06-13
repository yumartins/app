module.exports = {
  presets: [
    ['@babel/preset-env', {
      corejs: 3,
      targets: { node: 'current' },
      useBuiltIns: 'usage',
    }],
    '@babel/preset-typescript',
    ['minify', { builtIns: false }],
  ],
};
