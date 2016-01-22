/**
 * Created by mfurzikov on 19.03.16.
 */
var keysEnum = {
        btn_1: ['m', '2'],
        btn_2: ['n', '3'],
        btn_3: ['o', '4'],
        btn_4: ['p', 'w'],
        btn_5: ['q', 'e'],
        btn_6: ['r', 'r'],
        btn_7: ['s', 's'],
        btn_8: ['t', 'd'],
        btn_9: ['u', 'f'],
        btn_0: ['v', 'c'],
        btn_m: ['-', 'x'],
        btn_p: ['+', 'v'],
        action_1: ['I', '5'],
        action_2: ['J', 't'],
        action_3: ['K', 'g'],
        action_4: ['L', 'b'],
        left_1: ['A', '1'],
        left_2: ['B', 'q'],
        left_3: ['C', 'a'],
        left_4: ['0', 'z'],
        right_1: ['E', '6'],
        right_2: ['F', 'y'],
        right_3: ['G', 'h'],
        right_4: ['H', 'n']
    },
    keysMap = {},
    keyVariant = 0,
    callbacks = {
        action_1_down: function () {
            toUrl('../ad/index.html');
        }
    }

if(navigator.userAgent.match('Macintosh')){
    keyVariant = 1;
}

var returnToAd = function (url) {
    if(!document.URL.match('/ad/index.html')){
        toUrl(url || '../ad/index.html');
    }
};

function toUrl(url){
    location.assign(url + '?' + Math.random());
}

var timeoutToAd = setTimeout(returnToAd, 240 * 1000);

$(document).ready(function() {
    $(document).keydown(function(e) {
        if(!keysMap[e.key]) {
            return
        }
        if(callbacks){
            callbacks.down_all && callbacks.down_all(keysMap[e.key]);
            callbacks[ keysMap[e.key] + '_down' ] && callbacks[ keysMap[e.key] + '_down' ]()
        }
        clearTimeout(timeoutToAd);
    });

    $(document).keyup(function(e) {
        if(!keysMap[e.key]) {
            return
        }
        if(callbacks){
            callbacks.up_all && callbacks.up_all(keysMap[e.key]);
            callbacks[ keysMap[e.key] + '_up' ] && callbacks[ keysMap[e.key] + '_up' ]()
        }
        clearTimeout(timeoutToAd);
        timeoutToAd = setTimeout(returnToAd, 240 * 1000);
    });

    //трансформация enum в клавиша-карта
    for(var k in keysEnum){
        if(keysEnum.hasOwnProperty(k)){
            keysMap[keysEnum[k][keyVariant]] = k;
        }
    }
});
