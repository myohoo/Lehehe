package com.royal.abc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.royal.abc.pojo.Vpicture;

public interface VpictureMapper {



	@Select("select u.userid,u.nickname,u.profile_photo,t.tnid,t.pubtime,t.picture,t.content,t.like_count,t.position from user u,vpicture t where u.userid=t.userid")
	public TravelNoteMapper findVpicture();
	
	@Select("select * from vpicture")
    public List<Vpicture> getAllVpictures();
	// @Insert("insert into view(vpic,vname,vprice) values (#{vpic},#{vname},#{vprice})")
	@Insert("insert into vpicture(vpid,vpic) values(#{vpid},#{vpic})")
	public int insertOneVpic(Vpicture vpicture);
	
	@Delete("delete from note where id=#{id}")
	public void removeOne(int id);
	

	@Update("update user set  userid=#{userid},pubtime=#{pubtime},picture=#{picture},content=#{content},like_count=#{likecount},tposition=#{position}where tnid={tnid}")
	public void modifyOne(Vpicture t);


}
