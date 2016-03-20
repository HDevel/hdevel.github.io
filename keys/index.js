var callbacks = {
    down_all: function (id) {
        $('#' + id).addClass('button_select')
    },
    up_all: function (id) {
        $('#' + id).removeClass('button_select');
    }
}