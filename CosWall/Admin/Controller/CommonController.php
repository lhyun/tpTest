<?php
	namespace Admin\Controller;
	use Think\Controller;
	class CommonController extends  Controller{
		public function _initialize(){
			if(!isset($_SESSION['uid']) || !isset($_SESSION['pwd']))
				$this->redirect('Admin/Index/login');			
		}
	}
?>