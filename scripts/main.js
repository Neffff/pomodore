// POMODORO CONTROLLER
const pomodoroController = (function () {
    let sound = document.getElementById('alarm__sound');
    let interval;
    let isStopped = false;
    let timer,
        minutes,
        seconds;
    let startTimer = (duration, display) => {
        timer = duration;
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
        duration: 1000 * 61 * 25,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: null
    });

    return {
        startTwentyFive: function () {
            let twentyFive, display;
            twentyFive = 25 * 60;
            bar.set(0);
            isStopped = false;
            display = UIController.DOM.timerLeft;
            startTimer(twentyFive, display);
            bar.animate(1.0); // Number from 0.0 to 1.0
            UIController.addSubject();
        },
        abortTimer: function () {
            clearInterval(interval);
            display = UIController.DOM.timerLeft;
            display.textContent = '00:00';
            bar.set(0);
        },
        pauseTimer: function () {
            display = UIController.DOM.timerLeft;
            let val = bar.value();
            if (isStopped === false) {
                clearInterval(interval);
                bar.stop();
                UIController.DOM.pauseBtn.childNodes[0].classList.toggle('fa-pause');
                UIController.DOM.pauseBtn.childNodes[0].classList.toggle('fa-play');
                isStopped = true;
            } else if (isStopped === true) {
                startTimer(timer, display);
                console.log(timer);
                console.log(val);
                bar.animate(1.0, {
                    duration: (timer * 1000 + 1000)
                });
                UIController.DOM.pauseBtn.childNodes[0].classList.toggle('fa-pause');
                UIController.DOM.pauseBtn.childNodes[0].classList.toggle('fa-play');
                isStopped = false;
            }
        }
    };
})();

// UI CONTROLLER
var UIController = (function () {
    var DOM = {
        timerBtn: document.querySelector('.timer__button'),
        inputDescription: document.querySelector('.input__description'),
        endBtn: document.querySelector('.end__button'),
        timerSubject: document.querySelector('.timer__subject'),
        timerLeft: document.querySelector('.time__left'),
        pauseBtn: document.querySelector('.pause__button'),
        counterDisplay: document.querySelector('.counter__display')
    };
    return {
        elements: {
            description: DOM.inputDescription.value,
            timeBtn: DOM.timerBtn,
            endindBtn: DOM.endBtn
        },
        addSubject: function () {
            DOM.timerSubject.textContent = DOM.inputDescription.value;
        },
        DOM
    };
})();

// GLOBAL APP CONTROLLER
var controller = (function (pomoCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.DOM;
        DOM.timerBtn.addEventListener('click', pomoCtrl.startTwentyFive);
        DOM.endBtn.addEventListener('click', pomoCtrl.abortTimer);
        DOM.pauseBtn.addEventListener('click', pomoCtrl.pauseTimer);
    };

    return {
        init: function () {
            console.log('Application has started.');
            setupEventListeners();
        }
    };
})(pomodoroController, UIController);

controller.init();
