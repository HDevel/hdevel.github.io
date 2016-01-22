var input = 'aaabccddd';

var reg = /(.)\1/g;

do {
    input = input.replace(reg, '');
} while (input.match(reg));

console.log(input || 'Empty String');