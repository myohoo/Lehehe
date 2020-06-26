<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<h3>风景</h3>
	<p></p>
	<form action="doUpView"   enctype="multipart/form-data" method="post" >
		<table>
		<tr><td><input type="file" name="file" ></td>
		<td><input type="text" name="vname" ></td>
		<td><input  type="text" name="vprice"></td>
		<input type="submit" value="提交"  >
		</table>
	</form>
</body>
</html>