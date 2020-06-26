package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.NoteMapper;
import com.royal.abc.pojo.Note;

@Service
public class NoteService {
	
	@Autowired
	private NoteMapper mapper;
	
	public Note queryById(int id) {
		Note c = mapper.findOne(id);
		return c ;
	}
	
	public List<Note> queryAll() {
		List<Note> list = mapper.getAll();
		return list ;
	}
	
	public int addInfo(Note c) {
		int rtn=-1;
		System.out.println("调用业务层新增记录方法");
		  
		if(!"".equals(c.getTname())) {
			rtn=mapper.addOne(c);
			System.out.println("添加成功");
		}
		return rtn;
	}
	
}
