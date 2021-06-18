export const tanggalWaktu = function(date) {
    let d = new Date(date),
    year = d.getFullYear(),
    month = d.getMonth() + 1,
    day = d.getDate(),
    hour = d.getHours(),
    min = d.getMinutes(),
    sec = d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hour.length < 2)
        hour = '0' + hour;
    if (min.length < 2)
        min = '0' + min;
    if (sec.length < 2)
        sec = '0' + sec;

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

export const tanggal = function(date) {
    let d = new Date(date),
    year = d.getFullYear(),
    month = d.getMonth() + 1,
    day = d.getDate()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return `${year}-${month}-${day}`
}

export const tahunBulan = function(date) {
    let d = new Date(date),
    year = d.getFullYear(),
    month = d.getMonth() + 1;

    if (month.length < 2) 
        month = '0' + month;

    return `${year}-${month}`
}

export const labelEdit = (str) => {
    let hasil = str.replace(/^[a-z]|[A-Z]/g, function(v, i) {
        return i === 0 ? v.toUpperCase() : " " + v.toUpperCase();
    });
    return hasil
}

export const numbEdit = (numb) => {
    let hasil = numb.replace(/,/g, "");
    return hasil
}