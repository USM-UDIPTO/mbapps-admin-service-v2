package com.daimler.daivb.maa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MbappsAdminServiceV2Application {

	public static void main(String[] args) {
		SpringApplication.run(MbappsAdminServiceV2Application.class, args);
	}

}
