package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.SpotMapper;
import com.royal.abc.mapper.WordMapper;
import com.royal.abc.pojo.Spot;
import com.royal.abc.pojo.Word;

@Service
public class SpotService {

	@Autowired
	private SpotMapper spotmapper;
	
	/*public TravelContent queryById(int id) {
		Note c = contentmapper.insertTcontent(tc);
		return c ;
	}
	*/
	public List<Spot> getAllspots() {
		List<Spot> list = spotmapper.getAllspots();
		return list ;
	}
	////////////////////////////////////////////
	public int insertspot(Spot s) {
		int rtn=-1;
		System.out.println("调用业务层插入数据");
		  
		if(!"".equals(s)){
			rtn=spotmapper.insertOnespot(s);
			System.out.println("添加成功");
		}
		return rtn;
	}
	
}
