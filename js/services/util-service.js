
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
    var hour = new Date(time).getHours();
    //hour += 2; //offset
    var minute = new Date(time).getMinutes();
    var seconds = new Date(time).getSeconds();
    var day = new Date(time).getDate();
    var month = new Date(time).getMonth() + 1;
    var year = new Date(time).getFullYear();
    return day + '/' + month + '/' + year + '  ' + _pad(hour) + ':' + _pad(minute) + ':' + _pad(seconds);
}
function _pad(n) {
    return n < 10 ? '0' + n : n;
}