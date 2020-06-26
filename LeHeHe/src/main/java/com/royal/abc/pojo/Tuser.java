package com.royal.abc.pojo;

import java.util.Date;

public class Tuser {
	private int userid;
    private String username;
    private String  password;
    private String  nickname;
    private String  profilePhoto;
    private Date regdate;
    private Date  lastLoginTime;
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getProfilePhoto() {
		return profilePhoto;
	}
	public void setProfilePhoto(String profilePhoto) {
		this.profilePhoto = profilePhoto;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	public Date getLastLoginTime() {
		return lastLoginTime;
	}
	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}
	@Override
	public String toString() {
		return "Tuser [userid=" + userid + ", username=" + username + ", password=" + password + ", nickname="
				+ nickname + ", profilePhoto=" + profilePhoto + ", regdate=" + regdate + ", lastLoginTime="
				+ lastLoginTime + "]";
	}
	public Tuser(int userid, String username, String password, String nickname, String profilePhoto, Date regdate,
			Date lastLoginTime) {
		super();
		this.userid = userid;
		this.username = username;
		this.password = password;
		this.nickname = nickname;
		this.profilePhoto = profilePhoto;
		this.regdate = regdate;
		this.lastLoginTime = lastLoginTime;
	}
	public Tuser() {
		super();
	}
    
    
    
}
