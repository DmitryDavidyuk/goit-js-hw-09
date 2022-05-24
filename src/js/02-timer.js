import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dataTime: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    day: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', 'disabled')

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() >= Date.now()) {
            refs.startBtn.removeAttribute('disabled')
            return
        }
        Notify.failure('Please choose a date in the future');
        
        console.log(selectedDates[0]);
    },
};
const inputData = flatpickr("#datetime-picker", options);

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }

    start() {
        if (this.isActive) {
            return
        }
        const startTime = inputData.selectedDates[0].getTime();
        this.isActive = true;
        this.intervalId = setInterval(() => {
            
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            if (deltaTime <= 0) {
                clearInterval(this.intervalId);
                return
            }
            const time = this.convertMs(deltaTime);
            this.onTick(time);
        }, 1000)
        
    }

    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = this.pad(Math.floor(ms / day));
        // Remaining hours
        const hours = this.pad(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: updateCloclface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer))


function updateCloclface({ days, hours, minutes, seconds }) {
    refs.day.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}



