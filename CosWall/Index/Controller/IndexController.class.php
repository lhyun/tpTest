<?php

namespace Index\Controller;

use Think\Controller;

class IndexController extends Controller {
	public function index() {
		$this->display ();
	}
	public function handle() {
		// 正常提交
		if (IS_AJAX) {
			$data = array(
				'content' =>I('cosTextVal'),
				'user_id' =>I('userID'),
				'date' =>time()
			);
			$wall = M ('COLLATIONS');
			$list = $wall->find();
			var_dump($list);
			$id =  $wall->data( $data )->add ();
			$data['status'] = 1;
			$this->ajaxReturn($data,'json');
 			
		} 		// 对于直接访问url进行过滤
		else
			$this->ajaxReturn(array('status' => 0),'json');
			E ( "页面不存在" );
		// echo p( $_SERVER);
	}
}