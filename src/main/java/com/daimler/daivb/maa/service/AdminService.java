/**
 * 
 */
package com.daimler.daivb.maa.service;

import java.util.List;

import com.daimler.daivb.maa.dto.AdminDTO;

/**
 *
 */
public interface AdminService {

	AdminDTO save(AdminDTO adminDTO);

	boolean adminUserNamecheck(String userName);

	List<AdminDTO> getAllAdmins();

}
