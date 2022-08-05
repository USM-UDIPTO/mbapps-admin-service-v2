package com.daimler.daivb.maa.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daimler.daivb.maa.dto.AdminDTO;
import com.daimler.daivb.maa.exception.BadRequestException;
import com.daimler.daivb.maa.exception.RecordNotFoundException;
import com.daimler.daivb.maa.feign.FeignMALUtil;
import com.daimler.daivb.maa.feign.model.LocalSearchAdminOptions;
import com.daimler.daivb.maa.service.AdminService;

import feign.FeignException.FeignClientException;

@RestController
@RequestMapping("/api")
public class AdminController {

	private final Logger log = LoggerFactory.getLogger(AdminController.class);

	@Autowired
	private AdminService adminService;

	@Autowired
	private FeignMALUtil feignMALUtil;

	@PostMapping("/admin")
	public ResponseEntity<AdminDTO> createAdmin(@RequestBody AdminDTO adminDTO) throws URISyntaxException {
		log.debug("REST request to save Admin : {}", adminDTO);
		adminDTO.setId(null);
		if (adminService.adminUserNamecheck(adminDTO.getUserName())) {
			throw new BadRequestException("User already exists!!");
		}
		AdminDTO result = adminService.saveOrUpdate(adminDTO);
		return ResponseEntity.created(new URI("/api/admins/" + result.getId())).body(result);
	}

	@GetMapping("/admins")
	public ResponseEntity<List<AdminDTO>> getAllAdmins() throws URISyntaxException {
		log.debug("REST request to get Admins");
		List<AdminDTO> admins = adminService.getAllAdmins();
		if (admins.isEmpty()) {
			throw new RecordNotFoundException("No Admins data found!!");
		}
		return ResponseEntity.ok(admins);
	}
	
	@GetMapping("/admin/{id}")
	public ResponseEntity<AdminDTO> getAdmin(@PathVariable("id") Long id) throws URISyntaxException {
		log.debug("REST request to get Admin with id : {} ", id);
		return ResponseEntity.ok(adminService.getAdmin(id));
	}

	@PutMapping("/admin")
	public ResponseEntity<AdminDTO> updateAdmin(@RequestBody AdminDTO adminDTO) {
		log.debug("REST request to update Admin : {} ", adminDTO);
		if (adminService.adminUserNamecheck(adminDTO.getUserName())) {
			throw new BadRequestException("User already exists!!");
		}
		return ResponseEntity.ok(adminService.saveOrUpdate(adminDTO));
	}

	@DeleteMapping("/admin/{id}")
	public ResponseEntity<HttpStatus> deleteAdmin(@PathVariable("id") Long id) throws URISyntaxException {
		log.debug("REST request to delete Admin with id : {} ", id);
		adminService.deleteAdmin(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping("/mal")
	public List<LocalSearchAdminOptions> getOptions() {
		List<LocalSearchAdminOptions> serviceOptionsList = new ArrayList<>();
		try {
			serviceOptionsList = feignMALUtil.serviceOptions("defaultServiceOptions").getLsAdminOptions();
		} catch (FeignClientException e) {
			e.printStackTrace();
		}
		return serviceOptionsList;
	}

	@PutMapping("/mal")
	public List<LocalSearchAdminOptions> updateOptions(@RequestBody List<LocalSearchAdminOptions> lsAdminOptions) {
		if (!lsAdminOptions.isEmpty()) {
			throw new BadRequestException("No things are to be updated");
		}
		List<LocalSearchAdminOptions> request = lsAdminOptions.stream().map(data -> {
			if (data.getTextSearch() == 0) {
				data.setComments("");
			}
			return data;
		}).collect(Collectors.toList());
		try {
			if (feignMALUtil.setServiceOptions(request) == HttpStatus.BAD_REQUEST) {
				throw new BadRequestException("Could not update!!");
			}
		} catch (FeignClientException e) {
			e.printStackTrace();
		}
		return request;
	}
}
