<!-- TMS requests

Flow:
Admin signup
	Create company’s profile
	Invite his team
	Assign roles to team
	Projects

Siteurl: http://trackmysquad.com/

Method: POST

type = reqtype
Example:
Login
type = login
un = username
up = userpassword -->




<?php
$type = isset( $_POST['type'] )? $_POST['type'] : '';

switch($type){
	case "login":
		// Login user
		$username = isset( $_POST['un'] )? $_POST['un'] : '';
		$password = isset( $_POST['up'] )? $_POST['up'] : '';
		$issuccess = $objclsUser->userlogin($username, $password);
	break;
	case "signup":
		// Signup user
	break;
	case "createproj":
		// Create project from desktop app
		$projname = isset($_POST['projname'] )? $_POST['projname'] : '';
		$iscreated = $objclsProj->createProject($projname);
	break;
	case "createtask":
		// Create Task from the desktop application
		$taskname = isset( $_POST['tasktitle'] )? $_POST['tasktitle'] : '';
		$projectId = isset( $_POST['projectId'] )? $_POST['projectId'] : '';
		$istaskCreated = $objclsTask->createTask($taskname, $projectId);
	break;
	default:
	break;
}








// file2:
$type = isset( $_POST['type'] )? $_POST['type'] : '';
$output = array('status' => 0, 'response' => '', 'reqType' => $type, );
switch($type){
	case "login":
		//// Login user

		$username = isset( $_POST['un'] )? rawurldecode($_POST['un']) : '';
		$output['response'] = "Access Denied For user: " . $username ;
		$password = isset( $_POST['up'] )? rawurldecode($_POST['up']) : '';
		$dtuserBean = $objclsUser->authUser($username, $password);
		$output['bean'] = $dtuserBean;
		if( (int)$dtuserBean['id'] ){
			$output['status'] = 1;
			$output['response'] = $dtuserBean;
		}else{
			$output['response'] = $objclsUser->getprocessMsg();
		}
	break;
	case "getProjects":
		$userId = isset( $_POST['uid'] )? rawurldecode($_POST['uid']) : '';
		$dtuserInfo = $objclsUser->getusers($userId);
		$lstprojects = array();
		if($dtuserInfo){
			if( mysqli_num_rows( $dtuserInfo ) ){
				while( $druserInfo = mysqli_fetch_assoc( $dtuserInfo ) ){
					$companyId = isset( $druserInfo['companyId'] )?  $druserInfo['companyId'] : '';
					// Get Projects list for user's Company
					$dtProjects = $objclsProject->getProjects(0, $companyId);
					//$objclsUser->setuserBean( $druserInfo );
					if( mysqli_num_rows($dtProjects) ){
						while( $drProjectInfo = mysqli_fetch_assoc( $dtProjects ) ){
							$lstprojects[] = $drProjectInfo;
						}
						mysqli_free_result($dtProjects);
					}

				}
				mysqli_free_result( $dtuserInfo);
			}
		}
		$output = array('projectList' => $lstprojects);
		//$output = $objclsUser->getuserBean();
	Break;
//case "signup":
		//Signup user
	//break;
	//case "createproj":
		//// Create project from desktop app
		//$projname = isset($_POST['projname'] )? rawurldecode($_POST['projname']) : '';
		////$iscreated = $objclsProj->createProject($projname);
	//break;
	//case "createtask":
		//// Create Task from the desktop application
		//$taskname = isset( $_POST['tasktitle'] )? rawurldecode($_POST['tasktitle']) : '';
		//$projectId = isset( $_POST['projectId'] )? $_POST['projectId'] : '';
		////$istaskCreated = $objclsTask->createTask($taskname, $projectId);
	//break;
	case "capture":
		$dtpostData['filename'] = $filename = isset( $_POST['sn'] )? rawurldecode($_POST['sn']) : '';
		$projectId = isset( $_POST['projectId'] )? $_POST['projectId'] : '';
		$dtpostData['task'] = $task = isset( $_POST['task'] )? rawurldecode($_POST['task']) : '';
		$dtpostData['scrshotrecieved'] = 0;
		 $image_byte_code = rawurldecode($_POST['image']);
		$dtpostData['imglength'] = strlen($image_byte_code);
		$content = base64_decode($image_byte_code);
		$im = imagecreatefromstring($content);

		if ($im !== false) {
			header('Content-Type: image/png');
			imagejpeg($im, "uploads/$filename");
			imagedestroy($im);
			$dtpostData['scrshotrecieved'] = 1;
		}
	break;
	default:
	break;
}
echo json_encode($output);
?>
