<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Ueditor内容展示</title>
		<link rel="stylesheet" type="text/css" href="Public/Css/bootstrap.css"/>
	</head>
	
	<body>
		<div class="container-fluid">
			<table class="table">
				<tr><th>uname</th>
					<th>favo</th>
					<th>html</th>
					<th>text</th>
				</tr>
				<tr><td><?php echo $_POST["uname"] ?></td>
					<td><?php echo $_POST["favo"] ?></td>
					<td><?php echo $_POST["html"] ?></td>
					<td><?php echo $_POST["text"] ?></td>
				</tr>
			</table>		
		</div>
	</body>
</html>
