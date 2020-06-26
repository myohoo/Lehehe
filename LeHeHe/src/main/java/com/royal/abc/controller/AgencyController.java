package com.royal.abc.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.royal.abc.pojo.Agency;
import com.royal.abc.service.AgencyService;

@Controller
@RequestMapping(value="agency")
public class AgencyController {

	@Autowired
	private AgencyService agservice;
	
	@RequestMapping(value="/AgencyJsonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public String AgencyShow(HttpServletResponse response) throws IOException {
		System.out.println("文字向前台传值");
		List<Agency> list= agservice.getAllagencies();
	    Gson gson =new Gson();
	    response.addHeader("Access-Control-Allow-Origin", "*");
		String str= gson.toJson(list);
		return str;
	}

	
	///////////////////////////////////////////////////////////////////
	@RequestMapping(value="/insertAgency")
	public ModelAndView insertagency(HttpServletResponse response) {
		System.out.println("向数据库添加关键字数据");
		 response.addHeader("Access-Control-Allow-Origin", "*");
		ModelAndView mv = new  ModelAndView("insertagency");
	//	mv.addObject("infos", serv.queryAll());
		return mv;
	}
	@RequestMapping(value="/doInsertAgency")
	public String doInsertagency(Agency a) {
		System.out.println("实际执行景区自插入");
		System.out.println("传入参数的值"+a.toString());
		int flag=agservice.insertagency(a);
		if(flag>0) {
			return "insert";
		}else {
			return "error";
		}
		
		
	}
}
