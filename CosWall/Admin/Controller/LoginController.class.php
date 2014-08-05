<?php
namespace Admin\Controller;
use Think\Controller;
class LoginController extends Controller{
	public function index() {
		$this -> display();
	}

	public function login() {
		if (!IS_POST) {
			$this -> error('页面不存在');
		}
		$userName = I("userName");
		$pwd = I("pwd","","md5");
		$Admin = M("admin");
		$user = $Admin->where("username='%s'",$userName)->find();
		$status = 2;
		//用户名不存在
		if(!$user){
			$status = 0;
			$this->ajaxReturn(array('status'=>0),'json');
			return ;
		}
		//用户名密码不匹配
		if($user["pwd"] != $pwd){
			$status = 1;
			$this->ajaxReturn(array('status'=>1),'json');
			return;
		}
		//验证通过
		
		$data = array(
			'id' => $user['id'],
			'logintime' => time(),
			'loginip' => get_client_ip(),
			'ilock' => 1
		);
//		var_dump($data);
//		var_dump($user);
		$Admin->save($data);
		session('uid',$user['id']);
		session('userName',$user['userName']);
		session('logintime', date('Y-m-d H:i:s', $user['logintime']));
		session('loginip', $user['loginip']);
		$this->ajaxReturn(array('status'=>$status),'json');
			
	}

}
?>