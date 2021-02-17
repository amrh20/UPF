ng build --aot --prod --output-hashing none
mv ./dist/inline.bundle.js ./dist/wm-inline.bundle.js
mv ./dist/main.bundle.js ./dist/wm-main.bundle.js
mv ./dist/polyfills.bundle.js ./dist/wm-polyfills.bundle.js
mv ./dist/scripts.bundle.js ./dist/wm-scripts.bundle.js
mv ./dist/styles.bundle.css ./dist/wm-styles.bundle.css
