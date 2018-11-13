function HdatePicker (config) {
    var _this = this;
    _this.year = config.year;
    _this.month = config.month;
    _this.disabledDate = config.disabledDate;
    _this.beforeToday = config.beforeToday;

    $("#HdatePicker").click(function () {
        _this.initCalendar();
    })
}
HdatePicker.prototype = {
    initCalendar: function () {
        var _this = this;
        $(".date_table_body").html('');
        $(".HdatePicker_cover").remove();
        $("#HdatePicker").attr("readonly","readonly")

        var HCalendar = "<div class=\"HdatePicker_cover\">\n" +
            "        <div class=\"HdatePicker_main\">\n" +
            "            <div class=\"title\">\n" +
            "                <span class=\"btn cancel\">取消</span>\n" +
            "                <span>请选择</span>\n" +
            "                <span class=\"btn confirm\">确定</span>\n" +
            "            </div>\n" +
            "            <div class=\"topPanel\">\n" +
            "                <div class=\"pickGroup\">\n" +
            "                    <img src=\"img/left.png\" class=\"leftIcon\" />\n" +
            "                    <span class=\"current_year\"><span class=\"val\">"+this.year+"</span>年</span>\n" +
            "                    <img src=\"img/left.png\" class=\"rightIcon\" />\n" +
            "                </div>\n" +
            "                <div class=\"pickGroup\">\n" +
            "                    <img src=\"img/left.png\" class=\"leftIcon\" />\n" +
            "                    <span class=\"current_month\"><span class=\"val\">"+this.month+"</span>月</span>\n" +
            "                    <img src=\"img/left.png\" class=\"rightIcon\" />\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"date_table\">\n" +
            "                <div class=\"date_table_head\"><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div><div>日</div></div>\n" +
            "                <div class=\"date_table_body\"></div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>";

        $("body").append(HCalendar);

        var currentFirstDay = new Date(this.year, this.month -1, 1).getDay();
        var LastFinalDate = new Date(this.year, this.month - 1, 0).getDate();
        var currentFirstDate = new Date(this.year, this.month - 1, 1).getDate();
        var currentFinalDate = new Date(this.year, this.month, 0).getDate();
        var nextFirstDate = new Date(this.year, this.month, 1).getDate();

        if(currentFirstDay == 0)currentFirstDay = 7;

        for(var i = 1; i <= currentFirstDay-1; i++) {
            var PD = LastFinalDate - (currentFirstDay-1) + i
            var PNode = "<div class=\"eachDate unable\">" + PD + "</div>";
            $(".date_table_body").append(PNode);
        }
        for(var j = currentFirstDate; j <= currentFinalDate; j++) {
            var CNode = "";
            if(!_this.beforeToday){
                if(_this.year < new Date().getFullYear() ||
                    (_this.year == new Date().getFullYear() && _this.month < Number(new Date().getMonth())+1) ||
                    (_this.year == new Date().getFullYear() && _this.month == Number(new Date().getMonth())+1 && j < new Date().getDate())
                ){
                    CNode = "<div class=\"eachDate unable\">" + j + "</div>";
                } else {
                    if(_this.disabledDate != null){
                        if(j == new Date().getDate() && !_this.isDisabledDate(_this.year,_this.month,j)){
                            CNode = "<div class=\"eachDate picked\">" + j + "</div>";
                        } else if (j != new Date().getDate() && !_this.isDisabledDate(_this.year,_this.month,j)) {
                            CNode = "<div class=\"eachDate\">" + j + "</div>";
                        } else if (_this.isDisabledDate(_this.year,_this.month,j)){
                            CNode = "<div class=\"eachDate unable\">" + j + "</div>";
                        }
                    } else {
                        if(j == new Date().getDate()){
                            CNode = "<div class=\"eachDate picked\">" + j + "</div>";
                        } else if (j != new Date().getDate()) {
                            CNode = "<div class=\"eachDate\">" + j + "</div>";
                        }
                    }
                }
            } else {
                if(_this.disabledDate != null){
                    if(j == new Date().getDate() && !_this.isDisabledDate(_this.year,_this.month,j)){
                        CNode = "<div class=\"eachDate picked\">" + j + "</div>";
                    } else if (j != new Date().getDate() && !_this.isDisabledDate(_this.year,_this.month,j)) {
                        CNode = "<div class=\"eachDate\">" + j + "</div>";
                    } else if (_this.isDisabledDate(_this.year,_this.month,j)){
                        CNode = "<div class=\"eachDate unable\">" + j + "</div>";
                    }
                } else {
                    if(j == new Date().getDate()){
                        CNode = "<div class=\"eachDate picked\">" + j + "</div>";
                    } else if (j != new Date().getDate()) {
                        CNode = "<div class=\"eachDate\">" + j + "</div>";
                    }
                }
            }

            $(".date_table_body").append(CNode);
        }
        for(var k = nextFirstDate; k < 6*7 - (currentFirstDay-1) - (currentFinalDate-currentFirstDate); k++){
            var NNode = "<div class=\"eachDate unable\">" + k + "</div>";
            $(".date_table_body").append(NNode);
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
            _this.reRender();
        });
        $(".current_year").next(".rightIcon").click(function (){
            $(".current_year .val").text(Number($(".current_year .val").text())+1)
            _this.reRender();
        });
        $(".current_month").prev(".leftIcon").click(function (){
            var newVal = Number($(".current_month .val").text())-1;
            if(newVal < 1){
                $(".current_month .val").text(12)
                $(".current_year .val").text(Number($(".current_year .val").text())-1);
            } else {
                $(".current_month .val").text(newVal)
            }
            _this.reRender();
        });
        $(".current_month").next(".rightIcon").click(function (){
            var newVal = Number($(".current_month .val").text())+1;
            if(newVal > 12){
                $(".current_month .val").text(1)
                $(".current_year .val").text(Number($(".current_year .val").text())+1);
            } else {
                $(".current_month .val").text(newVal)
            }
            _this.reRender();
        });

        // 隐藏插件
        $(".HdatePicker_cover").click(function () {
            $(".HdatePicker_cover").remove();
        })
        $(".HdatePicker_main").click(function (event) {
            event.stopPropagation();
        })

        // 确定事件
        $(".HdatePicker_main .confirm").click(function () {
            _this.getComfirmDate();
        })
        // 取消事件
        $(".HdatePicker_main .cancel").click(function () {
            $(".HdatePicker_cover").remove();
        })
    },
    reRender: function () {
        var _this = this;
        _this.year = $(".current_year .val").text();
        _this.month = $(".current_month .val").text();
        _this.initCalendar()
    },
    getComfirmDate: function () {
        var year = $(".current_year .val").text();
        var month = $(".current_month .val").text();
        var day = $(".date_table_body .picked").text();
        $("#HdatePicker").val(year+"-"+month+"-"+day);
        $(".HdatePicker_cover").remove();
    },
    isDisabledDate: function (y,m,d) {
        var _this = this;
        var dd = y+"-"+m+"-"+d;
        var flag = false;
        for(var i=0;i<_this.disabledDate.length;i++){
            if(dd == _this.disabledDate[i]){
                flag = true;
                break;
            } else {
                flag = false;
            }
        }
        return flag;
    }
}

