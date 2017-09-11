var diagram = {
    draw: function(params) {
        var result = '<svg>';
        var that = this;
        this.params = params;
        var total = this.params.data.reduce(function(acc, v) {
            return acc += v;
        });
        var lastDeg = -90;
        var deg;

        this.params.data.forEach(function(v) {
            if (typeof v === 'number') {
                deg = v / total * 360;
            } else {
                deg = v.value / total * 360;
            }

            result += that.gerPath(lastDeg, lastDeg + deg, v.color);

            lastDeg = lastDeg + deg;
        });

        result += '</svg>';

        return result;
    },

    gerPath: function(start, end, color) {
        var path = '<path d="';
        var fillColor = color || this.getRandomColor();
        var inR = this.params.inner;
        var outR = this.params.outer;
        var inner = this.getArc(inR, start, end);
        var outer = this.getArc(outR, start, end);

        var cc = Math.abs(end - start) > 180 ? 1 : 0;

        path += 'M' + inner.start.x + ',' + inner.start.y;
        path += 'A' + inR + ',' + inR + ' 0 ' + cc + ',1 ' + inner.end.x + ',' + inner.end.y;
        path += 'L' + outer.end.x + ',' + outer.end.y;
        path += 'A' + outR + ',' + outR + ' 0 ' + cc + ',0 ' + outer.start.x + ',' + outer.start.y;
        path += 'z';

        path += '" fill="' + fillColor + '"></path>';

        return path;
    },

    getRandomColor: function() {
        var rgb = [0, 0, 0].map(function(t) {
            return Math.floor(Math.random() * 255)
        });

        return 'rgb(' + rgb.toString() + ')'
    },

    getArc: function(r, from, to) {
        return {
            start: this.getXY(r, from),
            end: this.getXY(r, to)
        }
    },

    getXY: function(r, deg) {
        return {
            x: this.params.x + r * Math.cos(deg * Math.PI / 180),
            y: this.params.y + r * Math.sin(deg * Math.PI / 180)
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    var myD = diagram.draw({
        data: [6.25, 6.25, 12.5, 25, 50],
        inner: 20,
        outer: 40,
        x: 100,
        y: 100
    });

    document.body.innerHTML += myD;
});



