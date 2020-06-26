package com.royal.abc.controller.article;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/aaa" )
public class ArticleController {

	@RequestMapping(value="/test")	
	public String fun1(Integer cid ) {
		System.out.println(cid);
		return "all";
	}
	
}
