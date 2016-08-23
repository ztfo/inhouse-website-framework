angular.module('userData', [])
    .service('userDataService', function() {
        var self = this;
        this.aboutConfig = '';
        this.contactConfig = '';
        this.featuredListingsConfig = '';
        this.landingSearchConfig = '';
        this.resourcesConfig = '';
        this.sliderConfig = '';
        this.testimonialsConfig = '';


        var userJson = {
            userId: '57121b8c5c893f4f008b4569',
            userHash: 'HHe98Ub4nGa3kPE8gRg3EA2wF0lOWEfHx5ahSgsU',
            gaKey: 'UA-80032314-1',
            pixedID: undefined,
            contactEmail: 'yourhomeforrealestate@gmail.com',
            contactPhone: '5204486033',
            contactAddress: '2890 E Skyline Dr #250',
            contactAddress2: 'Tucson, AZ 85718',
            city: 'Tucson',
            agentName: 'Carol Nigut',
            agentBrand: undefined,
            facebook: 'https://www.facebook.com/carolnigut.arizonarealtor',
            linkedin: 'https://www.linkedin.com/in/carol-nigut-8094896',
            instagram: undefined,
            pinterest: undefined,
            twitter: 'https://twitter.com/urhm4realestate',
            teamName: 'Carol Nigut',
            brokerage: 'Coldwell Banker Residential Brokerage',
            bio1: '<p>As a former educator and small business owner, I\'ve lived all over the United States, buying and selling property with each move. Knowing what it\'s like to go through the process drives my commitment to my clients. Trusted for my knowledge, integrity, and diligence, I am one of a small percentage of Arizona Realtors® that have earned the GRI (Graduate Realtor® Institute) designation, making me uniquely qualified to serve and protect you through every phase of your real estate transaction. As an ePro professional, I also have the skills to take full advantage of online and social media marketing platforms which have become the backbone of the Real Estate industry. </p> <p>I love living in Tucson and thoroughly enjoy all the area has to offer. I am delighted to show my support for the community by volunteering with many area organizations including the Tucson Festival of Books, The Tucson Folk Festival, and as a Sponsor of <a href="http://www.meetmeatmaynards.com" target=_blank><strong>Meet Me at Maynards</strong></a>, one of Tucson’s premier events.</p> <p>If you, or someone you know, are looking for an energetic Realtor® who cares about their clients and is dedicated to superior customer service, please contact me today and give me the opportunity to become "Your Home for Real Estate”.</p>',
            bio2: undefined,
            agentTagline: '\"Your Home for Real Estate\"',
            brokerageLogo: 'ua/logos/coldwell-banker-logo.svg',
            teamLogo: 'ua/logos/carol-nigut-logo.svg',
            emblem: 'ua/logos/carol-nigut-name.svg',
            accentLogo: 'ua/dividers/accent-divider.png',
            loaderLogo: 'ia/icons/ih-listing-loader.svg',
            content: [{
                key: 'tucson-dining',
                title: 'Tucson Dining & Libations',
                sub: 'Named UNESCO\'s City of Gastronomy',
                thumb: 'ua/backgrounds/tucson-back.jpg',
                contentUrl: 'ua/content/tucson-dining.htm',
                disableSidebar: true
            }, {
                key: 'area-attractions',
                title: 'Area Attractions',
                sub: 'Named UNESCO\'s City of Gastronomy',
                thumb: 'ua/backgrounds/tucson-back.jpg',
                contentUrl: 'ua/content/tucson-dining.htm',
                disableSidebar: true
            }, {
                key: 'golf',
                title: 'Tucson Dining',
                sub: 'Named UNESCO\'s City of Gastronomy',
                thumb: 'ua/backgrounds/tucson-back.jpg',
                contentUrl: 'ua/content/tucson-dining.htm',
                disableSidebar: true
            }, {
                key: 'community-search',
                title: 'Tucson Communities',
                sub: 'search by community',
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ip/search/community-search.htm',
                disableSidebar: true
            }, {
                key: 'advice',
                title: 'I Just Need Advice',
                sub: 'let me know how i can help',
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ip/narratives/advice.htm',
                disableSidebar: true
            }, {
                key: 'sell',
                title: 'Find Your Home Value',
                sub: 'complete the following for a personalized professional estimate of your home\'s value',
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ip/narratives/sell.htm',
                disableSidebar: true
            }, {
                key: 'buy',
                title: 'Help Me Buy A Home',
                sub: 'let\'s find your new home',
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ip/narratives/buy.htm',
                disableSidebar: true
            }, {
                key: 'search-form',
                title: 'Home Search',
                sub: 'what type of home are you looking for?',
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ip/search/search-form.htm',
                disableSidebar: true
            }, {
                key: 'testimonial',
                title: 'Your Testimonials',
                sub: 'please share your experience.',
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ip/system/s1-testimonials-form.htm',
                disableSidebar: true
            }, {
                key: 'escrow',
                title: 'Escrow',
                sub: undefined,
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ua/content/escrow.htm',
                disableSidebar: false
            }, {
                key: 'loan-process',
                title: 'Understanding the Loan Process',
                sub: undefined,
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ua/content/loan-process.htm',
                disableSidebar: false
            }, {
                key: 'appraisal-process',
                title: 'The Appraisal Process',
                sub: undefined,
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ua/content/appraisal-process.htm',
                disableSidebar: false
            }, {
                key: 'prep-for-sale',
                title: 'Preparing Your Home For Sale',
                sub: undefined,
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ua/content/prep-sale.htm',
                disableSidebar: false
            }, {
                key: 'prep-for-show',
                title: 'Preparing Your Home For Showing',
                sub: undefined,
                thumb: 'ua/backgrounds/general-back.jpg',
                contentUrl: 'ua/content/prep-show.htm',
                disableSidebar: false
            }],
            bio: {
                carol: {
                    name: 'Carol Nigut',
                    headshot: 'ua/headshots/carol-nigut-headshot.jpg',
                    title: 'GRI, ABR, ePro',
                    bio: '<p>As a former educator and small business owner, I\'ve lived all over the United States, buying and selling property with each move. Knowing what it\'s like to go through the process drives my commitment to my clients. Trusted for my knowledge, integrity, and diligence, I am one of a small percentage of Arizona Realtors® that have earned the GRI (Graduate Realtor® Institute) designation, making me uniquely qualified to serve and protect you through every phase of your real estate transaction. As an ePro professional, I also have the skills to take full advantage of online and social media marketing platforms which have become the backbone of the Real Estate industry. </p> <p>I love living in Tucson and thoroughly enjoy all the area has to offer. I am delighted to show my support for the community by volunteering with many area organizations including the Tucson Festival of Books, The Tucson Folk Festival, and as a Sponsor of <a href="http://www.meetmeatmaynards.com" target=_blank><strong>Meet Me at Maynards</strong></a>, one of Tucson’s premier events.</p> <p>If you, or someone you know, are looking for an energetic Realtor® who cares about their clients and is dedicated to superior customer service, please contact me today and give me the opportunity to become "Your Home for Real Estate”.</p>',
                    contactEmail: 'yourhomeforrealestate@gmail.com'
                }
            },
            team: [{
                name: 'Carol Nigut',
                photo: 'ua/headshots/carol-nigut-headshot.jpg',
                title: 'GRI, ABR, ePro'
            }]
        };


        var storyJson = {
            LandingComponent: {
                showBuyAHome: true,
                buyLink: '#/buy',
                showSellAHome: true,
                sellLink: '#/sell',
                showJustAdvice: true,
                adviceLink: '#/advice',
                showGreeting: true,
                buyAHomeText: 'buy',
                sellAHomeText: 'sell',
                adviceText: 'ask carol',
                welcomeText: 'how can i help?',
                greetingText: undefined,
                loaderLogo: 'ia/icons/ih-listing-loader.svg',
                favicon: 'ua/images/favicon.ico',
                fairhousingIcon: 'ia/icons/fairhousing.svg',
                realtorIcon: 'ia/icons/realtor.svg',
                defaultSliderImage: 'ua/backgrounds/slider-back.jpg'
            },
            partners: [{
                partner: 'InHouse marketing',
                image: 'https://cdn.getinhouse.io/images/logos/inhouse-white.svg'
            }],
            landingLayout: [
                {
                  component: 'slider',
                  slider: 'mainSlider',
                  config: 's6',
                  class: ''
                },
                {
                  component: 'landing-search',
                    config: 's1',
                    class: ''
                },
                {
                  component: 'about',
                    config: 's10',
                    class: 'fw'
                },
                {
                  component: 'testimonials',
                    testimonial: 'mainTests',
                    config: 's2',
                    classes: '',
                    max: 1,
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 1
                        },
                        768: {
                            items: 1
                        },
                        1024: {
                            items: 2
                        }
                    }
                },
                {
                  component: 'featured-listings',
                  config: 's2',
                    class: ''
                },
                {
                  component: 'resources',
                    config: 's2',
                    message: 'hello world',
                    class: 'fw'
                },
                {
                  component: 'contact',
                    config: 's4',
                    message: 'how can i help?',
                    class: 'fw'
                }
            ],
            NavBar: [{
                'type': 'internal',
                'href': '#/',
                'display': 'home'
            }, {
                'type': 'internal',
                'href': '#/bio/carol',
                'display': 'meet carol'
            }, {
                'type': 'menu',
                'display': 'for buyers',
                'children': [{
                    'type': 'external',
                    'href': 'ua/content/ways-title.pdf',
                    'display': 'ways to take title in arizona'
                }, {
                    'type': 'external',
                    'href': 'ua/content/understand-title.pdf',
                    'display': 'understanding title insurance'
                }]
            }, {
                'type': 'menu',
                'display': 'for sellers',
                'children': [{
                    'type': 'internal',
                    'href': '#/prep-for-show',
                    'display': 'prep your home for showing'
                }, {
                    'type': 'internal',
                    'href': '#/prep-for-sale',
                    'display': 'prep your home for sale'
                }]
            }, {
                'type': 'menu',
                'display': 'About Tucson',
                'children': [{
                    'type': 'internal',
                    'href': 'http://www.tucsonaz.gov',
                    'display': 'Tucson Information'
                }, {
                    'type': 'internal',
                    'href': '#/tucson-dining',
                    'display': 'Dining and Libations'
                }, {
                    'type': 'external',
                    'href': 'ua/content/mls-areaboundaries.pdf',
                    'display': 'Tucson Area Map'
                }, {
                    'type': 'external',
                    'href': 'ua/content/tucsonschoolmap.pdf',
                    'display': 'Pima County Schools Map'
                }, {
                    'type': 'external',
                    'href': 'http://www.schools.pima.gov',
                    'display': 'Pima County School Information'
                }, {
                    'type': 'external',
                    'href': 'http://www.tucsonrealtors.org/about-us/news/statistics',
                    'display': 'Tucson Market Activity'
                }]
            }, {
                'type': 'menu',
                'display': 'resources',
                'children': [{
                        'type': 'external',
                        'href': 'ua/content/planning-move.pdf',
                        'display': 'planning your move'
                    }, {
                        'type': 'external',
                        'href': 'ua/content/services.pdf',
                        'display': 'services & utilities'
                },{
                    'type': 'internal',
                    'href': '#/loan-process',
                    'display': 'understanding the loan process'
                }, {
                    'type': 'external',
                    'href': 'http://www.peoplesmortgage.com/mortgage-loan-calculator/',
                    'display': 'mortgage calculator'
                }, {
                    'type': 'external',
                    'href': 'https://www.titlesecurity.com/costsheet/',
                    'display': 'cost sheet'
                }, {
                    'type': 'internal',
                    'href': '#/appraisal-process',
                    'display': 'the appraisal process'
                }, {
                    'type': 'external',
                    'href': 'http://www.peoplesmortgage.com/mortgage-glossary/',
                    'display': 'mortgage glossary'
                }, {
                    'type': 'internal',
                    'href': '#/escrow',
                    'display': 'What is an escrow?'
                }, {
                    'type': 'external',
                    'href': 'ua/content/contract-closing.pdf',
                    'display': 'from contract to closing'
                }]
            }],
            navbarConfig: 's2',
            navbarClasses: 'fw',
            footerConfig: 's1',
            footerClasses: 'fw',
            resultsConfig: 's2',
            listingConfig: 's1',
            privacyConfig: 's1',
            bioConfig: 's1',
            contentConfig: 's1',
            bodyClasses: 'fp bkc-01',
            testimonials: []
        };

        storyJson.landingLayout.map(function(item, index, arr){
          if(item.component === 'about') { self.aboutConfig = item.config; }
          if(item.component === 'contact') { self.contactConfig = item.config; }
          if(item.component === 'featured-listings') { self.featuredListingsConfig = item.config; }
          if(item.component === 'landing-search') { self.landingSearchConfig = item.config; }
          if(item.component === 'resources') { self.resourcesConfig = item.config; }
          if(item.component === 'slider') { self.sliderConfig = item.config; }
          if(item.component === 'testimonials') { self.testimonialsConfig = item.config; }
        });

        this.userData = userJson;
        this.storySettings = storyJson;



    });
