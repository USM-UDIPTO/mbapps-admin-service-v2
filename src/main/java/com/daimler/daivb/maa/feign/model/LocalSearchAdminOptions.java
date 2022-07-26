/**
 * Copyright 2017 Mercedes Benz Research & Development, A Daimler Company. All rights reserved.
 */

package com.daimler.daivb.maa.feign.model;

import lombok.Data;

/**
 * This Model class is for Local Search Admin Options.
 * 
 * @author smallir
 *
 */
@Data
public class LocalSearchAdminOptions {
    // ***************************************************************************************************************
    // ****************************************** Non Public Fields **************************************************
    // ***************************************************************************************************************
    private int id;

    private String searchTerm;

    private int nearBySearch;

    private int textSearch;

    private String comments;

    private int listId;
}
