export interface Location {
    latitude: number;
    longitude: number;
}

export interface ListingUpdate {
    listingUpdateReason: string;
    listingUpdateDate: Date;
}

export interface DisplayPrice {
    displayPrice: string;
    displayPriceQualifier: string;
}

export interface Price {
    amount: number;
    frequency: string;
    currencyCode: string;
    displayPrices: DisplayPrice[];
}

export interface Customer {
    branchId: number;
    brandPlusLogoURI: string;
    contactTelephone: string;
    branchDisplayName: string;
    branchName: string;
    brandTradingName: string;
    branchLandingPageUrl: string;
    development: boolean;
    showReducedProperties: boolean;
    commercial: boolean;
    showOnMap: boolean;
    brandPlusLogoUrl: string;
}

export interface ProductLabel {
    productLabelText: string;
}

export interface Image {
    srcUrl: string;
    url: string;
}

export interface PropertyImages {
    images: Image[];
    mainImageSrc: string;
    mainMapImageSrc: string;
}

export interface Property {
    id: number;
    bedrooms: number;
    numberOfImages: number;
    numberOfFloorplans: number;
    numberOfVirtualTours: number;
    summary: string;
    displayAddress: string;
    countryCode: string;
    location: Location;
    propertySubType: string;
    listingUpdate: ListingUpdate;
    premiumListing: boolean;
    featuredProperty: boolean;
    price: Price;
    customer: Customer;
    distance?: any;
    transactionType: string;
    productLabel: ProductLabel;
    commercial: boolean;
    development: boolean;
    residential: boolean;
    students: boolean;
    auction: boolean;
    feesApply: boolean;
    feesApplyText?: any;
    displaySize: string;
    showOnMap: boolean;
    propertyUrl: string;
    contactUrl: string;
    channel: string;
    firstVisibleDate: Date;
    keywords: any[];
    keywordMatchType: string;
    saved?: any;
    hidden?: any;
    onlineViewingsAvailable: boolean;
    propertyImages: PropertyImages;
    displayStatus: string;
    formattedBranchName: string;
    addedOrReduced: string;
    isRecent: boolean;
    formattedDistance: string;
    hasBrandPlus: boolean;
    heading: string;
    propertyTypeFullDescription: string;
}

export interface RadiusOption {
    value: string;
    description: string;
}

export interface PriceOption {
    value: string;
    description: string;
}

export interface BedroomOption {
    value: string;
    description: string;
}

export interface AddedToSiteOption {
    value: string;
    description: string;
}

export interface MustHaveOption {
    value: string;
    description: string;
}

export interface DontShowOption {
    value: string;
    description: string;
}

export interface SortOption {
    value: string;
    description: string;
}

export interface Location2 {
    latitude?: any;
    longitude?: any;
}

export interface ListingUpdate2 {
    listingUpdateReason?: any;
    listingUpdateDate: Date;
}

export interface DisplayPrice2 {
    displayPrice: string;
    displayPriceQualifier: string;
}

export interface Price2 {
    amount: number;
    frequency: string;
    currencyCode: string;
    displayPrices: DisplayPrice2[];
}

export interface Customer2 {
    branchId?: any;
    brandPlusLogoURI?: any;
    contactTelephone?: any;
    branchDisplayName?: any;
    branchName?: any;
    brandTradingName?: any;
    branchLandingPageUrl?: any;
    development: boolean;
    showReducedProperties: boolean;
    commercial: boolean;
    showOnMap: boolean;
    brandPlusLogoUrl: string;
}

export interface ProductLabel2 {
    productLabelText?: any;
}

export interface PropertyImages2 {
    images: any[];
    mainImageSrc: string;
    mainMapImageSrc: string;
}

export interface PropertySchema {
    id: number;
    bedrooms: number;
    numberOfImages: number;
    numberOfFloorplans: number;
    numberOfVirtualTours: number;
    summary?: any;
    displayAddress?: any;
    countryCode?: any;
    location: Location2;
    propertySubType?: any;
    listingUpdate: ListingUpdate2;
    premiumListing: boolean;
    featuredProperty: boolean;
    price: Price2;
    customer: Customer2;
    distance?: any;
    transactionType?: any;
    productLabel: ProductLabel2;
    commercial: boolean;
    development: boolean;
    residential: boolean;
    students: boolean;
    auction: boolean;
    feesApply: boolean;
    feesApplyText: string;
    displaySize: string;
    showOnMap: boolean;
    propertyUrl: string;
    contactUrl: string;
    channel: string;
    firstVisibleDate: Date;
    keywords: any[];
    keywordMatchType: string;
    saved: boolean;
    hidden: boolean;
    onlineViewingsAvailable: boolean;
    propertyImages: PropertyImages2;
    displayStatus: string;
    formattedBranchName: string;
    addedOrReduced: string;
    isRecent: boolean;
    formattedDistance: string;
    hasBrandPlus: boolean;
    heading: string;
    propertyTypeFullDescription: string;
}

export interface Model {
    text: string;
    url: string;
    noFollow: boolean;
}

export interface SoldHousePricesLinks {
    heading: string;
    subHeading: string;
    model: Model[];
    headingLink?: any;
}

export interface Model2 {
    text: string;
    url: string;
    noFollow: boolean;
}

export interface RelatedHouseSearches {
    heading: string;
    subHeading?: any;
    model: Model2[];
    headingLink?: any;
}

export interface Model3 {
    text: string;
    url: string;
    noFollow: boolean;
}

export interface HeadingLink {
    text: string;
    url: string;
    noFollow: boolean;
}

export interface RelatedFlatSearches {
    heading: string;
    subHeading?: any;
    model: Model3[];
    headingLink: HeadingLink;
}

export interface Model4 {
    text: string;
    url: string;
    noFollow: boolean;
}

export interface RelatedPopularSearches {
    heading: string;
    subHeading?: any;
    model: Model4[];
    headingLink?: any;
}

export interface Model5 {
    text: string;
    url: string;
    noFollow: boolean;
}

export interface ChannelSwitchLink {
    heading: string;
    subHeading?: any;
    model: Model5[];
    headingLink?: any;
}

export interface Model6 {
    text: string;
    url: string;
    noFollow: boolean;
}

export interface SuggestedLinks {
    heading: string;
    subHeading?: any;
    model: Model6[];
    headingLink?: any;
}

export interface SidebarModel {
    soldHousePricesLinks: SoldHousePricesLinks;
    relatedHouseSearches: RelatedHouseSearches;
    relatedFlatSearches: RelatedFlatSearches;
    relatedPopularSearches: RelatedPopularSearches;
    relatedRegionsSearches?: any;
    channelSwitchLink: ChannelSwitchLink;
    relatedStudentLinks?: any;
    branchMPU?: any;
    countryGuideMPU?: any;
    suggestedLinks: SuggestedLinks;
}

export interface SeoModel {
    canonicalUrl: string;
    metaRobots: string;
}

export interface RecentSearchModel {
    linkDisplayText: string;
    titleDisplayText: string;
    searchCriteriaMobile: string;
    createDate: number;
    locationIdentifierAndSearchType: string;
}

export interface CurrencyCodeOption {
    value: string;
    description: string;
}

export interface AreaSizeUnitOption {
    value: string;
    description: string;
    abbreviation: string;
}

export interface SizeOption {
    value: string;
    description: string;
    abbreviation: string;
}

export interface PriceTypeOption {
    value: string;
    description: string;
    abbreviation: string;
}

export interface SidebarSlot {
    id: string;
    adUnitPath: string;
    sizes: number[][];
    mappings: any[];
}

export interface Targeting {
    key: string;
    value: string;
}

export interface DfpModel {
    sidebarSlots: SidebarSlot[];
    targeting: Targeting[];
}

export interface NoResultsModel {
    suggestionPods: any[];
}

export interface CookiePolicies {
    functional: boolean;
    targeting: boolean;
}

export interface Location3 {
    id: number;
    displayName: string;
    shortDisplayName: string;
    locationType: string;
    listingCurrency: string;
}

export interface IndividualFeatureSwitchState {
    label: string;
    state: string;
    shouldLog: boolean;
}

export interface FeatureUser {
    uniqueIdentifier: string;
}

export interface FeatureSwitchStateForUser {
    individualFeatureSwitchStates: IndividualFeatureSwitchState[];
    featureUser: FeatureUser;
}

export interface SearchParameters {
    locationIdentifier: string;
    maxPrice: string;
    minPrice: string;
    numberOfPropertiesPerPage: string;
    radius: string;
    sortType: string;
    index: string;
    propertyTypes: string[];
    primaryDisplayPropertyType: string;
    maxDaysSinceAdded: string;
    includeSSTC: boolean;
    viewType: string;
    mustHave: any[];
    dontShow: any[];
    furnishTypes: any[];
    channel: string;
    areaSizeUnit: string;
    currencyCode: string;
    keywords: any[];
}

export interface Option {
    value: string;
    description: string;
}

export interface Pagination {
    total: number;
    options: Option[];
    first: string;
    last: string;
    next: string;
    page: string;
}

export interface RightmoveResponse {
    properties: Property[];
    resultCount: string;
    searchParametersDescription: string;
    radiusOptions: RadiusOption[];
    priceOptions: PriceOption[];
    bedroomOptions: BedroomOption[];
    addedToSiteOptions: AddedToSiteOption[];
    mustHaveOptions: MustHaveOption[];
    dontShowOptions: DontShowOption[];
    furnishOptions: any[];
    letTypeOptions: any[];
    sortOptions: SortOption[];
    applicationProperties: ApplicationProperties;
    staticMapUrl: string;
    shortLocationDescription: string;
    timestamp: number;
    bot: boolean;
    deviceType: string;
    propertySchema: PropertySchema;
    sidebarModel: SidebarModel;
    seoModel: SeoModel;
    mapViewUrl: string;
    legacyUrl: string;
    listViewUrl: string;
    pageTitle: string;
    metaDescription: string;
    recentSearchModel: RecentSearchModel;
    maxCardsPerPage: number;
    countryCode: string;
    countryId: number;
    currencyCodeOptions: CurrencyCodeOption[];
    areaSizeUnitOptions: AreaSizeUnitOption[];
    sizeOptions: SizeOption[];
    priceTypeOptions: PriceTypeOption[];
    showFeaturedAgent: boolean;
    showNewDrawASearch: boolean;
    commercialChannel: boolean;
    disambiguationPagePath: string;
    dfpModel: DfpModel;
    noResultsModel: NoResultsModel;
    urlPath?: any;
    tileGeometry?: any;
    geohashTerms: any[];
    comscore: string;
    cookiePolicies: CookiePolicies;
    formattedExchangeRateDate: string;
    authenticated: boolean;
    location: Location3;
    featureSwitchStateForUser: FeatureSwitchStateForUser;
    searchParameters: SearchParameters;
    pagination: Pagination;
}
