package com.royal.abc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.royal.abc.pojo.Spot;


public interface SpotMapper {

	@Select("select * from spot where wid=#{wid} and wcontent=#{wcontent}")
	public boolean CheckLogin(String userName,String pwd);
	
	@Select("select * from spot")
    public List<Spot> getAllspots();
	
	@Insert("insert into spot(sid,sname,scity) values(#{sid},#{sname},#{scity})")
	public int insertOnespot(Spot spot);
	
	@Delete("delete from type where id=#{id}")
	public void removeOnespot(int wid);
	
	@Update("update type set tname=#{name} where id=#{id}")
	public void modifyOnespot(Spot s);
}
