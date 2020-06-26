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
import com.royal.abc.pojo.Vpicture;
import com.royal.abc.service.VpictureService;
import com.royal.abc.util.FileUtil;

@Controller
@RequestMapping(value="vpic")
public class VpictureController {

	@Autowired
	private VpictureService vpicservice;
	
	@RequestMapping(value="/vpicJsonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public String vpicShow(HttpServletResponse response) throws IOException {
		System.out.println("图片");
		List<Vpicture> list= vpicservice.getAllVpic();
	    Gson gson =new Gson();
	    response.addHeader("Access-Control-Allow-Origin", "*");
		String str= gson.toJson(list);
		return str;
	}

	@RequestMapping(value="/vpicJacksonBody",produces="application/json;charset=UTF-8")
	@ResponseBody//将str变成了内容
	public List<Vpicture> vpicShow1() throws IOException {
		System.out.println("测试案例二：将后台相关集合对象自动转为JSon数据格式(推荐二)");
		List<Vpicture> list= vpicservice.getAllVpic();
	    
		return list;
	}
	
	
	/////////////////////////////上传图片//////////////////////////////////////////
	@RequestMapping(value="/upVpic" )		
	public ModelAndView upvpic( HttpServletRequest req) {
		System.out.println("显示一个上传游记文件用的界面");
		System.out.println( req.getServletContext().getContextPath());
		System.out.println( req.getServletContext().getRealPath("/images"));
		ModelAndView mv=new ModelAndView("upVpic");
		return mv;
	}
	///向前台传值
	@RequestMapping(value="/doUpVpic", method=RequestMethod.POST )		
	public ModelAndView upvpic2( HttpServletRequest req , Vpicture vp ,			
			@RequestParam("file")   MultipartFile file ) throws Exception{
//		上传文件
		String fname="TN"+System.currentTimeMillis()+file.getOriginalFilename();
		String path = req.getServletContext().getRealPath("/images")+"\\"+fname;
		FileUtil util=new FileUtil();
		util.fileUpload(file, path);
//		向数据库里保存记录
		
		vp.setVpic(fname);
		vpicservice.insertVpic(vp);
//		展示结果
		ModelAndView mv=new ModelAndView("vpicshow");
		mv.addObject("vpic", fname);//设置属性
		return mv;
	}
	
	
	
	
	
	
}
