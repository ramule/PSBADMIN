import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},

  //analyst
  {path: 'analyticsTransactionReport', loadChildren: () => import('./analytics-transaction-report/analytics-transaction-report.module').then(m => m.AnalyticsTransactionReportModule)},
  {path: 'analyticsServiceReqReport', loadChildren: () => import('./analytics-service-req-report/analytics-service-req-report.module').then(m => m.AnalyticsServiceReqReportModule)},
  {path: 'analyticsBOTSurvey', loadChildren: () => import('./analytics-bot-survey/analytics-bot-survey.module').then(m => m.AnalyticsBotSurveyModule)},
  {path: 'MessagingReport', loadChildren: () => import('./analytics-messaging-report/analytics-messaging-report.module').then(m => m.AnalyticsMessagingReportModule)},

  //master
  {path: 'masterConfig', loadChildren: () => import('./master-config/master-config.module').then(m => m.MasterConfigModule)},
  {path: 'masterConfigEdit', loadChildren: () => import('./master-config-edit/master-config-edit.module').then(m => m.MasterConfigEditModule)},
  {path: 'masterLanguage', loadChildren: () => import('./master-language/master-language.module').then(m => m.MasterLanguageModule)},
  {path: 'masterLanguageAdd', loadChildren: () => import('./master-language-add/master-language-add.module').then(m => m.MasterLanguageAddModule)},
  {path: 'masterLanguageEdit', loadChildren: () => import('./master-language-edit/master-language-edit.module').then(m => m.MasterLanguageEditModule)},
  {path: 'masterLocation', loadChildren: () => import('./master-location/master-location.module').then(m => m.MasterLocationModule)},
  {path: 'masterLocationEdit', loadChildren: () => import('./master-location-edit/master-location-edit.module').then(m => m.MasterLocationEditModule)},
  {path: 'masterDonation', loadChildren: () => import('./master-donations/master-donations.module').then(m => m.MasterDonationsModule)},
  {path: 'masterDonationEdit', loadChildren: () => import('./master-donations-edit/master-donations-edit.module').then(m => m.MasterDonationsEditModule)},
  {path: 'masterMenu', loadChildren: () => import('./master-menu/master-menu.module').then(m => m.MasterMenuModule)},
  {path: 'masterMenuEdit', loadChildren: () => import('./master-menu-edit/master-menu-edit.module').then(m => m.MasterMenuEditModule)},
  {path: 'masterSubMenu', loadChildren: () => import('./master-submenu/master-submenu.module').then(m => m.MasterSubMenuModule)},
  {path: 'masterSubMenuEdit', loadChildren: () => import('./master-submenu-edit/master-submenu-edit.module').then(m => m.MasterMenuEditModule)},
  {path: 'masterFacility', loadChildren: () => import('./master-facility/master-facility.module').then(m => m.MasterFacilityModule)},
  {path: 'masterFacilityEdit', loadChildren: () => import('./master-facility-edit/master-facility-edit.module').then(m => m.MasterFacilityEditModule)},

  {path: 'masterProduct', loadChildren: () => import('./master-product/master-product.module').then(m => m.MasterProductModule)},
  {path: 'masterProductEdit', loadChildren: () => import('./master-product-edit/master-product-edit.module').then(m => m.MasterProductEditModule)},
  {path: 'securityQuestion', loadChildren: () => import('./master-security-question/master-security-question.module').then(m => m.MasterSecurityQuestionModule)},
  {path: 'securityQuestionEdit', loadChildren: () => import('./master-security-question-edit/master-security-question-edit.module').then(m => m.MasterSecurityQuestionEditModule)},

  //audit
  {path: 'auditActivityLog', loadChildren: () => import('./audit-activity-log/audit-activity-log.module').then(m => m.AuditActivityLogModule)},
  {path: 'auditTransaction', loadChildren: () => import('./audit-transactions/audit-transactions.module').then(m => m.AuditTransactionsModule)},
  {path: 'allTransactions', loadChildren: () => import('./all-transactions-list/all-transactions.module').then(m => m.AllTransactionsModule)},
  {path: 'adminActivities', loadChildren: () => import('./admin-activities/admin-activities.module').then(m => m.AdminActivitiesModule)},


  //admin
  {path: 'administration', loadChildren: () => import('./admin-adminstration/admin-adminstration.module').then(m => m.AdminAdminstrationModule)},
  {path: 'adminAddRole', loadChildren: () => import('./admin-administration-add-role/admin-administration-add-role.module').then(m => m.AdminAdministrationAddRoleModule)},
  {path: 'adminEditRole', loadChildren: () => import('./admin-administration-edit-role/admin-administration-edit-role.module').then(m => m.AdminAdministrationEditRoleModule)},
  {path: 'adminAddUser', loadChildren: () => import('./admin-administration-add-user/admin-administration-add-user.module').then(m => m.AdminAdministrationAddUserModule)},
  {path: 'adminEditUser', loadChildren: () => import('./admin-administration-edit-user/admin-administration-edit-user.module').then(m => m.AdminAdministrationEditUserModule)},
  {path: 'adminAddCorporateUser', loadChildren: () => import('./admin-administration-add-corporate-user/admin-administration-add-corporate-user.module').then(m => m.AdminAdministrationAddCorporateUserModule)},
  {path: 'adminEditCorporateUser', loadChildren: () => import('./admin-administration-edit-corp-user/admin-administration-edit-corp-user.module').then(m => m.AdminAdministrationEditCorpUserModule)},
  {path: 'adminChargesComminsion', loadChildren: () => import('./admin-charges-commission/admin-charges-commission.module').then(m => m.AdminChargesCommissionModule)},
  {path: 'adminChargesComminsionAdd', loadChildren: () => import('./admin-charges-commission-add/admin-charges-commission-add.module').then(m => m.AdminChargesCommissionAddModule)},
  {path: 'adminChargesComminsionEdit', loadChildren: () => import('./admin-charges-commission-edit/admin-charges-commission-edit.module').then(m => m.AdminChargesCommissionEditModule)},
  {path: 'adminNotification', loadChildren: () => import('./admin-notification/admin-notification.module').then(m => m.AdminNotificationModule)},
  {path: 'adminOmniChannelReport', loadChildren: () => import('./admin-omni-channel-report/admin-omni-channel-report.module').then(m => m.AdminOmniChannelReportModule)},
  {path: 'adminOmniChannelReq', loadChildren: () => import('./admin-omni-channel-request/admin-omni-channel-request.module').then(m => m.AdminOmniChannelRequestModule)},
  {path: 'adminOmniChannelReqEdit', loadChildren: () => import('./admin-omni-channel-request-edit/admin-omni-channel-request-edit.module').then(m => m.AdminOmniChannelRequestEditModule)},
  {path: 'adminWalletPoints', loadChildren: () => import('./admin-wallet-points/admin-wallet-points.module').then(m => m.AdminWalletPointsModule)},
  {path: 'adminWalletPointsAdd', loadChildren: () => import('./admin-wallet-point-add/admin-wallet-point-add.module').then(m => m.AdminWalletPointAddModule)},
  {path: 'adminWalletPointsEdit', loadChildren: () => import('./admin-wallet-points-edit/admin-wallet-points-edit.module').then(m => m.AdminWalletPointsEditModule)},



  //agent
  {path: 'agentCreateAcc', loadChildren: () => import('./agent-create-account/agent-create-account.module').then(m => m.AgentCreateAccountModule)},
  {path: 'agentPendingPayment', loadChildren: () => import('./agent-pending-payment/agent-pending-payment.module').then(m => m.AgentPendingPaymentModule)},
  {path: 'agentWiseBalance', loadChildren: () => import('./agent-wise-balance/agent-wise-balance.module').then(m => m.AgentWiseBalanceModule)},
  {path: 'agentMoneyReconcil', loadChildren: () => import('./agent-money-reconcilation/agent-money-reconcilation.module').then(m => m.AgentMoneyReconcilationModule)},
  {path: 'agentTransaction', loadChildren: () => import('./agent-transactions/agent-transactions.module').then(m => m.AgentTransactionsModule)},
  {path: 'agentTransactionDtl', loadChildren: () => import('./agent-transactions-details/agent-transactions-details.module').then(m => m.AgentTransactionsDetailsModule)},

  //customer
  {path: 'customerAgent', loadChildren: () => import('./customer-agent/customer-agent.module').then(m => m.CustomerAgentModule)},
  {path: 'customerAgentEdit', loadChildren: () => import('./customer-agent-edit/customer-agent-edit.module').then(m => m.CustomerAgentEditModule)},
  {path: 'customerDeviceMaster', loadChildren: () => import('./customer-device-master/customer-device-master.module').then(m => m.CustomerDeviceMasterModule)},
  {path: 'customerDeviceMasterEdit', loadChildren: () => import('./customer-device-master-edit/customer-device-master-edit.module').then(m => m.CustomerDeviceMasterEditModule)},
  {path: 'customerFrs', loadChildren: () => import('./customer-frs/customer-frs.module').then(m => m.CustomerFrsModule)},
  {path: 'customerOffer', loadChildren: () => import('./customer-offer/customer-offer.module').then(m => m.CustomerOfferModule)},
  {path: 'customerOfferAdd', loadChildren: () => import('./customer-offer-add/customer-offer-add.module').then(m => m.CustomerOfferAddModule)},
  {path: 'customerOfferEdit', loadChildren: () => import('./customer-offer-edit/customer-offer-edit.module').then(m => m.CustomerOfferEditModule)},
  {path: 'customerWiseBalance', loadChildren: () => import('./customer-wise-balance/customer-wise-balance.module').then(m => m.CustomerWiseBalanceModule)},
  {path: 'customerRewardPoint', loadChildren: () => import('./customer-reward-points/customer-reward-points.module').then(m => m.CustomerRewardPointsModule)},
  {path: 'customerBulkRegistration', loadChildren: () => import('./customer-bulk-registration/customer-bulk-registration.module').then(m => m.CustomerBulkRegistrationModule)},
  {path: 'freezeUnfreezeAccount', loadChildren: () => import('./freeze-unfreeze-account/freeze-unfreeze-account.module').then(m => m.FreezeUnfreezeAccountModule)},

  //register
  {path: 'regWalletUpgrade', loadChildren: () => import('./register-wallet-upgrade/register-wallet-upgrade.module').then(m => m.RegisterWalletUpgradeModule)},
  {path: 'regWalletUpgradeEdit', loadChildren: () => import('./register-wallet-upgrade-edit/register-wallet-upgrade-edit.module').then(m => m.RegisterWalletUpgradeEditModule)},
  {path: 'regBranchReg', loadChildren: () => import('./register-branch-registration/register-branch-registration.module').then(m => m.RegisterBranchRegistrationModule)},
  {path: 'regBranchRegEdit', loadChildren: () => import('./register-branch-registration-edit/register-branch-registration-edit.module').then(m => m.RegisterBranchRegistrationEditModule)},

  //access
  {path: 'accessMenuRight', loadChildren: () => import('./access-menu-rights/access-menu-rights.module').then(m => m.AccessMenuRightsModule)},
  {path: 'accessMenuRightDetails', loadChildren: () => import('./access-menu-right-details/access-menu-right-details.module').then(m => m.AccessMenuRightDetailsModule)},
  {path: 'accessSubMenuRight', loadChildren: () => import('./access-submenu-rights/access-submenu-rights.module').then(m => m.AccessSubmenuRightsModule)},
  {path: 'accessCustomizeMenu', loadChildren: () => import('./access-customize-menu/access-customize-menu.module').then(m => m.AccessCustomizeMenuModule)},
  {path: 'accessCustomizeMenuDetails', loadChildren: () => import('./access-customize-menu-details/access-customize-menu-details.module').then(m => m.AccessCustomizeMenuDetailsModule)},
  {path: 'accessCustomizeMenuAdd', loadChildren: () => import('./access-customize-menu-add/access-customize-menu-add.module').then(m => m.AccessCustomizeMenuAddModule)},

  {path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  {path: 'servicesDtl', loadChildren: () => import('./service-edit/service-edit.module').then(m => m.ServiceEditModule)},
  //theme
  {path: 'themeDtl', loadChildren: () => import('./theme-details/theme-details.module').then(m => m.ThemeDetailsModule)},
  {path: 'themeSetting', loadChildren: () => import('./theme-setting/theme-setting.module').then(m => m.ThemeSettingModule)},
  {path: 'themeApply', loadChildren: () => import('./theme-apply/theme-apply.module').then(m => m.ThemeApplyModule)},
  {path: 'themeApplyEdit', loadChildren: () => import('./theme-apply-edit/theme-apply-edit.module').then(m => m.ThemeApplyEditModule)},

  {path: 'loginInto', loadChildren: () => import('./login-into/login-into.module').then(m => m.LoginIntoModule)},
  {path: 'upi', loadChildren: () => import('./upi/upi.module').then(m => m.UpiModule)},
  {path: 'imps', loadChildren: () => import('./imps/imps.module').then(m => m.ImpsModule)},
  {path: 'merchant', loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantModule)},
  {path: 'billpayment', loadChildren: () => import('./bill-payment/bill-payment.module').then(m => m.BillPaymentModule)},
  {path: 'editTheme', loadChildren: () => import('./theme-edit/theme-edit.module').then(m => m.ThemeEditModule)},
  {path: 'country', loadChildren: () => import('./country/country.module').then(m => m.CountryModule)},

  {path: 'maskingRules', loadChildren: () => import('./masking-rules/masking-rules.module').then(m => m.MaskingRulesModule)},
  {path: 'maskingRulesAdd', loadChildren: () => import('./masking-rules-add/masking-rules-add.module').then(m => m.MaskingRulesAddModule)},
  {path: 'maskingRulesEdit', loadChildren: () => import('./masking-rules-edit/masking-rules-edit.module').then(m => m.MaskingRulesEditModule)},
  {path: 'bulkUpload', loadChildren: () => import('./bulk-upload/bulk-upload.module').then(m => m.BulkUploadModule)},

  {path: 'forgotPassword', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  {path: 'changePassword', loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule) },
  {path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule) },
  {path: 'notificationDetails', loadChildren: () => import('./notification-details/notification-details.module').then(m => m.NotificationDetailsModule) },
  {path: 'notificationEdit', loadChildren: () => import('./notification-edit/notification-edit.module').then(m => m.NotificationEditModule) },
  {path: 'rmMaster', loadChildren: () => import('./rm-master/rm-master.module').then(m => m.RmMasterModule) },
  {path: 'rmMasterEdit', loadChildren: () => import('./rm-master-edit/rm-master-edit.module').then(m => m.RmMasterEditModule) },
  {path: 'masterLimits', loadChildren: () => import('./master-limits/master-limits.module').then(m => m.MasterLimitsModule) },
  {path: 'masterLimitsAdd', loadChildren: () => import('./master-limits-add/master-limits-add.module').then(m => m.MasterLimitsAddModule) },
  {path: 'masterLimitsEdit', loadChildren: () => import('./master-limits-edit/master-limits-edit.module').then(m => m.MasterLimitsEditModule) },
  //survey
  {path:'survey', loadChildren: () => import('./survey/survey.module').then(m => m.SurveyModule) },
  {path:'surveyDetail', loadChildren: () => import('./survey-detail/survey-detail.module').then(m => m.SurveyDetailModule) },
  {path:'surveyQuestionAdd', loadChildren: () => import('./survey-add-question/survey-add-question.module').then(m => m.SurveyAddQuestionModule) },
  {path:'surveyQuestionAnsEdit', loadChildren: () => import('./survey-add-question-edit/survey-add-question-edit.module').then(m => m.SurveyAddQuestionEditModule) },

  //announcement
  {path:'announcement', loadChildren: () => import('./survey-announcement/survey-announcement.module').then(m => m.SurveyAnnouncementModule) },
  {path:'addAnnouncement', loadChildren: () => import('./survey-announcement-add/survey-announcement-add.module').then(m => m.SurveyAnnouncementAddModule) },
  {path:'announcementEdit', loadChildren: () => import('./announcement-edit/announcement-edit.module').then(m => m.AnnouncementEditModule) },

  // {path:'announcementDtl', loadChildren: () => import('./survey-announcement-details/survey-announcement-details.module').then(m => m.SurveyAnnouncementDetailsModule) },
  // {path:'announcementQue', loadChildren: () => import('./survey-announcement-question/survey-announcement-question.module').then(m => m.SurveyAnnouncementQuestionModule) },
  // {path:'announcementQueEdit', loadChildren: () => import('./survey-announcement-question-edit/survey-announcement-question-edit.module').then(m => m.SurveyAnnouncementQuestionEditModule) },

  //calculator master
  {path:'masterCalculator', loadChildren: () => import('./master-calculator/master-calculator.module').then(m => m.MasterCalculatorModule) },
  {path:'masterCalculatorEdit', loadChildren: () => import('./master-calculator-edit/master-calculator-edit.module').then(m => m.MasterCalculatorEditModule) },

  {path:'masterTransLimit', loadChildren: () => import('./master-transactions-limits/master-transactions-limits.module').then(m => m.MasterTransactionsLimitsModule) },
  {path:'notificationSend', loadChildren: () => import('./notification-send/notification-send.module').then(m => m.NotificationSendModule) },
  {path:'customerInfo', loadChildren: () => import('./customer-information/customer-information.module').then(m => m.CustomerInformationModule) },
  {path:'customerInfoAdd', loadChildren: () => import('./customer-information-add/customer-information-add.module').then(m => m.CustomerInformationAddModule) },
  {path:'customerInfoEdit', loadChildren: () => import('./customer-information-edit/customer-information-edit.module').then(m => m.CustomerInformationEditModule) },
  { path: 'loan', loadChildren: () => import('./loan/loan.module').then(m => m.LoanModule) },
  //corporate
  {path:'corpMenuRight', loadChildren: () => import('./corp-menu-rights/corp-menu-rights.module').then(m => m.CorpMenuRightsModule) },
  {path:'corpUserType', loadChildren: () => import('./corp-user-type/corp-user-type.module').then(m => m.CorpUserTypeModule) },
  {path:'corpUserTypeAdd', loadChildren: () => import('./corp-user-type-add/corp-user-type-add.module').then(m => m.CorpUserTypeAddModule) },
  {path:'corpUserTypeEdit', loadChildren: () => import('./corp-user-type-edit/corp-user-type-edit.module').then(m => m.CorpUserTypeEditModule) },
  {path:'corporateMenu', loadChildren: () => import('./corporate-menu/corporate-menu.module').then(m => m.CorporateMenuModule) },
  {path:'corporateMenuAdd', loadChildren: () => import('./corporate-menu-add/corporate-menu-add.module').then(m => m.CorporateMenuAddModule) },
  {path:'corporateMenuEdit', loadChildren: () => import('./corporate-menu-edit/corporate-menu-edit.module').then(m => m.CorporateMenuEditModule) },
  {path:'corporateCompany', loadChildren: () => import('./corporate-company/corporate-company.module').then(m => m.CorporateCompanyModule) },
  {path:'corporateCompanyAdd', loadChildren: () => import('./corporate-company-add/corporate-company-add.module').then(m => m.CorporateCompanyAddModule) },
  {path:'corporateCompanyEdit', loadChildren: () => import('./corporate-company-edit/corporate-company-edit.module').then(m => m.CorporateCompanyEditModule) },
  {path:'corporateUser', loadChildren: () => import('./corporate-user/corporate-user.module').then(m => m.CorporateUserModule) },
  {path:'corporateUserAdd', loadChildren: () => import('./corporate-user-add/corporate-user-add.module').then(m => m.CorporateUserAddModule) },
  {path:'corporateUserEdit', loadChildren: () => import('./corporate-user-edit/corporate-user-edit.module').then(m => m.CorporateUserEditModule) },
  {path:'corporateService', loadChildren: () => import('./corporate-service-request/corporate-service-request.module').then(m => m.CorporateServiceRequestModule) },
  {path:'corporateServiceEdit', loadChildren: () => import('./corporate-service-request-edit/corporate-service-request-edit.module').then(m => m.CorporateServiceRequestEditModule) },
  {path:'corpAccountUserType', loadChildren: () => import('./corp-account-user-type/corp-account-user-type.module').then(m => m.CorpAccountUserTypeModule) },
  {path:'corpAccountUserTypeAdd', loadChildren: () => import('./corp-account-user-type-add/corp-account-user-type-add.module').then(m => m.CorpAccountUserTypeAddModule) },
  {path:'corpAccountUserTypeEdit', loadChildren: () => import('./corp-account-user-type-edit/corp-account-user-type-edit.module').then(m => m.CorpAccountUserTypeEditModule) },
  {path:'corporateCompanyMenu', loadChildren: () => import('./corporate-company-menu/corporate-company-menu.module').then(m => m.CorporateCompanyMenuModule) },
  {path:'corporateCompanyMenuAdd', loadChildren: () => import('./corporate-company-menu-add/corporate-company-menu-add.module').then(m => m.CorporateCompanyMenuAddModule) },
  {path:'corporateCompanyMenuEdit', loadChildren: () => import('./corporate-company-menu-edit/corporate-company-menu-edit.module').then(m => m.CorporateCompanyMenuEditModule) },
  {path:'corpSetLimit', loadChildren: () => import('./corporate-set-limit/corporate-set-limit.module').then(m => m.CorporateSetLimitModule) },
  {path:'corpSetLimitAdd', loadChildren: () => import('./corporate-set-limit-add/corporate-set-limit-add.module').then(m => m.CorporateSetLimitAddModule) },
  {path:'corpSetLimitView', loadChildren: () => import('./corporate-set-limit-view/corporate-set-limit-view.module').then(m => m.CorporateSetLimitViewModule) },
  {path:'corpSetLimitCheckerView', loadChildren: () => import('./corporate-set-limit-checker-view/corporate-set-limit-checker-view.module').then(m => m.CorporateSetLimitCheckerViewModule) },
  {path:'corpSetLimitEdit', loadChildren: () => import('./corporate-set-limit-edit/corporate-set-limit-edit.module').then(m => m.CorporateSetLimitEditModule) },
  {path:'corpSetLimitConfirm', loadChildren: () => import('./corprate-set-limit-confirm/corprate-set-limit-confirm.module').then(m => m.CorprateSetLimitConfirmModule) },
  {path:'corporateActivitySettings', loadChildren: () => import('./corporate-activity-settings/corprate-activity-settings.module').then(m => m.CorprateActivitySettingsModule) },
  {path:'salaryBulkUpload', loadChildren: () => import('./salary-bulk-upload/salary-bulk-upload.module').then(m => m.SalaryBulkUploadModule) },
  {path:'corporateDonation', loadChildren: () => import('./corporate-donation/corporate-donation.module').then(m => m.CorporateDonationModule) },
  {path:'corporateDonationAdd', loadChildren: () => import('./corporate-donation-add/corporate-donation-add.module').then(m => m.CorporateDonationAddModule) },
  {path:'corporateDonationEdit', loadChildren: () => import('./corporate-donation-edit/corporate-donation-edit.module').then(m => m.CorporateDonationEditModule) },
  {path:'corpdDesignationLevelMapping', loadChildren: () => import('./corp-designation-level-mapping/corp-designation-level-mapping.module').then(m => m.CorpDesignationLevelMappingModule) },
  {path:'corpdDesignationLevelMappingAdd', loadChildren: () => import('./corp-designation-level-mapping-add/corp-designation-level-mapping-add.module').then(m => m.CorpDesignationLevelMappingAddModule) },
  {path:'corpdDesignationLevelMappingEdit', loadChildren: () => import('./corp-designation-level-mapping-edit/corp-designation-level-mapping-edit.module').then(m => m.CorpDesignationLevelMappingEditModule) },
  {path:'corporateUserBulkRegistration', loadChildren: () => import('./corporate-user-bulkregistration/corporate-user-bulkregistration.module').then(m => m.CorporateUserBulkregistrationModule) },
  {path:'corporateProductMaster', loadChildren: () => import('./corporate-product-master/corporate-product-master.module').then(m => m.CorporateProductMasterModule) },
  {path:'corporateProductEditMaster', loadChildren: () => import('./corporate-product-master-edit/corporate-product-master-edit.module').then(m => m.CorporateProductMasterEditModule) },
  {path:'corporateSecurityQuestion', loadChildren: () => import('./corporate-security-question/corporate-security-question.module').then(m => m.CorporateSecurityQuestionModule) },
  {path:'corporateSecurityQuestionEdit', loadChildren: () => import('./corporate-security-question-edit/corporate-security-question-edit.module').then(m => m.CorporateSecurityQuestionEditModule) },
  {path: 'corpAuditActivityLog', loadChildren: () => import('./corporate-audit-activity-log/corporate-audit-activity-log.module').then(m => m.CorporateAuditActivityLogModule)},

  {path:'bankToken', loadChildren: () => import('./bank-token/bank-token.module').then(m => m.BankTokenModule) },
  {path:'bankTokenEdit', loadChildren: () => import('./bank-token-edit/bank-token-edit.module').then(m => m.BankTokenEditModule) },
  {path:'bankTokenGeneration', loadChildren: () => import('./bank-token-generation/bank-token-generation.module').then(m => m.BankTokenGenerationModule) },
  //calculator
  {path:'calculatorFormula', loadChildren: () => import('./calculator-formula/calculator-formula.module').then(m => m.CalculatorFormulaModule) },
  {path:'calculatorFormulaAdd', loadChildren: () => import('./calculator-formula-add/calculator-formula-add.module').then(m => m.CalculatorFormulaAddModule) },
  {path:'calculatorFormulaEdit', loadChildren: () => import('./calculator-formula-edit/calculator-formula-edit.module').then(m => m.CalculatorFormulaEditModule) },

  //Adapter
  {path:'adapterSrcChannel', loadChildren: () => import('./adapter-src-channel/adapter-src-channel.module').then(m => m.AdapterSrcChannelModule) },
  {path:'adapterSrcChannelEdit', loadChildren: () => import('./adapter-src-channel-edit/adapter-src-channel-edit.module').then(m => m.AdapterSrcChannelEditModule) },
  {path:'adapterSrcIp', loadChildren: () => import('./adapter-src-ip/adapter-src-ip.module').then(m => m.AdapterSrcIpModule) },
  {path:'adapterSrcIpEdit', loadChildren: () => import('./adapter-src-ip-edit/adapter-src-ip-edit.module').then(m => m.AdapterSrcIpEditModule) },
  {path:'adapterAuditLog', loadChildren: () => import('./adapter-audit-log/adapter-audit-log.module').then(m => m.AdapterAuditLogModule) },

  //Reports
  {path:'batchReport', loadChildren: () => import('./batch-report/batch-report.module').then(m => m.BatchReportModule)},
  {path:'transactionReport', loadChildren: () => import('./transaction-report/transaction-report.module').then(m => m.TransactionReportModule)},
  {path:'queryReport', loadChildren: () => import('./query-report/query-report.module').then(m => m.QueryReportModule)},

  //send mail
  {path:'sendMailToCustomers', loadChildren: () => import('./sendmail-customers/sendmail-customers.module').then(m => m.SendmailCustomersModule)},

  //account type
  {path:'accountType', loadChildren: () => import('./account-type/account-type.module').then(m => m.AccountTypeModule)},
  {path:'accountTypeEdit', loadChildren: () => import('./account-type-edit/account-type-edit.module').then(m => m.AccountTypeEditModule)},

  //checker-maker-approver
  {path:'makercheckerRequests', loadChildren: () => import('./maker-checker-requests/maker-checker-requests.module').then(m => m.MakerCheckerRequestsModule)},
  {path:'makerRequests', loadChildren: () => import('./maker-requests/maker-requests.module').then(m => m.MakerRequestsModule)},
  {path:'approverRequests', loadChildren: () => import('./approver-requests/approver-requests.module').then(m => m.ApproverRequestsModule)},


  /* corporate-maker-checker-approver */
  {path:'corpMakerRequests', loadChildren: () => import('./corporate-maker-requests/corporate-maker-requests.module').then(m => m.CorporateMakerRequestsModule)},
  {path:'corpCheckerRequests', loadChildren: () => import('./corporate-checker-requests/corporate-checker-requests.module').then(m => m.CorporateCheckerRequestsModule)},
  {path:'corpApproverRequests', loadChildren: () => import('./corporate-approver-requests/corporate-approver-requests.module').then(m => m.CorporateApproverRequestsModule)},

  // Activity Setting
  {path:'activitysetting', loadChildren: () => import('./activity-setting/activity-setting.module').then(m => m.ActivitySettingModule)},
  {path:'activitysettingedit', loadChildren: () => import('./activity-setting-edit/activity-setting-edit.module').then(m => m.ActivitySettingEditModule)},
  {path:'adminactivitysettingedit', loadChildren: () => import('./admin-activity-setting-edit/admin-activity-setting-edit.module').then(m => m.AdminActivitySettingEditModule)},

  // notification categories
  {path:'notificationCategories', loadChildren: () => import('./notification-categories/notification-categories.module').then(m => m.NotificationCategoriesModule)},
  {path:'notificationCategoriesAdd', loadChildren: () => import('./notification-categories-add/notification-categories-add.module').then(m => m.NotificationCategoriesAddModule)},
  {path:'notificationCategoriesEdit', loadChildren: () => import('./notification-categories-edit/notification-categories-edit.module').then(m => m.NotificationCategoriesEditModule)},

  // customer notification categories
  {path:'custNotificationCategories', loadChildren: () => import('./customer-notification-categories/customer-notification-categories.module').then(m => m.CustomerNotificationCategoriesModule)},
  {path:'custNotificationCategoriesAdd', loadChildren: () => import('./customer-notification-categories-add/customer-notification-categories-add.module').then(m => m.CustomerNotificationCategoriesAddModule)},
  {path:'custNotificationCategoriesEdit', loadChildren: () => import('./customer-notification-categories-edit/customer-notification-categories-edit.module').then(m => m.CustomerNotificationCategoriesEditModule)},

  // corporate offers
  {path:'corporateOffers', loadChildren: () => import('./corporate-offers/corporate-offers.module').then(m => m.CorporateOffersModule)},
  {path:'corporateOffersAdd', loadChildren: () => import('./corporate-offers-add/corporate-offers-add.module').then(m => m.CorporateOffersAddModule)},
  {path:'corporateOffersEdit', loadChildren: () => import('./corporate-offers-edit/corporate-offers-edit.module').then(m => m.CorporateOffersEditModule)},

  // corporate announcement
  {path:'corporateAnnouncement', loadChildren: () => import('./corporate-announcement/corporate-announcement.module').then(m => m.CorporateAnnouncementModule)},
  {path:'corporateAnnouncementAdd', loadChildren: () => import('./corporate-announcement-add/corporate-announcement-add.module').then(m => m.CorporateAnnouncementAddModule)},
  {path:'corporateAnnouncementEdit', loadChildren: () => import('./corporate-announcement-edit/corporate-announcement-edit.module').then(m => m.CorporateAnnouncementEditModule)},

  //corporate audit transaction
  {path:'corporateAnnouncement', loadChildren: () => import('./corporate-announcement/corporate-announcement.module').then(m => m.CorporateAnnouncementModule)},

  //Accouneads
  {path:'corporateAuditTrans', loadChildren: () => import('./corporate-audit-transaction/corporate-audit-transaction.module').then(m => m.CorporateAuditTransactionModule)},

  //Account Directory
  {path:'activeDirectory', loadChildren: () => import('./active-directory/active-directory.module').then(m => m.ActiveDirectoryModule)},

  // corporate user level setting
  {path:'corpUserLevelSetting', loadChildren: () => import('./corporate-user-level-setting/corporate-user-level-setting.module').then(m => m.CorporateUserLevelSettingModule)},
  {path:'corpUserLevelSettingAdd', loadChildren: () => import('./corporate-user-level-setting-add/corporate-user-level-setting-add.module').then(m => m.CorporateUserLevelSettingAddModule)},
  {path:'corpUserLevelSettingEdit', loadChildren: () => import('./corporate-user-level-setting-edit/corporate-user-level-setting-edit.module').then(m => m.CorporateUserLevelSettingEditModule)},

  // master customize menu
  {path:'masterCustomizeMenu', loadChildren: () => import('./master-customize-menu/master-customize-menu.module').then(m => m.MasterCustomizeMenuModule)},
  {path:'masterCustomizeMenuAdd', loadChildren: () => import('./master-customize-menu-add/master-customize-menu-add.module').then(m => m.MasterCustomizeMenuAddModule)},
  {path:'masterCustomizeMenuEdit', loadChildren: () => import('./master-customize-menu-edit/master-customize-menu-edit.module').then(m => m.MasterCustomizeMenuEditModule)},

  // master customize submenu
  {path:'masterCustomizeSubmenu', loadChildren: () => import('./master-customize-submenu/master-customize-submenu.module').then(m => m.MasterCustomizeSubmenuModule)},
  {path:'mmasterCustomizeSubmenuAdd', loadChildren: () => import('./master-customize-submenu-add/master-customize-submenu-add.module').then(m => m.MasterCustomizeSubmenuAddModule)},
  {path:'masterCustomizeSubmenuEdit', loadChildren: () => import('./master-customize-submenu-edit/master-customize-submenu-edit.module').then(m => m.MasterCustomizeSubmenuEditModule)},

  // master customize submenu
  {path:'sendBulkNotifications', loadChildren: () => import('./bulk-notification-send/bulk-notification-send.module').then(m => m.BulkNotificationSendModule)},

  // holiday list
  {path:'holidayList', loadChildren: () => import('./holiday-list/holiday-list.module').then(m => m.HolidayListModule)},
  {path:'holidayListAdd', loadChildren: () => import('./holiday-list-add/holiday-list-add.module').then(m => m.HolidayListAddModule)},
  {path:'holidayListEdit', loadChildren: () => import('./holiday-list-edit/holiday-list-edit.module').then(m => m.HolidayListEditModule)},
  {path:'holidayListBulkAdd', loadChildren: () => import('./holiday-list-bulk-add/holiday-list-bulk-add.module').then(m => m.HolidayListBulkAddModule)},


  // dynamic reports
  {path:'dynamicReports', loadChildren: () => import('./dynamic-reports/dynamic-reports.module').then(m => m.DynamicReportsModule)},
  {path:'dynamicReportsAdd', loadChildren: () => import('./dynamic-reports-add/dynamic-reports-add.module').then(m => m.DynamicReportsAddModule)},
  {path:'dynamicReportsEdit', loadChildren: () => import('./dynamic-reports-edit/dynamic-reports-edit.module').then(m => m.DynamicReportsEditModule)},

  // dynamic category reports
  {path:'dynamicReportsDetails', loadChildren: () => import('./dynamic-reports-details/dynamic-reports-details.module').then(m => m.DynamicReportsDetailsModule)},
  {path:'dynamicReportsDetailsAdd', loadChildren: () => import('./dynamic-reports-details-add/dynamic-reports-details-add.module').then(m => m.DynamicReportsDetailsAddModule)},
  {path:'dynamicReportsDetailsEdit', loadChildren: () => import('./dynamic-reports-details-edit/dynamic-reports-details-edit.module').then(m => m.DynamicReportsDetailsEditModule)},

  // dynamic reports view
  {path:'dynamicReportsSummary', loadChildren: () => import('./dynamic-reports-grid/dynamic-reports-grid.module').then(m => m.DynamicReportsGridModule)},

  // document type
  {path:'documentType', loadChildren: () => import('./document-type/document-type.module').then(m => m.DocumentTypeModule)},
  {path:'documentTypeAdd', loadChildren: () => import('./document-type-add/document-type-add.module').then(m => m.DocumentTypeAddModule)},
  {path:'documentTypeEdit', loadChildren: () => import('./document-type-edit/document-type-edit.module').then(m => m.DocumentTypeEditModule)},


  // User Bulk Registration
  {path:'userBulkRegistration', loadChildren: () => import('./corporate-user-bulkregistration/corporate-user-bulkregistration.module').then(m => m.CorporateUserBulkregistrationModule)},

  // document list
  {path:'documentList', loadChildren: () => import('./document-list/document-list.module').then(m => m.DocumentListModule)},
  {path:'documentListAdd', loadChildren: () => import('./document-list-add/document-list-add.module').then(m => m.DocumentListAddModule)},
  {path:'documentListEdit', loadChildren: () => import('./document-list-edit/document-list-edit.module').then(m => m.DocumentListEditModule)},

  // System Config
  {path:'impsSystemConfig', loadChildren: () => import('./imps-system-config/imps-system-config.module').then(m => m.ImpsSystemConfigModule)},
  {path:'impsSystemConfigAdd', loadChildren: () => import('./imps-system-config-add/imps-system-config-add.module').then(m => m.ImpsSystemConfigAddModule)},
  {path:'impsSystemConfigEdit', loadChildren: () => import('./imps-system-config-edit/imps-system-config-edit.module').then(m => m.ImpsSystemConfigEditModule)},

  // Stations
  {path:'impsStations', loadChildren: () => import('./imps-stations/imps-stations.module').then(m => m.ImpsStationsModule)},
  {path:'impsStationsAdd', loadChildren: () => import('./imps-stations-add/imps-stations-add.module').then(m => m.ImpsStationsAddModule)},
  {path:'impsStationsEdit', loadChildren: () => import('./imps-stations-edit/imps-stations-edit.module').then(m => m.ImpsStationsEditModule)},

  // Permissions
  {path:'impsPermissions', loadChildren: () => import('./imps-permissions/imps-permissions.module').then(m => m.ImpsPermissionsModule)},
  {path:'impsPermissionsEdit', loadChildren: () => import('./imps-permissions-edit/imps-permissions-edit.module').then(m => m.ImpsPermissionsEditModule)},


  // KYC document list
  {path:'KYCDocumentList', loadChildren: () => import('./kyc-document-list/kyc-document-list.module').then(m => m.KycDocumentListModule)},

  // KYC document Add
  {path:'KYCDocumentAdd', loadChildren: () => import('./kyc-document-add/kyc-document-add.module').then(m => m.KycDocumentAddModule)},

  // KYC folder Add
  {path:'KYCFolderAdd', loadChildren: () => import('./kyc-folder-add/kyc-folder-add.module').then(m => m.KycFolderAddModule)},

  // IMPS pages
  {path:'impsTransLog', loadChildren: () => import('./imps-trans-log/imps-trans-log.module').then(m => m.ImpsTransLogModule)},

  // Role type
  {path:'roleType', loadChildren: () => import('./role-type/role-type.module').then(m => m.RoleTypeModule)},
  {path:'roleTypeAdd', loadChildren: () => import('./role-type-add/role-type-add.module').then(m => m.RoleTypeAddModule)},
  {path:'roleTypeEdit', loadChildren: () => import('./role-type-edit/role-type-edit.module').then(m => m.RoleTypeEditModule)},

  // Roles
  {path:'impsRoles', loadChildren: () => import('./imps-roles/imps-roles.module').then(m => m.ImpsRolesModule)},
  {path:'impsRolesAdd', loadChildren: () => import('./imps-roles-add/imps-roles-add.module').then(m => m.ImpsRolesAddModule)},
  {path:'impsRolesEdit', loadChildren: () => import('./imps-roles-edit/imps-roles-edit.module').then(m => m.ImpsRolesEditModule)},

  // Users
  {path:'impsUsers', loadChildren: () => import('./imps-users/imps-users.module').then(m => m.ImpsUsersModule)},
  {path:'impsUsersAdd', loadChildren: () => import('./imps-users-add/imps-users-add.module').then(m => m.ImpsUsersAddModule)},
  {path:'impsUsersEdit', loadChildren: () => import('./imps-users-edit/imps-users-edit.module').then(m => m.ImpsUsersEditModule)},

  // SMS
  {path:'impsSMS', loadChildren: () => import('./imps-sms-templates/imps-sms-templates.module').then(m => m.ImpsSmsTemplatesModule)},
  {path:'impsSMSAdd', loadChildren: () => import('./imps-sms-templates-add/imps-sms-templates-add.module').then(m => m.ImpsSmsTemplatesAddModule)},
  {path:'impsSMSEdit', loadChildren: () => import('./imps-sms-templates-edit/imps-sms-templates-edit.module').then(m => m.ImpsSmsTemplatesEditModule)},

  // Trans Fee
  {path:'impsTransFee', loadChildren: () => import('./imps-trans-fee-structure/imps-trans-fee-structure.module').then(m => m.ImpsTransFeeStructureModule)},
  {path:'impsTransFeeAdd', loadChildren: () => import('./imps-trans-fee-structure-add/imps-trans-fee-structure-add.module').then(m => m.ImpsTransFeeStructureAddModule)},
  {path:'impsTransFeeEdit', loadChildren: () => import('./imps-trans-fee-structure-edit/imps-trans-fee-structure-edit.module').then(m => m.ImpsTransFeeStructureEditModule)},

  // BC WEB
  {path:'impsBCWeb', loadChildren: () => import('./imps-bc-web/imps-bc-web.module').then(m => m.ImpsBcWebModule)},
  {path:'impsBCWebAdd', loadChildren: () => import('./imps-bc-web-add/imps-bc-web-add.module').then(m => m.ImpsBcWebAddModule)},
  {path:'impsBCWebEdit', loadChildren: () => import('./imps-bc-web-edit/imps-bc-web-edit.module').then(m => m.ImpsBcWebEditModule)},

  // BC Retailer
  {path:'impsBCRetailer', loadChildren: () => import('./imps-bc-retailers/imps-bc-retailers.module').then(m => m.ImpsBcRetailersModule)},
  {path:'impsBCRetailerAdd', loadChildren: () => import('./imps-bc-retailers-add/imps-bc-retailers-add.module').then(m => m.ImpsBcRetailersAddModule)},
  {path:'impsBCRetailerEdit', loadChildren: () => import('./imps-bc-retailers-edit/imps-bc-retailers-edit.module').then(m => m.ImpsBcRetailersEditModule)},

  // BC Corr
  {path:'impsBCCorr', loadChildren: () => import('./imps-business-corr/imps-business-corr.module').then(m => m.ImpsBusinessCorrModule)},
  {path:'impsBCCorrAdd', loadChildren: () => import('./imps-business-corr-add/imps-business-corr-add.module').then(m => m.ImpsBusinessCorrAddModule)},
  {path:'impsBCCorrEdit', loadChildren: () => import('./imps-business-corr-edit/imps-business-corr-edit.module').then(m => m.ImpsBusinessCorrEditModule)},

  // Task
  {path:'impsTask', loadChildren: () => import('./imps-task/imps-task.module').then(m => m.ImpsTaskModule)},
  {path:'impsTaskAdd', loadChildren: () => import('./imps-task-add/imps-task-add.module').then(m => m.ImpsTaskAddModule)},
  {path:'impsTaskEdit', loadChildren: () => import('./imps-task-edit/imps-task-edit.module').then(m => m.ImpsTaskEditModule)},

  // Schedule
  {path:'impsSchedule', loadChildren: () => import('./imps-schedule/imps-schedule.module').then(m => m.ImpsScheduleModule)},
  {path:'impsScheduleAdd', loadChildren: () => import('./imps-schedule-add/imps-schedule-add.module').then(m => m.ImpsScheduleAddModule)},
  {path:'impsScheduleEdit', loadChildren: () => import('./imps-schedule-edit/imps-schedule-edit.module').then(m => m.ImpsScheduleEditModule)},

  // Reports
  {path:'impsReports', loadChildren: () => import('./imps-reports/imps-reports.module').then(m => m.ImpsReportsModule)},
  {path:'impsReportsAdd', loadChildren: () => import('./imps-reports-add/imps-reports-add.module').then(m => m.ImpsReportsAddModule)},
  {path:'impsReportsEdit', loadChildren: () => import('./imps-reports-edit/imps-reports-edit.module').then(m => m.ImpsReportsEditModule)},

  // Reports Details
  {path:'impsReportsDetails', loadChildren: () => import('./imps-reports-details/imps-reports-details.module').then(m => m.ImpsReportsDetailsModule)},

  // Revision History
  {path:'impsRevisionHistory', loadChildren: () => import('./imps-revision-history/imps-revision-history.module').then(m => m.ImpsRevisionHistoryModule)},

  // IMPS my report
  {path:'impsMyReport', loadChildren: () => import('./imps-myreport/imps-myreport.module').then(m => m.ImpsMyreportModule)},

  // Summary log
  {path:'impsAuditTrail', loadChildren: () => import('./imps-audit-trail/imps-audit-trail.module').then(m => m.ImpsAuditTrailModule)},

  // System Status
  {path:'impsSystemStatus', loadChildren: () => import('./imps-system-status/imps-system-status.module').then(m => m.ImpsSystemStatusModule)},
  {path:'impsSystemStatusEdit', loadChildren: () => import('./imps-system-status-edit/imps-system-status-edit.module').then(m => m.ImpsSystemStatusEditModule)},

  // Customer Details
  {path:'impsCustomerDetails', loadChildren: () => import('./imps-customer-details/imps-customer-details.module').then(m => m.ImpsCustomerDetailsModule)},

  // Search Transaction
  {path:'impsSearchTransaction', loadChildren: () => import('./imps-search-transaction/imps-search-transaction.module').then(m => m.ImpsSearchTransactionModule)},


  // Exception Log
  {path:'impsExceptionsLog', loadChildren: () => import('./imps-exceptions-log/imps-exceptions-log.module').then(m => m.ImpsExceptionsLogModule)},

  // Ecollection request log
  {path:'impsEcollectionReqLog', loadChildren: () => import('./imps-ecollection-request-log/imps-ecollection-request-log.module').then(m => m.ImpsEcollectionRequestLogModule)},

  // Ecollection request log
  {path:'impsSysLogs', loadChildren: () => import('./imps-sys-logs/imps-sys-logs.module').then(m => m.ImpsSysLogsModule)},

  // Debit pool acc details
  {path:'impsDebitPoolAccDetails', loadChildren: () => import('./imps-debit-pool-acc-details/imps-debit-pool-acc-details.module').then(m => m.ImpsDebitPoolAccDetailsModule)},
  {path:'impsDebitPoolAccDetailsAdd', loadChildren: () => import('./imps-debit-pool-acc-details-add/imps-debit-pool-acc-details-add.module').then(m => m.ImpsDebitPoolAccDetailsAddModule)},
  {path:'impsDebitPoolAccDetailsEdit', loadChildren: () => import('./imps-debit-pool-acc-details-edit/imps-debit-pool-acc-details-edit.module').then(m => m.ImpsDebitPoolAccDetailsEditModule)},

  // Schedule
  {path:'impsCreditPoolAccDetails', loadChildren: () => import('./imps-credit-pool-acc-details/imps-credit-pool-acc-details.module').then(m => m.ImpsCreditPoolAccDetailsModule)},
  {path:'impsCreditPoolAccDetailsAdd', loadChildren: () => import('./imps-credit-pool-acc-details-add/imps-credit-pool-acc-details-add.module').then(m => m.ImpsCreditPoolAccDetailsAddModule)},
  {path:'impsCreditPoolAccDetailsEdit', loadChildren: () => import('./imps-credit-pool-acc-details-edit/imps-credit-pool-acc-details-edit.module').then(m => m.ImpsCreditPoolAccDetailsEditModule)},

  // UPI Volume
  {path:'upiVolume', loadChildren: () => import('./upi-volume/upi-volume.module').then(m => m.UpiVolumeModule)},

      // UPI Volume Details
  {path:'upiVolumeDetails', loadChildren: () => import('./upi-volume-details/upi-volume-details.module').then(m => m.UpiVolumeDetailsModule)},

  // UPI Transaction
  {path:'upiTransactions', loadChildren: () => import('./upi-transactions/upi-transactions.module').then(m => m.UpiTransactionsModule)},

    // Ecollection Configuration
  {path:'impsEcollection', loadChildren: () => import('./imps-ecollection/imps-ecollection.module').then(m => m.ImpsEcollectionModule)},
  {path:'impsEcollectionAdd', loadChildren: () => import('./imps-ecollection-add/imps-ecollection-add.module').then(m => m.ImpsEcollectionAddModule)},

  // NEFT-RTGS Transaction
  {path:'impsNEFT', loadChildren: () => import('./imps-neft-rtgs/imps-neft-rtgs.module').then(m => m.ImpsNeftRtgsModule)},
  {path:'impsNEFTAdd', loadChildren: () => import('./imps-neft-rtgs-add/imps-neft-rtgs-add.module').then(m => m.ImpsNeftRtgsAddModule)},

  // Account Leads
   {path:'accountLeads', loadChildren: () => import('./account-leads/account-leads.module').then(m => m.AccountLeadsModule)},

  // investment product
  {path:'investmentProduct', loadChildren: () => import('./investment-product/investment-product.module').then(m => m.InvestmentProductModule)},
  {path:'investmentProductAdd', loadChildren: () => import('./investment-product-add/investment-product-add.module').then(m => m.InvestmentProductAddModule)},
  {path:'investmentProductEdit', loadChildren: () => import('./investment-product-edit/investment-product-edit.module').then(m => m.InvestmentProductEditModule)},

  // investment product
  {path:'messageCodeMaster', loadChildren: () => import('./message-code-master/message-code-master.module').then(m => m.MessageCodeMasterModule)},
  {path:'messageCodeMasterAdd', loadChildren: () => import('./message-code-master-add/message-code-master-add.module').then(m => m.MessageCodeMasterAddModule)},
  {path:'messageCodeMasterEdit', loadChildren: () => import('./message-code-master-edit/message-code-master-edit.module').then(m => m.MessageCodeMasterEditModule)},


  // Country
  {path:'masterCountry', loadChildren: () => import('./master-country/master-country.module').then(m => m.MasterCountryModule)},
  {path:'masterCountryAdd', loadChildren: () => import('./master-country-add/master-country-add.module').then(m => m.MasterCountryAddModule)},
  {path:'masterCountryEdit', loadChildren: () => import('./master-country-edit/master-country-edit.module').then(m => m.MasterCountryEditModule)},


  // State
  {path:'masterState', loadChildren: () => import('./master-state/master-state.module').then(m => m.MasterStateModule)},
  {path:'masterStateAdd', loadChildren: () => import('./master-state-add/master-state-add.module').then(m => m.MasterStateAddModule)},
  {path:'masterStateEdit', loadChildren: () => import('./master-state-edit/master-state-edit.module').then(m => m.MasterStateEditModule)},


  // City
  {path:'masterCity', loadChildren: () => import('./master-city/master-city.module').then(m => m.MasterCityModule)},
  {path:'masterCityAdd', loadChildren: () => import('./master-city-add/master-city-add.module').then(m => m.MasterCityAddModule)},
  {path:'masterCityEdit', loadChildren: () => import('./master-city-edit/master-city-edit.module').then(m => m.MasterCityEditModule)},

  // Corp user requests
  {path:'corpUserRequests', loadChildren: () => import('./corp-user-requests/corp-user-requests.module').then(m => m.CorpUserRequestsModule)},
  {path:'corpUserRequestsEdit', loadChildren: () => import('./corp-user-requests-edit/corp-user-requests-edit.module').then(m => m.CorpUserRequestsEditModule)},

  // Corp company online requests
  {path:'corpCompanyRequests', loadChildren: () => import('./corp-company-requests/corp-company-requests.module').then(m => m.CorpCompanyRequestsModule)},
  {path:'corpCompanyRequestsEdit', loadChildren: () => import('./corp-company-requests-edit/corp-company-requests-edit.module').then(m => m.CorpCompanyRequestsEditModule)},

  // Corp company requests menu mapping
  {path:'corpCompanyReqMenuMapping', loadChildren: () => import('./corp-company-req-menu-mapping/corp-company-req-menu-mapping.module').then(m => m.CorpCompanyReqMenuMappingModule)},

  // Corporate company user offline requests
  {path:'corpCompanyUserRequests', loadChildren: () => import('./corporate-company-user-requests/corporate-company-user-requests.module').then(m => m.CorporateCompanyUserRequestsModule)},
  {path:'corpCompanyUserRequestsAdd', loadChildren: () => import('./corporate-company-user-requests-add/corporate-company-user-requests-add.module').then(m => m.CorporateCompanyUserRequestsAddModule)},
  {path:'corpCompanyUserRequestsEdit', loadChildren: () => import('./corporate-company-user-requests-edit/corporate-company-user-requests-edit.module').then(m => m.CorporateCompanyUserRequestsEditModule)},

  // IMPS IFSC Codes
  {path:'impsIFSC', loadChildren: () => import('./imps-ifsc-codes/imps-ifsc-codes.module').then(m => m.ImpsIfscCodesModule)},
  {path:'impsIFSCAdd', loadChildren: () => import('./imps-ifsc-codes-add/imps-ifsc-codes-add.module').then(m => m.ImpsIfscCodesAddModule)},
  {path:'impsIFSCEdit', loadChildren: () => import('./imps-ifsc-codes-edit/imps-ifsc-codes-edit.module').then(m => m.ImpsIfscCodesEditModule)},

  // IMPS Delivery Channel
  {path:'impsDeliveryChannel', loadChildren: () => import('./imps-delivery-channel/imps-delivery-channel.module').then(m => m.ImpsDeliveryChannelModule)},
  {path:'impsDeliveryChannelAdd', loadChildren: () => import('./imps-delivery-channel-add/imps-delivery-channel-add.module').then(m => m.ImpsDeliveryChannelAddModule)},
  {path:'impsDeliveryChannelEdit', loadChildren: () => import('./imps-delivery-channel-edit/imps-delivery-channel-edit.module').then(m => m.ImpsDeliveryChannelEditModule)},

  // IMPS Report Category
  {path:'impsReportCategory', loadChildren: () => import('./imps-report-category/imps-report-category.module').then(m => m.ImpsReportCategoryModule)},
  {path:'impsReportCategoryAdd', loadChildren: () => import('./imps-report-category-add/imps-report-category-add.module').then(m => m.ImpsReportCategoryAddModule)},
  {path:'impsReportCategoryEdit', loadChildren: () => import('./imps-report-category-edit/imps-report-category-edit.module').then(m => m.ImpsReportCategoryEditModule)},

  // IMPS Switch Trans Log
  {path:'impsSwitchTrans', loadChildren: () => import('./imps-switch-transaction/imps-switch-transaction.module').then(m => m.ImpsSwitchTransactionModule)},

  // IMPS Connection Status
  {path:'impsConnectionStatus', loadChildren: () => import('./imps-connection-status/imps-connection-status.module').then(m => m.ImpsConnectionStatusModule)},

  // IMPS Trans Fee setup
  {path:'impsTransactionFeeSetup', loadChildren: () => import('./imps-transaction-fee-setup/imps-transaction-fee-setup.module').then(m => m.ImpsTransactionFeeSetupModule)},
  {path:'impsTransactionFeeSetupEdit', loadChildren: () => import('./imps-transaction-fee-setup-edit/imps-transaction-fee-setup-edit.module').then(m => m.ImpsTransactionFeeSetupEditModule)},

  // IMPS OTP log details
  {path:'impsOtpLogDetails', loadChildren: () => import('./imps-otp-log-details/imps-otp-log-details.module').then(m => m.ImpsOtpLogDetailsModule)},

  // IMPS transaction dashboard
  {path:'impsTransDashboard', loadChildren: () => import('./imps-transaction-dashboard/imps-transaction-dashboard.module').then(m => m.ImpsTransactionDashboardModule)},

  //Insurance Category
  {path:'insuranceCategory', loadChildren: () => import('./insurance-category/insurance-category.module').then(m => m.InsuranceCategoryModule)},
  {path:'insuranceCategoryAdd', loadChildren: () => import('./insurance-category-add/insurance-category-add.module').then(m => m.InsuranceCategoryAddModule)},
  {path:'insuranceCategoryEdit', loadChildren: () => import('./insurance-category-edit/insurance-category-edit.module').then(m => m.InsuranceCategoryEditModule)},

  //Insurance Company
  {path:'insuranceCompany', loadChildren: () => import('./insurance-Company/insurance-Company.module').then(m => m.InsuranceCompanyModule)},
  {path:'insuranceCompanyAdd', loadChildren: () => import('./insurance-Company-add/insurance-Company-add.module').then(m => m.InsuranceCompanyAddModule)},
  {path:'insuranceCompanyEdit', loadChildren: () => import('./insurance-Company-edit/insurance-Company-edit.module').then(m => m.InsuranceCompanyEditModule)},

      //Insurance Product
  {path:'insuranceProduct', loadChildren: () => import('./insurance-Product/insurance-Product.module').then(m => m.InsuranceProductModule)},
  {path:'insuranceProductAdd', loadChildren: () => import('./insurance-Product-add/insurance-Product-add.module').then(m => m.InsuranceProductAddModule)},
  {path:'insuranceProductEdit', loadChildren: () => import('./insurance-Product-edit/insurance-Product-edit.module').then(m => m.InsuranceProductEditModule)},

  // Activity Hourly Log
  {path:'activityHourlyLogs', loadChildren: () => import('./activity-hourly-logs/activity-hourly-logs.module').then(m => m.ActivityHourlyLogsModule)},

  // Activity Hourly Log
  {path:'activityResponseTime', loadChildren: () => import('./activity-response-time/activity-response-time.module').then(m => m.ActivityResponseTimeModule)},

  // Master Sort Module
  {path:'masterSortModule', loadChildren: () => import('./master-sort-module/master-sort-module.module').then(m => m.MasterSortModuleModule)},

  // Reset password Module
  {path:'resetPassword', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)},

  // Master Key Module
  {path:'languageKey', loadChildren: () => import('./master-language-key/master-language-key.module').then(m => m.MasterLanguageKeyModule)},

  // Scheduled Maintenance Module
  {path:'scheduledMaintenance', loadChildren: () => import('./scheduled-maintenance/scheduled-maintenance.module').then(m => m.ScheduledMaintenanceModule)},

  // Activity wise notification setting (push, email, otp)
  {path:'activityNotificationSetting', loadChildren: () => import('./activity-notification-setting/activity-notification-setting.module').then(m => m.ActivityNotificationSettingModule)},
  {path:'activityNotificationSettingEdit', loadChildren: () => import('./activity-notification-setting-edit/activity-notification-setting-edit.module').then(m => m.ActivityNotificationSettingEditModule)},

  // cbs message template
  {path:'cbsMessageTemplate', loadChildren: () => import('./cbs-message-template/cbs-message-template.module').then(m => m.CbsMessageTemplateModule)},
  {path:'cbsMessageTemplateAdd', loadChildren: () => import('./cbs-message-template-add/cbs-message-template-add.module').then(m => m.CbsMessageTemplateAddModule)},
  {path:'cbsMessageTemplateEdit', loadChildren: () => import('./cbs-message-template-edit/cbs-message-template-edit.module').then(m => m.CbsMessageTemplateEditModule)},

  // IMPS Master module
  {path:'impsMaster', loadChildren: () => import('./imps-master/imps-master.module').then(m => m.ImpsMasterModule)},
  {path:'impsMasterAdd', loadChildren: () => import('./imps-master-add/imps-master-add.module').then(m => m.ImpsMasterAddModule)},
  {path:'impsMasterEdit', loadChildren: () => import('./imps-master-edit/imps-master-edit.module').then(m => m.ImpsMasterEditModule)},


  //retail-branch-registration
  // {path:'RetailBranchRegistrationModule', loadChildren: () => import('./retail-branch-registration/retail-branch-registration.module').then(m => m.RetailBranchRegistrationModule)},

  // Account Scheme Master Module
  // {path:'accountScheme', loadChildren: () => import('./account-scheme-master/account-scheme-master.module').then(m => m.AccountSchemeMasterModule)},
  // {path:'accountSchemeAdd', loadChildren: () => import('./account-scheme-master-add/account-scheme-master-add.module').then(m => m.AccountSchemeMasterAddModule)},
  // {path:'accountSchemeEdit', loadChildren: () => import('./account-scheme-master-edit/account-scheme-master-edit.module').then(m => m.AccountSchemeMasterEditModule)},

  //transactions-logs
  {path:'transactionsLogs', loadChildren: () => import('./transactions-logs/transactions-logs.module').then(m => m.TransactionsLogsModule)},
 
  //transactions-table
  {path:'transactionsTable', loadChildren: () => import('./transactions-table/transactions-table.module').then(m => m.TransactionsTableModule)},
 
  //registration-details
  {path:'registrationDetails', loadChildren: () => import('./registration-details/registration-details.module').then(m => m.RegistrationDetailsModule)},
 
   //registration-details-table
   {path:'registrationDetailsTable', loadChildren: () => import('./registration-details-table/registration-details-table.module').then(m => m.RegistrationDetailsTableModule)},
 
];
//services
//servicesDtl
//adminEditRole
//adminAddUser
//accessCustomizeMenu

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
