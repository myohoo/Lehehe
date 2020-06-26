package com.royal.abc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.royal.abc.pojo.TravelContent;
import com.royal.abc.pojo.TravelNotes;

public interface TravelContentMapper {


	@Select("select u.userid,u.nickname,u.profile_photo,t.tnid,t.pubtime,t.picture,t.content,t.like_count,t.position from user u,travel_notes t where u.userid=t.userid")
	public TravelNoteMapper findTravelNotes();
	
	@Select("select * from traContent")
    public List<TravelContent> getAllTravelcontent();
	// @Insert("insert into view(vpic,vname,vprice) values (#{vpic},#{vname},#{vprice})")
	@Insert("insert into traContent(tid,tcontent,tlike,tposition) values(#{tid},#{tcontent},#{tlike},#{tposition})")
	public int insertTcontent(TravelContent travelcontent);
	
	@Delete("delete from note where id=#{id}")
	public void removeOne(int id);
	

	@Update("update user set  userid=#{userid},pubtime=#{pubtime},picture=#{picture},content=#{content},like_count=#{likecount},tposition=#{position}where tnid={tnid}")
	public void modifyOne(TravelNotes t);


}
