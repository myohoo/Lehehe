package com.royal.abc.pojo;

public class Category {
	
	private int id;
	private String tname;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}
	@Override
	public String toString() {
		return "Category [id=" + id + ", tname=" + tname + "]";
	}
	

}
