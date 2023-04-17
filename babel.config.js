module.exports = {
  presets: [[
    "@babel/preset-env", {
    useBuiltIns: "entry", 
    corejs: 3,
    targets: {
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    } // использовать полифиллы для браузеров из свойства target
  }]]
};