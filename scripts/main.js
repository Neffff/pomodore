// POMODORO CONTROLLER
const pomodoroController = (function () {
    let sound = document.getElementById('alarm__sound');
    let interval;

    let startTimer = ((duration, display) => {
        let timer = duration,
            minutes, seconds;
        clearInterval(interval);
        interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            console.log(timer);

            if (timer > 0) {
                display.textContent = minutes + ":" + seconds;

            } else if (timer === 0) {
                console.log(timer);
                timer = 0;
                sound.play();
                display.textContent = "00:00";
                clearInterval(interval);
            }
            --timer;


        }, 1000);
    });




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
        startTwentyFive: function () {
            let twentyFive, display;
            twentyFive = 1 * 10;
            bar.set(0);
            display = document.querySelector('.time__left');
            startTimer(twentyFive, display);
            bar.animate(1.0); // Number from 0.0 to 1.0
        },
        abortTimer: function (e) {
            console.log(e);
            clearInterval(interval);
            display = document.querySelector('.time__left');
            display.textContent = "00:00";
            bar.set(0);
        },
        pauseTimer: function () {

            clearInterval(interval);
            bar.stop();
        }
    };
})();

// UI CONTROLLER
var UIController = (function () {
    var DOMstrings = {
        timerBtn: '.timer__button',
        inputDescription: '.input__description',
        inputValue: '.input__time',
        endBtn: '.end__button',
        timerSubject: '.timer__subject',
        timerLeft: '.time__left',
        pauseBtn: '.pause__button',
        counterDisplay: '.counter__display'
    };
    return {
        getElements: function () {
            return {
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
                timeBtn: document.querySelector(DOMstrings.timerBtn),
                endindBtn: document.querySelector(DOMstrings.endBtn)
            };
        },
        startTimer: function () {
            let twentyFiveMin;
            twentyFiveMin = document.querySelector(DOMstrings.timerBtn);
            twentyFiveMin.addEventListener('click', pomodoroController.startTwentyFive);
            pomodoroController.startTwentyFive();
            UIController.showSubject();
        },
        abortTimer: function () {
            let abortBtn;
            abortBtn = document.querySelector(DOMstrings.endBtn);
            abortBtn.addEventListener('click', pomodoroController.abortTimer);

        },
        pauseTimer: function () {
            let pauseButton;
            pauseButton = document.querySelector(DOMstrings.pauseBtn);
            pauseButton.addEventListener('click', pomodoroController.pauseTimer);
        },
        showSubject: function () {
            let subject, inputSubject;
            subject = document.querySelector(DOMstrings.timerSubject);
            inputSubject = document.querySelector(DOMstrings.inputDescription);
            subject.textContent = inputSubject.value;
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }
})();

// GLOBAL APP CONTROLLER
var controller = (function (pomoCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.timerBtn).addEventListener('click', ctrlStartTwentyFive);
        document.querySelector(DOM.endBtn).addEventListener('click', ctrlAbortTimer);
        document.querySelector(DOM.pauseBtn).addEventListener('click', ctrlPauseTimer);
        console.log(DOM.endBtn);
    };

    let ctrlStartTwentyFive = function () {
        // 1. calculate
        //pomoCtrl.startPomodore();
        // 2. get btn id and add action on click
        UICtrl.startTimer();
    }

    let ctrlAbortTimer = function () {
        UICtrl.abortTimer();

    }
    let ctrlPauseTimer = function () {
        UICtrl.pauseTimer();
    }
    let ctrlshowSubject = function () {
        UICtrl.showSubject();
    }
    return {
        init: function () {
            console.log('Application has started.');
            setupEventListeners();
        }
    }
})(pomodoroController, UIController);
controller.init();
