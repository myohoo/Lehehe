<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

	<table border="1" style="border-collapse: collapse;" cellpadding="2" cellspacing="2">
	<form action="doUpVpic"   enctype="multipart/form-data" method="post" >
      <tr><td>游记编号</td><td><input type="text" name="vpid" ></td></tr>
      
        <tr> <td>图片</td><td><input type="file" name="file" ></td></tr>
         
         <tr> <input type="submit" value="提交"  ></tr>
         </form>
        
   </table>

</body>
</html>