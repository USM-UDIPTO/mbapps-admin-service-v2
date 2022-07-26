package com.daimler.daivb.maa.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.daimler.daivb.maa.feign.model.LocalSearchAdminOptions;
import com.daimler.daivb.maa.feign.model.LocalSearchServiceOptions;

@FeignClient(name = "feignMAL", url = "http://localhost:8081", path = "/lsservice/v1")
public interface FeignMALUtil {

	@RequestMapping(value = "/{service_type}", method = RequestMethod.GET)
    LocalSearchServiceOptions serviceOptions(@PathVariable(value = "service_type") String serviceType);

	@RequestMapping(value = "/setServiceOptions", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    HttpStatus setServiceOptions(@RequestBody List<LocalSearchAdminOptions> lsAdminOptions);
}
