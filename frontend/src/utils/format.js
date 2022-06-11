export function pubKeyShortAddress(pubkey, padCnt) {
    return pubkey.slice(0, padCnt + (pubkey.startsWith('0x') ? 2 : 0)) + '.'.repeat(3) + pubkey.slice(-padCnt);
}

export function toHex(num) {
    return "0x" + num.toString(16);
}

export function getMetaTag(uri) {
    return uri.replace(process.env.REACT_APP_METADATA_PREFIX_URL, "");
}

export function getRPCError(err) {
    const start = err.message.indexOf("{");
    const end = err.message.indexOf("}");
    if(start && end)
        return JSON.parse(err.message.substring(start, end + 1));
    
    return null;
}

export function copy(object) {
    return JSON.parse(JSON.stringify(object));
}