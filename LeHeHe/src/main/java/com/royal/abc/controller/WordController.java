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
import com.royal.abc.pojo.TravelContent;
import com.royal.abc.pojo.Word;
import com.royal.abc.service.TravelContentService;
import com.royal.abc.service.WordService;
@Controller
@RequestMapping(value="word")
public class WordController {

	

	@Autowired
	private WordService woservice;
	
	@RequestMapping(value="/WordJsonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public String contentShow(HttpServletResponse response) throws IOException {
		System.out.println("文字向前台传值");
		List<Word> list= woservice.getAllwordcontent();
	    Gson gson =new Gson();
	    response.addHeader("Access-Control-Allow-Origin", "*");
		String str= gson.toJson(list);
		return str;
	}

	
	///////////////////////////////////////////////////////////////////
	@RequestMapping(value="/insertword")
	public ModelAndView insertword(HttpServletResponse response) {
		System.out.println("向数据库添加关键字数据");
		 response.addHeader("Access-Control-Allow-Origin", "*");
		ModelAndView mv = new  ModelAndView("insertword");
	//	mv.addObject("infos", serv.queryAll());
		return mv;
	}
	@RequestMapping(value="/doInsertWord")
	public String doInsertword(Word wc) {
		System.out.println("实际执行挂念自插入记录操作后返回结果页面");
		System.out.println("传入参数的值"+wc.toString());
		int flag=woservice.insertWord(wc);
		if(flag>0) {
			return "insert";
		}else {
			return "error";
		}
		
		
	}
}
