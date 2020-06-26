package com.royal.abc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.royal.abc.pojo.Note;



public interface NoteMapper {
	
	@Select("select * from note where id=#{id}")
	public Note findOne(int id);
	
	@Select("select * from note")
    public List<Note> getAll();
	
	@Insert("insert into note values(DEFAULT,#{tname},#{pic})")
	public int addOne(Note c);
	
	@Delete("delete from note where id=#{id}")
	public void removeOne(int id);
	
	@Update("update note set tname=#{name} where id=#{id}")
	public void modifyOne(Note c);

}
