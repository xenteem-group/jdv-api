import tinify from "tinify";
import keys from './keys';

export default (file, name) => {
    
    tinify.key = keys.tinifyKey;
    const source = tinify.fromBuffer(file.buffer);
    const resized200 = source.resize({
        method: "thumb",
        width: 200,
        height: 200
    });
    const resized400 = source.resize({
        method: "thumb",
        width: 400,
        height: 400
    });

    source.toFile('../uploads/original/'+ name);
    resized200.toFile('../uploads/thumb200/'+ name);
    resized400.toFile('../uploads/thumb400/'+ name);
}