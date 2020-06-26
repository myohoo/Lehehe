package com.royal.abc.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.royal.abc.service.RigService;

@Controller
public class LoginController {

	@Autowired
	private RigService loginserv;
	@RequestMapping(value="checkName")
    @ResponseBody
    //该方法的返回值是给ajax用的
    public String checkName(String userName, String pwd){
        boolean result=loginserv.getlogin(userName, pwd);
        if(result==true){
            return "failure";
        }else{
            return "success";
        }
    

		/*@PostMapping(value="loginCheck")
		public String login(@RequestParam("userName") String userName,
				
				@RequestParam("pwd") String pwd,
				HttpSer) {
			if(!StringUtils.isEmpty(userName)&&"".equals(pwd)) {
				session.setAttribute(s:"loginUser", userName);
				return "redirect:/main.html";
			}
		}*/
	/*@RequestMapping(value="login")
	public ModelAndView  login(){
		ModelAndView mv=new ModelAndView("login");
		return mv;
		
	}
	
	@RequestMapping(value="dologin"})
	public ModelAndView  login(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		String name=request.getParameter("name");
		String password=request.getParameter("password");
		map.put("name",name);
		map.put("password", password);
	    User user=userMapper.login(map);
	    if(user!=null){
	     return listall(user,request, response);
	    } else {	
	    request.getSession().setAttribute("msg","失败了！");
	    return new ModelAndView("login");
		}*/
 
	}
}
