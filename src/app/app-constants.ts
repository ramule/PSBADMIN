 import { Injectable } from '@angular/core';

@Injectable()

export class AppConstants {

    uatURL={
        serviceURL_ESB:'https://infrabotsdev.infrasofttech.com/UploadOffer/',
        serviceURL_ESB_FILE: 'http://172.25.1.114:8085/PNSMiddleware/rest/Version/'
    }

    uatURL1={
        // serviceURL_ESB:'http://172.25.3.8:7085/test/',
        serviceURL_ESB:'http://172.25.3.8:7090/test/',
        serviceURL_ESB_FILE: 'http://172.25.1.114:8085/PNSMiddleware/rest/Version/'
    }

    uatURL2={
        serviceURL_ESB:'https://172.25.1.3:0443/UploadOffer/',
    }

    uatURL3={
        serviceURL_ESB:'https://infrabotsdev.infrasofttech.com/UploadOffer/',
    }

    uatURL4={
        // serviceURL_ESB :"https://infrabotsdev.infrasofttech.com/PSBAdminPortal/",
         //serviceURL_ESB:'http://172.25.3.8:8047/PSBAdminPortal/', -- aysha
        //serviceURL_ESB:'http://172.25.1.3:8090/PSBAdminPortal/', //-- aysha
         serviceURL_ESB:'http://172.21.1.103:8080/PSBAdminPortal/', //-- yogesh
       //serviceURL_ESB:'http://172.20.3.30.8083/PSBAdminPortal/', //-- Nalini
       // serviceURL_ESB:'http://192.168.29.102:8080/PSBAdminPortal/', //-- yogesh
        //  serviceURL_ESB:'http://172.20.3.49:8091/PSBAdminPortal/', //-- sushant
        //  serviceURL_ESB :'http://172.20.3.28:8080/PSBAdminPortal/',
         // serviceURL_ESB :'http://14.141.164.230:8090/PSBAdminPortal/',
        serviceURL_ESB_FILE: 'http://172.25.1.114:8085/PNSMiddleware/rest/Version/',
        serviceURL_TrackAudit: 'https://14.141.164.230:9010/AuditTrialAdapter/rest/AUDIT/',
        // serviceURL_ESB_FILE: 'https://infrabotsdev.infrasofttech.com/PNSMiddleware/rest/Version/'
        //serviceURL_ESB:'http://172.21.1.103:8080/PSBAdminPortal/'
    }

    uatURL5={
      serviceURL_ESB: 'http://1.7.192.201:443/PSBAdminPortal/',
      serviceURL_TrackAudit: 'http://172.24.144.3:3520/AuditTrialAdapter/'
    }

    uatURL6={
      serviceURL_ESB: 'https://psbuatappendssl.onlinepsb.co.in/PSBAdminPortal/',
      serviceURL_TrackAudit: 'http://172.24.144.3:3520/AuditTrialAdapter/'
    }

    uatURL7={
      serviceURL_ESB: 'http://172.24.96.2:8140/PSBAdminPortal/',
      serviceURL_TrackAudit: 'http://172.24.96.2:8140/AuditTrialAdapter/'
    }

    uatURL8={
      serviceURL_ESB: 'http://172.24.96.3:8140/PSBAdminPortal/',
      serviceURL_TrackAudit: 'http://172.24.96.3:8140/AuditTrialAdapter/'
    }

    publicUATUrl={
      serviceURL_ESB:'https://14.141.164.230:9010/PSBAdminPortal/',
      serviceURL_ESB_FILE: 'https://infrabotsdev.infrasofttech.com/PNSMiddleware/rest/Version/',
      serviceURL_TrackAudit: 'https://14.141.164.230:9010/AuditTrialAdapter/rest/AUDIT/'
    }

    publicUrl={
        serviceURL_ESB:'https://14.141.164.230:8090/PSBAdminPortal/',
        serviceURL_ESB_FILE: 'https://infrabotsdev.infrasofttech.com/PNSMiddleware/rest/Version/',
        serviceURL_TrackAudit: 'https://14.141.164.230:8090/AuditTrialAdapter/rest/AUDIT/'
    }

    devURL={
      serviceURL_ESB: 'http://1.7.192.200:443/PSBAdminPortal/',
      serviceURL_TrackAudit: 'http://172.24.128.2:3520/AuditTrialAdapter/'
    }

    infraDevURL = {
      serviceURL_ESB: 'https://infrabotsdev.infrasofttech.com/PSBAdminPortal/',
      serviceURL_TrackAudit: 'https://infrabotsdev.infrasofttech.com/AuditTrialAdapter/'
    }

    psbDevURL = {
      serviceURL_ESB: 'https://psbdev.onlinepsb.co.in/PSBAdminPortal/',
      serviceURL_TrackAudit: 'https://psbdev.onlinepsb.co.in/AuditTrialAdapter/'
    }

    psbPRODURL = {
      serviceURL_ESB : 'https://psbomniadmin.onlinepsb.co.in/PSBAdminPortal/',
      serviceURL_TrackAudit: 'https://psbomniadmin.onlinepsb.co.in/AuditTrialAdapter/'
    }

    apiURL = this.psbDevURL;

    /* encrption decrption */
    staticKey = "jrD@Mt6i#0mnip$b"
    languageKey = '@MrN$2Qi8R';
    // languageKey = 'laN@Jv8k#Omnip$b';
    sessionEncryptKey = '0mni@P$b#2020';
    val_sessionKey = "sessionKey";
    appName = "CORPORATE";

    loginUrl = 'login/getUserLogin';
    countryUrl = 'customer/countryRestriction';
    countryRestrictionUrl = 'customer/updateCountryRestrictionStatus';
    configMasterurl = 'masterconfig/getConfigMaster';
    configMasterByIdUrl = 'masterconfig/getConfigById/';
    updateConfigMasterUrl = 'masterconfig/updateConfigMaster';
    masterStatusUrl = 'masterconfig/getStatusList';
    masterListUrl = 'masterconfig/getAppMasterList';
    addConfigMasterUrl = 'masterconfig/addConfigMaster';
    getLanguageJSONUrl = 'masterconfig/getLanguageJson';
    addLanguageJSONUrl = 'masterconfig/addLanguagejson';
    getLanguageJSONByIdUrl = 'masterconfig/getLanguageJsonById/';
    updateLanguageJSONUrl = 'masterconfig/updateLanguageJson';
    getAppMasterListUrl = "masterconfig/getAppMasterList";
    getAllTransactionLogByDateUrl = 'masterconfig/getAllTransactionLogByDate';
    getCustLocation = "message/getCustomerLocation/";
    getTransactions = "transaction/getTransactions";
    getTransactionsDetails="transaction/getTransactionsDetails";
    getRegistrationDetails="customer/getRegistrationDetails";
    getCustomerDetails = 'customer/getCustomerDetails';
    getEditRoleDetails = 'admin/editRolesDetails';
    getAllRolesUrl = 'admin/getAllRoles';
    getAllUsersUrl = 'admin/getAllUsers';
    updateUserStatusUrl = 'admin/updateUserStatus';
    deleteUserUrl = 'admin/deleteUsersDetails/';
    addUserDetails = 'admin/addUserDetails';

    getActiveRoles = 'admin/getActiveRoles';
    savePSBMenu = 'menu/savePSBAppMenus';
    getRolesById = 'admin/getRoleDetailsById';
    getMenuRightsForRoleId = "menu/getMenuRightsForRoleId/";
    addRoleUrl = 'admin/addRole';
    getRoleByIdUrl = 'admin/getRoleDetailsById/';
    updateRolesStatus = "admin/updateRolesStatus";
    deleteRolesDetails ="admin/deleteRolesDetails";
    getStatusListUrl = 'masterconfig/getStatusList';
    getSubMenuRightsForMenuId ="menu/getSubMenuRightsForMenuId";
    getMasterMenuByIdUrl = 'menu/getMainMenuDetailsByid/';
    updateMasterMenuUrl = 'menu/updateMainMenu';
    getMasterMenuListUrl = 'menu/getMainMenu';
    addMasterMenuUrl = 'menu/addMainMenu';
    getDonationsDetailsUrl = 'donation/getDonationsList';
    saveDonationDetailsUrl = 'donation/saveDonationDetails';
    updateDonationDetailsUrl = 'donation/updateDonationDetails';
    getDonationDetailsByIdUrl = 'donation/getDonationById/';
    saveSubMenuRights = "menu/saveSubMenuRights";
    saveMenuRights = "menu/saveMenuRights";
    getTicket = 'tickets/getTickets';
    getCustDtlById = 'customer/getCustomerDetailsById';
    updateCustomerDtl = 'customer/updateCustomerDetails';
    getTicketById = 'tickets/getTicketsById';
    updateTicketId = 'tickets/updateTicketStatus';
    getOfferDetails = 'customer/getOfferDetails';
    getSubMenuBymenuId ="menu/getSubMenuBymenuId";
    addSubMenu = "menu/addSubMenu";
    updateMasterSubMenu = "menu/updateSubMenu";
    getMasterSubMenuById = 'menu/getSubMenuByid/';
    getRewardPoints = "customer/getWalletPoints";
    getRewardPointsById = "customer/getWalletPointsById/";
    getCustRewardPoints = "customer/getCustWalletsPoints";
    uploadFile = "file/offerFileUpload";
    addOfferDtls = "customer/addOfferDetails";
    getOfferDtlsById = "customer/getOfferDetailsByid";
    updateOfferDetails = "customer/updateOfferDetails";
    addWalletPoints = "customer/addWalletPoints";
    updateWalletPoints = "customer/updateWalletPoints";
    getUserDetailsById = "admin/getUserDetailsEdit/";
    updateUserDetailsUrl = "admin/editUserDetails";
    getLocationListUrl = "locations/getLocations";
    getLocationTypesUrl = "locations/getLocationsTypes";
    getCountryNamesUrl = "locations/getCountryNames";
    getStateNamesUrl = "locations/getStateNames/";
    getCityNamesUrl = "locations/getCityNames/";
    addLocationDetailsUrl = "locations/saveLocationDetails";
    getLocationDetailsByIdUrl = "locations/getLocationById/";
    updateLocationDetailsUrl = "locations/updateLocationDetails";
    getOmniChannelRequest = "omniChannel/getOmniChannelRequest/";
    getOmniChannelRequestById ="omniChannel/getOmniChannelRequestById/";
    proceedOmniChannelRequest = "omniChannel/proceedOmniChannelRequest/";
    getMasterFacilityDetailsUrl = "masterconfig/getAllFacilityStatus";
    saveMasterFacilityDetailsUrl = "masterconfig/addFacilityStatus";
    getMasterFacilityDetailsByIdUrl = "masterconfig/getAllFacilityStatusById/";
    updateMasterFacilityDetailsUrl = "masterconfig/updateFacilityStatusDetails";
    getKycImage = "customer/getKycImage";
    getProducts = "masterconfig/getProducts";
    getProductById = "masterconfig/getProductById/";
    saveProductDetails = "masterconfig/saveProductDetails";
    updateProductDetails = "masterconfig/updateProductDetails";
    getProductType = "masterconfig/getProductType";
    adminResetPassword = "admin/resetUserPassword";
    bulkUpload = "bulkCreation/bulkCustomerCreation";
    getMaskingRulesListUrl = "masterconfig/getMaskingRulesList";
    getMaskingRuleByIdUrl = "masterconfig/getMaskingRulesId/";
    addMaskingRules = "masterconfig/addMaskingRules";
    upadateMaskingRules = "masterconfig/updateMaskingRules";
    getSecurityQuestions = "customer/getSecurityQuestions";
    getSecurityQuestionById = "customer/getSecurityQuestionById/";
    addSecurityQuestions = "customer/addSecurityQuestions";
    updateSecurityQuestions = "customer/updateSecurityQuestions";



    getDeviceMasterDetails = "customer/getDeviceMasterDetails";
    getAllTrasactionLog = "masterconfig/getAllTransactionLogByDate";
    getDeviceMasterDetailsById = "customer/getDeviceMasterDetailsById/";
    updateDeviceDetails = "customer/updateDeviceDetails";


    forgotPasswordUrl = "login/forgetPassword";
    getAllTransactionLogById = "masterconfig/getAllTransactionLog/"
    changePasswordUrl = "login/changePassword";
    custResetPassword = "customer/resetCustPassword";
    getCustByCifMobileName = "customer/getCustByCifMobileName";
    getAllCustomersDetailsUrl = "customer/getAllCustomers";
    getMenuDetailsAccessUrl = "menu/getMenuDetailsAccess";

     /*** api related to notification */
    getNotificationUrl = "notification/getNotificationTempData";
    getNotificationMasterList = "notification/getNotificationMasterList";
    getNotificationByIdUrl = "notification/getNotificationTempDataById/";
    updateNotificationUrl = "notification/updateNotificationTempData";
    deleteNotificationUrl = "notification/deletetNotificationTemp/";
    saveNotificationUrl = "notification/saveNotificationTempData";
    getNoticationDtl = "notification/getNotificationList";
    resedNotification = "notification/sendNotificationTocust";
    /*** api related to rm */
    getRmMasterUrl = "customer/getRMMasterData";
    saveRMMasterData = "customer/saveRMMasterData";
    getRmMasterByIdUrl = "customer/getRMMasterDataById/";
    updateRmMasterUrl = "customer/updateRMMasterData";
    deletetRMMasterUrl = "customer/deletetRMMasterById/";
    getChannelListUrl = "customer/getChannelList";
    /*** api related to survey */
    addSurveMasterDetails = "survey/addSurveMasterDetails";
    getActiveSurveyDetails = "survey/getActiveSurveyDetails";
    getSurveyQuestion = "survey/getSurveyQue";
    saveCustAnsOfSurvey = "survey/addSurveyQueAndAns";
    getSurveyAnswer = "survey/getSurveyAns";
    getSurveyQuestionById = "survey/getSurveyQueBySurveyId";
    getSurveyReqAns = "survey/getSurveyAnsRequest";
    getSurveyMasterDetailsById = "survey/getSurveyMasterDetailsById/";
    updateSurveMasterDetails = "survey/updateSurveMasterDetails";
    UpdateSurveyQueAndAns ="survey/UpdateSurveyQueAndAns";

    getCustomerTypeUrl = "customer/getCustomerType";
    getTransactionTypeUrl = "transaction/getTransactionsType";
    getCustDetails = "notification/getCustDetails";
    addNotificationDetails ="notification/addNotificationDetails";
    /*** api related to customer Info */
    getCustomerInfo = "customer/getCustOtherInfo";
    getCustomerInfoById = "customer/getCustOtherInfoById";
    updateCustomerInfo = "customer/updateCustOtherInfo";
    saveCustOtherInfo = "customer/saveCustOtherInfo";
    getCustomerInfoByCustId = "customer/getCustOtherInfoByCustId";
    /** api related to calculator */
    getCalculatorFormula = "calculator/getCalculatorFormulaDetails";
    calculatorType = "calculator/getCalculatorMasterDetails";
    saveCalculatorFormula = "calculator/addCalculatorFormulaDetails";
    updateCalculatorFormula = "calculator/updateCalculatorFormulaDetails";
    getCalculatorFormulaId = "calculator/getCalculatorFormulaById";
    /** api related to announcement */
    getAccouncementsDetails ="announcement/getAccouncementsDetails";
    getAnnouncementsById ="announcement/getAnnouncementsById/";
    getAnnouncementType ="announcement/getAnnouncementType";
    saveAnnouncementsDetais ="announcement/saveAnnouncementsDetais";
    updateAnnouncementsDetails="announcement/updateAnnouncementsDetais"

    /* api related to calculator*/
    getCalculatorMasterDetailsUrl = "calculator/getCalculatorMasterDetails";
    getCalculatorMasterByIdUrl = "calculator/getCalculatorMasterById/";
    addCalculatorMasterDetailsUrl = "calculator/addCalculatorMasterDetails";
    updateCalculatorMasterDetailsUrl = "calculator/updateCalculatorMasterDetails";

    /* api related to bank token*/
    getTicketListUrl = "tickets/getBankTokenRequest";
    getTicketListByIdUrl = "tickets/getBankTokenById/";
    generateTokenRequestUrl = "tickets/generateBankToken";
    deleteBankTokenUrl = "tickets/rejectBankToken";

    /* api related to adapter*/
    addAdapterSrcChannel ="adapter/addAdapterSrcChannel";
    updateAdapterSrcChannel="adapter/updateAdapterSrcChannel";
    getAdaptrSrcChannel = "adapter/getAdaptrSrcChannel";
    deletetAdapterSrcChannel = "adapter/deletetAdapterSrcChannel"
    getAdaptrSrcChannelById ="adapter/getAdaptrSrcChannelById/";
    getAdapterSrcIpDetailsUrl = "adapter/getAdapterSrcIpDetails";
    getAdapterSrcIpByIdUrl = "adapter/getAdapterSrcIpById/";
    deleteAdapterSrcIpUrl = "adapter/deleteAdapterSrcIP";
    addAdapterSrcIpUrl = "adapter/addAdapterSrcIP";
    updateAdapterSrcIpUrl = "adapter/updateAdapterSrcIP";
    getAdapterAuditLogByDate="adapter/getAdapterAuditLogByDate";

    /* api related to Omni channel request*/

    generateOtpRequestUrl = "omniChannel/generateOtpRequest";
    validateOtpRequestUrl = "omniChannel/validateOtpRequest";

    /* API related to Submenu rights */
    getPriviledgeDataUrl = "menu/getPrivilageDataForMenuId/";
    getAllSubMenuListUrl = "menu/getAllSubMenuList";

    /* API related to send particular data via emails to customers */
    sendEmailWithAttachmentUrl = "customer/sendEmailWithAttachment";

    /* api related to Corporate Company*/
    getCorpCompanyDetailsUrl = "corporate/getAllCorpCompanyDetails";
    getCorpCompanyDetailByIdsUrl = "corporate/getCorpCompanyDetailsByID/";
    addCorpCompanyDetailsUrl = "corporate/addCorpCompanyDetails";
    updateCorpCompanyDetailsUrl = "corporate/updateCorpCompanyDetails";
    getAllCorpCompanyMenu = "corporate/getAllCorpCompanyMenu";
    getAllCorpCompanyMenuByCompanyIdUrl = "corporate/getAllCorpCompanyMenuByCompId";

    /* API related to corporate menu rights */
    getCorpCompanyMenuListAndMappingUrl = "corporate/getCorpCompanyMenuListAndMapping";
    getCorpMenuRightsForRoleIdUrl = "corporate/getCorpMenuRightsForRoleId";
    saveCorpMenuRightsUrl = "corporate/saveCorpMenuRights";

    /* API related to Corporate Menu */
    getAllCorpMenus = "corporate/getAllCorpMenus";
    addCorpMenu ="corporate/addCorpMenu";
    getCorpMenuById = "corporate/getCorpMenuById/";
    updateCorpMenu = "corporate/updateCorpMenu"

    /* API related to Corporate User Types */
    getCorpUserTypesUrl = "corporate/getCorpUserTypes";
    getCorpUserTypesByIdUrl = "corporate/getCorpUserTypesById/";
    addCorpUserTypeUrl = "corporate/addCorpUserTypes";
    updateCorpUserTypesUrl = "corporate/updateCorpUserTypes";
    getDynamicRolesByCompId ="corporate/getDynamicRolesByCompId/"

    /* API related to Corporate Account User Types */
    addCorpUserTypeAccount = "corporate/addCorpUserTypeAccount";
    getAllAccountTypes = "admin/getAllAccountTypes"
    getAllCorpUserTypeAccount = "corporate/getAllCorpUserTypeAccount"
    getCorpUserTypeAccountById="corporate/getCorpUserTypeAccountById/"
    updateCorpUserTypeAccount = "corporate/updateCorpUserTypeAccount"

     /* API related to Corporate Company Menu */
     getCorpCompanyMenuListById ="corporate/getCorpCompanyMenuListById/"
    updateCorpCompanyMenu = "corporate/updateCorpCompanyMenu"
    addCorpCompanyMenu = "corporate/addCorpCompanyMenu"

    /* API related to theme apply */
    getAllThemeNamesUrl = "theme/getAllThemeNames";
    getAllThemeColorsUrl = "theme/getAllThemesSideBarColor";
    getAllThemeBgColorsUrl = "theme/getAllThemesBackgroundColor";
    getAllThemeMenuOptions = "theme/getAllThemeMenuOption";
    saveThemeNameUrl = "theme/addThemeNames";
    saveThemeColorUrl = "theme/addThemeSideBarColor";
    saveThemeBgColorUrl = "theme/addThemesBackgroundColor";
    saveMenuOptionUrl = "theme/addAllThemeMenuOption";
    saveThemeUrl = "theme/saveTheme";
    getAllThemesUrl = "theme/getAllThemes";
    getThemeByIdUrl = "theme/getThemesById/";
    updateThemeUrl = "theme/updateThemes";
    updateThemeNameUrl = "theme/updateThemeNames";
    updateThemeColorUrl = "theme/updateThemeSideBarColor";
    updateThemeBgColorUrl = "theme/updateThemesBackgroundColor";
    updateThemeMenuOptionUrl = "theme/updateThemeMenuOption";

    /* API related to get submenu ids */
    getLeftMenuByMenuLinkUrl = "menu/getLeftMenuByMenuLink/";

    /* API related to Admin profile image upload*/
    editUserImage = "admin/editUserImage"

    /* API related to corporate account types */
    getAccountTypeDetailsUrl = "admin/getAllAccountTypes";
    getAccountTypeDetailsByIdUrl = "admin/getAccountTypeById/";
    saveAccountTypeDetailsUrl = "admin/addAccountType";
    updateAccountTypeDetailsUrl = "admin/updateAccountType";

    /* API related to track user activity */
    insertAudit = "INSERTAUDITADMIN";
    getAdminUserActivityLogs = "admin/getAdminPortalUserActivityLogs";
    getAdminUserActivityLogsByDateUrl = "admin/getAdminPortalUserActivityLogsDetailsByDate";

    /* API related to maker checker and approver request */
    getAllDataForChecker = "adminWorkFlow/getAllDataForChecker";
    getAllDataForMaker = "adminWorkFlow/getAllDataForMaker";
    getAllDataForApprover = "adminWorkFlow/getAllDataForApprover";

    /* API related to corporate maker checker and approver request */
    getAllDataForCorporateChecker = "adminWorkFlow/getAllDataForCorpChecker";
    getAllDataForCorporateMaker = "adminWorkFlow/getAllCorpDataForMaker";
    getAllDataForCorporateApprover = "adminWorkFlow/getAllCorpDataForApprover";

    /*checker approve or reject request url */
    makerCheckerReqUrl = "adminWorkFlow/updateStatusByChecker";

    /* approver approve or reject request url */
    approverReqUrl = "adminWorkFlow/updateStatusByApprover";

     /* checker approve all or reject all request url */
    updateStatusListByChecker = "adminWorkFlow/updateStatusListByChecker"

    /* approver approve all or reject all request url */
    updateStatusListByApprover = "adminWorkFlow/updateStatusListByApprover"

    /* maker close request url */
    makerReqUrl = "adminWorkFlow/updateRequestByMaker";

    /* corp maker close request url */
    corpMakerReqUrl = "adminWorkFlow/updateRequestByCorpMaker";

    /*corp checker approve or reject request url */
    corpCheckerReqUrl = "adminWorkFlow/updateStatusByCorpChecker";

    /*corp approver approve or reject request url */
    corpApproverReqUrl = "adminWorkFlow/updateStatusByCorpApprover";

     /*corp checker approve all or reject all request url */
    updateStatusListByCorpChecker = "adminWorkFlow/updateStatusListByCorpChecker"

    /*corp approver approve all or reject all request url */
    updateStatusListByCorpApprover = "adminWorkFlow/updateStatusListByCorpApprover"

    /* activity setting request url */
    getAllActivitySetting = "admin/getAllActivitySetting"
    getActivitySettingById = "admin/getActivitySettingById/"
    updateActivitySetting = "admin/updateActivitySetting"
    getAllActivitySettingForAdmin="admin/getAllActivitySettingForAdmin"

    /* API related to Remark Histoy data */
    getRemarkHistoryDataUrl = "admin/getAdminWorkflowHistoryDetailsById/";

    /* API related to Customer Bulk Registration */
    saveBulkCustomers = "customer/saveBulkCustomers"

    /* API Related to Unfreeze customer account */
    unFreezeAccountUrl = "admin/updateFreezeAccount";

    /* API related to generate customer token */
    generateCustomerTokenUrl = "tickets/generateCustomerToken";

    /* APIs related to notification categories */
    getNotificationCategoriesUrl = "category/getAllCategoriesMaster";
    getNotificationCategoriesByIdUrl = "category/getCategoriesMasterById/";
    saveNotificationCategoriesUrl = "category/addCategoriesMaster";
    updateNotificationCategoriesUrl = "category/updateCategoriesMaster";

    /* APIs related to customer notification categories */
    getCustNotificationCategoriesUrl = "category/getAllCustNotificationCategories";
    getCustNotificationCategoriesByIdUrl = "category/getCustNotificationCategoriesById/";
    saveCustNotificationCategoriesUrl = "category/addCustNotificationCategories";
    updateCustNotificationCategoriesUrl = "category/updateCustNotificationCategories";

    /* APIs related to limits master */
    getAllOmniLimitMaster = "admin/getAllOmniLimitMaster"
    addOmniLimitMaster ="admin/addOmniLimitMaster"
    getOmniLimitMasterById = "admin/getOmniLimitMasterById/"
    updateOmniLimitMaster = "admin/updateOmniLimitMaster"

    /* APIs related to Account Leads */
    getCustAllAccountDetails = "masterconfig/getCustAllAccountDetails"

    /* APIs related to corporate user */
    getAllCorpUsersUrl = "corporate/getAllCorpUsers";
    getCorpUserByIdUrl = "corporate/getCorpUserById/";
    addCorpUserUrl = "corporate/addCorpUser";
    updateCorpUserUrl = "corporate/updateCorpUser";
    getAccountsByCif = "corporate/getAccountsByCif";

    /* API related to file upload */
    uploadFileUrl = "file/fileUpload";

    /* API related to Corporate Set Limit */
    getCorpUsersByCompId = "corporate/getCorpUsersByCompId/";
    getCorpLevelsUrl = "corporate/getCorpLevels/";
    getCorpApproverTypeListUrl = "corporate/getCorpApproverTypeList/";
    getCorpUsersByCompIdUrl = "corporate/getCorpUsersByCompId/";
    setCorpTransactionsLimitUrl = "corporate/setCorpTransactionsLimit";
    getCorpTransactionsLimitUrl = "corporate/getAllTransationByAccNoAndCompId/";
    getTranByAccNoAndCompIdAndTransIdUrl = "corporate/getTranByAccNoAndCompIdAndTransId/";
    updateCorpTransactionsLimitUrl = "corporate/updateCorpTransactionsLimit";

     /* API related to Corporate Activity Settings */
     getAllActivitySettingForCorp = "corpMakerChecker/getCorpActivitiesAndMapping/";
     saveCorpActivitiesUrl = "corpMakerChecker/saveCorpActivities";

     /* API related to Corporate Salary Bulk Upload */
     bulkSalaryUpload = "corpMakerChecker/bulkSalaryUpload"

     /* APIs related to corporate donation */
     getCorpDonationsDetailsUrl = 'corpDonation/getCorpDonationsList';
     saveCorpDonationDetailsUrl = 'corpDonation/saveCorpDonationDetails';
     updateCorpDonationDetailsUrl = 'corpDonation/updateCorpDonationDetails';
     getCorpDonationDetailsByIdUrl = 'corpDonation/getCorpDonationById/';

     /* APIs related to corporate designation hierarchy mappings URLs */
     getDesignationHierarchyByCompIdUrl = "corpMakerChecker/getDesignationHierarchyByCompId/";
     getAllDesignationHierarchyUrl = "corpMakerChecker/getAllDesignationHierarchy";
     getDesignationHierarchyByIdUrl = "corpMakerChecker/getDesignationHierarchyById/";
     addDesignationHierarchyUrl = "corpMakerChecker/addDesignationHierarchy";
     updateDesignationHierarchyUrl = "corpMakerChecker/updateDesignationHierarchy";
     getAllCorpLevelsUrl = "corporate/getAllCorpLevels";

    /* API related to Corporate User Bulk Regsitration */
     corpBulkUser = "corpBulkUser/saveBulkCorpUsers"

     /* API related to Corporate Product Master */
     getCorpProducts = "corpProduct/getCorpProducts";
     saveCorpProductDetails = "corpProduct/saveCorpProductDetails";
     getCorpProductById = "corpProduct/getCorpProductById/";
     updateCorpProductDetails = "corpProduct/updateCorpProductDetails";

     /* APIs related to Active Directory */
     checkUserUrl = "activeDirectory/checkUser";
     validateUserUrl = "activeDirectory/validateADUser";

     /* APIs related to corporate audit transactions */
     getCorpTransactionsUrl = "transaction/getCorpTransactions";

     /* APIs related to Login get User Type */
     getUserLoginTypes ="login/getUserLoginTypes";

     /* APIs related to master customize submenu */
     getAllCustomizationSubMenuUrl = "menu/getAllCustomizationSubMenu";
     getCustomizeSubMenuByMenuIdUrl = "menu/getCustomizeSubMenuByMenuId/";
     getCustomizeSubMenuByIdUrl = "menu/getCustomizeSubMenuByid/";
     getCustomizationSubMenuByidUrl = "menu/getCustomizationSubMenuByid/";
     addCustomizeSubMenuUrl = "menu/addCustomizationSubMenu";
     updateCustomizeSubMenuUrl = "menu/updateCustomizationSubMenu";
     getCustomizeSubMenuRightsForMenuIdUrl = "menu/getCustomizeSubMenuRightsForMenuId/";
     getCustomizationSubMenuByMenuIdUrl = "menu/getCustomizationSubMenuByMenuId/";

     /* APIs related to master customize menu */
     getPSBAppMenu = 'menu/getPSBAppMenuRight';
     customizeMenuAdd = "menu/addPSBAppMenus";
     getPSBAppMenuById = "menu/getPSBAppMenuRightById/";
     updatePSBAppMenu = "menu/updatePSBAppMenus";

     /* APIs related to Holiday List */
     getAllHolidaysUrl = "holiday/getHolidayDetails";
     getHolidayListUrl = "holiday/getHolidayDetailsByState/";
     getHolidayListByIdUrl = "holiday/getHolidayDetailsById/";
     addHolidayDetailsUrl = "holiday/addHolidayDetails";
     updateHolidayDetailsUrl = "holiday/updateHolidayDetails";

     /* API related to Holiday Bulk Upload */
     saveBulkHoliday = "holiday/addBulkHolidayDetails";

     /* API related to access customize submenu rights and customize menu rights */
     getCustomizeMenuRightsByBankTypeAndAppId = "menu/getCustomizeMenuRightsByBankTypeAndAppId";
     getCustomizationMenuByRoleIdAndAppIdUrl = "menu/getCustomizationMenuByRoleIdAndAppId/";
     getSubMenuRightsForCustomizeMenuId ="menu/getSubMenuRightsForCustomizeMenuId";
     saveCustomizeMenuRights = "menu/saveCustomizeMenuRights";
     saveCustomizeSubMenuRights = "menu/saveCustomizeSubMenuRights";
     addCustomizationMenuSubMenuMappingUrl = "menu/addCustomizationMenuSubMenuMapping";
     saveCustomizationMenuSubMenuMappingUrl = "menu/saveCustomizationMenuSubMenuMapping";
     saveCustomizationMainMenuMappingUrl = "menu/saveCustomizationMainMenuMapping";

     getDistinctLanguageJsonCode ="masterconfig/getDistinctLanguageJsonCode"

     /* API related to send bulk notification */
     sendNotificationToAllUrl = "notification/sendNotificationToAll";

     getAllReportDetails ="report/getAllReportDetails";
     getReportDetailsById ="report/getReportDetailsById/";
     updateReportDetails ="report/updateReportDetails";
     addReportDetails ="report/addReportDetails";
     getDynamicReportsUrl = "report/getDynamicReports";

     /* APIs related to document type */
     getDocumentTypeListUrl = "documentTypes/getDocumentTypeList";
     getDocumentTypeByIdUrl = "documentTypes/getDocumentTypeById/";
     saveDocumentTypeDetailsUrl = "documentTypes/saveDocumentTypeDetails";
     updateDocumentTypeDetailsUrl = "documentTypes/updateDocumentTypeDetails";

      /* APIs related to document list */
      getDocumentListUrl = "documentTypes/getDocumentList";
      getDocumentByIdUrl = "documentTypes/getDocumentById/";
      saveDocumentDataUrl = "documentTypes/saveDocumentData";
      updateDocumentDetaUrl = "documentTypes/updateDocumentData";

      /* APIs related to KYC document */
      getFolderListUrl = "digiDocument/getFolderList";
      getDocumentListByFolderIdUrl = "digiDocument/getDocumentListByFolderId/";
      createDocumentUrl = "digiDocument/createDocument";
      createFolderUrl = "digiDocument/createFolder";

      /* API related to Role Types */
      getRoleTypes = "roletypes/getAllRoleTypes";
      getRoleTypeByRoleIdUrl = "roletypes/getRoleTypesById";

      /* API related to find all left menu */
      findAllLeftMenuUrl = "menu/findAllLeftMenu/";

      /* API related to logout */
      logoutUrl = "login/logout";
      getLanguageJsonByLangCodeUrl = "masterconfig/getLanguageJsonByLangCode";

      /* APIs related to Investment Products */
      getInvestmentProductUrl = "investementProduct/getInvestementProducts";
      getInvestmentProductByIdUrl = "investementProduct/getInvestementProductById";
      saveInvestmentProductUrl = "investementProduct/addInvestementProducts";
      updateInvestmentProductUrl = "investementProduct/updateInvestementProducts";

      /* APIs related to Message Code Master */
      getMessageCodeMasterDetailsUrl = "mesageCodeMaster/getMessageCodeMasterDetails";
      getMessageCodeMasterDetailsByIdUrl = "mesageCodeMaster/getMessageCodeMasterDetailsById";
      addMessageCodeUrl = "mesageCodeMaster/addMessageCode";
      updateMessageCodeUrl = "mesageCodeMaster/updateMessageCode";

      /* APIs related to distinct activity master records */
      getDistinctActivityMasterRecordsUrl = "admin/getDistinctActivityMasterRecords";

      /* APIs related to country master */
      getAllCountryDetailsUrl = "countryStateCity/getAllCountryDetails";
      getCountryDetailsByIdUrl = "countryStateCity/getCountryById";
      addCountryDetailsUrl = "countryStateCity/addCountryDetails";
      updateCountryDetailsUrl = "countryStateCity/updateCountryDetails";

      /* APIs related to state master */
      getAllStateDetailsUrl = "countryStateCity/getAllStateDetails";
      getStateDetailsByIdUrl = "countryStateCity/getStateById";
      addStateDetailsUrl = "countryStateCity/addStateDetails";
      updateStateDetailsUrl = "countryStateCity/updateStateDetails";

      /* APIs related to city master */
      getAllCitiesDetailsUrl = "countryStateCity/getAllCitiesDetails";
      getCitiesDetailsByIdUrl = "countryStateCity/getCityById";
      addCitiesDetailsUrl = "countryStateCity/addCityDetails";
      updateCitiesDetailsUrl = "countryStateCity/updateCityDetails";

      /* APIs related to corp company requests */
      getCorpCompRequestsUrl = "corpUser/getCorpCompRequests";
      getCorpCompRequestsByRrnUrl = "corpUser/getCorpCompRequestsByRrn";
      getCorpCompRequestsByIdUrl = "corpUser/getCorpCompRequestsById";
      updateCorpCompReqDataUrl = "corpUser/updateCorpCompReqData";

      /* APIs related to corp company requests menu mapping */
      getCorpMenuAndAccCompanyIdUrl = "corpUser/getCorpMenuAndAccCompanyId";

      /* APIs related to corp company requests menu & account mapping  */
      getCorpAccByCompanyIdUrl = "corpUser/getCorpAccByCompanyId";
      getCorpMenuByCompanyIdUrl = "corpUser/getCorpMenuByCompanyId";
      verifyAccountNumberUrl = "corpUser/verifyAccountNumber";

      /* API related to get corporate users data (online corporate req by corporate portal)*/
      getAllCorpUsersByCompIdUrl = "corpUser/getAllCorpUsersByCompId";
      getMenuListByCorpUserIdUrl = "corpUser/getMenuListByCorpUserId";
      getAccountListByCorpUserIdUrl = "corpUser/getAccountListByCorpUserId";
      getCorpByCompNameCifCorpIdUrl = "corpUser/getCorpByCompNameCifCorpId";
      saveAllCorpDataUrl = "corpUser/saveAllCorpData";
      saveAllCorpMasterData = "OfflineCorpUser/saveAllCorpMasterData"

       /* API related to get IMPS Users */
       getEeuserDataByEeuser = "impsService/getEeuserDataByEeuser"

      /* APIs related to corporate company user data (offline manually requests in admin portal)*/
      getOfflineCorpByCompNameCifCorpIdUrl = "OfflineCorpUser/getOfflineCorpByCompNameCifCorpId";
      getOfflineCorpCompDataUrl = "OfflineCorpUser/getOfflineCorpCompData";
      getOfflineCorpCompDataByRrnUrl = "OfflineCorpUser/getOfflineCorpCompDataByRrn";
      getOfflineCorpCompDataByIdUrl = "OfflineCorpUser/getOfflineCorpCompDataById";
      getOfflineMenuAndAccByCompanyIdUrl = "OfflineCorpUser/getOfflineMenuAndAccByCompanyId";
      getCorpUsersMenuAccByCompIdUrl = "OfflineCorpUser/getCorpUsersMenuAccByCompId";
      getUserAccountByCorpUserIdUrl = "OfflineCorpUser/getUserAccountByCorpUserId";
      getUserMenuByCorpUserIdUrl = "OfflineCorpUser/getUserMenuByCorpUserId";
      updateCorpCompDataUrl = "OfflineCorpUser/updateCorpCompData";
      updateOfflineCorpMenuMapDataUrl = "OfflineCorpUser/updateOfflineCorpMenuMapData";
      updateOfflineCorpAccMapDataUrl = "OfflineCorpUser/updateOfflineCorpAccMapData";
      getUserMenuListByCorpUserIdUrl = "OfflineCorpUser/getUserMenuListByCorpUserId";
      getUserAccountListByCorpUserIdUrl = "OfflineCorpUser/getUserAccountListByCorpUserId";
      addOfflineCorpUserDataUrl = "OfflineCorpUser/updateAddCorpMasterUser";
      updatOfflineCorpUserDataUrl = "OfflineCorpUser/updatOfflineCorpUserData";
      getOfflineCorpUserByIdUrl = "OfflineCorpUser/getCorpUserById";
      deleteCorpUserDataUrl = "OfflineCorpUser/deleteCorpUserData";

      /* IMPS services */

      // IMPS System Status
      getIMPSSystemStatusUrl= "impsService/getStatus";
      updateImpsStatusDataUrl= "impsService/updateImpsStatusData";
      getImpsStatusByIdUrl= "impsService/getImpsStatusById";
      deleteImpsStatusByIdUrl= "impsService/deleteImpsStatusById";

      // IMPS System Configuration
      getAllSysConfigDataUrl = "impsService/getAllSysConfigData";
      insertSysConfigDataUrl = "impsService/insertSysConfigData";
      updateSysConfigDataUrl = "impsService/updateSysConfigData";
      deleteSysConfigDataUrl = "impsService/deleteSysConfigData";
      getSysConfigDataByIdUrl = "impsService/getSysConfigDataById";

      // IMPS Permission
      getPermissionByNameUrl = "impsService/getPermissionByName";
      updatePermissionUrl = "impsService/updatePermission";

      //IMPS Roles
      getAllImpsRolesUrl = "impsService/getAllImpsRoles";
      getAllImpsRolesByIdUrl = "impsService/getAllImpsRolesById";
      insertImpsRoleUrl = "impsService/insertImpsRole";
      updateImpsRoleUrl = "impsService/updateImpsRole";
      deleteImpsRoleUrl = "impsService/deleteImpsRole";

      // IMPS Sys logs
      getSyslogsUrls = "impsService/getSyslogs";

      // IMPS SMS Template
      getSmsTemplatesUrl = "impsService/getSmsTemplates";
      getSmsTemplatesByIdUrl = "impsService/getSmsTemplatesById";
      updateSmsTemplateUrl = "impsService/updateSmsTemplate";

      // IMPS Revision Details
      getAllRevisionDetailsUrl = "impsService/getAllRevisionDetails";

      // IMPS Credit pool details
      getCreditPoolAccDetailsUrl = "impsService/getCreditPoolAccDetails";
      insertCreditPoolAccDetailsUrl = "impsService/insertCreditPoolAccDetails";
      getCreditPoolAccDetailsByIdUrl = "impsService/getCreditPoolAccDetailsById";
      updateCreditPoolAccDetailsUrl = "impsService/updateCreditPoolAccDetails";
      deleteCreditPoolAccDetailsUrl = "impsService/deleteCreditPoolAccDetails";

      // IMPS Debit pool details
      getDebitPoolAccDetailsUrl = "impsService/getDebitPoolAccDetails";
      getDebitPoolAccDetailsBYIdUrl = "impsService/getDebitPoolAccDetailsById";
      insertDebitPoolAccDetailsUrl = "impsService/insertDebitPoolAccDetails";
      updateDebitPoolAccDetailsUrl = "impsService/updateDebitPoolAccDetails";
      DeleteDebitPoolAccDetailsUrl = "impsService/deleteDebitPoolAccDetails";

      // IMPS Transaction Fee Structure
      getTransFeeSetupByApplyFeeAndTransType = "impsService/getTransFeeSetupByApplyFeeAndTransType"
      // IMPS Reports
      getAllReportsUrl = "impsService/getAllReports";
      getAllReportsByIdUrl = "impsService/getAllReportsById";
      insertReportDataUrl = "impsService/insertReportData";
      updateReportDataUrl = "impsService/updateReportData";
      deleteReportDataUrl = "impsService/deleteReportData";

      // IMPS Tasks
      getAllTasksUrl = "impsService/getAllTasks";
      getAllTasksByIdUrl = "impsService/getAllTasksById";
      inserTaskDataUrl = "impsService/inserTaskData";
      updateTaskDataUrl = "impsService/updateTaskData";
      deleteTaskDataUrl = "impsService/deleteTaskData";

      // IMPS Schedule data
      getScheduleDataUrl = "impsService/getScheduleData";
      getScheduleDataByIdUrl = "impsService/getScheduleDataById";
      deleteScheduleDataUrl = "impsService/deleteScheduleData";
      updateScheduleDataUrl = "impsService/updateScheduleData";
      insertScheduleDataUrl = "impsService/insertScheduleData";

      // IMPS Report category
      insertReportCategoryUrl = "impsService/insertReportCategory";
      getReportCategoryUrl = "impsService/getReportCategory";
      getReportCategoryByIdUrl = "impsService/getReportCategoryById";
      updateReportCategoryUrl = "impsService/updateReportCategory";
      deleteReportCategoryUrl = "impsService/deleteReportCategory";
      // IMPS IFSC Codes
      getAllIfscCodeDetails ="impsService/getAllIfscCodeDetails";
      getAllIfscCodeDetailsById ="impsService/getAllIfscCodeDetailsById";
      insertIfscCode = "impsService/insertIfscCode"
      updateIfscCode = "impsService/updateIfscCode"
      deleteIfscCode = "impsService/deleteIfscCode"

      // IMPS Task
      getAllTasks = "impsService/getAllTasks"
      getAllTasksById = "impsService/getAllTasksById"
      inserTaskData = "impsService/inserTaskData"
      updateTaskData = "impsService/updateTaskData"
      deleteTaskData = "impsService/deleteTaskData"

      // IMPS Reports
      getAllReports = "impsService/getAllReports"
      getDynamicReportDataByRepotId = "impsService/getDynamicReportDataByRepotId"
      getAllReportsById = "impsService/getAllReportsById"
      insertReportData = "impsService/insertReportData"
      updateReportData = "impsService/updateReportData"
      deleteReportData = "impsService/deleteReportData"
      getReportCategory = "impsService/getReportCategory"

      getAuthTypeByCompIdAndDesignationIdUrl = "corpMakerChecker/getAuthTypeByCompIdAndDesignationId";

      // IMPS Delivery channels
      getAllDeliveryChannelDetailsUrl = "impsService/getAllDeliveryChannelDetails";
      getAllDeliveryChannelDetailsByIdUrl = "impsService/getAllDeliveryChannelDetailsById";
      insertDeliveryChannelUrl = "impsService/insertDeliveryChannel";
      updateDeliveryChannelUrl = "impsService/updateDeliveryChannel";
      deleteDeliveryChannelUrl = "impsService/deleteDeliveryChannel";

      // IMPS transaction log
      getImpsTransLogsUrl = "impsService/getImpsTransLogs";
      getImpsTransLogByRRNUrl = "impsService/getImpsTransLogByRRN";

      // IMPS Switch Trans log
      getTransLogsUrl = "impsService/getTransLogs";

      // IMPS Connection status
      getImpsStatusByStateUrl = "impsService/getImpsStatusByState";

      // IMPS Trans Fee setup
      getTransFeeSetupByApplyFeeAndTransTypeUrl = "impsService/getTransFeeSetupByApplyFeeAndTransType";
      getTransFeeSetupByApplyFeeAndTransTypeByIdUrl = "impsService/getTransFeeSetupByApplyFeeAndTransTypeById";
      updateTransFeeSetupUrl = "impsService/updateTransFeeSetup";

      // IMPS OTP log details
      getOtpLogsDetailsUrl = "impsService/getOtpLogsDetails";

      // IMPS Station
      getStationsByNameUrl = "impsService/getStationsByName";
      getAllImpsStations = "impsService/getAllStations";

      // IMPS customer details
      getImpsCustDetailsUrl = "impsService/getImpsCustDetails";

      // Get Customer Device
      getDeviceMasterDetailsByCustId ="customer/getDeviceMasterDetailsByCustId"

      // Insurance Category
      getAllCategoriesMaster = "compCategory/getAllCategoriesMaster"
      addCompCategoryMasterData = "compCategory/addCompCategoryMasterData"
      updateCompCategoryMasterData = "compCategory/updateCompCategoryMasterData"
      getCompCategoriesMasterById = "compCategory/getCompCategoriesMasterById"

      // Insurance Company
      addComapnyMasterData = "compCategory/addComapnyMasterData"
      updateComapnyMasterData ="compCategory/updateComapnyMasterData"
      getAllComapnyMasterData="compCategory/getAllComapnyMasterData"
      getComapnyMasterDataById="compCategory/getComapnyMasterDataById"

     // Insurance Product
      getAllProductMasterDataUrl = "compCategory/getAllProductMasterData";
      getProductMasterDataByIdUrl = "compCategory/getProductMasterDataById";
      updateProductMasterDataUrl = "compCategory/updateProductMasterData";
      addProductMasterDataUrl = "compCategory/addProductMasterData";
      getAllCategoriesMasterUrl = "compCategory/getAllCategoriesMaster";
      getAllComapnyMasterDataUrl = "compCategory/getAllComapnyMasterData";
      getComapnyMasterDataByCategoryIdUrl = "compCategory/getComapnyMasterDataByCategoryId";
     // Offline Corp User
      saveToCorpCompMasterData = "OfflineCorpUser/saveToCorpCompMasterData"
      saveToCorpMenuMap = "OfflineCorpUser/saveToCorpMenuMap"
      saveToCorpAccMap = "OfflineCorpUser/saveToCorpAccMap"
      saveOfflineCorpUserMasterData = "OfflineCorpUser/saveOfflineCorpUserMasterData"

      getActivityHourlyLogsDetails = "systemReports/getActivityHourlyLogsDetails"
      getActivityResponseTime = "systemReports/getActivityResponseTime"
      saveMenuSubMenuSequence = "menu/saveMenuSubMenuSequence"

      // APIs related to reset password
      validatePwdRestLinkUrl = "admin/validatePwdRestLink";
      generateOTPForForgetPwdUrl = "admin/generateOTPForForgetPwd";
      validateOtpAndChangePwdUrl = "admin/validateOtpAndChangePwd";

      // APIs related to Master Key
      getLanguageJsonByLangText = "masterconfig/getLanguageJsonByLangText";
      updateLanguageJsonList = "masterconfig/updateLanguageJsonList";

      // APIs related to scheduled maintenance
      sendCustomizeEmailToBulkUsersUrl = "customer/sendCustomizeEmailToBulkUsers";

      // API related to activity notification setting
      getAllActivityNotificationsUrl = "activityNotification/getAllActivityNotifications";
      saveActivityNotificationUrl = "activityNotification/saveActivityNotification";
      getAllActivityNotificationsByIdUrl = "activityNotification/getAllActivityNotificationsById";

      // API related to validate OTP on login page
      validateLoginOtpUrl = "login/validateLoginOtp";
      resendOtpActivationCodeUrl = "login/resendOtpActivationCode";

      // APIs relatd to cbs message template
      getAllCbsMessageTemplateUrl = "cbsMessageTemplate/getAllCbsMessageTemplate";
      getCbsMessageTemplateByIdUrl = "cbsMessageTemplate/getCbsMessageTemplateById";
      addCbsMessageTemplateUrl = "cbsMessageTemplate/addCbsMessageTemplate";
      updateCbsMessageTemplateUrl = "cbsMessageTemplate/updateCbsMessageTemplate";

      // APIs related to IMPS master
      getImpsMasterDetailsUrl = "impsService/getImpsMasterDetails";
      getImpsMasterDetailsByIdUrl = "impsService/getImpsMasterDetailsById";
      insertImpsMasterDetailsUrl = "impsService/insertImpsMasterDetails";
      updateImpsMasterDetailsUrl = "impsService/updateImpsMasterDetails";
      getImpsMasterStateUrl = "impsService/getImpsMasterState";
      getImpsMasterDistrictByStateUrl = "impsService/getImpsMasterDistrictByState";
      getImpsMasterCityByDistrictUrl = "impsService/getImpsMasterCityByDistrict";
      getImpsMasterDataByCityUrl = "impsService/getImpsMasterDataByCity";
      getImpsMasterDataByIFSCUrl = "impsService/getImpsMasterDataByIFSC";

      //APIs related to dynamic report details

      getAllSubReportDetailsUrl = "report/getAllSubReportDetails";
      getSubReportDetailsByIdUrl = "report/getSubReportDetailsById/";
      getSubReportDetailsByReportIdUrl = "report/getSubReportDetailsByReportId";
      addSubReportDetailsUrl = "report/addSubReportDetails";
      updateSubReportDetailsUrl = "report/updateSubReportDetails";

      // APIs related to Account Scheme Master
      getAccountSchemeMasterUrl = "masterconfig/getAccountSchemeMaster";
      getAccountSchemeMasterByIdUrl = "masterconfig/getAccountSchemeMasterById";
      addCertificateConfigMasterUrl = "masterconfig/addCertificateConfigMaster";
      updateAccountSchemeMasterUrl = "masterconfig/updateAccountSchemeMaster";
}
