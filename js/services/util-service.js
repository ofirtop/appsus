
export default {
    getRandomIntInclusive,
    makeId,
    saveToStorage,
    loadFromStorage,
    formatTime
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function makeId(length) {

    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    if (!str) return undefined;
    return JSON.parse(str);
}

function formatTime(time){
    var h = new Date(time).getHours();
    h += 2; //offset
    var m = new Date(time).getMinutes();
    return _pad(h) + ':' + _pad(m);

}
function _pad(n) {
    return n < 10 ? '0' + n : n;
}