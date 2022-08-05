package com.daimler.daivb.maa.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daimler.daivb.maa.dto.AdminDTO;
import com.daimler.daivb.maa.model.Admin;
import com.daimler.daivb.maa.repository.AdminRepository;
import com.daimler.daivb.maa.service.AdminService;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private AdminRepository adminRepository;

	@Override
	public AdminDTO saveOrUpdate(AdminDTO adminDTO) {
		Admin admin = null;
		if (adminDTO.getId() == null) {
			admin = mapper.map(adminDTO, Admin.class);
			adminDTO = mapper.map(adminRepository.save(admin), AdminDTO.class);
		} else {
			admin = adminRepository.findById(adminDTO.getId()).get();
			admin = copy(admin, adminDTO);
			adminDTO = mapper.map(adminRepository.save(admin), AdminDTO.class);
		}
		return adminDTO;
	}

	private Admin copy(Admin admin, AdminDTO adminDTO) {
		admin.setUserName(adminDTO.getUserName());
		return admin;
	}

	@Override
	public boolean adminUserNamecheck(String userName) {
		if (adminRepository.findByUserName(userName) != null)
			return true;
		return false;
	}

	@Override
	public List<AdminDTO> getAllAdmins() {
		return adminRepository.findAll().stream().map(admin -> mapper.map(admin, AdminDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public AdminDTO getAdmin(Long id) {
		return mapper.map(adminRepository.findById(id).get(), AdminDTO.class);
	}

	@Override
	public void deleteAdmin(Long id) {
		adminRepository.deleteById(id);
	}

}
