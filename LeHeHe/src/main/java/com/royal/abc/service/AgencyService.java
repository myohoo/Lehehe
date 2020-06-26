package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.AgencyMapper;
import com.royal.abc.mapper.SpotMapper;
import com.royal.abc.pojo.Agency;
import com.royal.abc.pojo.Spot;

@Service
public class AgencyService {
	
	@Autowired
	private AgencyMapper agencymapper;
	
	
	public List<Agency> getAllagencies() {
		List<Agency> list = agencymapper.getAllagencys();
		return list ;
	}
	////////////////////////////////////////////
	public int insertagency(Agency a) {
		int rtn=-1;
		System.out.println("调用业务层插入数据");
		  
		if(!"".equals(a)){
			rtn=agencymapper.insertOneagency(a);
			System.out.println("添加成功");
		}
		return rtn;
	}
}
