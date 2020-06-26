package com.royal.abc.pojo;

public class User {

	private int uid;
	private String uname;
	private int upassword;
	private String email;
	private String upicture;
	
	
	
	@Override
	public String toString() {
		return "User [uid=" + uid + ", uname=" + uname + ", upassword=" + upassword + ", email=" + email + ", upicture="
				+ upicture + "]";
	}
	public User(int uid, String uname, int upassword, String email, String upicture) {
		super();
		this.uid = uid;
		this.uname = uname;
		this.upassword = upassword;
		this.email = email;
		this.upicture = upicture;
	}
	public User() {
		super();
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public int getUpassword() {
		return upassword;
	}
	public void setUpassword(int upassword) {
		this.upassword = upassword;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
