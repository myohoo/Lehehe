<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<form action="doInsertComments" method="post" >
		ID：<input type="text" name="cid" ><br>
		匿名：<input type="txt"  name="cname">
		评论：<input type="txt"  name="csubstance">
		<input type="submit" value="添加"  >
	</form>
</body>
</html>