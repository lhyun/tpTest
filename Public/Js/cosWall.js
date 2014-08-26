var $cosText = $(document.getElementById('cos-text'));
var $cosPub = $(document.getElementById('cos-pub'));
var $subCos = $(document.getElementById('sub-cos'));
var $cosWall = $(".cos-wall"), $btnClose = $(".close");

var navFlag = 0;
//左侧导航栏
function _slide(){
	if(navFlag == 0){
		$(".lnav").animate({left:"+=145px"},350);
		navFlag = 1;
	}
	else{
		$(".lnav").animate({left:"-=145px"},350);
		navFlag = 0;
	}
}
$("#lhead a").click(function(){
	_slide();
});
$("#lhead a").hover(function(){
	if(navFlag == 0){
		$(".lnav").animate({left:"+=145px"},350);
		navFlag = 1;
	}
});
$(".lnav").mouseleave(function(){
	if(navFlag == 1){
		$(".lnav").animate({left:"-=145px"},350);
		navFlag = 0;
	}
});
function posRandom() {
	var rx = parseInt(Math.random() * ($(".cos-wall").width() - 225));
	var ry = parseInt(Math.random() * ($(".cos-wall").height() - 200));
	var randomLeft = Math.floor($(".cos-wall").width() * (Math.random())) + 25, randomTop = Math.floor($('.cos-wall').height() * (Math.random())) + 25, randomRotate = 20 - Math.floor(40 * Math.random());
	/* 旋转角度 */
	return {
		left : rx,
		top : ry,
		rotate : randomRotate
	}
}

// 设置z-index
function getz() {
	var max = 0;
	var tmp = 0;
	$(".cos-content").each(function() {
		tmp = parseInt($(this).css("z-index"));
		if (max < tmp) {
			max = tmp;
		}
	});
	return max + 1;
}

// 鼠标点击时，将cos置于最前端
$(".cos-content").mousedown(function() {
	$(this).css("z-index", getz());
});

/* 拖动 */
function draggableNote() {
	$(".cos-content").draggable({
		containment : $('.cos-wall'),
		// 开始拖动，旋转0degree，改变鼠标样式
		start : function() {
			$(this).css({
				"transform" : "rotate(0deg)",
				"cursor" : "crosshair",
				"z-index" : getz()
			});
		},
		// 停止拖动，旋转角度随机
		stop : function() {
			var _obj = posRandom();
			$(this).css({
				"transform" : "rotate(" + _obj.rotate + "deg)",
				"cursor" : "pointer"
			});
		}
	})
}

// 设置每个cos背景
function setback() {
	var arr = new Array('#66CCCC', '#CCFF66', '#FF99CC', '#FF9999', '#FFCC99', "#666699", "#CCCCCC");
	return arr[parseInt(Math.random() * 7)];
}

// 设置单个cos位置和角度
function setOneCos($oneCos) {
	var _obj = posRandom();
	$oneCos.css({
		"transform" : "rotate(" + _obj.rotate + "deg)"
	});
	$oneCos.css("background", setback());
	$oneCos.css({
		"left" : _obj.left + "px",
		"top" : _obj.top + "px"
	});
}

// 设置所有cos位置和旋转角度
function setCosWall() {
	$('.cos-content').each(function() {
		setOneCos($(this));
	});
}

// 拖动
draggableNote();

$("#btn-click").click(function() {

	$('.mask').fadeIn(300);
	$cosPub.fadeIn(400);

});
// 点击提交

$subCos.click(function() {

	var cosTextVal = $cosText.val();
	if (cosTextVal != "") {

		// 异步提交
		$.post(handleUrl, {
			'userID' : $("#userID").val(),
			'cosTextVal' : cosTextVal
		}, function(msg) {
			if (msg.status == 1) {
				var _div = "<span class='glyphicon glyphicon-user'></span><div class = 'cos-content'>" + cosTextVal + "</div>";
				//					var _span = "<span class = 'date'> "+ msg.date + "</span>"
				
				$cosWall.append(_div);
				setOneCos($cosWall.find("div:last"));
				draggableNote();
				$cosPub.fadeOut(300);
				$('.mask').fadeOut(300);
			} else
				alert("发送失败");

		});

		return true;
	} else {
		// 显示提醒框
		alert("错误");
		$subCos.popover("show");
		return false;
	}
});

// 鼠标丢失焦点时，去掉提示框

// 关闭输入框cos-pub
$("#btn-close").click(function() {
	$cosPub.fadeOut(300);
	$('.mask').fadeOut(300);
});

$(function() {
	setCosWall();
})