const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer()
  ],
  config : {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  }
};



