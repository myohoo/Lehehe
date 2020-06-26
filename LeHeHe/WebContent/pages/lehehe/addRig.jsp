<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SSM框架集成测试</title>
</head>
<body>
	<h3>测试页</h3>
	<p>用户注册</p>
	<form action="doAddRig" method="post" >
		用户名：<input type="text" name="userName" ><br>
		密码：<input type="password"  name="pwd">
		<input type="submit" value="新增记录"  >
	</form>
</body>
</html>
