export function parseDateGql(date: Date): string{
    const months = ["Jan","Feb", "Mar", "Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let day: string;
    if (date.getDate() < 10) {
        day = "0" + date.getDate().toString()
    }else {
        day = date.getDate().toString()
    }
    return day + "-" + months[date.getMonth()] + "-" + date.getFullYear().toString()
}