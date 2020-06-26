package com.royal.abc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.royal.abc.pojo.Word;


public interface WordMapper {


	@Select("select * from word where wid=#{wid} and wcontent=#{wcontent}")
	public boolean CheckLogin(String userName,String pwd);
	
	@Select("select * from word")
    public List<Word> getAllwords();
	
	@Insert("insert into word(wid,wcontent) values(#{wid},#{wcontent})")
	public int insertOneword(Word word);
	
	@Delete("delete from type where id=#{id}")
	public void removeOneword(int wid);
	
	@Update("update type set tname=#{name} where id=#{id}")
	public void modifyOneword(Word r);
}
