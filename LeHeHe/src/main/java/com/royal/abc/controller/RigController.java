package com.royal.abc.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.royal.abc.pojo.Rig;
import com.royal.abc.service.RigService;
@Controller
@RequestMapping(value="/Rig")
public class RigController {

	
	

		@Autowired
		private RigService rigserv;

		///////////////////////
		@RequestMapping(value="/addRig")
		public ModelAndView addRig(HttpServletResponse response) {
			System.out.println("SSM集成案例一：向数据库添加数据并呈现给用户");
			 response.addHeader("Access-Control-Allow-Origin", "*");
			ModelAndView mv = new  ModelAndView("addRig");
		//	mv.addObject("infos", serv.queryAll());
			return mv;
		}
		@RequestMapping(value="/doAddRig")
		public String addRig(Rig r) {
			System.out.println("SSM集成案例二:实际执行插入记录操作后返回结果页面");
			System.out.println("传入参数的值"+r.toString());
			int flag=rigserv.addRig(r);
			if(flag>0) {
				return "okay";
			}else {
				return "error";
			}
			
			
		}
		
	}

