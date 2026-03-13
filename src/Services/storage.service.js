const { Imagekit } = require("imagekit");

const imagekitClient = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


async function uploadFile(file,folder){
    const result = await imagekitClient.upload({
        file:file,
        fileName:"music_"+Date.now(),
        //.now is used to generate a unique name for the file
        //here we are adding folder name to the folder name
        folder:"spotify"+folder,
    });
    return result;
}
module.exports = {uploadFile}