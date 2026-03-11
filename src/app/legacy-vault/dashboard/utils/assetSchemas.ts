export type FieldType = "text" | "number" | "date" | "select" | "textarea" | "currency";

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    options?: string[];
    colSpan?: number;
    placeholder?: string;
    required?: boolean;
}

export interface AssetSchema {
    fields: FieldConfig[];
}

export const ASSET_SCHEMAS: Record<string, AssetSchema> = {
    "Bank Account": {
        fields: [
            { name: "accountType", label: "Account Type", type: "select", options: ["Savings", "Current", "NRO", "NRE", "PIS"] },
            { name: "accountHolderName", label: "Account Holder Name (As per document)", type: "text" },
            { name: "bankName", label: "Bank Name", type: "text" },
            { name: "bankType", label: "Bank Type", type: "select", options: ["Public", "Private", "Cooperative", "Foreign"] },
            { name: "bankAccountNumber", label: "Account Number", type: "text" },
            { name: "ifscCode", label: "IFSC Code", type: "text" },
            { name: "customerId", label: "Customer ID", type: "text" },
            { name: "branchNameAndAddress", label: "Branch Name & Address", type: "text", colSpan: 2 },
            { name: "mobileNumberLinkedToAccount", label: "Linked Mobile Number", type: "text" },
            { name: "nominee.name", label: "Nominee Name", type: "text" },
            { name: "nominee.relationship", label: "Nominee Relationship", type: "text" },
            { name: "jointAccountHolderDetails", label: "Joint Account Details", type: "text" },
            { name: "relationshipManagerDetails", label: "Relationship Manager", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Vehicles": {
        fields: [
            { name: "vehicleType", label: "Vehicle Type", type: "text", placeholder: "e.g. Car" },
            { name: "registeredOwnerName", label: "Registered Owner Name", type: "text" },
            { name: "vinOrChassisNumber", label: "VIN / Chassis Number", type: "text" },
            { name: "registrationNumber", label: "Registration Number", type: "text" },
            { name: "titleStatus", label: "Title Status", type: "text" },
            { name: "rtoOfficeOfRegistration", label: "RTO Office", type: "text" },
            { name: "manufacturingBrand", label: "Brand", type: "text" },
            { name: "model", label: "Model", type: "text" },
            { name: "fuelType", label: "Fuel Type", type: "text" },
            { name: "colour", label: "Colour", type: "text" },
            { name: "yearOfManufacture", label: "Year of Manufacture", type: "number" },
            { name: "registrationDate", label: "Registration Date", type: "date" },
            { name: "registrationExpiryDate", label: "Registration Expiry", type: "date" },
            { name: "insurance.providerName", label: "Insurance Provider", type: "text" },
            { name: "insurance.policyNumber", label: "Insurance Policy Number", type: "text" },
            { name: "insurance.amountInsured.value", label: "Amount Insured (INR)", type: "number" },
            { name: "pucExpiryDate", label: "PUC Expiry Date", type: "date" },
            { name: "fastagId", label: "FASTag ID", type: "text" },
            { name: "nomineeDetails", label: "Nominee Details", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Jewelry & Precious Metals": {
        fields: [
            { name: "metalType", label: "Metal Type", type: "text" },
            { name: "ownerName", label: "Owner Name", type: "text" },
            { name: "formOfHolding", label: "Form of Holding", type: "text" },
            { name: "quantityOrWeight", label: "Quantity/Weight", type: "text" },
            { name: "purity", label: "Purity", type: "text" },
            { name: "location", label: "Location", type: "text" },
            { name: "hallmarkCertificationNumber", label: "Hallmark/Certification No", type: "text" },
            { name: "insurancePolicyNumber", label: "Insurance Policy No", type: "text" },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Post-Office Saving Scheme": {
        fields: [
            { name: "schemeType", label: "Scheme Type", type: "text" },
            { name: "depositHolderName", label: "Deposit Holder Name", type: "text" },
            { name: "postOfficeBranchName", label: "Post Office Branch Name", type: "text" },
            { name: "accountNumber", label: "Account Number", type: "text" },
            { name: "depositAmount.value", label: "Deposit Amount (INR)", type: "number" },
            { name: "depositTenure", label: "Deposit Tenure", type: "text" },
            { name: "interestRate", label: "Interest Rate", type: "text" },
            { name: "dateOfDeposit", label: "Date of Deposit", type: "date" },
            { name: "maturityDate", label: "Maturity Date", type: "date" },
            { name: "prematureWithdrawalAllowed", label: "Premature Withdrawal Allowed", type: "select", options: ["Yes", "No"] },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "nomineeRelationship", label: "Nominee Relationship", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Securities": {
        fields: [
            { name: "securityType", label: "Security Type", type: "text" },
            { name: "bondHolderName", label: "Bond Holder Name", type: "text" },
            { name: "bondType", label: "Bond Type", type: "text" },
            { name: "bondIssuer", label: "Bond Issuer", type: "text" },
            { name: "isinNumber", label: "ISIN Number", type: "text" },
            { name: "couponRate", label: "Coupon Rate", type: "text" },
            { name: "maturityDate", label: "Maturity Date", type: "date" },
            { name: "purchaseDate", label: "Purchase Date", type: "date" },
            { name: "amountInvested.value", label: "Amount Invested (INR)", type: "number" },
            { name: "interestPaymentFrequency", label: "Interest Payment Frequency", type: "text" },
            { name: "linkedBankAccountNumber", label: "Linked Bank Account Number", type: "text" },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Real Estate": {
        fields: [
            { name: "realEstateType", label: "Real Estate Type", type: "text" },
            { name: "ownerName", label: "Owner Name", type: "text" },
            { name: "plotOrSurveyNumber", label: "Plot/Survey Number", type: "text" },
            { name: "registrationNumber", label: "Registration Number", type: "text" },
            { name: "propertyAddress", label: "Property Address", type: "textarea", colSpan: 2 },
            { name: "ownerAadharNumber", label: "Owner Aadhar Number", type: "text" },
            { name: "landArea", label: "Land Area", type: "text" },
            { name: "landType", label: "Land Type", type: "text" },
            { name: "percentageOfShare", label: "Percentage of Share", type: "text" },
            { name: "jointHolderName", label: "Joint Holder Name", type: "text" },
            { name: "landUseClassification", label: "Land Use Classification", type: "text" },
            { name: "modeOfAcquisition", label: "Mode of Acquisition", type: "text" },
            { name: "mortgageBankDetails", label: "Mortgage Bank Details", type: "text" },
            { name: "bankLoanDetails", label: "Bank Loan Details", type: "text" },
            { name: "encumbranceStatus", label: "Encumbrance Status", type: "text" },
            { name: "legalDisputes", label: "Legal Disputes", type: "textarea", colSpan: 2 },
            { name: "propertyValue.value", label: "Property Value (INR)", type: "number" },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "risksCovered", label: "Risks Covered", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Insurance": {
        fields: [
            { name: "insuranceType", label: "Insurance Type", type: "text" },
            { name: "policyHolderName", label: "Policy Holder Name", type: "text" },
            { name: "insuranceCompanyName", label: "Insurance Company Name", type: "text" },
            { name: "policyNumber", label: "Policy Number", type: "text" },
            { name: "policyTerm", label: "Policy Term", type: "text" },
            { name: "sumAssured.value", label: "Sum Assured (INR)", type: "number" },
            { name: "premiumAmount.value", label: "Premium Amount (INR)", type: "number" },
            { name: "paymentFrequency", label: "Payment Frequency", type: "text" },
            { name: "policyStartDate", label: "Policy Start Date", type: "date" },
            { name: "policyMaturityDate", label: "Policy Maturity Date", type: "date" },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "nomineeRelationship", label: "Nominee Relationship", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Cryptocurrencies": {
        fields: [
            { name: "accountHolderName", label: "Account Holder Name", type: "text" },
            { name: "cryptocurrencyName", label: "Cryptocurrency Name", type: "text" },
            { name: "walletProviderName", label: "Wallet Provider Name", type: "text" },
            { name: "publicWalletAddress", label: "Public Wallet Address", type: "text" },
            { name: "privateKeyBackupAvailable", label: "Private Key Backup Available", type: "select", options: ["Yes", "No"] },
            { name: "totalHoldings", label: "Total Holdings", type: "text" },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "modeOfStorage", label: "Mode of Storage", type: "text" },
            { name: "linkedBankAccount", label: "Linked Bank Account", type: "text" },
            { name: "transactionHistoryAvailable", label: "Transaction History Available", type: "select", options: ["Yes", "No"] },
            { name: "taxDeclarationDone", label: "Tax Declaration Done", type: "select", options: ["Yes", "No"] },
            { name: "exchangeDetails", label: "Exchange Details", type: "textarea", colSpan: 2 },
            { name: "kycVerified", label: "KYC Verified", type: "select", options: ["Yes", "No"] },
            { name: "regulatoryComplianceStatus", label: "Regulatory Compliance Status", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
        "Bank Locker": {
        fields: [
            { name: "lockerHolderName", label: "Locker Holder Name", type: "text" },
            { name: "bankNameAndBranch", label: "Bank Name & Branch", type: "text" },
            { name: "lockerNumber", label: "Locker Number", type: "text" },
            { name: "lockerSize", label: "Locker Size", type: "text" },
            { name: "annualRent.value", label: "Annual Rent (INR)", type: "number" },
            { name: "rentPaymentStatus", label: "Rent Payment Status", type: "text" },
            { name: "lockerContents", label: "Locker Contents", type: "textarea", colSpan: 2 },
            { name: "lastAccessDate", label: "Last Access Date", type: "date" },
            { name: "licensePeriod", label: "License Period", type: "text" },
            { name: "nextRentDueDate", label: "Next Rent Due Date", type: "date" },
            { name: "nomineeDetails", label: "Nominee Details", type: "text" },
            { name: "authorizedAccessPersons", label: "Authorized Access Persons", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Private Company": {
        fields: [
            { name: "companyName", label: "Company Name", type: "text" },
            { name: "companyType", label: "Company Type", type: "text" },
            { name: "ownershipStructure", label: "Ownership Structure", type: "text" },
            { name: "cin", label: "CIN", type: "text" },
            { name: "dateOfIncorporation", label: "Date of Incorporation", type: "date" },
            { name: "registeredOfficeAddress", label: "Registered Office Address", type: "textarea", colSpan: 2 },
            { name: "directorName", label: "Director Name", type: "text" },
            { name: "din", label: "DIN", type: "text" },
            { name: "shareholdingPercentage", label: "Shareholding Percentage", type: "text" },
            { name: "natureOfBusiness", label: "Nature of Business", type: "text" },
            { name: "pan", label: "PAN", type: "text" },
            { name: "tan", label: "TAN", type: "text" },
            { name: "gstin", label: "GSTIN", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Deposit Accounts": {
        fields: [
            { name: "depositAccountType", label: "Deposit Account Type", type: "text" },
            { name: "depositHolderName", label: "Deposit Holder Name", type: "text" },
            { name: "fdNumber", label: "FD Number", type: "text" },
            { name: "depositAmount.value", label: "Deposit Amount (INR)", type: "number" },
            { name: "fdrType", label: "FDR Type", type: "text" },
            { name: "depositTenure", label: "Deposit Tenure", type: "text" },
            { name: "bankOrNbfcNameAndBranch", label: "Bank/NBFC Name & Branch", type: "text" },
            { name: "linkedBankAccountNumber", label: "Linked Bank Account Number", type: "text" },
            { name: "bankIfscCode", label: "Bank IFSC Code", type: "text" },
            { name: "interestRate", label: "Interest Rate", type: "text" },
            { name: "interestPayoutMode", label: "Interest Payout Mode", type: "text" },
            { name: "taxSaverFd", label: "Tax Saver FD", type: "select", options: ["Yes", "No"] },
            { name: "dateOfDeposit", label: "Date of Deposit", type: "date" },
            { name: "customerId", label: "Customer ID", type: "text" },
            { name: "maturityDate", label: "Maturity Date", type: "date" },
            { name: "prematureWithdrawalAllowed", label: "Premature Withdrawal Allowed", type: "select", options: ["Yes", "No"] },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "nomineeRelationship", label: "Nominee Relationship", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Retirement & Pension Accounts": {
        fields: [
            { name: "retirementAccountType", label: "Retirement Account Type", type: "text" },
            { name: "accountHolderName", label: "Account Holder Name", type: "text" },
            { name: "pensionSchemeName", label: "Pension Scheme Name", type: "text" },
            { name: "pensionAccountNumberOrPran", label: "Pension Account Number / PRAN", type: "text" },
            { name: "linkedBankAccountNumber", label: "Linked Bank Account Number", type: "text" },
            { name: "linkedBankIfscCode", label: "Linked Bank IFSC Code", type: "text" },
            { name: "uniquePensionIdentificationNumber", label: "Unique Pension Identification Number", type: "text" },
            { name: "pensionHoldingAuthority", label: "Pension Holding Authority", type: "text" },
            { name: "currentPensionCorpusOrMonthlyPension.value", label: "Current Pension Corpus/Monthly Pension (INR)", type: "number" },
            { name: "contributionType", label: "Contribution Type", type: "text" },
            { name: "dateOfEnrollment", label: "Date of Enrollment", type: "date" },
            { name: "maturityOrWithdrawalEligibilityDate", label: "Maturity/Withdrawal Eligibility Date", type: "date" },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Copyrights": {
        fields: [
            { name: "copyrightOwnerName", label: "Copyright Owner Name", type: "text" },
            { name: "rocOrDiaryOrRegistrationNumber", label: "ROC/Diary/Registration Number", type: "text" },
            { name: "copyrightDescription", label: "Copyright Description", type: "textarea", colSpan: 2 },
            { name: "titleOfWork", label: "Title of Work", type: "text" },
            { name: "countryOfRegistration", label: "Country of Registration", type: "text" },
            { name: "classAndDescription", label: "Class and Description", type: "text" },
            { name: "certificateReceiptDate", label: "Certificate Receipt Date", type: "date" },
            { name: "copyrightValidTill", label: "Copyright Valid Till", type: "date" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Loan Track": {
        fields: [
            { name: "loanAmount.value", label: "Loan Amount (INR)", type: "number" },
            { name: "loanClassification", label: "Loan Classification", type: "text" },
            { name: "counterpartyName", label: "Counterparty Name", type: "text" },
            { name: "counterpartyEmail", label: "Counterparty Email", type: "text" },
            { name: "counterpartyPhone.number", label: "Counterparty Phone Number", type: "text" }, // Simplified country code for now
            { name: "lendingDate", label: "Lending Date", type: "date" },
            { name: "repaymentSchedule", label: "Repayment Schedule", type: "text" },
            { name: "interestRate", label: "Interest Rate", type: "text" },
            { name: "interestSchedule", label: "Interest Schedule", type: "text" },
            { name: "loanPurpose", label: "Loan Purpose", type: "text" },
            { name: "collateralDetails", label: "Collateral Details", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },

        "Intellectual Property": {
        fields: [
            { name: "intellectualPropertyType", label: "Intellectual Property Type", type: "text" },
            { name: "ownerName", label: "Owner Name", type: "text" },
            { name: "registrationOrApplicationNumber", label: "Registration/Application Number", type: "text" },
            { name: "ipTitle", label: "IP Title", type: "text" },
            { name: "ipType", label: "IP Type", type: "text" },
            { name: "description", label: "Description", type: "textarea", colSpan: 2 },
            { name: "dateOfFiling", label: "Date of Filing", type: "date" },
            { name: "dateOfGrant", label: "Date of Grant", type: "date" },
            { name: "registeredCountryOrJurisdiction", label: "Registered Country/Jurisdiction", type: "text" },
            { name: "agreementTerm", label: "Agreement Term", type: "text" },
            { name: "renewalDate", label: "Renewal Date", type: "date" },
            { name: "expiryDate", label: "Expiry Date", type: "date" },
            { name: "royaltyIncome.value", label: "Royalty Income (INR)", type: "number" },
            { name: "licensee", label: "Licensee", type: "text" },
            { name: "agreementExecutionDate", label: "Agreement Execution Date", type: "date" },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Digital Assets": {
        fields: [
            { name: "digitalAssetType", label: "Digital Asset Type", type: "text" },
            { name: "accountHolderName", label: "Account Holder Name", type: "text" },
            { name: "nftMarketplaceName", label: "NFT Marketplace Name", type: "text" },
            { name: "publicWalletAddress", label: "Public Wallet Address", type: "text" },
            { name: "nftCollectionName", label: "NFT Collection Name", type: "text" },
            { name: "nftTokenId", label: "NFT Token ID", type: "text" },
            { name: "totalNftsOwned", label: "Total NFTs Owned", type: "number" },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "privateKeyBackupAvailable", label: "Private Key Backup Available", type: "select", options: ["Yes", "No"] },
            { name: "storageType", label: "Storage Type", type: "text" },
            { name: "resaleOrRoyaltyRights", label: "Resale/Royalty Rights", type: "text" },
            { name: "nftDescriptionOrMetadata", label: "NFT Description/Metadata", type: "textarea", colSpan: 2 },
            { name: "kycVerified", label: "KYC Verified", type: "select", options: ["Yes", "No"] },
            { name: "taxDeclarationDone", label: "Tax Declaration Done", type: "select", options: ["Yes", "No"] },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Investment Accounts": {
        fields: [
            { name: "investmentAccountType", label: "Investment Account Type", type: "text" },
            { name: "accountHolderName", label: "Account Holder Name", type: "text" },
            { name: "investmentType", label: "Investment Type", type: "text" },
            { name: "fundName", label: "Fund Name", type: "text" },
            { name: "folioNumber", label: "Folio Number", type: "text" },
            { name: "numberOfUnits", label: "Number of Units", type: "number" },
            { name: "dateOfPurchase", label: "Date of Purchase", type: "date" },
            { name: "lockInPeriod", label: "Lock-in Period", type: "text" },
            { name: "nomineeName", label: "Nominee Name", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Other": {
        fields: [
            { name: "assetHolderName", label: "Asset Holder Name", type: "text" },
            { name: "assetName", label: "Asset Name", type: "text" },
            { name: "description", label: "Description", type: "textarea", colSpan: 2 },
            { name: "estimatedValue.value", label: "Estimated Value (INR)", type: "number" },
            { name: "storageLocation", label: "Storage Location", type: "text" },
            { name: "remarks", label: "Remarks", type: "textarea", colSpan: 2 },
        ]
    },
    "Default": {
        fields: [
            { name: "remarks", label: "Remarks / Notes", type: "textarea", colSpan: 2 },
        ]
    }
};
