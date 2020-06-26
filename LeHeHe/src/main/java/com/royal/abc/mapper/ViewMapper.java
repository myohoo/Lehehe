package com.royal.abc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.royal.abc.pojo.View;

public interface ViewMapper {
	@Select("select * from view where id=#{vid}")
	public View findOneview(int vid);
	
	@Select("select * from view")
    public List<View> getAllviews();
	
	@Insert("insert into view values(#{vname})")
	public void addOneview(View v);
	
	 /*添加用户*/
    @Insert("insert into view(vpic,vname,vprice) values (#{vpic},#{vname},#{vprice})")
   public int addviews(View  view);

	
	@Delete("delete from view where id=#{vid}")
	public void removeOneview(int vid);
	
	@Update("update view set vname=#{name} where id=#{vid}")
	public void modifyOneview(View v);
}
