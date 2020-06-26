package com.royal.abc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;


import com.royal.abc.pojo.User;


public interface UserMapper {

	@Select("select * from user where id=#{uid}")
	public User findOneUser(int uid);
	
	@Select("select * from user")
    public List<User> getAllUsers();
	
	@Insert("insert into user values(#{uname})")
	public void addOneUser(User c);
	
	 /*添加用户*/
    @Insert("insert into user(uname,upassword,email,upicture) values (#{uname},#{upassword},#{email},#{upicture})")
   public int addUsers(User  user);

	
	@Delete("delete from user where id=#{id}")
	public void removeOneUser(int uid);
	
	@Update("update user set uname=#{name} where id=#{uid}")
	public void modifyOneUser(User c);
}
