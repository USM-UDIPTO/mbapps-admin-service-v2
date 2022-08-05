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

	public AdminDTO() {
		// TODO Auto-generated constructor stub
	}

	public AdminDTO(String userName) {
		this.userName = userName;
	}
}
