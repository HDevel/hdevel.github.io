﻿<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>B</title>
    <script src="http://code.jquery.com/jquery-2.2.1.min.js"></script>
    <style>
        body,
        html{
            overflow: hidden;
        }

        .container{
            width: 1024px;
            height: 768px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -384px 0px 0px -512px;
            background-color: #333;
            opacity: 0;
        }

        .side-button > div{
            position: absolute;
            width: 100px;
            height: 50px;
            background-color: #ccc;
        }

        .side-button.side-button_left > div{
            left: 0;
        }

        .side-button.side-button_right > div{
            right: 0;
        }

        .side-button > div.side-button__1{
            top: 285px;
        }

        .side-button > div.side-button__2{
            top: 420px;
        }

        .side-button > div.side-button__3{
            top: 550px;
        }

        .side-button > div.side-button__4{
            top: 700px;
        }

        .keyboard{
            position: absolute;
            top: 150px;
            left: 150px;
        }

        .keyboard > div{
            position: absolute;
            width: 120px;
            height: 100px;
            background-color: #ccc;
        }

        .keyboard > div.keyboard__1,
        .keyboard > div.keyboard__2,
        .keyboard > div.keyboard__3,
        .keyboard > div.keyboard__A1{
            top: 0px;
        }

        .keyboard > div.keyboard__4,
        .keyboard > div.keyboard__5,
        .keyboard > div.keyboard__6,
        .keyboard > div.keyboard__A2{
            top: 150px;
        }

        .keyboard > div.keyboard__7,
        .keyboard > div.keyboard__8,
        .keyboard > div.keyboard__9,
        .keyboard > div.keyboard__A3{
            top: 300px;
        }

        .keyboard > div.keyboard__M,
        .keyboard > div.keyboard__0,
        .keyboard > div.keyboard__P,
        .keyboard > div.keyboard__A4{
            top: 450px;
        }

        .keyboard > div.keyboard__1,
        .keyboard > div.keyboard__4,
        .keyboard > div.keyboard__7,
        .keyboard > div.keyboard__M{
            left: 0px;
        }

        .keyboard > div.keyboard__2,
        .keyboard > div.keyboard__5,
        .keyboard > div.keyboard__8,
        .keyboard > div.keyboard__0{
            left: 150px;
        }

        .keyboard > div.keyboard__3,
        .keyboard > div.keyboard__6,
        .keyboard > div.keyboard__9,
        .keyboard > div.keyboard__P{
            left: 300px;
        }

        .keyboard > div.keyboard__A1,
        .keyboard > div.keyboard__A2,
        .keyboard > div.keyboard__A3,
        .keyboard > div.keyboard__A4{
            left: 450px;
            width: 300px;
        }

        .button_select{
            background-color: #f0f!important;
        }

        .buttonLog{
            position: absolute;
            top:10px;
            left:10px;
            font-family: Arial;
            font-size: 20px;
            color: #f0f;
        }

        .banner{
            position: fixed;
            width: 1024px;
            height: 768px;
            top: 50%;
            left: 50%;
            margin: -384px 0px 0px -512px;
            opacity:0;
            transition: all 100ms;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="keyboard">
            <div class="keyboard__1" data-key="m"></div>
            <div class="keyboard__2" data-key="n"></div>
            <div class="keyboard__3" data-key="o"></div>
            <div class="keyboard__4" data-key="p"></div>
            <div class="keyboard__5" data-key="q"></div>
            <div class="keyboard__6" data-key="r"></div>
            <div class="keyboard__7" data-key="s"></div>
            <div class="keyboard__8" data-key="t"></div>
            <div class="keyboard__9" data-key="u"></div>
            <div class="keyboard__0" data-key="v"></div>
            <div class="keyboard__P" data-key="y"></div>
            <div class="keyboard__M" data-key=`"x"></div>
            <div class="keyboard__A1" data-key="I"></div>
            <div class="keyboard__A2" data-key="J"></div>
            <div class="keyboard__A3" data-key="K"></div>
            <div class="keyboard__A4" data-key="L"></div>
        </div>
        <div class="side-button side-button_left">
            <div class="side-button__1" data-key="A"></div>
            <div class="side-button__2" data-key="B"></div>
            <div class="side-button__3" data-key="C"></div>
            <div class="side-button__4" data-key="0"></div>
        </div>
        <div class="side-button side-button_right">
            <div class="side-button__1" data-key="E"></div>
            <div class="side-button__2" data-key="F"></div>
            <div class="side-button__3" data-key="G"></div>
            <div class="side-button__4" data-key="H"></div>
        </div>
        <div class="buttonLog"></div>
    </div>
    <script>
        $(document).ready(function() {
            var keys = {};

            $(document).keydown(function(e) {
//                console.log(e);
//                $('.buttonLog').html(e.key);
                keys[e.key].addClass('button_select')
            });

            $(document).keyup(function(e) {
                keys[e.key].removeClass('button_select');
            });

            $('div[data-key]').each(function (i, v) {
                keys[$(v).data().key] = $(v);
            });

            var banners = 5

            for(var i = 1; i <= 5; i++){
                $('body').append('<img src="banners/0' + i + '.jpg" class="banner">')
            }
            setInterval(function () {
                $('.banner').css('opacity', 0);
                $('.banner').eq(Math.floor(Math.random() * banners)).css('opacity', 1);
            }, 6000);
        });
    </script>
</body>
</html>
