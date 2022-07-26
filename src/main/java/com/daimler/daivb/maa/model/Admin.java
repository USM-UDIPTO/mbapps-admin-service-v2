package com.daimler.daivb.maa.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "admin_v2")
@Data
public class Admin implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "full_name")
	private String fullName;

	@Column(name = "email")
	private String email;
	
	@Column(name = "role_name")
	private String roleName;

	public Admin() {}

	public Admin(String userName, String password, String fullName, String email, String roleName) {
		this.userName = userName;
		this.password = password;
		this.fullName = fullName;
		this.email = email;
		this.roleName = roleName;
	}
}
