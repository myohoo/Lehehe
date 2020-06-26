package com.royal.abc.pojo;

public class Vpicture {
	
	private int vpid;
	private String vpic;
	public int getVpid() {
		return vpid;
	}
	public void setVpid(int vpid) {
		this.vpid = vpid;
	}
	public String getVpic() {
		return vpic;
	}
	public void setVpic(String vpic) {
		this.vpic = vpic;
	}
	@Override
	public String toString() {
		return "Vpicture [vpid=" + vpid + ", vpic=" + vpic + "]";
	}
	public Vpicture(int vpid, String vpic) {
		super();
		this.vpid = vpid;
		this.vpic = vpic;
	}
	public Vpicture() {
		super();
	}
	
	
	

}
