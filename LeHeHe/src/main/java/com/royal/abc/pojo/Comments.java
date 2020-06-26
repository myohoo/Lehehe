package com.royal.abc.pojo;

public class Comments {

		private  int cid;
		private String cname;
		private String csubstance;
		public int getCid() {
			return cid;
		}
		public void setCid(int cid) {
			this.cid = cid;
		}
		public String getCname() {
			return cname;
		}
		public void setCname(String cname) {
			this.cname = cname;
		}
		public String getCsubstance() {
			return csubstance;
		}
		public void setCsubstance(String csubstance) {
			this.csubstance = csubstance;
		}
		@Override
		public String toString() {
			return "Comments [cid=" + cid + ", cname=" + cname + ", csubstance=" + csubstance + "]";
		}
		public Comments(int cid, String cname, String csubstance) {
			super();
			this.cid = cid;
			this.cname = cname;
			this.csubstance = csubstance;
		}
		public Comments() {
			super();
		}
		
		
		
}
