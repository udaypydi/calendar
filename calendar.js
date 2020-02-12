class Calendar {
    constructor(container, date=new Date()) {
        this.container = container;
        this.setDate(date);
    }

    getWeek() {
        const WEEK = Object.freeze(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
        return WEEK;
    }

    getMonthName(monthIndex) {
        return Object.freeze([
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
        ])[monthIndex];
    }

    getDate() {
        return new Date(this.date);
    }

    setDate(date) {
        this.date = date;
        this.showCalendar();
    }

    getfirstDayOfMonth() {
        let day = new Date(this.date);
        day.setDate(1);
        return day;
    }

    nextMonth() {
        const month = this.date.getMonth() + 1;
        this.date.setMonth(month)
        this.showCalendar();
    }

    prevMonth() {
        const month = this.date.getMonth() - 1;
        this.date.setMonth(month)
        this.showCalendar();
    }

    showDateWithYear() {
        return `
            <div class="header">
                ${this.getWeek().map((day, index) => {
                    let position = 'center';
                    if (index === 0)
                        position = 'first';
                    else if (index === 6)
                        position = 'last';
                        
                    return `<div class=\"${position}\">${day}</div>`;
                }).join(' ')}
            </div>
        `;
    }

    updateMonthYearHeader() {
        document.getElementById('date').innerText = `${this.getMonthName(this.date.getMonth())} ${this.date.getFullYear()}`;
    }


    showCalendar() {
        this.container.innerHTML = '';
        if (!this.container.className.includes('calendar'))
            this.container.className += ' calendar';
        this.updateMonthYearHeader();
        this.container.insertAdjacentHTML('beforeend', this.showDateWithYear());

        this.container.insertAdjacentHTML('beforeend', `<span class="offset"></span>`);
        let firstDay = this.getfirstDayOfMonth();
        let offset = this.container.getElementsByClassName('offset')[0];
        let display = firstDay.getDay() === 0 ? 'none' : 'initial';
        let gridColumn = firstDay.getDay() + 1;
        offset.setAttribute('style', `display: ${display}; grid-column: 1 / ${gridColumn}`);

        this.container.insertAdjacentHTML('beforeend', this.getDaysInAMonth().join(' '));
    }

    getDaysInAMonth() {
        let currentDay = this.getfirstDayOfMonth();
        let days = [];
        while (currentDay.getMonth() === this.date.getMonth()) {
            let classes = ['day'];
            switch (currentDay.getDay()) {
                case 0:
                    classes.push('first');
                    break;
                case 6:
                    classes.push('last');
                    break;
            }
            days.push(`<div class="${classes.join(' ')}">${currentDay.getDate()}</div>`);
            currentDay.setDate(currentDay.getDate() + 1);
        }
        return days;
    }
}