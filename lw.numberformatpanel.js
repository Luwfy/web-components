
/*
 * Class CurrencyFormatPanel
 * */
LW.Utilities.Assign('CurrencyFormatPanel', class CurrencyFormatPanel {

    constructor(selectorMainContainer, locale = 'en', messages = '') {
        const that = this;

        // List with all currencies, signs and abbreviations
        that.currencies = [
            {
                currency: 'US Dollar',
                sign: '$',
                abbreviation: 'USD',
            },
            {
                currency: 'Afghan Afghani',
                sign: 'Af.',
                abbreviation: 'AFN',
            },
            {
                currency: 'Albanian Lek',
                sign: 'Lek',
                abbreviation: 'ALL',
            },
            {
                currency: 'Algerian Dinar',
                sign: 'din',
                abbreviation: 'DZD',
            },
            {
                currency: 'Angolan Kwanza',
                sign: 'Kz',
                abbreviation: 'AOA',
            },
            {
                currency: 'Argentine Peso',
                sign: '$',
                abbreviation: 'ARS',
            },
            {
                currency: 'Armenian Dram',
                sign: 'Dram',
                abbreviation: 'AMD',
            },
            {
                currency: 'Aruban Florin',
                sign: 'Afl.',
                abbreviation: 'AWG',
            },
            {
                currency: 'Australian Dollar',
                sign: '$',
                abbreviation: 'AUD',
            },
            {
                currency: 'Azerbaijani Manat',
                sign: '₼',
                abbreviation: 'AZN',
            },
            {
                currency: 'Bahamian Dollar',
                sign: '$',
                abbreviation: 'BSD',
            },
            {
                currency: 'Bahraini Dinar',
                sign: 'din',
                abbreviation: 'BHD',
            },
            {
                currency: 'Bangladeshi Taka',
                sign: '৳',
                abbreviation: 'BDT',
            },
            {
                currency: 'Barbadian Dollar',
                sign: '$',
                abbreviation: 'BBD',
            },
            {
                currency: 'Belarusian Ruble',
                sign: 'р.',
                abbreviation: 'BYN',
            },
            {
                currency: 'Belarusian Ruble',
                sign: 'р.',
                abbreviation: 'BYR',
            },
            {
                currency: 'Belize Dollar',
                sign: '$',
                abbreviation: 'BZD',
            },
            {
                currency: 'Bermudan Dollar',
                sign: '$',
                abbreviation: 'BMD',
            },
            {
                currency: 'Bhutanese Ngultrum',
                sign: 'Nu.',
                abbreviation: 'BTN',
            },
            {
                currency: 'Bolivian Boliviano',
                sign: 'Bs',
                abbreviation: 'BOB',
            },
            {
                currency: 'Bosnia-Herzegovina Convertible Mark',
                sign: 'KM',
                abbreviation: 'BAM',
            },
            {
                currency: 'Botswanan Pula',
                sign: 'P',
                abbreviation: 'BWP',
            },
            {
                currency: 'Brazilian Real',
                sign: 'R$',
                abbreviation: 'BRL',
            },
            {
                currency: 'British Pound Sterling',
                sign: '£',
                abbreviation: 'GBP',
            },
            {
                currency: 'Brunei Dollar',
                sign: '$',
                abbreviation: 'BND',
            },
            {
                currency: 'Bulgarian Lev',
                sign: 'lev',
                abbreviation: 'BGN',
            },
            {
                currency: 'Burundian Franc',
                sign: 'FBu',
                abbreviation: 'BIF',
            },
            {
                currency: 'Cambodian Riel',
                sign: 'Riel',
                abbreviation: 'KHR',
            },
            {
                currency: 'Canadian Dollar',
                sign: '$',
                abbreviation: 'CAD',
            },
            {
                currency: 'Cape Verdean Escudo',
                sign: 'CVE',
                abbreviation: 'CVE',
            },
            {
                currency: 'Cayman Islands Dollar',
                sign: '$',
                abbreviation: 'KYD',
            },
            {
                currency: 'CFA Franc BCEAO',
                sign: 'CFA',
                abbreviation: 'XOF',
            },
            {
                currency: 'CFA Franc BEAC',
                sign: 'FCFA',
                abbreviation: 'XAF',
            },
            {
                currency: 'CFP Franc',
                sign: 'FCFP',
                abbreviation: 'XPF',
            },
            {
                currency: 'Chilean Peso',
                sign: '$',
                abbreviation: 'CLP',
            },
            {
                currency: 'Chinese Yuan',
                sign: '¥',
                abbreviation: 'CNY',
            },
            {
                currency: 'Chinese Yuan (offshore)',
                sign: '¥',
                abbreviation: 'RMB',
            },
            {
                currency: 'Colombian Peso',
                sign: '$',
                abbreviation: 'COP',
            },
            {
                currency: 'Comorian Franc',
                sign: 'CF',
                abbreviation: 'KMF',
            },
            {
                currency: 'Congolese Franc',
                sign: 'FrCD',
                abbreviation: 'CDF',
            },
            {
                currency: 'Costa Rican Colon',
                sign: '₡',
                abbreviation: 'CRC',
            },
            {
                currency: 'Croatian Kuna',
                sign: 'kn',
                abbreviation: 'HRK',
            },
            {
                currency: 'Cuban Convertible Peso',
                sign: '$',
                abbreviation: 'CUC',
            },
            {
                currency: 'Cuban Peso',
                sign: '$',
                abbreviation: 'CUP',
            },
            {
                currency: 'Czech Republic Koruna',
                sign: 'Kč',
                abbreviation: 'CZK',
            },
            {
                currency: 'Danish Krone',
                sign: 'kr.',
                abbreviation: 'DKK',
            },
            {
                currency: 'Djiboutian Franc',
                sign: 'Fdj',
                abbreviation: 'DJF',
            },
            {
                currency: 'Dominican Peso',
                sign: 'RD$',
                abbreviation: 'DOP',
            },
            {
                currency: 'East Caribbean Dollar',
                sign: '$',
                abbreviation: 'XCD',
            },
            {
                currency: 'Egyptian Pound',
                sign: '£',
                abbreviation: 'EGP',
            },
            {
                currency: 'Eritrean Nakfa',
                sign: 'Nfk',
                abbreviation: 'ERN',
            },
            {
                currency: 'Ethiopian Birr',
                sign: 'Birr',
                abbreviation: 'ETB',
            },
            {
                currency: 'Euro',
                sign: '€',
                abbreviation: 'EUR',
            },
            {
                currency: 'Falkland Islands Pound',
                sign: '£',
                abbreviation: 'FKP',
            },
            {
                currency: 'Fijian Dollar',
                sign: '$',
                abbreviation: 'FJD',
            },
            {
                currency: 'Gambian Dalasi',
                sign: 'GMD',
                abbreviation: 'GMD',
            },
            {
                currency: 'Georgian Lari',
                sign: 'GEL',
                abbreviation: 'GEL',
            },
            {
                currency: 'Ghanaian Cedi',
                sign: 'GHS',
                abbreviation: 'GHS',
            },
            {
                currency: 'Gibraltar Pound',
                sign: '£',
                abbreviation: 'GIP',
            },
            {
                currency: 'Guatemalan Quetzal',
                sign: 'Q',
                abbreviation: 'GTQ',
            },
            {
                currency: 'Guinean Franc',
                sign: 'FG',
                abbreviation: 'GNF',
            },
            {
                currency: 'Guyanaese Dollar',
                sign: '$',
                abbreviation: 'GYD',
            },
            {
                currency: 'Haitian Gourde',
                sign: 'HTG',
                abbreviation: 'HTG',
            },
            {
                currency: 'Honduran Lempira',
                sign: 'L',
                abbreviation: 'HNL',
            },
            {
                currency: 'Hong Kong Dollar',
                sign: '$',
                abbreviation: 'HKD',
            },
            {
                currency: 'Hungarian Forint',
                sign: 'Ft',
                abbreviation: 'HUF',
            },
            {
                currency: 'Icelandic Krona',
                sign: 'kr',
                abbreviation: 'ISK',
            },
            {
                currency: 'Indian Rupee',
                sign: '₹',
                abbreviation: 'INR',
            },
            {
                currency: 'Indonesian Rupiah',
                sign: 'Rp',
                abbreviation: 'IDR',
            },
            {
                currency: 'Iranian Rial',
                sign: 'Rial',
                abbreviation: 'IRR',
            },
            {
                currency: 'Iraqi Dinar',
                sign: 'din',
                abbreviation: '',
            },
            {
                currency: 'Israeli New Sheqel',
                sign: ' ₪',
                abbreviation: 'ILS',
            },
            {
                currency: 'Jamaican Dollar',
                sign: '$',
                abbreviation: 'JMD',
            },
            {
                currency: 'Japanese Yen',
                sign: '¥',
                abbreviation: 'JPY',
            },
            {
                currency: 'Jordanian Dinar',
                sign: 'din',
                abbreviation: 'JOD',
            },
            {
                currency: 'Kazakhstani Tenge',
                sign: '₸',
                abbreviation: 'KZT',
            },
            {
                currency: 'Kenyan Shilling',
                sign: 'Ksh',
                abbreviation: 'KES',
            },
            {
                currency: 'Kuwaiti Dinar',
                sign: 'din',
                abbreviation: 'KWD',
            },
            {
                currency: 'Kyrgystani Som',
                sign: 'KGS',
                abbreviation: 'KGS',
            },
            {
                currency: 'Laotian Kip',
                sign: '₭',
                abbreviation: 'LAK',
            },
            {
                currency: 'Lebanese Pound',
                sign: 'L£',
                abbreviation: 'LBP',
            },
            {
                currency: 'Lesotho Loti',
                sign: 'LSL',
                abbreviation: 'LSL',
            },
            {
                currency: 'Liberian Dollar',
                sign: '$',
                abbreviation: 'LRD',
            },
            {
                currency: 'Libyan Dinar',
                sign: 'din',
                abbreviation: 'LYD',
            },
            {
                currency: 'Lithuanian Litas',
                sign: 'Lt',
                abbreviation: 'LTL',
            },
            {
                currency: 'Macanese Pataca',
                sign: 'MOP',
                abbreviation: 'MOP',
            },
            {
                currency: 'Macedonian Denar',
                sign: 'din',
                abbreviation: 'MKD',
            },
            {
                currency: 'Malagasy Ariary',
                sign: 'Ar',
                abbreviation: 'MGA',
            },
            {
                currency: 'Malawian Kwacha',
                sign: 'MWK',
                abbreviation: 'MWK',
            },
            {
                currency: 'Malaysian Ringgit',
                sign: 'RM',
                abbreviation: 'MYR',
            },
            {
                currency: 'Maldivian Rufiyaa',
                sign: 'Rf',
                abbreviation: 'MVR',
            },
            {
                currency: 'Mauritanian Ouguiya',
                sign: 'MRO',
                abbreviation: 'MRO',
            },
            {
                currency: 'Mauritian Rupee',
                sign: 'MURs',
                abbreviation: 'MUR',
            },
            {
                currency: 'Mexican Peso',
                sign: '$',
                abbreviation: 'MXN',
            },
            {
                currency: 'Moldovan Leu',
                sign: 'MDL',
                abbreviation: 'MDL',
            },
            {
                currency: 'Mongolian Tugrik',
                sign: '₮',
                abbreviation: 'MNT',
            },
            {
                currency: 'Moroccan Dirham',
                sign: 'dh',
                abbreviation: 'MAD',
            },
            {
                currency: 'Mozambican Metical',
                sign: 'MTn',
                abbreviation: 'MZN',
            },
            {
                currency: 'Myanma Kyat',
                sign: 'K',
                abbreviation: 'MMK',
            },
            {
                currency: 'Namibian Dollar',
                sign: '$',
                abbreviation: 'NAD',
            },
            {
                currency: 'Nepalese Rupee',
                sign: 'Rs',
                abbreviation: 'NPR',
            },
            {
                currency: 'Netherlands Antillean Guilder',
                sign: 'NAf.',
                abbreviation: 'ANG',
            },
            {
                currency: 'New Taiwan Dollar',
                sign: 'NT$',
                abbreviation: 'TWD',
            },
            {
                currency: 'New Zealand Dollar',
                sign: '$',
                abbreviation: 'NZD',
            },
            {
                currency: 'Nicaraguan Cordoba',
                sign: 'C$',
                abbreviation: 'NIO',
            },
            {
                currency: 'Nigerian Naira',
                sign: '₦',
                abbreviation: 'NGN',
            },
            {
                currency: 'North Korean Won',
                sign: '₩KP',
                abbreviation: 'KPW',
            },
            {
                currency: 'Norwegian Krone',
                sign: 'kr',
                abbreviation: 'NOK',
            },
            {
                currency: 'Omani Rial',
                sign: 'Rial',
                abbreviation: 'OMR',
            },
            {
                currency: 'Pakistani Rupee',
                sign: 'Rs',
                abbreviation: 'PKR',
            },
            {
                currency: 'Panamanian Balboa',
                sign: 'B/.',
                abbreviation: 'PAB',
            },
            {
                currency: 'Papua New Guinean Kina',
                sign: 'PGK',
                abbreviation: 'PGK',
            },
            {
                currency: 'Paraguayan Guarani',
                sign: 'Gs.',
                abbreviation: 'PYG',
            },
            {
                currency: 'Peruvian Nuevo Sol',
                sign: 'S/.',
                abbreviation: 'PEN',
            },
            {
                currency: 'Philippine Peso',
                sign: '₱',
                abbreviation: 'PHP',
            },
            {
                currency: 'Polish Zloty',
                sign: 'zł',
                abbreviation: 'PLN',
            },
            {
                currency: 'Qatari Rial',
                sign: 'Rial',
                abbreviation: 'QAR',
            },
            {
                currency: 'Romanian Leu',
                sign: 'RON',
                abbreviation: 'RON',
            },
            {
                currency: 'Russian Ruble',
                sign: '₽',
                abbreviation: 'RUB',
            },
            {
                currency: 'Rwandan Franc',
                sign: 'RF',
                abbreviation: 'RWF',
            },
            {
                currency: 'Saint Helena Pound',
                sign: '£',
                abbreviation: 'SHP',
            },
            {
                currency: 'Samoan Tala',
                sign: 'WST',
                abbreviation: 'WST',
            },
            {
                currency: 'Sao Tomean Dobra',
                sign: 'Db',
                abbreviation: 'STD',
            },
            {
                currency: 'Saudi Riyal',
                sign: 'Rial',
                abbreviation: 'SAR',
            },
            {
                currency: 'Serbian Dinar',
                sign: 'din',
                abbreviation: 'RSD',
            },
            {
                currency: 'Seychellois Rupee',
                sign: 'SCR',
                abbreviation: 'SCR',
            },
            {
                currency: 'Sierra Leonean Leone',
                sign: 'SLL',
                abbreviation: 'SLL',
            },
            {
                currency: 'Singapore Dollar',
                sign: '$',
                abbreviation: 'SGD',
            },
            {
                currency: 'Solomon Islands Dollar',
                sign: '$',
                abbreviation: 'SBD',
            },
            {
                currency: 'Somali Shilling',
                sign: 'SOS',
                abbreviation: 'SOS',
            },
            {
                currency: 'South African Rand',
                sign: 'R',
                abbreviation: 'ZAR',
            },
            {
                currency: 'South Korean Won',
                sign: '₩',
                abbreviation: 'KRW',
            },
            {
                currency: 'South Sudanese Pound',
                sign: '£',
                abbreviation: 'SSP',
            },
            {
                currency: 'Sri Lankan Rupee',
                sign: 'Rs',
                abbreviation: 'LKR',
            },
            {
                currency: 'Sudanese Pound',
                sign: 'SDG',
                abbreviation: 'SDG',
            },
            {
                currency: 'Surinamese Dollar',
                sign: '$',
                abbreviation: 'SRD',
            },
            {
                currency: 'Swazi Lilangeni',
                sign: 'SZL',
                abbreviation: 'SZL',
            },
            {
                currency: 'Swedish Krona',
                sign: 'kr',
                abbreviation: 'SEK',
            },
            {
                currency: 'Swiss Franc',
                sign: 'CHF',
                abbreviation: 'CHF',
            },
            {
                currency: 'Syrian Pound',
                sign: '£',
                abbreviation: 'SYP',
            },
            {
                currency: 'Tajikistani Somoni',
                sign: 'Som',
                abbreviation: 'TJS',
            },
            {
                currency: 'Tanzanian Shilling',
                sign: 'TSh',
                abbreviation: 'TZS',
            },
            {
                currency: 'Thai Baht',
                sign: '฿',
                abbreviation: 'THB',
            },
            {
                currency: 'Tongan Pa\'anga',
                sign: 'T$',
                abbreviation: 'TOP',
            },
            {
                currency: 'Trinidad and Tobago Dollar',
                sign: '$',
                abbreviation: 'TTD',
            },
            {
                currency: 'Tunisian Dinar',
                sign: 'din',
                abbreviation: 'TND',
            },
            {
                currency: 'Turkish Lira',
                sign: '₺',
                abbreviation: 'TRY',
            },
            {
                currency: 'Turkmenistani Manat',
                sign: 'm',
                abbreviation: 'TMT',
            },
            {
                currency: 'Ugandan Shilling',
                sign: 'UGX',
                abbreviation: 'UGX',
            },
            {
                currency: 'Ukrainian Hryvnia',
                sign: 'грн.',
                abbreviation: 'UAH',
            },
            {
                currency: 'United Arab Emirates Dirham',
                sign: 'dh',
                abbreviation: 'AED',
            },
            {
                currency: 'Uruguayan Peso',
                sign: '$',
                abbreviation: 'UYU',
            },
            {
                currency: 'Uzbekistan Som',
                sign: 'soʼm',
                abbreviation: 'UZS',
            },
            {
                currency: 'Vanuatu Vatu',
                sign: 'VUV',
                abbreviation: 'VUV',
            },
            {
                currency: 'Venezuelan Bolivar',
                sign: 'Bs',
                abbreviation: 'VEF',
            },
            {
                currency: 'Venezuelan Bolivar',
                sign: 'Bs',
                abbreviation: 'VES',
            },
            {
                currency: 'Vietnamese Dong',
                sign: '₫',
                abbreviation: 'VND',
            },
            {
                currency: 'Yemeni Rial',
                sign: 'Rial',
                abbreviation: 'YER',
            },
            {
                currency: 'Zambian Kwacha',
                sign: 'ZMW',
                abbreviation: 'ZMW',
            },
            {
                currency: 'Zimbabwean Dollar',
                sign: '$',
                abbreviation: 'ZWD',
            },
        ];

        that.mainContainer = document.querySelector(selectorMainContainer);
        that.selectedCurrencyFullValue = '1,000.00';
        that.selectedCurrencyValue = '1,000';

        that.demoContainerHolder = document.createElement('div');
        that.demoContainerHolder.classList.add('currency-format-panel-demo-container');

        // Sets localization settings
        that._setLocalizationSettings(locale, messages);
        
        // Generate Current Currency Holder and Apply Button
        that._generateSelectedCurrencyHolderAndApply();
        
        // Fill all curencies
        that._generateCurrencyHolder();

        // Append to user container
        that.mainContainer.appendChild(that.demoContainerHolder);

    }


    /**
     * Set default localization settings
     */
    _setLocalizationSettings(locale, messages) {
        const that = this;

        that.locale = locale;
        that.messages = messages;

        // Sets default locale && messages
        that.defaultLocale = 'en';
        that.defaultMessages = {
            'en': {
                'apply': 'apply',
            },
        };

        // If messages not passed - get default
        if (!that.messages) {
            that.messages = that.defaultMessages;
        }

        // If passed invalid language
        if (!that.messages[that.locale]) {
            if (that.messages[that.defaultLocale]) {
                that.locale = that.defaultLocale;
            }
            else {
                that.messages = that.defaultMessages;
                that.locale = that.defaultLocale;
            }
        }
    }


    /**
     * Generate input elements and apply button
     * */
    _generateSelectedCurrencyHolderAndApply() {
        const that = this;

        // Selected Currency Holder And Apply Holder
        let selectedCurrencyHolderAndApplyHolder = document.createElement('div');
        selectedCurrencyHolderAndApplyHolder.classList.add('selected-currency-holder-and-apply-holder');

        // Selected Currency Holder
        let selectedCurrencyHolder = document.createElement('div');
        selectedCurrencyHolder.classList.add('selected-currency-holder');

            // Currency sign input holder 
            let currencySignInputHolder = document.createElement('div');
            currencySignInputHolder.classList.add('currency-sign-input-holder');

            // LW text box currency filer input
            that.currencySignTextBox = document.createElement('lw-text-box');
            that.currencySignTextBox.classList.add('currency-sign-input');
            // Adds keyup event listener
            const filterCurrenciesFunction = () => that._filterCurrencies();
            that.currencySignTextBox.addEventListener('keyup', filterCurrenciesFunction);
            that.currencySignTextBox['currency-sign-input'] = filterCurrenciesFunction;

            currencySignInputHolder.appendChild(that.currencySignTextBox);
            selectedCurrencyHolder.appendChild(currencySignInputHolder);

            // Currency lw input holder 
            let currencyLWInputHolder = document.createElement('div');
            currencyLWInputHolder.classList.add('currency-lw-input-holder');

            that.inputCurrencyFormats = document.createElement('lw-input');
            that.inputCurrencyFormats.dropDownWidth = 'auto';
            that.inputCurrencyFormats.dropDownButtonPosition = 'right';
            that.inputCurrencyFormats.readonly = true;
            that.inputCurrencyFormats.classList.add('input-currency-formats');

            currencyLWInputHolder.appendChild(that.inputCurrencyFormats);
            selectedCurrencyHolder.appendChild(currencyLWInputHolder);

        // Apply Button Holder
        let applyButtonHolder = document.createElement('div');
        applyButtonHolder.classList.add('apply-button-holder');

            // Apply button
            that.applyButton = document.createElement('lw-button');
            that.applyButton.classList.add('use-format-button');
            that.applyButton.classList.add('success');
            that.applyButton.innerHTML = that.messages[that.locale].apply ? that.messages[that.locale].apply : that.defaultMessages[that.defaultLocale].apply;
            // Apply click event listener
            const getFormatFunction = () => that.value = that.getFormat();
            that.applyButton.addEventListener('click', getFormatFunction);
            that.applyButton['apply-button-event-listener'] = getFormatFunction;

        applyButtonHolder.appendChild(that.applyButton);

        // Appends
        selectedCurrencyHolderAndApplyHolder.appendChild(selectedCurrencyHolder);
        selectedCurrencyHolderAndApplyHolder.appendChild(applyButtonHolder);

        // Apend to main container
        that.demoContainerHolder.appendChild(selectedCurrencyHolderAndApplyHolder);
    }

    
    /**
    * Detach public method for removing event listeners
    * */
    detach() {
        const that = this;
        that._removeEventListeners();
    }


    /**
     * Remove event listeners
     * */
    _removeEventListeners() {
        const that = this;

        // Detach ketup input text box
        that.currencySignTextBox.removeEventListener('keyup', that.currencySignTextBox['currency-sign-input'])
        delete that.currencySignTextBox['currency-sign-input']

        // Detach Apply click event listener
        that.applyButton.removeEventListener('click', that.applyButton['apply-button-event-listener'])
        delete that.applyButton['apply-button-event-listener']

        // Detach each currency item
        let currencyItems = document.querySelectorAll('.currency-item');
        for (let i = 0; i < currencyItems.length; i++) {
            let eachCurrencyItem = currencyItems[i];
            let eachCurrencyItemDataset = currencyItems[i].dataset.currency;
            eachCurrencyItem.removeEventListener('click', eachCurrencyItem[eachCurrencyItemDataset])
            delete eachCurrencyItem[eachCurrencyItemDataset];
        }

    }

    /**
     * Returns the choosed currency format
     * */
    getFormat() {
        const that = this;

        let selectedInputFormat = that.inputCurrencyFormats.value;

        let returnFormat;
        if (selectedInputFormat.includes(that.selectedCurrencyFullValue)) {
            returnFormat = selectedInputFormat.replace(that.selectedCurrencyFullValue, '"#,#.00"');
        }
        else if (selectedInputFormat.includes(that.selectedCurrencyValue)) {
            returnFormat = selectedInputFormat.replace(that.selectedCurrencyValue, '"#,#"');
        }

        returnFormat = "'" + '"' + returnFormat + '"'  + "'";
        return returnFormat;
    }


    /**
     * Generate currency holder
     * */
    _generateCurrencyHolder() {
        const that = this;

        that.currencyHolder = document.createElement('div');
        that.currencyHolder.classList.add('currency-list');

        // Set the listing with currencies
        that._setCurrencies(that.currencies);
        
        that.demoContainerHolder.appendChild(that.currencyHolder);
    }


    /**
     * Append each currency to the currency holder
     */
    _setCurrencies(currencies) {
        const that = this;

        that.currencyHolder.innerHTML = '';

        for (let i = 0; i < currencies.length; i++) {
            let currentCurrencyObject = currencies[i];
            let currentCurrency = currencies[i].currency;
            let currentSign = currencies[i].sign;

            let eachCurrencyItem = document.createElement('div');
            eachCurrencyItem.classList.add('currency-item');
            eachCurrencyItem.innerHTML = currentCurrency;
            eachCurrencyItem.dataset.currency = currentCurrency.replace(' ', '_') + '_' + i;

            let rightFormat = document.createElement('div');
            rightFormat.classList.add('currency-item-default-format');
            rightFormat.innerHTML = currentSign + ' ' + that.selectedCurrencyFullValue;
            eachCurrencyItem.appendChild(rightFormat);

            that.currencyHolder.appendChild(eachCurrencyItem);

            if (i === 0) {
                that.useThisFormat(currentCurrencyObject)
            }

            const useThisFormatFunction = () => that.useThisFormat(currentCurrencyObject);
            eachCurrencyItem.addEventListener('click', useThisFormatFunction);
            eachCurrencyItem[currentCurrency.replace(' ','_') + '_' + i] = useThisFormatFunction;
        }
    }


    /**
     * Filter currencies 
     * */
    _filterCurrencies() {
        const that = this;

        let inputValue = that.currencySignTextBox.value.toLowerCase();
        let filteredCirrencies = [];
        for (let i = 0; i < that.currencies.length; i++) {
            let currency = that.currencies[i].currency.toLowerCase();

            if (currency.indexOf(inputValue) !== -1) {
                filteredCirrencies.push(that.currencies[i]); 
            }
        }

        // Fill the currency holder with the filtered currencies 
        that._setCurrencies(filteredCirrencies);

        //Set the lw input with the custom currency formats
        let lwInputDataSources = [];
        if (inputValue.length !== 0) {
            lwInputDataSources.push(inputValue + that.selectedCurrencyFullValue);
            lwInputDataSources.push(inputValue + that.selectedCurrencyValue);
        }
        lwInputDataSources.push(that.selectedCurrencyFullValue + inputValue);
        lwInputDataSources.push(that.selectedCurrencyValue + inputValue);

        that.inputCurrencyFormats.dataSource = lwInputDataSources;
        that.inputCurrencyFormats.value = lwInputDataSources[0];

    }


    /**
     * Sets the abbreviation and currency in the inputs
     */
    useThisFormat(currentCurrencyObject) {
        const that = this;

        let sign = currentCurrencyObject.sign;
        //let currency = currentCurrencyObject.currency;
        let abbreviation = currentCurrencyObject.abbreviation;

        // Set sign value to the text box
        that.currencySignTextBox.value = sign;

        // Set datasource values to the lw-input
        let lwInputDataSources = [];
        lwInputDataSources.push(sign + that.selectedCurrencyFullValue);
        lwInputDataSources.push(abbreviation + ' ' + sign + that.selectedCurrencyFullValue);
        lwInputDataSources.push(sign + that.selectedCurrencyValue);
        lwInputDataSources.push(that.selectedCurrencyFullValue + sign);
        lwInputDataSources.push(that.selectedCurrencyValue + sign);
        that.inputCurrencyFormats.dataSource = lwInputDataSources;
        that.inputCurrencyFormats.value = lwInputDataSources[0];
    }

});



/*
 * Class NumberFormatPanel
 * */
LW.Utilities.Assign('NumberFormatPanel', class NumberFormatPanel {

    constructor(selectorMainContainer, locale = 'en', messages = '') {
        const that = this;

        // List with all custom formats
        that.formats = [
            '0',
            '0.00',
            '#,##0',
            '#,##0.00',
            '#,##0_);(#,##0)',
            '$#,##0_);($#,##0)',
            '#,##0.00_);(#,##0.00)',
            '$#,##0.00_);($#,##0.00)',
            '@',
            '0%',
            '0.00%',
            '0.00E+00',
            '##0.0E+0',
            '# ?/?', //'# #/#',
            '# ??/??', //'# ##/##',
            '_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)',
            '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
            '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)', //'_($* #,##0.00_);_($* (#,##0.00);_($* "-"##_);_(@_)',
            '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)' //'_(* #,##0.00_);_(* (#,##0.00);_(* "-"##_);_(@_)'
        ];

        that.sampleDemoValue = 1234.56;

        that.mainContainer = document.querySelector(selectorMainContainer);

        that.demoContainerHolder = document.createElement('div');
        that.demoContainerHolder.classList.add('number-format-panel-demo-container');

        // Sets localization settings
        that._setLocalizationSettings(locale, messages);

        // Generate Number Format Holder and Apply Button
        that._generateSelectedNumberFormatHolderAndApply();

        // Generates example container above the custom number format holder
        that._generateExampleContainer();

        // Fill all formats
        that._generateCustomFormatsHolder();

        // Initial value set
        that.useThisFormat(that.initialCustomNumberFormatValue);
        
        // Append to user container
        that.mainContainer.appendChild(that.demoContainerHolder);
    }


    /**
     * Set default localization settings
     */
    _setLocalizationSettings(locale, messages) {
        const that = this;

        that.locale = locale;
        that.messages = messages;

        // Sets default locale && messages
        that.defaultLocale = 'en';
        that.defaultMessages = {
            'en': {
                'apply': 'apply',
                'sample': 'Sample',
                'positive': 'Positive',
                'negative': 'Negative',
                'zero': 'Zero',
                'text': 'Text',
            },
        };

        // If messages not passed - get default
        if (!that.messages) {
            that.messages = that.defaultMessages;
        }

        // If passed invalid language
        if (!that.messages[that.locale]) {
            if (that.messages[that.defaultLocale]) {
                that.locale = that.defaultLocale;
            }
            else {
                that.messages = that.defaultMessages;
                that.locale = that.defaultLocale;
            }
        }
    }


    /**
     * Generate header input element and apply button
     * */
    _generateSelectedNumberFormatHolderAndApply() {
        const that = this;

        // Selected custom number Holder And Apply Holder
        let selectedCustomNumberFormatHolderAndApplyHolder = document.createElement('div');
        selectedCustomNumberFormatHolderAndApplyHolder.classList.add('selected-custom-number-format-holder-and-apply-holder');

        // Selected custom number Holder
        let selectedNumberFormatHolder = document.createElement('div');
        selectedNumberFormatHolder.classList.add('selected-custom-number-format-holder');

        // Custom number format input holder 
        let customNumberFormatInputHolder = document.createElement('div');
        customNumberFormatInputHolder.classList.add('custom-number-format-input-holder');

        // LW text box custom number format filter input
        that.customNumberFormatTextBox = document.createElement('lw-text-box');
        that.customNumberFormatTextBox.classList.add('custom-number-format-input');

        // Adds keyup event listener
        const filterCustomFormatFunction = () => that._filterCustomFormat();
        that.customNumberFormatTextBox.addEventListener('keyup', filterCustomFormatFunction);
        that.customNumberFormatTextBox['custom-number-format-input'] = filterCustomFormatFunction;

        customNumberFormatInputHolder.appendChild(that.customNumberFormatTextBox);
        selectedNumberFormatHolder.appendChild(customNumberFormatInputHolder);

        // Apply Button Holder
        let applyButtonHolder = document.createElement('div');
        applyButtonHolder.classList.add('apply-button-holder');

        // Apply button
        that.applyButton = document.createElement('lw-button');
        that.applyButton.classList.add('use-number-format-button');
        that.applyButton.classList.add('success');
        that.applyButton.innerHTML = that.messages[that.locale].apply ? that.messages[that.locale].apply : that.defaultMessages[that.defaultLocale].apply;

        // Apply click event listener
        const getFormatFunction = () => that.value = that.getFormat();
        that.applyButton.addEventListener('click', getFormatFunction);
        that.applyButton['apply-button-event-listener'] = getFormatFunction;
        applyButtonHolder.appendChild(that.applyButton);

        // Appends
        selectedCustomNumberFormatHolderAndApplyHolder.appendChild(selectedNumberFormatHolder);
        selectedCustomNumberFormatHolderAndApplyHolder.appendChild(applyButtonHolder);

        // Apend to main container
        that.demoContainerHolder.appendChild(selectedCustomNumberFormatHolderAndApplyHolder);
    }


    /**
    * Detach public method for removing event listeners
    * */
    detach() {
        const that = this;
        that._removeEventListeners();
    }


    /**
     * Remove event listeners
     * */
    _removeEventListeners() {
        const that = this;

        // Detach ketup input text box
        that.customNumberFormatTextBox.removeEventListener('keyup', that.customNumberFormatTextBox['custom-number-format-input'])
        delete that.customNumberFormatTextBox['custom-number-format-input']

        // Detach Apply click event listener
        that.applyButton.removeEventListener('click', that.applyButton['apply-button-event-listener'])
        delete that.applyButton['apply-button-event-listener']

        // Detach each number format items
        let numberFormatItems = document.querySelectorAll('.custom-number-format-item');
        for (let i = 0; i < numberFormatItems.length; i++) {
            let eachCustomFormatItem = numberFormatItems[i];
            eachCustomFormatItem.removeEventListener('click', eachCustomFormatItem[i])
            delete eachCustomFormatItem[i];
        }

    }


    /**
     * Returns the format in the input
     * */
    getFormat() {
        const that = this;
        return that.customNumberFormatTextBox.value;
    }


    /**
     * Generates sample container above the custom formats holder
     * */
    _generateExampleContainer() {
        const that = this;

        let exampleDemoContainet = document.createElement('div');
        exampleDemoContainet.classList.add('sample-container');

        that.sampleTextHolder = document.createElement('div');
        that.sampleTextHolder.classList.add('sample-text-container');

        that.positiveTextHolder = document.createElement('div');
        that.positiveTextHolder.classList.add('positive-text-container');

        that.negativeTextHolder = document.createElement('div');
        that.negativeTextHolder.classList.add('negative-text-container');

        that.zeroTextHolder = document.createElement('div');
        that.zeroTextHolder.classList.add('zero-text-container');

        that.textHolder = document.createElement('div');
        that.textHolder.classList.add('text-container');

        exampleDemoContainet.appendChild(that.sampleTextHolder);
        exampleDemoContainet.appendChild(that.positiveTextHolder);
        exampleDemoContainet.appendChild(that.negativeTextHolder);
        exampleDemoContainet.appendChild(that.zeroTextHolder);
        exampleDemoContainet.appendChild(that.textHolder);

        that.demoContainerHolder.appendChild(exampleDemoContainet);
    }


    /**
     * Generate custom formats holder
     * */
    _generateCustomFormatsHolder() {
        const that = this;

        that.customNumberFormatHolder = document.createElement('div');
        that.customNumberFormatHolder.classList.add('custom-number-format-list');

        // Set the listing with custom number formats
        that._setNumberFormats(that.formats);

        that.demoContainerHolder.appendChild(that.customNumberFormatHolder);
    }


    /**
     * Append each format to the custom number format holder
     */
    _setNumberFormats(formats) {
        const that = this;

        that.customNumberFormatHolder.innerHTML = '';

        for (let i = 0; i < formats.length; i++) {
            let customNumberFormat = formats[i];

            let eachCustomFormatItem = document.createElement('div');
            eachCustomFormatItem.classList.add('custom-number-format-item');
            eachCustomFormatItem.innerHTML = customNumberFormat;

            let rightFormat = document.createElement('div');
            rightFormat.classList.add('custom-number-format-item-default-format');
            rightFormat.innerHTML = new LW.Utilities.NumberRenderer().formatNumber(that.sampleDemoValue, customNumberFormat);
            eachCustomFormatItem.appendChild(rightFormat);
            that.customNumberFormatHolder.appendChild(eachCustomFormatItem);

            if (i === 0) {
                that.initialCustomNumberFormatValue = customNumberFormat;
            }

            // Add click event
            const useThisFormatFunction = () => that.useThisFormat(customNumberFormat);
            eachCustomFormatItem.addEventListener('click', useThisFormatFunction);
            eachCustomFormatItem[i] = useThisFormatFunction;
        }
    }


    /**
     * Filter the custom formats 
     * */
    _filterCustomFormat() {
        const that = this;

        let inputValue = that.customNumberFormatTextBox.value;
        let filteredFormats = [];
        for (let i = 0; i < that.formats.length; i++) {
            let format = that.formats[i];

            if (format.indexOf(inputValue) !== -1) {
                filteredFormats.push(that.formats[i]);
            }
        }

        // Fill the custom formats holder with the filtered formats 
        that._setNumberFormats(filteredFormats);

        // Set the results for this filtered format
        that.useThisFormat(inputValue);
    }


    /**
     * Sets the custom format
     */
    useThisFormat(customFormat) {
        const that = this;

        //console.log(customFormat)

        let sampleText = '',
            positiveText = '',
            negativeText = '',
            zeroText = '',
            text = '';

        let sampleTextFormat = (that.messages[that.locale].sample ? that.messages[that.locale].sample : that.defaultMessages[that.defaultLocale].sample) + ': ' + new LW.Utilities.NumberRenderer().formatNumber(that.sampleDemoValue, customFormat);
        let positiveTextFormat = (that.messages[that.locale].positive ? that.messages[that.locale].positive : that.defaultMessages[that.defaultLocale].positive) + ': ' + new LW.Utilities.NumberRenderer().formatNumber(Math.abs(that.sampleDemoValue), customFormat);
        let negativeTextFormat = (that.messages[that.locale].negative ? that.messages[that.locale].negative : that.defaultMessages[that.defaultLocale].negative) + ': ' + new LW.Utilities.NumberRenderer().formatNumber(-Math.abs(that.sampleDemoValue), customFormat);
        let zeroTextFormat = (that.messages[that.locale].zero ? that.messages[that.locale].zero : that.defaultMessages[that.defaultLocale].zero) + ': ' + new LW.Utilities.NumberRenderer().formatNumber(0, customFormat);
        let textContentFormat = (that.messages[that.locale].text ? that.messages[that.locale].text : that.defaultMessages[that.defaultLocale].text) + ': ' + new LW.Utilities.NumberRenderer().formatNumber((that.messages[that.locale].text.toLowerCase() ? that.messages[that.locale].text.toLowerCase() : that.defaultMessages[that.defaultLocale].text.toLowerCase()), customFormat);

        var countTypeFormats = (customFormat.match(/;/g) || []).length;
        if (countTypeFormats === 0) {
            sampleText = sampleTextFormat;
        }
        else if (countTypeFormats === 1) {
            positiveText = positiveTextFormat;
            negativeText = negativeTextFormat;
        }
        else if (countTypeFormats === 2) {
            positiveText = positiveTextFormat;
            negativeText = negativeTextFormat;
            zeroText = zeroTextFormat;
        }
        else {
            positiveText = positiveTextFormat;
            negativeText = negativeTextFormat;
            zeroText = zeroTextFormat;
            text = textContentFormat;
        }

        that.sampleTextHolder.innerHTML = sampleText;
        that.positiveTextHolder.innerHTML = positiveText;
        that.negativeTextHolder.innerHTML = negativeText;
        that.zeroTextHolder.innerHTML = zeroText;
        that.textHolder.innerHTML = text;

        // Set sign value to the text box
        that.customNumberFormatTextBox.value = customFormat;

        //Remove unnecessary border
        if (that.demoContainerHolder.querySelector('.custom-number-format-item') === null) {
            that.demoContainerHolder.querySelector('.custom-number-format-list').classList.add('lw-hidden');
        }
        else {
            let customNumberFormatClasses = that.demoContainerHolder.querySelector('.custom-number-format-list').classList;
            for (let i = 0; i < customNumberFormatClasses.length; i++) {
                if (customNumberFormatClasses[i] === 'lw-hidden') {
                    customNumberFormatClasses.remove('lw-hidden');
                    continue;
                }
            }
        }


    }

});