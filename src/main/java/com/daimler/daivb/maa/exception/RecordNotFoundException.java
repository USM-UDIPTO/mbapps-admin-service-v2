package com.daimler.daivb.maa.exception;

@SuppressWarnings("serial")
public class RecordNotFoundException extends RuntimeException {

	public RecordNotFoundException(String message) {
		super(message);
	}
}