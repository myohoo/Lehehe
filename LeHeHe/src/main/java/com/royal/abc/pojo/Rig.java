package com.royal.abc.pojo;

public class Rig {

	private String userName;
	 private String pwd;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	@Override
	public String toString() {
		return "Rig [userName=" + userName + ", pwd=" + pwd + "]";
	}
	public Rig(String userName, String pwd) {
		super();
		this.userName = userName;
		this.pwd = pwd;
	}
	public Rig() {
		super();
	}
	 
	 
	 
}
