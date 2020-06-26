package com.royal.abc.mapper;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.logging.Logger;

import org.apache.log4j.spi.LoggerFactory;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.royal.abc.pojo.Rig;
import com.royal.abc.service.RigService;
public class loginJsonmapper {

	

	
	/**
	 * ASUS
	 * 简单封装Jackson，实现JSON String<->Java Object的Mapper.
	 * <p/>
	 * 封装不同的输出风格, 使用不同的builder函数创建实例.
	 */


	 
	    private ObjectMapper mapper;

	
	    //Include.Include.ALWAYS 默认
	    //Include.NON_DEFAULT 属性为默认值不序列化
	    //Include.NON_EMPTY 属性为 空（“”）  或者为 NULL 都不序列化
	    //Include.NON_NULL 属性为NULL 不序列化

	    public loginJsonmapper(Include nonEmpty) {
			// TODO 自动生成的构造函数存根
		}

		/**
	     * 属性为 空（“”） 或者为 NULL 都不序列化
	     */
	    public static loginJsonmapper nonEmptyMapper() {
	        return new loginJsonmapper(Include.NON_EMPTY);
	    }

	    /**
	     * 属性为默认值不序列化
	     */
	    public static loginJsonmapper nonDefaultMapper() {
	        return new loginJsonmapper(Include.NON_DEFAULT);
	    }

	    /**
	     * 属性为NULL不序列化
	     */
	    public static loginJsonmapper nonNullMapper() {
	        return new loginJsonmapper(Include.NON_NULL);
	    }


	    /**
	     * Object可以是POJO，也可以是Collection或数组。
	     * 如果对象为Null, 返回"null".
	     * 如果集合为空集合, 返回"[]".
	   

	    /**
	     * 反序列化POJO或简单Collection如List<String>.
	     * <p/>
	     * 如果JSON字符串为Null或"null"字符串, 返回Null.
	     * 如果JSON字符串为"[]", 返回空集合.
	     * <p/>
	     * 如需反序列化复杂Collection如List<MyBean>, 请使用fromJson(String,JavaType)
	     *
	     * @see #fromJson(String, JavaType)
	   
	    /**
	     * 反序列化复杂Collection如List<Bean>, 先使用函數createCollectionType构造类型,然后调用本函数.
	     *
	     * @see #createCollectionType(Class, Class...)
	   

	    /**
	     * 構造泛型的Collection Type如:
	     * ArrayList<MyBean>, 则调用constructCollectionType(ArrayList.class,MyBean.class)
	     * HashMap<String,MyBean>, 则调用(HashMap.class,String.class, MyBean.class)
	     */
	    public JavaType createCollectionType(Class<?> collectionClass, Class<?>... elementClasses) {
	        return mapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);
	    }

	    /**
	     * 當JSON裡只含有Bean的部分屬性時，更新一個已存在Bean，只覆蓋該部分的屬性.
	     */
	  

	    /**
	     * 輸出JSONP格式數據.
	     */
	    public String toJsonP(String functionName, Object object) {
	        return toJson(new JSONPObject(functionName, object));
	    }

		private String toJson(JSONPObject jsonpObject) {
			// TODO 自动生成的方法存根
			return null;
		}

		public String toJson(RigService map) {
			// TODO 自动生成的方法存根
			return null;
		}

		public String toJson(Rig map) {
			// TODO 自动生成的方法存根
			return null;
		}

	}


