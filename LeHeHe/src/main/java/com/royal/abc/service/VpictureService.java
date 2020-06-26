package com.royal.abc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.royal.abc.mapper.VpictureMapper;
import com.royal.abc.pojo.Vpicture;

@Service
public class VpictureService {

	@Autowired
	private VpictureMapper vpicmapper;

	public List<Vpicture> getAllVpic() {
		List<Vpicture> list = vpicmapper.getAllVpictures();
		return list ;
	}
	
	public int insertVpic(Vpicture vpic) {
		int rtn=-1;
		System.out.println("调用业务层新增记录方法");
		  
		if(!"".equals(vpic)) {
			rtn=vpicmapper.insertOneVpic(vpic);
			System.out.println("添加成功");
		}
		return rtn;
	}
}
