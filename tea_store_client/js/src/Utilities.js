var ajaxCounter = 0;
var Utilities = {
    startLoaderTime: {},
    SetLoader: function (time) {
        $.blockUI({
            css: {
                margin: '0 auto'
            },
            message: '<div class="loader-container" ><div>Loading</div><div class="dloader" ></div></div>'
        });
    },

    ReleaseLoader: function (time) {
        $.unblockUI();
    }
};
