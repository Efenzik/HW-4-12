class CountdownTimer {
  constructor({ selector, targetTimeEnd }) {
    const timerEl = document.querySelector(selector);
    const targetTime = targetTimeEnd;

    const daysCount = timerEl.querySelector('[data-value="days"]');
    const hoursCount = timerEl.querySelector('[data-value="hours"]');
    const minsCount = timerEl.querySelector('[data-value="mins"]');
    const secsCount = timerEl.querySelector('[data-value="secs"]');
    const TIME_COUNT = 100;
    function updateTimer() {
      const now = new Date();
      const time = targetTime - now;

      if (time <= 0) {
        clearInterval(intervalId);
        daysCount.textContent = "00";
        hoursCount.textContent = "00";
        minsCount.textContent = "00";
        secsCount.textContent = "00";
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
      const hours = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

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
      daysCount.textContent = days.toString().padStart(2, "0");
      hoursCount.textContent = hours.toString().padStart(2, "0");
      minsCount.textContent = mins.toString().padStart(2, "0");
      secsCount.textContent = secs.toString().padStart(2, "0");
    }
    updateTimer();
    const intervalId = setInterval(updateTimer, TIME_COUNT);
  }
}

new CountdownTimer({
  selector: "#timer-1",
  targetTimeEnd: new Date("Sep 25 2025 17:13:52"),
});
