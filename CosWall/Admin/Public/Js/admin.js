
	//the form wrapper (includes all forms)
	var $form_wrapper = $('#form-wrapper'),
	//the current form is the one with class active
	$currentForm = $form_wrapper.children('form.active'), $linkform = $form_wrapper.find('.linkform');

	$form_wrapper.children('form').each(function(i) {
		var $theForm = $(this);
		if (!$theForm.hasClass('active'))
			$theForm.hide();
		$theForm.data({
			width : $theForm.width(),
			height : $theForm.height()
		});
	});
	setWrapperWidth();
	$linkform.bind('click', function(e) {
		var $link = $(this);
		var target = $link.attr('rel');
		$currentForm.fadeOut(400, function() {
			//remove class active from current form
			$currentForm.removeClass('active');
			//new current form
			$currentForm = $form_wrapper.children('form.' + target);
			$form_wrapper.stop().animate({
				width : $currentForm.data('width') + 'px',
				height : $currentForm.data('height') + 'px'
			}, 500, function() {
				//new form gets class active
				$currentForm.addClass('active');
				//show the new form
				$currentForm.fadeIn(400);
			});
		});
		e.preventDefault();
	});

	function setWrapperWidth() {
		$form_wrapper.css({
			width : $currentForm.data('width') + 'px',
			height : $currentForm.data('height') + 'px'
		});
	}
	
	//设置提醒
	function setTips($item,tips){
		$item.text(tips);
		$item.css({"display":""});
	}
	//回调
	function _callBack(msg) {
			//用户名不存在
			alert(1);
			if (msg.status == 0) {
				
				setTips($infoUserName,"用户名不存在");
			}
			//用户名密码不匹配
			else if (msg.status == 1) {
				setTips($infoPwd,"用户名密码不匹配");
				
			}
			
		}

	var $userName = $("#user-name"),
		$pwd = $("#password"),
		$infoUserName = $("#info-user-name"),
		$infoPwd = $("#info_pwd");
		
	$userName.focus(function(){
		$infoUserName.css({"display":"none"});
	});
	$pwd.focus(function(){
		$infoPwd.css({"display":"none"});
	});
	$userName.blur(function(){
		if($userName.val() == '')
			setTips($infoUserName,"请输入用户名");
	});
	$pwd.blur(function(){
		if($pwd.val() == '')
			setTips($infoPwd,"请输入密码");
	});
	
	//异步提交
	$(".login_btn").click(function(){
	//用户名、密码必填
	if($userName.val() == ''){
		setTips($infoUserName,"请输入用户名");
	}
	if($pwd.val() == ''){
		setTips($infoPwd,"请输入密码");
	}
	else {
		$.post(handleUrl, {
			"userName" : $userName.val(),
			"pwd" : $pwd.val()
		}, function(msg) {
				//用户名不存在
				if(msg.status == 0){
					setTips($infoUserName,"用户名不存在");
					return;
				}
				//用户名密码不匹配
				if(msg.status == 1){
					setTips($infoPwd,"用户名密码不匹配");
					return;
				}
				//验证通过
				window.location.href = "http://localhost/tptest/index.php/admin/index/index";
		});
	}

});

