export const funcLocalStore = () => {
    const localStor = localStorage.getItem('email');
    if (localStor != null) {
        return true
    } else {
        return false
    }
}