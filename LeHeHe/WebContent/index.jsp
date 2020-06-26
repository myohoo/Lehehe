<%@ page import="java.util.Date" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SSM框架集成测试</title>
</head>
<body>
	<h2>欢迎页</h2>
	<p>
	用来显示WebApp是否配置成功
	<% Date now = new Date(); %>
    服务器时间：<fmt:formatDate value="<%=now%>" pattern="yyyy-MM-dd HH:mm:ss"/>
	</p>
	<img alt="head" src="images/2.png" />
</body>
</html>



