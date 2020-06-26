package com.royal.abc.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.royal.abc.pojo.Category;
import com.royal.abc.pojo.User;
import com.royal.abc.service.TestService;
import com.google.gson.Gson;
@Controller
public class Usercontroll {

	@Autowired
	private TestService Userv;
	
	@RequestMapping(value="/UserJsonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public String show4(HttpServletResponse response) throws IOException {
		System.out.println("测试案例二：将后台相关集合转为JSon数据格式展示给用户");
		List<User> list= Userv.UqueryAll();
	    Gson gson =new Gson();
	    response.addHeader("Access-Control-Allow-Origin", "*");
		String str= gson.toJson(list);
		return str;
	}

	@RequestMapping(value="/UserJacksonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public List<User> show5() throws IOException {
		System.out.println("测试案例二：将后台相关集合对象自动转为JSon数据格式(推荐二)");
		List<User> list= Userv.UqueryAll();
	    
		return list;
	}
	
}
