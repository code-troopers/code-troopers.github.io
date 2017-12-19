// Package modules.
import autoprefixer from "autoprefixer";
import easySprite from "postcss-easysprites";

// Exports.
module.exports = {
  plugins: () => [
    easySprite({spritePath: ".tmp/"}),
    autoprefixer
  ]
};
