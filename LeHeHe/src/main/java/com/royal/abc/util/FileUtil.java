package com.royal.abc.util;

import java.io.File;


import org.springframework.web.multipart.MultipartFile;

public class FileUtil {

	public void fileUpload(MultipartFile file,String strPath) throws Exception {
		
		System.out.println("实际执行文件上传操作："+ file.getOriginalFilename());
		File dest = new File(strPath) ;
		file.transferTo(dest);
	}
	
}
