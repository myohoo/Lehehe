package com.royal.abc.pojo;

public class Note {
	
	private int id;
	private String tname;
	private String pic;
	
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
	
	
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	@Override
	public String toString() {
		return "Note [id=" + id + ", tname=" + tname + ", pic=" + pic + "]";
	}
	

}
