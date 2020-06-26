package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.CommentsMapper;
import com.royal.abc.pojo.Comments;

@Service
public class CommentsService {

	
	@Autowired
	private CommentsMapper commentsmapper;
	
	
	public List<Comments> getAllcomments() {
		List<Comments> list = commentsmapper.getAllcomments();
		return list ;
	}
	////////////////////////////////////////////
	public int insertComments(Comments co) {
		int rtn=-1;
		System.out.println("调用业务层插入数据");
		  
		if(!"".equals(co)){
			rtn=commentsmapper.addOnecomments(co);
			System.out.println("添加成功");
		}
		return rtn;
	}
}
