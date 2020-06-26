package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.RigMapper;
import com.royal.abc.mapper.UserMapper;
import com.royal.abc.pojo.Rig;
import com.royal.abc.pojo.User;
@Service
public class RigService {

	
	@Autowired
	private RigMapper rigmapper;
	///////////////////////////调用mapper查询用户信息////////////////////////////
	public boolean getlogin(String userName,String pwd) {
		boolean login =rigmapper.CheckLogin(userName, pwd);
		return login;
	}
	///添加方法
		public int  addRig(Rig r) {
			int  rtn=-1;
			System.out.println("调用业务层新增记录方法");
			
			if(!"".equals(r.getUserName())) {
				rtn=rigmapper.addOneRig(r);
				System.out.println("添加成功");
			}
			
			return rtn;
		}
		
	/*
	public List<Rig>   UqueryAll() {
		List<User> list=rigmapper.getAllUsers();	
	return list;
	}*/
}
