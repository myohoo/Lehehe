package com.royal.abc.pojo;

import java.util.*;

public class TravelNotes {
	private int tnid;
	private int userid;
	/*private Date pubtime;*/
	private String picture;
	private String content;
	private int likecount;
	private String tposition;
	public int getTnid() {
		return tnid;
	}
	public void setTnid(int tnid) {
		this.tnid = tnid;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getLikecount() {
		return likecount;
	}
	public void setLikecount(int likecount) {
		this.likecount = likecount;
	}
	public String getTposition() {
		return tposition;
	}
	public void setTposition(String tposition) {
		this.tposition = tposition;
	}
	@Override
	public String toString() {
		return "TravelNotes [tnid=" + tnid + ", userid=" + userid + ", picture=" + picture + ", content=" + content
				+ ", likecount=" + likecount + ", tposition=" + tposition + "]";
	}
	public TravelNotes(int tnid, int userid, String picture, String content, int likecount, String tposition) {
		super();
		this.tnid = tnid;
		this.userid = userid;
		this.picture = picture;
		this.content = content;
		this.likecount = likecount;
		this.tposition = tposition;
	}
	public TravelNotes() {
		super();
	}
	
	
	
	
	
	
}
