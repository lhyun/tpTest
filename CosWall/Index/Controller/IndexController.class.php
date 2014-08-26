<?php

namespace Index\Controller;

use Think\Controller;

class IndexController extends Controller {
	public function index() {
		
		$this->assign('data',M('cos_wall')->select());
		$this -> display();
	}

	public function handle() {
		// 正常提交
		if (!IS_POST)
			$this->error("页面不存在");
		$data = array(
			'content' => I('cosTextVal'),
			'user_id' => I('userID'),
			'date' => time()
		);
		if(M("cos_wall")->data($data)->add()){
			$data['date'] = date('y-m-d',$data['date']);
			$data['status'] = 1;
			$this -> ajaxReturn($data, 'json');
		}
		else
			$this->ajaxReturn(array('status'=>0),'json');
		// echo p( $_SERVER);
	}

}
