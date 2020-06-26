<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SSM框架集成测试</title>
</head>
<body>
	<h3>集合显示测试页</h3>
	<c:if test="${infos==null || fn:length(infos) == 0}">
		<h3>空表无记录</h3>	
	</c:if>
	<c:forEach items="${infos}" var="item" varStatus="status">
		<p> 编号 = ${item.id} ； 名称 = ${item.tname} </p>				
	</c:forEach>	
</body>
</html>



