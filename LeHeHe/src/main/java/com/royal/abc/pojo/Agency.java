package com.royal.abc.pojo;

public class Agency {

	private int aid;
	private String aname;
	private String adetail;
	public int getAid() {
		return aid;
	}
	public void setAid(int aid) {
		this.aid = aid;
	}
	public String getAname() {
		return aname;
	}
	public void setAname(String aname) {
		this.aname = aname;
	}
	public String getAdetail() {
		return adetail;
	}
	public void setAdetail(String adetail) {
		this.adetail = adetail;
	}
	@Override
	public String toString() {
		return "Agency [aid=" + aid + ", aname=" + aname + ", adetail=" + adetail + "]";
	}
	public Agency(int aid, String aname, String adetail) {
		super();
		this.aid = aid;
		this.aname = aname;
		this.adetail = adetail;
	}
	public Agency() {
		super();
	}
	
	
	
}
