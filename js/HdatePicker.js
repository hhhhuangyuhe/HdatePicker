function randerCalendar (year, month) {

    // 清空日期表格
    $(".date_table_body").html('');

    var currentFirstDay = new Date(year, month -1, 1).getDay();
    var LastFinalDate = new Date(year, month - 1, 0).getDate();
    var currentFirstDate = new Date(year, month - 1, 1).getDate();
    var currentFinalDate = new Date(year, month, 0).getDate();
    var nextFirstDate = new Date(year, month, 1).getDate();

    /**
     *  new Date(year, month, day);
     *
     *  实际上是先获取year,month下的第一天，再加上day整数值再减去1。
     *  如：new Date(2018, 11, 5)
     *  先获取2018年11月1日；再加上5天，即2018年11月6日；再减去1，即2018年11月5日。
     *
     *  所以new Date(2018, 11, 0)
     *  即：2018-10-31
     * **/

    // console.log("本月第一天是星期:" + currentFirstDay)
    // console.log("上月最后一天是:" + LastFinalDate + "号")
    // console.log("本月第一天是:" + currentFirstDate + "号")
    // console.log("本月最后一天是:" + currentFinalDate + "号")
    // console.log("下月第一天是:" + nextFirstDate + "号")

    // 0是星期天
    if(currentFirstDay == 0)currentFirstDay = 7;

    // 渲染日期表格
    for(var i = 1; i <= currentFirstDay-1; i++) {
        var PD = LastFinalDate - (currentFirstDay-1) + i
        console.log(PD)
        var PNode = "<div class=\"eachDate unable\">" + PD + "</div>";
        $(".date_table_body").append(PNode);
    }
    for(var j = currentFirstDate; j <= currentFinalDate; j++) {
        var CNode = "";
        if(j == new Date().getDate()){
            CNode = "<div class=\"eachDate picked\">" + j + "</div>";
        } else {
            CNode = "<div class=\"eachDate\">" + j + "</div>";
        }
        console.log(j)
        $(".date_table_body").append(CNode);
    }
    for(var k = nextFirstDate; k < 6*7 - (currentFirstDay-1) - (currentFinalDate-currentFirstDate); k++){
        console.log(k)
        var NNode = "<div class=\"eachDate unable\">" + k + "</div>";
        $(".date_table_body").append(NNode);
    }
}

// 点击日期事件（事件委托）
$(".date_table_body").on("click", ".eachDate", function () {
    if($(this).hasClass("unable")){
        return;
    }
    $(".eachDate").removeClass("picked");
    $(this).addClass("picked")
});

// 切换年月事件
$(".current_year").prev(".leftIcon").click(function (){
    $(".current_year .val").text(Number($(".current_year .val").text())-1)
    randerCalendar($(".current_year .val").text(),$(".current_month .val").text());
});
$(".current_year").next(".rightIcon").click(function (){
    $(".current_year .val").text(Number($(".current_year .val").text())+1)
    randerCalendar($(".current_year .val").text(),$(".current_month .val").text());
});
$(".current_month").prev(".leftIcon").click(function (){
    var newVal = Number($(".current_month .val").text())-1;
    if(newVal < 1){
        $(".current_month .val").text(12)
        $(".current_year .val").text(Number($(".current_year .val").text())-1);
    } else {
        $(".current_month .val").text(newVal)
    }
    randerCalendar($(".current_year .val").text(),$(".current_month .val").text());
});
$(".current_month").next(".rightIcon").click(function (){
    var newVal = Number($(".current_month .val").text())+1;
    if(newVal > 12){
        $(".current_month .val").text(1)
        $(".current_year .val").text(Number($(".current_year .val").text())+1);
    } else {
        $(".current_month .val").text(newVal)
    }
    randerCalendar($(".current_year .val").text(),$(".current_month .val").text());
});

// 隐藏插件
$(".HdatePicker_cover").click(function () {
    $(this).hide();
})
$(".HdatePicker_main").click(function (event) {
    event.stopPropagation();
})