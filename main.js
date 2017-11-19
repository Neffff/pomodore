// POMODORO CONTROLLER
const pomodoroController = (function() {
    let sound = document.getElementById('alarm__sound');
    let interval;
    let startTimer = (duration, display) => {
        let timer = duration,
            minutes,
            seconds;
        clearInterval(interval);
        interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            if (timer > 0) {
                display.textContent = minutes + ':' + seconds;
            } else if (timer === 0) {
                timer = 0;
                sound.play();
                display.textContent = '00:00';
                clearInterval(interval);
            }
            --timer;
        }, 1000);
    };

    let bar = new ProgressBar.Circle('#container', {
        strokeWidth: 2,
        easing: 'linear',
        duration: 1000 * 11,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: null
    });

    return {
        startTwentyFive: function() {
            let twentyFive, display;
            twentyFive = 1 * 10;
            bar.set(0);
            display = document.querySelector('.time__left');
            startTimer(twentyFive, display);
            bar.animate(1.0); // Number from 0.0 to 1.0
        },
        abortTimer: function(e) {
            clearInterval(interval);
            display = document.querySelector('.time__left');
            display.textContent = '00:00';
            bar.set(0);
        },
        pauseTimer: function() {
            clearInterval(interval);
            bar.stop();
        }
    };
})();

// UI CONTROLLER
var UIController = (function() {
    var DOM = {
        timerBtn: document.querySelector('.timer__button'),
        inputDescription: document.querySelector('.input__description'),
        inputValue: document.querySelector('.input__time'),
        endBtn: document.querySelector('.end__button'),
        timerSubject: document.querySelector('.timer__subject'),
        timerLeft: document.querySelector('.time__left'),
        pauseBtn: document.querySelector('.pause__button'),
        counterDisplay: document.querySelector('.counter__display')
    };
    return {
        elements: {
            description: DOM.inputDescription.value,
            value: DOM.inputValue.value,
            timeBtn: DOM.timerBtn,
            endindBtn: DOM.endBtn
        },
        DOM
    };
})();

// GLOBAL APP CONTROLLER
var controller = (function(pomoCtrl, UICtrl) {
    var setupEventListeners = function() {
        var DOM = UICtrl.DOM;
        DOM.timerBtn.addEventListener('click', pomoCtrl.startTwentyFive);
        DOM.endBtn.addEventListener('click', pomoCtrl.abortTimer);
        DOM.pauseBtn.addEventListener('click', pomoCtrl.pauseTimer);
    };

    return {
        init: function() {
            console.log('Application has started.');
            console.log(document.querySelector('.pause__button'));
            setupEventListeners();
        }
    };
})(pomodoroController, UIController);

controller.init();
