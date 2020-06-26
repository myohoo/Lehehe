package com.royal.abc.pojo;

public class TravelContent {
 private int tid;
 private String tcontent;
 private int tlike;
 private String tposition;
public int getTid() {
	return tid;
}
public void setTid(int tid) {
	this.tid = tid;
}
public String getTcontent() {
	return tcontent;
}
public void setTcontent(String tcontent) {
	this.tcontent = tcontent;
}
public int getTlike() {
	return tlike;
}
public void setTlike(int tlike) {
	this.tlike = tlike;
}
public String getTposition() {
	return tposition;
}
public void setTposition(String tposition) {
	this.tposition = tposition;
}
@Override
public String toString() {
	return "TravelContent [tid=" + tid + ", tcontent=" + tcontent + ", tlike=" + tlike + ", tposition=" + tposition
			+ "]";
}
public TravelContent(int tid, String tcontent, int tlike, String tposition) {
	super();
	this.tid = tid;
	this.tcontent = tcontent;
	this.tlike = tlike;
	this.tposition = tposition;
}
public TravelContent() {
	super();
}
 

}
