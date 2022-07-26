package com.daimler.daivb.maa.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class AdminDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

	private String userName;

	private String password;

	private String fullName;

	private String email;

	private String roleName;

	public AdminDTO() {
		// TODO Auto-generated constructor stub
	}

	public AdminDTO(String userName, String password, String fullName, String email, String roleName) {
		this.userName = userName;
		this.password = password;
		this.fullName = fullName;
		this.email = email;
		this.roleName = roleName;
	}
}
