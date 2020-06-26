package com.royal.abc.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.royal.abc.pojo.Category;
import com.royal.abc.pojo.TravelNotes;
import com.royal.abc.pojo.View;
import com.royal.abc.service.TravelNotesService;
import com.royal.abc.service.ViewService;
import com.royal.abc.util.FileUtil;

@Controller
@RequestMapping(value = "/travel")
public class TravelNoteController {

	@Autowired
	private TravelNotesService travelservice;
	
	@RequestMapping(value="/TravelJsonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public String travelShow(HttpServletResponse response) throws IOException {
		System.out.println("风景向前台传值");
		List<TravelNotes> list= travelservice.getAllNotes();
	    Gson gson =new Gson();
	    response.addHeader("Access-Control-Allow-Origin", "*");
		String str= gson.toJson(list);
		return str;
	}

	@RequestMapping(value="/TravelJacksonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public List<TravelNotes> travelShow1() throws IOException {
		System.out.println("测试案例二：将后台相关集合对象自动转为JSon数据格式(推荐二)");
		List<TravelNotes> list= travelservice.getAllNotes();
	    
		return list;
	}
	//////////////////////////////添加游记//////////////////////////////
	
	/////////////////////////////上传文件//////////////////////////////////////////
	@RequestMapping(value="/upTravelNote" )		
	public ModelAndView uptravel( HttpServletRequest req) {
		System.out.println("显示一个上传游记文件用的界面");
		System.out.println( req.getServletContext().getContextPath());
		System.out.println( req.getServletContext().getRealPath("/images"));
		ModelAndView mv=new ModelAndView("travelNoteAdd");
		return mv;
	}
	///向前台传值
	@RequestMapping(value="/doUpTravelNote", method=RequestMethod.POST )		
	public ModelAndView uptravel2( HttpServletRequest req , TravelNotes t ,			
			@RequestParam("file")   MultipartFile file ) throws Exception{
//		上传文件
		String fname="TN"+System.currentTimeMillis()+file.getOriginalFilename();
		String path = req.getServletContext().getRealPath("/images")+"\\"+fname;
		FileUtil util=new FileUtil();
		util.fileUpload(file, path);
//		向数据库里保存记录
		
		t.setPicture(fname);
		travelservice.addNotes(t);
//		展示结果
		ModelAndView mv=new ModelAndView("travelshow");
		mv.addObject("picture", fname);//设置属性
		return mv;
	}
	
	
	
	
	
	
	
	
	
	
	//////////////////////////////////////////////////////////
	
	/*@RequestMapping(value = "/addnotes")
	public ModelAndView add1() {
		System.out.println(" SSM集成操作案例一 ： 显示用户新增记录用界面");
		ModelAndView mv = new ModelAndView("addOne");
		return mv;
	}

	@RequestMapping(value = "/doAdd")
	public String add2(Category c) {
		System.out.println(" SSM集成操作案例一 ： 实际执行插入记录的操作后返回结果页面");
		System.out.println("传入参数的值：" + c.toString());
		int flag = serv.addInfo(c);

		if (flag > 0) {
			return "ok";
		} else {
			return "error";
		}*/

}
