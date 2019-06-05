let hexString = "0123456789abcdef";

export const RandomHexString = (length) => {
    let bytes = "";
    for (let i = 0; i < length; i++) {
        bytes += hexString.substr(Math.floor(Math.random() * hexString.length), 1);
    }
    return bytes;
}

export const UUID = () => {
    return `${Generate.RandomHexString(8)}-${Generate.RandomHexString(4)}-${Generate.RandomHexString(4)}-${Generate.RandomHexString(4)}-${Generate.RandomHexString(12)}`
}