package com.royal.abc.pojo;

public class Spot {
	
	private int sid;
	private String sname;
	private String scity;
	public int getSid() {
		return sid;
	}
	public void setSid(int sid) {
		this.sid = sid;
	}
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
	}
	public String getScity() {
		return scity;
	}
	public void setScity(String scity) {
		this.scity = scity;
	}
	@Override
	public String toString() {
		return "Spot [sid=" + sid + ", sname=" + sname + ", scity=" + scity + "]";
	}
	public Spot(int sid, String sname, String scity) {
		super();
		this.sid = sid;
		this.sname = sname;
		this.scity = scity;
	}
	public Spot() {
		super();
	}
	
	
}
