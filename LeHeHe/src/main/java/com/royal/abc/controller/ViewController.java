package com.royal.abc.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.royal.abc.pojo.User;
import com.royal.abc.pojo.View;
import com.royal.abc.service.TestService;
import com.royal.abc.service.ViewService;
import com.google.gson.Gson;
@Controller
public class ViewController {
	@Autowired
	private ViewService viewservice;
	
	@RequestMapping(value="/ViewJsonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public String viewShow(HttpServletResponse response) throws IOException {
		System.out.println("风景向前台传值");
		List<View> list= viewservice.VqueryAll();
	    Gson gson =new Gson();
	    response.addHeader("Access-Control-Allow-Origin", "*");
		String str= gson.toJson(list);
		return str;
	}

	@RequestMapping(value="/ViewJacksonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public List<View> viewShow1() throws IOException {
		System.out.println("测试案例二：将后台相关集合对象自动转为JSon数据格式(推荐二)");
		List<View> list= viewservice.VqueryAll();
	    
		return list;
	}

}
