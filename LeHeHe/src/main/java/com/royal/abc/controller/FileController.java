package com.royal.abc.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.royal.abc.pojo.Note;
import com.royal.abc.service.NoteService;
import com.royal.abc.util.FileUtil;

@Controller
@RequestMapping(value="/demo" )
public class FileController {

	@Autowired
	private NoteService serv;
	////////////////////////////////////////////向
	@RequestMapping(value="/upload" )		
	public ModelAndView file1( HttpServletRequest req) {
		System.out.println("显示一个上传文件用的界面");
		System.out.println( req.getServletContext().getContextPath());
		System.out.println( req.getServletContext().getRealPath("/images"));
		ModelAndView mv=new ModelAndView("fileUpload");
		return mv;
	}
	///向前台传值
	@RequestMapping(value="/doUpload", method=RequestMethod.POST )		
	public ModelAndView file2( HttpServletRequest req , Note n ,			
			@RequestParam("file")   MultipartFile file ) throws Exception{
//		上传文件
		String fname="aaa"+System.currentTimeMillis()+file.getOriginalFilename();
		String path = req.getServletContext().getRealPath("/images")+"\\"+fname;
		FileUtil util=new FileUtil();
		util.fileUpload(file, path);
//		向数据库里保存记录
		
		n.setPic(fname);
		serv.addInfo(n);
//		展示结果
		ModelAndView mv=new ModelAndView("flag");
		mv.addObject("pic", fname);//设置属性
		return mv;
	}
	
}
