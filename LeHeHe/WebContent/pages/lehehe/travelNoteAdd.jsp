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
	
		
	
	<table border="1" style="border-collapse: collapse;" cellpadding="2" cellspacing="2">
	<form action="doUpTravelNote"   enctype="multipart/form-data" method="post" >
      <tr><td>游记编号</td><td><input type="text" name="tnid" ></td></tr>
       <tr><td>用户编号</td><td><input type="text" name="userid" ></td></tr>
      <!--   <tr><td>发表时间</td><td><input  type="text" name="pubtime"></td></tr> -->
        <tr> <td>图片</td><td><input type="file" name="file" ></td></tr>
          <tr><td>内容</td><td><input  type="text" name="content"></td></tr>
         <tr><td>点赞</td><td><input  type="text" name="likecount"></td></tr>
         </tr>
		
		 <td>地址</td><td><input  type="text" name="tposition"></td>
		</tr>
         <tr> <input type="submit" value="提交"  ></tr>
         </form>
        
   </table>
  
</body>
</html>