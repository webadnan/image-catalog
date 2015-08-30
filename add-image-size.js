require('shelljs/global')
var sizeOf = require('image-size')

var folder = process.argv[2]

ls(folder).forEach(function (image) {
    var file = folder + image
    var name, ext;
    [name, ext] = image.split('.')

    var dimensions = sizeOf(file);
    //console.log(dimensions.width, dimensions.height);

    console.log(`cp ${file} ${folder.substr(0, folder.length-1)}-withsize/${name}---${dimensions.width}x${dimensions.height}.${ext}`);
})
