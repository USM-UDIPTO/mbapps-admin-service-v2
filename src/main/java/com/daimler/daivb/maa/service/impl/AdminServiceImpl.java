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
	public AdminDTO save(AdminDTO adminDTO) {
		Admin admin = mapper.map(adminDTO, Admin.class);
		return mapper.map(adminRepository.save(admin), AdminDTO.class);
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

}
