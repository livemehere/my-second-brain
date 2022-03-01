
class DateChecker {
    static year = new Date().getFullYear();
    static month = new Date().getMonth();
    static day = new Date().getDate();
    static isToday = (date:string) =>{
        let flag = false;
        //년,달,일 모두 같으면
        if(DateChecker.year === new Date(date).getFullYear() && DateChecker.month === new Date(date).getMonth() && DateChecker.day === new Date(date).getDate()){
            flag =  true;
        }
        return flag;
    }
}

export default DateChecker;