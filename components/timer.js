//leap year
const leap_year = year => {
    if (year % 4 == 0 && year % 100 != 0){
        return true
    }
    else if (year % 100 == 0 && year % 400 == 0){
        return true
    }
    else{
        return false
    }
}

// days in month
const days_in_month = (year, month) => {
    if (month == 1 || month == 3 || month==5 || month==7 || month==8 || month==10 || month==12){
        return 31
    }
    else if (month ==4 || month==6 || month ==9 || month ==11){
        return 30
    }
    else if (leap_year(year)){
        return 29
    }
    else{
        return 28
    }
}

// days between
const days_between = (year1, month1, day1, year2, month2, day2) => {
    var year = year2 - year1
    if(year > 0){
        var i = year1
        var day = 0
        while(i <= year2){
            if (i == year1){
                var j = month1
                while (j <= 12){
                    if (j == month1){
                        day = day + (days_in_month(year1, j) - day1)
                        j += 1
                    }
                    else{
                        day = day + days_in_month(year1, j)
                        j += 1
                    }
                }
                i = i + 1
            }
            else if (i == year2){
                j = 1
                while (j <= month2){
                    if (j == month2){
                        day = day + day2
                        j += 1
                    }
                    else{
                        day = day + days_in_month(year2, j)
                        j += 1
                    }
                }
                i += 1
            }
            else{
                j = 1
                while (j <= 12){
                    day = day + days_in_month(i,j)
                    j += 1
                }
                i += 1
            }
        }
        return day
    }
    else if(year == 0){
        if (month2 > month1){
            month = month2 - month1
            i = month1
            day = 0
            while (i <= month2){
                if (i == month2){
                    day = day + day2
                    i += 1
                }
                else if (i == month1){
                    day = day + (days_in_month(year2, i) - day1)
                    i += 1
                }
                else{
                    day = day + days_in_month(year2, i)
                    i += 1
                }
            }
            return day
        }
        else if (month2 == month1){
            if (day2 > day1){
                day = day2 - day1
                return day
            }
            else{
                return 0
            }
        }
        else{
            return 0
        }
    }
    else{
        return 0
    }
}

export function days_remaining (year, month, day) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const today = date.getDate();
    const currentMonth = date.getMonth() + 1;   
    const dr = days_between(currentYear, currentMonth, today, year, month, day)
    return dr
}