
const imagesJSON = require('./images.json');

const imageCollection = [];
function loadinguj() {
  var jarOfPromise = [];
  for(let i = 0; i < imagesJSON.length; i++) {
      jarOfPromise.push(
        new Promise( (resolve, reject) => {
                imageCollection[imagesJSON[i].name] = new Image();
                imageCollection[imagesJSON[i].name].addEventListener('load', function() {
                    resolve(true);
                });
                imageCollection[imagesJSON[i].name].addEventListener('error', function() {
                  console.log('zdjecie sie nie lduje: '  +  imagesJSON[i].name);
                  reject();
                });
                imageCollection[imagesJSON[i].name].src = imagesJSON[i].path;
            })
        )
    }
  return jarOfPromise;
}
export {loadinguj,imageCollection};
