var data = [1, 2, 3, 4, 5, 6],
    dLength = Math.pow(10, 5),
    id = -1;

function readLine() {
    id++;

    return data[id];
}

for (var i = 0; i < dLength; i++) {
    data.push(Math.round(Math.random() * Math.pow(10, 5)));
}

/////////////// ignore above this line ////////////////////

// function main() {
//     var n = dLength;
//     var a = [];
//     var clone;
//     var result = [];
//     var index;
//
//     for (var a_i = 0; a_i < n; a_i++) {
//         a[a_i] = parseInt(readLine());
//     }
//
//     clone = a.concat([]);
//     clone.sort(function(a, b) {
//         return a - b;
//     });
//
//     for (var a_i = n - 1; a_i >= 0; a_i--) {
//         index = clone.indexOf(a[a_i]);
//
//         if (a_i % 2 === 0) {
//             result[a_i] = clone[a_i * 0.5].toFixed(1);
//         } else {
//             result[a_i] = ((clone[a_i * .5 - .5] + clone[a_i * .5 + .5]) * .5).toFixed(1);
//         }
//
//         clone.splice(index, 1);
//     }
//
//     for (var a_i = 0; a_i < n; a_i++) {
//         console.log(result[a_i]);
//     }
// }

function main() {
    var n = dLength;
    var a = [];
    var gMPosition = (n - 1) / 2;
    var gMedian;
    var minHeap = [];
    var maxHeap = [];

    for (var a_i = 0; a_i < n; a_i++) {
        a[a_i] = parseInt(readLine());
    }
}

function Heap(lowToHigh) {
    var topHeap = [];

    return {
        getTop: function() {

        },
        save: function() {

        },
        eject: function() {

        }
    };
}

var heap = new Heap();

console.log(heap);


console.time('main');
main();
console.timeEnd('main');
