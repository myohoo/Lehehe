package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.ViewMapper;
import com.royal.abc.pojo.Note;
import com.royal.abc.pojo.View;
@Service
public class ViewService {

	@Autowired
	private ViewMapper viewmapper;
	public View UqueryById(int vid) {
		View view =viewmapper.findOneview(vid);
		return view;
	}
	public List<View>   VqueryAll() {
		List<View> list=viewmapper.getAllviews();	
	return list;
	}
	
	//////////////////////////////////////////
	public int Addview(View v) {
		int rtn=-1;
		System.out.println("调用业务层新增记录方法");
		  
		if(!"".equals(v)) {
			rtn=viewmapper.addviews(v);
			System.out.println("添加成功");
		}
		return rtn;
	}

}
