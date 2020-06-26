package com.royal.abc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.royal.abc.pojo.Comments;


public interface CommentsMapper {


	
	@Select("select * from comments where userName=#{userName} and pwd=#{pwd}")
	public boolean CheckLogin(String userName,String pwd);
	
	@Select("select * from comments")
    public List<Comments> getAllcomments();
	
	@Insert("insert into comments(cid,cname,csubstance) values(#{cid},#{cname},#{csubstance})")
	public int addOnecomments(Comments comments);
	
	@Delete("delete from type where id=#{id}")
	public void removeOnecomments(int id);
	
	@Update("update type set tname=#{name} where id=#{id}")
	public void modifyOnecomments(Comments r);

}
