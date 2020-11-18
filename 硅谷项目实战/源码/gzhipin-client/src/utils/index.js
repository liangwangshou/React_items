export function getRedirectTo(type, header) {
    let path;
    if (type === 'laoban') {
        path = '/laoban'
    } else {
        path = '/dashen'
    }
    if (header === undefined) {
        path += 'info'
    }
    // console.log('utils', path, header, type);
    return path
}