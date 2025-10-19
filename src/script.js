class CountdownTimer {
  constructor({ selector, targetTimeEnd }) {
    this.timerEl = document.querySelector(selector);
    this.targetTime = targetTimeEnd;
    this.intervalId = null;

    this.daysCount = this.timerEl.querySelector('[data-value="days"]');
    this.hoursCount = this.timerEl.querySelector('[data-value="hours"]');
    this.minsCount = this.timerEl.querySelector('[data-value="mins"]');
    this.secsCount = this.timerEl.querySelector('[data-value="secs"]');
  }

  start() {
    this.updateTimer();
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  updateTimer() {
    const now = new Date();
    const time = this.targetTime - now;

    if (time <= 0) {
      this.stop();
      this.daysCount.textContent = "00";
      this.hoursCount.textContent = "00";
      this.minsCount.textContent = "00";
      this.secsCount.textContent = "00";
      return;
    }

    /*
     * Дні, що залишилися: ділимо значення UTC на 1000 * 60 * 60 * 24, кількість
     * мілісекунд в один день (мілісекунди * секунди * хвилини * години)
     */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Решта годин: отримуємо залишок від попереднього розрахунку за допомогою оператора
     * залишку% і ділимо його на кількість мілісекунд в одній годині
     * (1000 * 60 * 60 = мілісекунди * хвилини * секунди)
     */
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    /*
     * Решта хвилин: отримуємо хвилини, що залишилися і ділимо їх на кількість
     * мілісекунд в одній хвилині (1000 * 60 = мілісекунди * секунди)
     */
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    /*
     * Решта секунд: отримуємо секунди, які залишилися і ділимо їх на кількість
     * миллисекунд в одной секунде (1000)
     */
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this.daysCount.textContent = days.toString().padStart(2, "0");
    this.hoursCount.textContent = hours.toString().padStart(2, "0");
    this.minsCount.textContent = mins.toString().padStart(2, "0");
    this.secsCount.textContent = secs.toString().padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetTimeEnd: new Date("Sep 25 2025 17:13:52"),
});

timer.start();
