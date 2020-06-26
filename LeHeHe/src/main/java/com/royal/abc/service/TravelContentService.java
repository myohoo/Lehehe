package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.NoteMapper;
import com.royal.abc.mapper.TravelContentMapper;
import com.royal.abc.pojo.Note;
import com.royal.abc.pojo.TravelContent;
@Service
public class TravelContentService {

	@Autowired
	private TravelContentMapper contentmapper;
	
	/*public TravelContent queryById(int id) {
		Note c = contentmapper.insertTcontent(tc);
		return c ;
	}
	*/
	public List<TravelContent> getAllcontent() {
		List<TravelContent> list = contentmapper.getAllTravelcontent();
		return list ;
	}
	////////////////////////////////////////////
	public int insertContent(TravelContent tc) {
		int rtn=-1;
		System.out.println("调用业务层插入数据");
		  
		if(!"".equals(tc)){
			rtn=contentmapper.insertTcontent(tc);
			System.out.println("添加成功");
		}
		return rtn;
	}
}
