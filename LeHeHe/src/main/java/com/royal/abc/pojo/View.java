package com.royal.abc.pojo;

public class View {

		private int vid;
		private String vpic;
		private  String vname;
		private int vprice;
		
		
		
		
		
		@Override
		public String toString() {
			return "View [vid=" + vid + ", vpic=" + vpic + ", vname=" + vname + ", vprice=" + vprice + "]";
		}
		public View() {
			super();
		}
		public View(int vid, String vpic, String vname, int vprice) {
			super();
			this.vid = vid;
			this.vpic = vpic;
			this.vname = vname;
			this.vprice = vprice;
		}
		public int getVid() {
			return vid;
		}
		public void setVid(int vid) {
			this.vid = vid;
		}
		public String getVpic() {
			return vpic;
		}
		public void setVpic(String vpic) {
			this.vpic = vpic;
		}
		public String getVname() {
			return vname;
		}
		public void setVname(String vname) {
			this.vname = vname;
		}
		public int getVprice() {
			return vprice;
		}
		public void setVprice(int vprice) {
			this.vprice = vprice;
		}
		
		
		
		
}
