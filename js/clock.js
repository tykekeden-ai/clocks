<!-- 時計の表示方式 -->
<div id="clock-mode-selector">
    <label for="clock-mode">時計の表示方式：</label>
    <select id="clock-mode">
        <option value="analog">アナログ</option>
        <option value="hybrid">アナログ／デジタル</option>
        <option value="digital" selected>デジタル</option>
    </select>
</div>

<!-- 時計表示エリア -->
<div id="clock-display">

    <!-- アナログ時計 -->
    <div id="analog-clock" class="analog-clock">
        <span class="clock-number number-12">12</span>
        <span class="clock-number number-3">3</span>
        <span class="clock-number number-6">6</span>
        <span class="clock-number number-9">9</span>

        <div id="hour-hand" class="clock-hand hour-hand"></div>
        <div id="minute-hand" class="clock-hand minute-hand"></div>
        <div id="second-hand" class="clock-hand second-hand"></div>
        <div class="clock-center"></div>
    </div>

    <!-- デジタル時計 -->
    <div id="clock">00:00:00</div>

</div>
