package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.NoteMapper;
import com.royal.abc.mapper.TravelNoteMapper;
import com.royal.abc.mapper.UserMapper;
import com.royal.abc.pojo.Note;
import com.royal.abc.pojo.TravelNotes;
import com.royal.abc.pojo.User;
@Service
public class TravelNotesService {
	@Autowired
	private TravelNoteMapper travelmapper;
	
	/*public Note queryById(int id) {
		Note tr = travel.findOne(id);
		return c ;
	}*/
	
	public List<TravelNotes> getAllNotes() {
		List<TravelNotes> list = travelmapper.getAllTravelNote();
		return list ;
	}
	
	public int addNotes(TravelNotes t) {
		int rtn=-1;
		System.out.println("调用业务层新增记录方法");
		  
		if(!"".equals(t)) {
			rtn=travelmapper.addOneNote(t);
			System.out.println("添加成功");
		}
		return rtn;
	}
	
}
