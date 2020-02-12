(function() {
    const calendar = new Calendar(document.getElementById('calendar'));
    calendar.updateMonthYearHeader();

    document.getElementById('next-btn').onclick = () => {
        calendar.nextMonth();
        calendar.updateMonthYearHeader();
    };

    document.getElementById('prev-btn').onclick = () => {
        calendar.prevMonth();
        calendar.updateMonthYearHeader();
    }
})();
