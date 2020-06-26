package com.royal.abc.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.royal.abc.pojo.Rig;

public interface RigMapper {
	
		
		@Select("select * from rig where userName=#{userName} and pwd=#{pwd}")
		public boolean CheckLogin(String userName,String pwd);
		
		@Select("select * from type")
	    public List<Rig> getAllRigs();
		
		@Insert("insert into rig(userName,pwd) values(#{userName},#{pwd})")
		public int addOneRig(Rig rig);
		
		@Delete("delete from type where id=#{id}")
		public void removeOneRig(int id);
		
		@Update("update type set tname=#{name} where id=#{id}")
		public void modifyOneRig(Rig r);

		///ArrayList<Category> getAllCateroy();
		
		
	}


