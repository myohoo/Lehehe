package com.royal.abc.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.royal.abc.pojo.View;
import com.royal.abc.service.ViewService;
import com.royal.abc.util.FileUtil;

@Controller
@RequestMapping(value="/view" )
public class AddViewController {

	@Autowired
	private ViewService viewservi;
	/////////////////////////////上传文件//////////////////////////////////////////
	@RequestMapping(value="/uploadView" )		
	public ModelAndView upview1( HttpServletRequest req) {
		System.out.println("显示一个上传文件用的界面");
		System.out.println( req.getServletContext().getContextPath());
		System.out.println( req.getServletContext().getRealPath("/images"));
		ModelAndView mv=new ModelAndView("viewAdd");
		return mv;
	}
	///向前台传值
	@RequestMapping(value="/doUpView", method=RequestMethod.POST )		
	public ModelAndView file2( HttpServletRequest req , View v ,			
			@RequestParam("file")   MultipartFile file ) throws Exception{
//		上传文件
		String fname="view"+System.currentTimeMillis()+file.getOriginalFilename();
		String path = req.getServletContext().getRealPath("/images")+"\\"+fname;
		FileUtil util=new FileUtil();
		util.fileUpload(file, path);
//		向数据库里保存记录
		
		v.setVpic(fname);
		viewservi.Addview(v);
//		展示结果
		ModelAndView mv=new ModelAndView("travelshow");
		mv.addObject("vpic", fname);//设置属性
		return mv;
	}
}
