export function getParam(url, name) {
    url = decodeURI(url)
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = url.substr(url.indexOf('?') + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
} 