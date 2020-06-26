package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.royal.abc.mapper.UserMapper;
import com.royal.abc.pojo.User;

@Service
public class TestService {
	/*
	@Autowired
	private CategoryMapper mapper;
	
	public Category queryById(int id) {
		Category c = mapper.findOneCategory(id);
		return c ;
	}
	
	public List<Category> queryAll() {
		List<Category> list = mapper.getAllCategories();
		return list ;
	}
	
	public int addInfo(Category c) {
		int rtn=-1;
		System.out.println("调用业务层新增记录方法");
		  
		if(!"".equals(c.getTname())) {
			rtn=mapper.addOneCategory(c);
			System.out.println("添加成功");
		}
		return rtn;
	}
	*/

	////////////////////用户////////////////////////
@Autowired
private UserMapper usermapper;
public User UqueryById(int uid) {
	User user =usermapper.findOneUser(uid);
	return user;
}
public List<User>   UqueryAll() {
	List<User> list=usermapper.getAllUsers();	
return list;
}

	
	//////////////////////////////
	
	
	
}
