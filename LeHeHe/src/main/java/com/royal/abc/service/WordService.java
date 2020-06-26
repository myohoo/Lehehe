package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.TravelContentMapper;
import com.royal.abc.mapper.WordMapper;
import com.royal.abc.pojo.TravelContent;
import com.royal.abc.pojo.Word;

@Service
public class WordService {

	@Autowired
	private WordMapper wordmapper;
	
	/*public TravelContent queryById(int id) {
		Note c = contentmapper.insertTcontent(tc);
		return c ;
	}
	*/
	public List<Word> getAllwordcontent() {
		List<Word> list = wordmapper.getAllwords();
		return list ;
	}
	////////////////////////////////////////////
	public int insertWord(Word w) {
		int rtn=-1;
		System.out.println("调用业务层插入数据");
		  
		if(!"".equals(w)){
			rtn=wordmapper.insertOneword(w);
			System.out.println("添加成功");
		}
		return rtn;
	}
}
