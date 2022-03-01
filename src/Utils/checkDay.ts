
class DateChecker {
    private static year = new Date().getFullYear();
    private static month = new Date().getMonth();
    private static day = new Date().getDate();
    public static isToday = (date:string) =>{
        let flag = false;
        //년,달,일 모두 같으면
        if(DateChecker.year === new Date(date).getFullYear() && DateChecker.month === new Date(date).getMonth() && DateChecker.day === new Date(date).getDate()){
            flag =  true;
        }
        return flag;
    }
    public static dday(targetDate:string):number{
        const today = new Date().getTime();
        const targetDay = new Date(targetDate).getTime();
        const gap = today - targetDay;
        const remainDate = Math.floor(gap / (1000 * 60 * 60 * 24));
        return remainDate;
    }
}

export default DateChecker;