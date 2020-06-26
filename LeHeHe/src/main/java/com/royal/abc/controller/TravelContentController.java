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
import com.royal.abc.pojo.Rig;
import com.royal.abc.pojo.TravelContent;
import com.royal.abc.pojo.View;
import com.royal.abc.service.RigService;
import com.royal.abc.service.TravelContentService;

@Controller
@RequestMapping(value="content")
public class TravelContentController {
	

	@Autowired
	private TravelContentService contentservice;
	
	
	
	@RequestMapping(value="/TrcontentJsonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public String contentShow(HttpServletResponse response) throws IOException {
		System.out.println("风景向前台传值");
		List<TravelContent> list= contentservice.getAllcontent();
	    Gson gson =new Gson();
	    response.addHeader("Access-Control-Allow-Origin", "*");
		String str= gson.toJson(list);
		return str;
	}


	///////////////////////
	/*@RequestMapping(value="/insertContent")
	public ModelAndView addRig(HttpServletResponse response) {
		System.out.println("向数据库添加游记数据");
		 response.addHeader("Access-Control-Allow-Origin", "*");
		ModelAndView mv = new  ModelAndView("insertcontent");
	
		return mv;
	}*/
	@RequestMapping(value="/insertcon")
	public ModelAndView insertc(HttpServletResponse response) {
		System.out.println("向数据库添加游记数据");
		 response.addHeader("Access-Control-Allow-Origin", "*");
		ModelAndView mv = new  ModelAndView("insertcontent");
	//	mv.addObject("infos", serv.queryAll());
		return mv;
	}
	@RequestMapping(value="/doInsertCon")
	public String doInsertcontet(TravelContent tc) {
		System.out.println("实际执行游记插入记录操作后返回结果页面");
		System.out.println("传入参数的值"+tc.toString());
		int flag=contentservice.insertContent(tc);
		if(flag>0) {
			return "insert";
		}else {
			return "error";
		}
		
		
	}
}
