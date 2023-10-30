export function formatNumber(number) {
    if(!number) return 0;
    if (number >= 1e6) {
        let millionNumber = (number / 1e6);
        if (Number.isInteger(millionNumber)) {
            return millionNumber + 'm';
        } else {
            return millionNumber.toFixed(2).replace(/\.0+$/, '') + 'm';
        }
    } else if (number >= 1e3) {
        let thousandNumber = (number / 1e3);
        if (Number.isInteger(thousandNumber)) {
            return thousandNumber + 'k';
        } else {
            return thousandNumber.toFixed(1).replace(/\.0+$/, '') + 'k';
        }
    } else {
        return number.toString();
    }
  }
  
export function formatDuration(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `${hours} hr${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `${minutes} min${minutes > 1 ? 's' : ''}`;
    } else {
        return `${seconds} sec${seconds > 1 ? 's' : ''}`;
    }
  }