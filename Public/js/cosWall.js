var $cosText = $(document.getElementById('cos-text'));
var $cosPub = $(document.getElementById('cos-pub'));
var $subCos = $(document.getElementById('sub-cos'));
var $cosWall = $(".cos-wall"), $btnClose = $(".close");
var usedArray = new Array();
/*随机取出数组中num个不重复元素*/
function getArrayItems(arr, num) {
	//新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
	var temp_array = new Array();
	for (var index in arr) {
		temp_array.push(arr[index]);
	}
	//取出的数值项,保存在此数组
	var return_array = new Array();
	for (var i = 0; i < num; i++) {
		//判断如果数组还有可以取出的元素,以防下标越界
		if (temp_array.length > 0) {
			//在数组中产生一个随机索引
			var arrIndex = Math.floor(Math.random() * temp_array.length);
			//将此随机索引的对应的数组元素值复制出来
			return_array[i] = temp_array[arrIndex];
			//然后删掉此索引的数组元素,这时候temp_array变为新的数组
			temp_array.splice(arrIndex, 1);
		} else {
			//数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
			break;
		}
	}
	return return_array;
}


function posRandom() {
	var rx = parseInt(Math.random() * ($(".cos-wall").width() - 220));
	var ry = parseInt(Math.random() * ($(".cos-wall").height() - 150));
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
	var arr = new Array('#33CC66', '#CCFF66', '#FF99CC', '#FF9999', '#FFCC99', "#666699", "#CCCCCC");
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
//				var _div = "<div class = 'cos-content'>" + cosTextVal + "</div>";
//				//					var _span = "<span class = 'date'> "+ msg.date + "</span>"
//				$cosWall.append(_div);
//				setOneCos($cosWall.find("div:last"));
//				draggableNote();
				data[data.lengh] = {
					"id" :data[lengh-1].id,
					"content":cosTextVal
				};
				var _p = "<p>"+ cosTextVal + "</p>";
				var _id = "#flip-toggle11"+(parseInt(11*Math.random())+1);
				
				$(_id+" .flipper .front p").text(cosTextVal);
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

//$(function() {
//	setCosWall();
//
//});

function display(){
	var tmp =  getArrayItems(data,22);
	usedArray = tmp;
	var tmpLength = tmp.length;
	var j=0;
	var atmp = [1,2,3,4,5,6,7,8,9,10,11];
	atmp = getArrayItems(atmp,11);
	for (i = 0,j=0;i < tmpLength;i=i+2,j++){
		var _p = "<p>"+tmp[i].content + "</p>";
		var _id = "#flip-toggle"+(atmp[j]);
		$(_id+" .flipper .front p").text(tmp[i].content);
		if(i == tmpLength){
			return;
		}
		
		_p = "<p>"+tmp[i+1].content+ "</p>";
		$(_id+" .flipper .back p").text(tmp[i].content);
	}
}

function autodisp(){
	var atmp = [1,2,3,4,5,6,7,8,9,10,11];
	atmp = getArrayItems(atmp,parseInt(4*Math.random())+1);
	for(i=0;i < atmp.lengh;i++){
		var _id =  "flip-toggle"+(atmp[i]);
		document.getElementById(_id).classList.toggle('hover');
	}
}
$(function(){
	$('.front').each(function() {
		$(this).css("background", setback());
	});
	$('.back').each(function() {
		$(this).css("background", setback());
	});
	display();
	setInterval("autodisp()",900);
})
