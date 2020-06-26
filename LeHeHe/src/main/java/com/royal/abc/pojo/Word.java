package com.royal.abc.pojo;

public class Word {

	private int  wid;
	private String wcontent;
	public int getWid() {
		return wid;
	}
	public void setWid(int wid) {
		this.wid = wid;
	}
	public String getWcontent() {
		return wcontent;
	}
	public void setWcontent(String wcontent) {
		this.wcontent = wcontent;
	}
	@Override
	public String toString() {
		return "Word [wid=" + wid + ", wcontent=" + wcontent + "]";
	}
	public Word(int wid, String wcontent) {
		super();
		this.wid = wid;
		this.wcontent = wcontent;
	}
	public Word() {
		super();
	}
	
	
}
