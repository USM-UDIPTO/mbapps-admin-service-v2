package com.daimler.daivb.maa.exception;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ApiException {

	private final String message;
	private final HttpStatus status;

	public ApiException(String message, HttpStatus status) {
		this.message = message;
		this.status = status;
	}
}
