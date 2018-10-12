export const getTime = () => {
    let hour,
        minutes;
    if (new Date().getMinutes() >= 10) {
        minutes = new Date().getMinutes()
        hour = new Date().getHours().toString()
    } else {
        minutes = '0' + new Date().getMinutes()
        hour = new Date().getHours().toString()
    }

    return `${hour}:${minutes}`
}