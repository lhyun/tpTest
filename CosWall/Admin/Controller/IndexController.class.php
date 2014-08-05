<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends CommonController {
    public function index(){
		$this->assign("cosCons",M("cos_wall")->select());
    	$this->display();
    }
	public function delete(){
		if(M("cos_wall")->where("id='%d'",I("deleID"))->delete()){
			$this->ajaxReturn(array('status'=>1),'json');
		}
		else
			$this->ajaxReturn(array('status'=>0),'json');
	}
	
	public function destr(){
		$_SESSION['uid']='';
		$_SESSION['userName'] ='';
		$_SESSION['logintime']='';
		$_SESSION['loginip'] = '';
		$this->redirect("Admin/Login/index");
	}
}