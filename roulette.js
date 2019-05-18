
    //1～16の数字をランダムに生成する関数(一度出た数字は除外)
    var num;
    var excludes = [];
    //ルーレット中、オレンジパネルを白に戻すためのフラッグ
    var number_flag = false;
    //再スタートする際、選ばれた数字をグレーに変えるためのフラッグ
    var stop_flag = false;
    //ルーレットに使うタイマーを格納するID
    var interval_id;
    function random16() {
        var arr = [];
        for (var i = 1; i <= 16; ++i) {
            if(excludes.indexOf(i) === -1) {
                arr.push(i);
            }
        }
        num = arr[Math.floor(Math.random()*arr.length)];
    }
    //テーブルの挿入
    for (var i = 1; i <= 4; i++) {
        $('#roulette').append('<tr class="' + i + '"></tr>');
    }
    for (var j = 1; j <= 16; j++) {
        $('.' + Math.ceil(j / 4)).append('<td id="' + j + '"></td>');
        $('#' + j).append('<p>' + j + '</p>');
    }
    //初期設定、ストップボタン無効化(無意味にstop_flagが立つのを防ぐ)
    $('#stop_button').prop('disabled', true);
    //スタート
    $('#start_button').on('click', function roulette_start() {
        if (excludes.length !== 15) {
            if (stop_flag === true) {
                $('#' + num).css('background-color', 'gray');
                stop_flag = false;
            }
                number_flag = true;
                interval_id = setInterval(roulette, 10);
                $('#start_button').prop('disabled', true);
                $('#stop_button').prop('disabled', false);
        } else if (excludes.length === 15) {
            $('#' + num).css('background-color', 'gray');
            stop_flag = false;
            random16();
            $('#' + num).css('background-color', 'orange');
            $('#start_button').prop('disabled', true);
            $('#stop_button').prop('disabled', true);
        }
    });
    //ルーレット 1から16の数字を生成して背景色をつける
    function roulette () {
        if (number_flag === true) {
            number_flag = false;
        } else if (number_flag === false) {
            $('#' + num).css('background-color', 'white');
        }
        random16();
        $('#' + num).css('background-color', 'orange');
    }
    //ストップ
    $('#stop_button').on('click', function roulette_stop() {
        clearInterval(interval_id);
        excludes.push(num);
        stop_flag = true;
        $('#start_button').prop('disabled', false);
        $('#stop_button').prop('disabled', true);
    });
    //リセット
    $('#reset_button').on('click', function roulette_reset() {
        clearInterval(interval_id);
        excludes = [];
        for (i = 1; i <= 16; i++) {
            $('#' + i).css('background-color', 'white');
            num = 0;
            stop_flag = false;
            $('#start_button').prop('disabled', false);
            $('#stop_button').prop('disabled', true);
        }
    });
