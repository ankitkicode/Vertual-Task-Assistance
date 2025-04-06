exports.convertUTCtoIndianDate = (utcDate) => {
    const date = new Date(utcDate);

    // India ka UTC offset = +5 hours 30 minutes
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // milliseconds

    // UTC date me offset add karo
    const istTime = new Date(date.getTime() + IST_OFFSET);

    // Saaf format me "YYYY-MM-DD" nikal lo
    const year = istTime.getFullYear();
    const month = String(istTime.getMonth() + 1).padStart(2, '0'); // Month 0 se start hota hai
    const day = String(istTime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

exports.convertIndianToUTC = dateString => new Date(dateString + 'T00:00:00Z');



