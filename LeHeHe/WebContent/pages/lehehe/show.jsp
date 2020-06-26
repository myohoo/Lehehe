<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SSM框架集成测试</title>
</head>
<body>
	<h3>测试页</h3>
	<p>用来显示SpringMVC参数传递：<%=request.getAttribute("city") %> </p>
	<p> 换种显示语法：城市名称= ${city}  城市编号= ${cid} </p>
</body>
</html>



