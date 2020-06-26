package com.royal.abc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.royal.abc.pojo.Agency;


public interface AgencyMapper {
	
	@Select("select * from agency where wid=#{wid} and wcontent=#{wcontent}")
	public boolean CheckLogin(String userName,String pwd);
	
	@Select("select * from agency")
    public List<Agency> getAllagencys();
	
	@Insert("insert into agency(aid,aname,adetail) values(#{aid},#{aname},#{adetail})")
	public int insertOneagency(Agency agency);
	
	@Delete("delete from type where id=#{id}")
	public void removeOneagency(int wid);
	
	@Update("update type set tname=#{name} where id=#{id}")
	public void modifyOneagency(Agency a);
}
