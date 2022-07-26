/**
 * Copyright 2017 Mercedes Benz Research & Development, A Daimler Company. All rights reserved.
 */

package com.daimler.daivb.maa.feign.model;

import java.util.List;

import lombok.Data;

/**
 * Local search service options POJO
 * 
 * @author smallir
 *
 */
@Data
public class LocalSearchServiceOptions {
    // ***************************************************************************************************************
    // ******************************************** Public Fields ****************************************************
    // ***************************************************************************************************************
    List<LocalSearchAdminOptions> lsAdminOptions;
}
