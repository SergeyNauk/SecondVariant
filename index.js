'use strict';

/*-------------------------------------Time Now start-------------------------------------------------------------------*/

class Header {
    constructor(){
        this.month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        this.day = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

        this.spanItemDay = document.querySelector('.spanItemDay');
        this.spanDay = document.querySelector('.spanDay');
        this.spanMonth = document.querySelector('.spanMonth');
        this.spanYear = document.querySelector('.spanYear');
        this.spanHours = document.querySelector('.spanHours');
        this.spanMinutes = document.querySelector('.spanMinutes');
        this.spanSeconds = document.querySelector('.spanSeconds');
        this.btnClear = document.querySelector('.btnClear');

        this.yearPrev = -1;
        this.monthPrev = -1;
        this.dayPrev = -1;
        this.hoursPrev = -1;
        this.minutesPrev = -1;
        this.secondsPrev = -1;
        this.itemDayPrev = -1;

        this.interval = setInterval(()=>{
            this.getDate()
        }, 100);
    }

    getDate() {
        let thisTime = new Date();

        if (thisTime.getFullYear() != this.yearPrev) {
            let year = String(thisTime.getFullYear());

            this.render(this.spanYear, year);
            this.yearPrev = thisTime.getFullYear();
        }

        if (thisTime.getMonth() != this.monthPrev) {
            let month = String(thisTime.getMonth());
            let itemMonth = this.month[month];

            this.render(this.spanMonth, itemMonth);
            this.monthPrev = thisTime.getMonth();
        }

        if (thisTime.getDay() != this.itemDayPrev) {
            let dayInWeek = String(thisTime.getDay());
            let itemDay = this.day[dayInWeek];

            this.render(this.spanItemDay, itemDay);
            this.itemDayPrev = thisTime.getDay();
        }

        if (thisTime.getDate() != this.dayPrev) {
            let day = String(thisTime.getDate());

            this.render(this.spanDay, day);
            this.dayPrev = thisTime.getDate();
        }

        if (thisTime.getHours() != this.hoursPrev) {
            let hours = String(thisTime.getHours());
            hours < 10 ? hours = '0' + hours : hours;

            this.render(this.spanHours, hours);
            this.hoursPrev = thisTime.getHours();
        }

        if (thisTime.getMinutes() != this.minutesPrev) {
            let minutes = String(thisTime.getMinutes());
            minutes < 10 ? minutes = '0' + minutes : minutes;

            this.render(this.spanMinutes, minutes);
            this.minutesPrev = thisTime.getMinutes();
        }

        if (thisTime.getSeconds() != this.secondsPrev) {
            let seconds = String(thisTime.getSeconds());
            seconds < 10 ? seconds = '0' + seconds : seconds;

            this.render(this.spanSeconds, seconds);
            this.secondsPrev = thisTime.getSeconds();
        }
    }

    render(elem,string) {
        elem.innerText = ` ${string}`;
    }

    stopTime() {
        this.btnClear.addEventListener('click', ()=>{
            clearInterval(this.interval);
        })
    }
}

let header = new Header();
header.stopTime();

/*-------------------------------------Time Now end--------------------------------------------------------------------*/

/*-------------------------------------Countdown start-------------------------------------------------------------------*/

class Data {
    constructor() {
        this.eventCounter = '';
        this.eventName = '';
        this.eventDate = '';
    }

    setProps(counter, eventName, eventDate) {
        this.eventCounter = counter;
        this.eventName = eventName;
        this.eventDate = eventDate;
    }
}

class Render {
    constructor(data) {
        this.data = data;

        this.inputEvent = document.querySelector('.inputEvent');
        this.inputDate = document.querySelector('.inputDate');
        this.container = document.querySelector('.container');
    }

    createTemplate() {
        let template = `<div class="event" data-numberDiv=${this.data.eventCounter}><span></span><button class="button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" data-click="true" onclick="this.setAttribute('data-click','false')" style="position:absolute; right: -22px; top: -28px;"><i class="material-icons">delete</i></button></div>`;
        this.container.insertAdjacentHTML('beforeend', template);

        this.eventFactory(this.data.eventCounter, this.data.eventName, this.data.eventDate);
    }

    cleanInputs() {
        this.inputEvent.value = '';
        this.inputDate.value = '';
    }

    eventFactory(numberEvent, eventName, eventDate) {
            class Event {                              // PATTERN FACTORY START
                constructor(id, event, date) {
                    this.id = id;
                    this.event = event;
                    this.date = date;

                    this.arrMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    this.year = 0;
                    this.month = 0;
                    this.day = 0;
                    this.hours = 0;
                    this.seconds = 0;

                    this.interval = setInterval(() => {
                        this.init()
                    }, 100);
                }

                init() {
                    let thisDate = new Date();

                    this.getYear(thisDate);
                    this.getMonth(thisDate);
                    this.getDay(thisDate);
                    this.getHours(thisDate);
                    this.getMinutes(thisDate);
                    this.getSeconds(thisDate);

                    this.createTemplate(thisDate);
                    this.deleteEvent();
                }

                getYear(thisDate) {
                    this.year = Math.floor((((((this.date - thisDate) / 1000) / 60) / 60) / 24) / 365);
                }

                getMonth(thisDate) {
                    let sumDay = 0;
                    let monthCounter = 0;
                    let resDay = Math.ceil((((((this.date - thisDate) / 1000) / 60) / 60) / 24)) - 365 * Math.floor((((((this.date - thisDate) / 1000) / 60) / 60) / 24) / 365); // consider the number of days net without years

                    if (resDay < this.arrMonth[thisDate.getMonth()]) {
                        this.month = 0;
                    } else {
                        this.arrMonth.forEach((elem, index) => {
                            if (index >= thisDate.getMonth()) {
                                monthCounter++;
                                sumDay += elem;
                                resDay > sumDay ? this.month = monthCounter : this.month;
                            }
                        });
                    }
                }

                getDay(thisDate) {
                    if (this.date.getDate() > thisDate.getDate()) {
                        this.day = this.date.getDate() - thisDate.getDate();
                    } else {
                        this.day = this.date.getDate() + this.arrMonth[thisDate.getMonth()] - thisDate.getDate();
                    }
                }

                getHours(thisDate) {
                    if (this.date.getHours() > thisDate.getHours()) {
                        this.hours = this.date.getHours() - thisDate.getHours();
                    } else {
                        this.hours = 24 - thisDate.getHours() + this.date.getHours();
                        this.day = this.day - 1;
                    }
                }

                getMinutes(thisDate) {
                    if (this.date.getMinutes() > thisDate.getMinutes()) {
                        this.minutes = this.date.getMinutes() - thisDate.getMinutes();
                    } else {
                        this.minutes = 60 - thisDate.getMinutes() + this.date.getMinutes();
                        this.hours = this.hours - 1;
                    }
                }

                getSeconds(thisDate) {
                    if (this.date.getSeconds() >= thisDate.getSeconds()) {
                        this.seconds = this.date.getSeconds() - thisDate.getSeconds();
                    } else {
                        this.seconds = 60 - thisDate.getSeconds() + this.date.getSeconds();
                        this.minutes = this.minutes - 1;
                    }
                }

                createTemplate(thisDate) {
                    let valueYear;

                    switch (this.year) {
                        case 0:
                            valueYear = 'лет';
                            break;
                        case 1:
                            valueYear = 'год';
                            break;
                        case 2:
                        case 3:
                        case 4:
                            valueYear = 'года';
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            valueYear = 'лет';
                            break;
                    }

                    let valueMonth;

                    switch (this.month) {
                        case 0:
                            valueMonth = 'месяцев';
                            break;
                        case 1:
                            valueMonth = 'месяц';
                            break;
                        case 2:
                        case 3:
                        case 4:
                            valueMonth = 'месяца';
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                            valueMonth = 'месяцев';
                            break;
                    }

                    let valueDay;

                    switch (this.day) {
                        case 0:
                            valueDay = 'дней';
                            break;
                        case 1:
                            valueDay = 'день';
                            break;
                        case 2:
                        case 3:
                        case 4:
                            valueDay = 'дня';
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                            valueDay = 'дней';
                            break;
                        case 21:
                            valueDay = 'день';
                            break;
                        case 22:
                        case 23:
                        case 24:
                            valueDay = 'дня';
                            break;
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                            valueDay = 'дней';
                            break;
                    }

                    let valueHours;

                    switch (this.hours) {
                        case 0:
                            valueHours = 'часов';
                            break;
                        case 1:
                            valueHours = 'час';
                            break;
                        case 2:
                        case 3:
                        case 4:
                            valueHours = 'часа';
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                            valueHours = 'часов';
                            break;
                        case 21:
                            valueHours = 'час';
                            break;
                        case 22:
                        case 23:
                        case 24:
                            valueHours = 'часа';
                            break;
                    }

                    let valueMinutes;

                    switch (this.minutes) {
                        case 0:
                            valueMinutes = 'минут';
                            break;
                        case 1:
                            valueMinutes = 'минута';
                            break;
                        case 2:
                        case 3:
                        case 4:
                            valueMinutes = 'минуты';
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                            valueMinutes = 'минут';
                            break;
                        case 21:
                            valueMinutes = 'минута';
                            break;
                        case 22:
                        case 23:
                        case 24:
                            valueMinutes = 'минуты';
                            break;
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                            valueMinutes = 'минут';
                            break;
                        case 31:
                            valueMinutes = 'минута';
                            break;
                        case 32:
                        case 33:
                        case 34:
                            valueMinutes = 'минуты';
                            break;
                        case 35:
                        case 36:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            valueMinutes = 'минут';
                            break;
                        case 41:
                            valueMinutes = 'минута';
                            break;
                        case 42:
                        case 43:
                        case 44:
                            valueMinutes = 'минуты';
                            break;
                        case 45:
                        case 46:
                        case 47:
                        case 48:
                        case 49:
                        case 50:
                            valueMinutes = 'минут';
                            break;
                        case 51:
                            valueMinutes = 'минута';
                            break;
                        case 52:
                        case 53:
                        case 54:
                            valueMinutes = 'минуты';
                            break;
                        case 55:
                        case 56:
                        case 57:
                        case 58:
                        case 59:
                            valueMinutes = 'минут';
                            break;
                    }

                    let valueSeconds;

                    switch (this.seconds) {
                        case 0:
                            valueSeconds = 'секунд';
                            break;
                        case 1:
                            valueSeconds = 'секунда';
                            break;
                        case 2:
                        case 3:
                        case 4:
                            valueSeconds = 'секунды';
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                            valueSeconds = 'секунд';
                            break;
                        case 21:
                            valueSeconds = 'секунда';
                            break;
                        case 22:
                        case 23:
                        case 24:
                            valueSeconds = 'секунды';
                            break;
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                            valueSeconds = 'секунд';
                            break;
                        case 31:
                            valueSeconds = 'секунда';
                            break;
                        case 32:
                        case 33:
                        case 34:
                            valueSeconds = 'секунды';
                            break;
                        case 35:
                        case 36:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            valueSeconds = 'секунд';
                            break;
                        case 41:
                            valueSeconds = 'секунда';
                            break;
                        case 42:
                        case 43:
                        case 44:
                            valueSeconds = 'секунды';
                            break;
                        case 45:
                        case 46:
                        case 47:
                        case 48:
                        case 49:
                        case 50:
                            valueSeconds = 'секунд';
                            break;
                        case 51:
                            valueSeconds = 'секунда';
                            break;
                        case 52:
                        case 53:
                        case 54:
                            valueSeconds = 'секунды';
                            break;
                        case 55:
                        case 56:
                        case 57:
                        case 58:
                        case 59:
                            valueSeconds = 'секунда';
                            break;
                    }

                    let container = document.querySelector('.container');
                    let thisDiv;
                    let thisSpan;

                    if (container != undefined) {
                        thisDiv = container.children[this.id-1]; // our div in nodeList
                        thisSpan = thisDiv.children[0]; // use a 'magic number' 0 because our element span at first in our div

                        let message;

                        if (this.date > thisDate) {
                            message = `До события "${this.event}" осталось: ${this.year} ${valueYear} ${this.month} ${valueMonth} ${this.day} ${valueDay} ${this.hours} ${valueHours} ${this.minutes} ${valueMinutes} ${this.seconds} ${valueSeconds}`;
                        } else {
                            message = `Поздравляем !, событие "${this.event}" произошло :)`;
                        }
                        thisSpan.innerText = message;
                    }
                }

                deleteEvent() {
                    let container = document.querySelector('.container');
                    let thisDiv;
                    let thisButton;

                    if (container != undefined) {
                        thisDiv = container.children[this.id-1]; // our div in nodeList
                        thisButton = thisDiv.children[1]; //use a 'magic number' 1 because our element button at second in our div

                        if (thisButton.getAttribute('data-click') == 'false') { // dont use remove() because need save node list
                            clearInterval(this.interval);
                            thisDiv.innerHTML = '';
                            thisDiv.style.cssText = 'border: 0; height:0';
                        }
                    } else {
                        clearInterval(this.interval);
                    }
                }
            }

            let event = new Event(numberEvent, eventName, eventDate);  // PATTERN FACTORY END
        }
}

class Controller {
    constructor(data, render) {
        this.data = data;
        this.render = render;

        this.eventCounter = 0;

        this.btnCounter = document.querySelector('.btnCounter');
        this.inputEvent = document.querySelector('.inputEvent');
        this.inputDate = document.querySelector('.inputDate');
    }

    initApp() {
        this.btnCounter.addEventListener('click',()=>{this.verificationData()})
    }

    verificationData() {
        let thisDate = new Date();
        let eventName = this.inputEvent.value.trim();
        let eventDate = new Date(this.inputDate.value);
        eventDate.setHours(0);
        eventDate.setMinutes(0);
        eventDate.setSeconds(0);

        if (eventDate > thisDate && eventName != "") {
            this.eventCounter++;

            this.data.setProps(this.eventCounter, eventName, eventDate);
            this.render.createTemplate();
            this.render.cleanInputs();
        }
    }
}

let data = new Data();
let render = new Render(data);
let controller = new Controller(data,render);

controller.initApp();

/*-------------------------------------Countdown end--------------------------------------------------------------------*/