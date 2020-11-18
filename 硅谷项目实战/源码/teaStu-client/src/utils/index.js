export function getRedirectPath(type, header) {
    let path = ''
    path += type === 'teacher' ? '/teacher' : '/student'
    if (!header) {
        path += 'info'
    }
    return path

}