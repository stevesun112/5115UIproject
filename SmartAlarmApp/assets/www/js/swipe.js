$.fn.extend({
    createBtn: function () {
        var elmWidth = $("h2", $(this)).width(),
            listType = $(this).listview("option", "inset") ? true : false,
            btnWidth = elmWidth < 300 && listType ? "35%" : elmWidth > 300 && !listType ? "25%" : "20%";
        $("h2", $(this)).each(function () {
            var text = $(this).html();
            $(this).html($("<div/>", {
                class: "wrapper"
            }).append($("<div/>", {
                class: "go"
            }).text("Activate").width(btnWidth)).append($("<div/>", {
                class: "item"
            }).text(text)).append($("<div/>", {
                class: "del"
            }).text("Remove").width(btnWidth)).css({
                left: "-" + btnWidth
            }).on("swipeleft swiperight vclick tap", function (e) {

                $(this).revealBtn(e, btnWidth);
            }) /**/ );
        });
    },

    revealBtn: function (e, x) {
        var check = this.check(x),
            swipe = e.type;
        if (check == "closed") {
            swipe == "swiperight" ? this.open(e, x, "left") : swipe == "swipeleft" ? this.open(e, x, "right") : setTimeout(function () {
                //this.close(e);
                //if you dont swipe and click directly, this will gets triggered.
                //window.location.href = "AddNewAlarm.html";
            }, 0);
            e.stopImmediatePropagation();
        }
        if (check == "right" || check == "left") {
            swipe == "swiperight" ? this.open(e, x, "left") : swipe == "swipeleft" ? this.open(e, x, "right") : setTimeout(function () {
                //this.close(e);
                // If you swipe left or right first, then click on this tab again

                if(check == "right") {
                    window.location.href = "index.html"; // if swipe to right, do sth
                } else if (check == "left"){
                    window.location.href = "Alarm.html"; // if swipe to left, then do sth else
                }
            }, 0);
            e.stopImmediatePropagation();
        }
        if (check !== "closed" && e.isImmediatePropagationStopped() && (swipe == "vclick" || swipe == "tap")) {
            this.close(e);
            //window.location.href = "index.html";
        }
    },

    close: function (e) {
        var check = this.check();
        this.css({
            transform: "translateX(0)"
        });
    },
    open: function (e, x, dir) {
        var posX = dir == "left" ? x : "-" + x;
        $(this).css({
            transform: "translateX(" + posX + ")"
        });
    },
    check: function (x) {
        var matrix = this.css("transform").split(" "),
            posY = parseInt(matrix[matrix.length - 2], 10),
            btnW = (this.width() * parseInt(x) / 100) / 1.1;
        return isNaN(posY) ? "closed" : posY >= btnW ? "left" : posY <= "-" + btnW ? "right" : "closed";
    }
});

$(document).on("pagecreate", function () {
    $("ul").createBtn();
});
