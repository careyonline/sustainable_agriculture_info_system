/* ==========================================================================
   AgriSustain - Client-Side Logic & Engines
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Initial State & Configuration
    // ----------------------------------------------------------------------
    
    // Core Data: Government Schemes
    const schemesData = [
        {
            id: 'pkvy',
            name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
            category: 'organic',
            desc: 'Promotes organic farming through cluster-based organic farming with PGS (Participatory Guarantee System) certification. Assists farmers from soil health management to market linkages.',
            subsidy: '₹50,000 per Hectare',
            period: '3 Years Support',
            link: 'https://pgsindia-ncof.gov.in/pkvy/index.aspx'
        },
        {
            id: 'shc',
            name: 'Soil Health Card Scheme (SHC)',
            category: 'soil',
            desc: 'Provides crop-wise recommendations of nutrients and fertilizers required for individual farms to help farmers improve crop yields through optimal usage of inputs.',
            subsidy: 'Free testing & Card',
            period: 'Every 2 Years Test',
            link: 'https://soilhealth.dac.gov.in/'
        },
        {
            id: 'pmfby',
            name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
            category: 'subsidy',
            desc: 'Comprehensive crop insurance coverage against non-preventable natural risks, ensuring income stabilization for farmers experiencing crop failure.',
            subsidy: 'Up to 98% Premium Subsidy',
            period: 'Seasonal Crop Cycle',
            link: 'https://pmfby.gov.in/'
        },
        {
            id: 'nmsa',
            name: 'National Mission for Sustainable Agriculture (NMSA)',
            category: 'soil',
            desc: 'Focuses on promoting sustainable agriculture through climate change adaptation, organic farming promotion, water-use efficiency, and soil health management.',
            subsidy: '50% cost-share assistance',
            period: 'Ongoing support',
            link: 'https://nmsa.dac.gov.in/'
        },
        {
            id: 'pmkisan',
            name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
            category: 'subsidy',
            desc: 'Income support program delivering direct financial benefits to landholding farmer families across the country to supplement their financial needs for agricultural inputs.',
            subsidy: '₹6,000 Per Year',
            period: '3 Installments (Direct Transfer)',
            link: 'https://pmkisan.gov.in/'
        },
        {
            id: 'smaf',
            name: 'Sub-Mission on Agroforestry (SMAF)',
            category: 'organic',
            desc: 'Encourages planting trees on farm boundaries alongside crops. Enhances organic matter additions, provides alternate income sources, and protects crop microclimates.',
            subsidy: 'Up to 50% Sapling Subsidy',
            period: '4 Years Maintenance',
            link: 'https://agricoop.nic.in/'
        }
    ];

    // Core Data: Chatbot FAQ Answers
    const chatbotKnowledgeBase = [
        {
            keywords: ['organic', 'transition', 'how to start', 'convert', 'switch'],
            answer: 'To transition to organic farming:<br>1. <strong>Soil Detox:</strong> Stop chemical inputs immediately. Grow green manure cover crops (like Sunn hemp or Clover) to build organic matter.<br>2. <strong>Get Certified:</strong> Register with local organic certification bodies (e.g., PGS-India or NPOP).<br>3. <strong>Use Bio-Inputs:</strong> Shift to vermicompost, neem cake, and bio-fertilizers (Azotobacter, Rhizobium).<br>4. <strong>Diversify:</strong> Rotate crops and build ecological insect habitats.'
        },
        {
            keywords: ['soil sample', 'soil testing', 'sampling', 'how to test'],
            answer: 'To collect a soil sample:<br>1. Divide your farm into uniform zones based on crop history or topography.<br>2. Use a shovel or auger to dig a V-shaped pit of <strong>6 to 9 inches (15-20 cm)</strong> depth.<br>3. Slice a 1-inch thick layer of soil from the side of the V-shape.<br>4. Remove organic debris/roots, collect samples from 10-15 random spots, mix them in a clean plastic bucket.<br>5. Dry the soil in shade, bag about 500g, and label it for the laboratory.'
        },
        {
            keywords: ['pm-kisan', 'kisan scheme', 'pm kisan', 'direct support', '6000'],
            answer: '<strong>PM-KISAN</strong> is a central sector scheme that provides income support of <strong>₹6,000 per year</strong> in three equal installments of ₹2,000 directly into the bank accounts of all landholding farmers. You can register on the PM-KISAN portal using your Aadhaar card and land ownership documents.'
        },
        {
            keywords: ['aphids', 'pest remedy', 'organic pesticide', 'insect', 'bugs'],
            answer: 'For <strong>Aphids</strong> and soft-bodied insects, use these organic remedies:<br>1. <strong>Neem Oil Spray:</strong> Mix 15ml neem oil + 5ml organic liquid soap in 1 liter of warm water. Spray every 5-7 days.<br>2. <strong>Water Blast:</strong> Spray infested plants with a strong stream of fresh water to dislodge them.<br>3. <strong>Beneficial Insects:</strong> Release ladybugs or hoverflies, which are natural predators.<br>4. <strong>Garlic-Chilli Extract:</strong> Puree garlic, chili peppers, and water, strain, dilute, and spray.'
        },
        {
            keywords: ['compost', 'vermicompost', 'composting', 'organic manure'],
            answer: 'Compost is made by layering <strong>Greens</strong> (nitrogen-rich: food scraps, fresh grass) and <strong>Browns</strong> (carbon-rich: dry leaves, straw, twigs) in a 1:2 ratio. Keep the pile moist (like a wrung-out sponge) and turn it weekly to supply oxygen. Vermicomposting uses Eisenia fetida (red wiggler earthworms) to accelerate the composting process into nutrient-dense worm castings.'
        },
        {
            keywords: ['crop rotation', 'rotation', 'rotate', 'next crop'],
            answer: 'Good crop rotation follows this sequence:<br>1. <strong>Year 1: Legumes</strong> (beans, peas) to fix nitrogen.<br>2. <strong>Year 2: Heavy Feeders</strong> (corn, wheat, tomatoes) to utilize the nitrogen.<br>3. <strong>Year 3: Heavy Givers/Roots</strong> (carrots, potatoes) which feed on lower soil layers.<br>4. <strong>Year 4: Light Feeders</strong> (herbs, onions, leafy greens) to rest the soil before legume cycle.'
        },
        {
            keywords: ['ph acidic', 'acidic', 'lime', 'raise ph'],
            answer: 'To treat acidic soil (pH < 6.0):<br>1. <strong>Agricultural Lime:</strong> Powdered calcium carbonate neutralizes acid. Apply in fall to allow time to react.<br>2. <strong>Dolomite Lime:</strong> Use if your soil test also indicates low Magnesium levels.<br>3. <strong>Wood Ash:</strong> Adds potassium and carbonate. Apply lightly (max 1kg per 10 sq meters) to avoid spiking potassium.'
        },
        {
            keywords: ['ph alkaline', 'alkaline', 'sulfur', 'lower ph'],
            answer: 'To treat alkaline soil (pH > 7.5):<br>1. <strong>Elemental Sulfur:</strong> Soil bacteria slowly convert sulfur into sulfuric acid, lowering pH. Needs time (several months).<br>2. <strong>Organic Mulches:</strong> Pine needles, peat moss, and oak leaves add organic acidity as they decay.<br>3. <strong>Ammonium Fertilizers:</strong> Organic blood meal offers natural acidic action.'
        }
    ];

    // ----------------------------------------------------------------------
    // 2. DOM Elements & Selectors
    // ----------------------------------------------------------------------
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggle');
    const scrollProgress = document.getElementById('scrollProgress');
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Calculators
    const cropSelect = document.getElementById('cropSelect');
    const acreageInput = document.getElementById('acreageInput');
    const calculateYieldBtn = document.getElementById('calculateYieldBtn');
    const yieldResults = document.getElementById('yieldResults');
    const detoxVal = document.getElementById('detoxVal');
    const organicYieldVal = document.getElementById('organicYieldVal');
    const savingsVal = document.getElementById('savingsVal');
    const yieldGuideline = document.getElementById('yieldGuideline');

    // Soil Testing
    const soilForm = document.getElementById('soilForm');
    const nitrogenSelect = document.getElementById('nitrogenSelect');
    const phosphorusSelect = document.getElementById('phosphorusSelect');
    const potassiumSelect = document.getElementById('potassiumSelect');
    const phInput = document.getElementById('phInput');
    const phValueBadge = document.getElementById('phValueBadge');
    const analyzeSoilBtn = document.getElementById('analyzeSoilBtn');
    
    const soilResultsPanel = document.getElementById('soilResultsPanel');
    const soilPlaceholder = document.getElementById('soilPlaceholder');
    const soilResultsContent = document.getElementById('soilResultsContent');
    const soilScoreVal = document.getElementById('soilScoreVal');
    const soilClassification = document.getElementById('soilClassification');
    
    const nPrescText = document.querySelector('#nPrescription .p-text');
    const pPrescText = document.querySelector('#pPrescription .p-text');
    const kPrescText = document.querySelector('#kPrescription .p-text');
    const phPrescText = document.querySelector('#phPrescription .p-text');
    const organicAmdList = document.getElementById('organicAmdList');

    // Schemes
    const schemesGrid = document.getElementById('schemesGrid');
    const schemeSearch = document.getElementById('schemeSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Scheme Checker
    const farmerType = document.getElementById('farmerType');
    const farmingPractice = document.getElementById('farmingPractice');
    const soilCardStatus = document.getElementById('soilCardStatus');
    const checkEligibilityBtn = document.getElementById('checkEligibilityBtn');
    const eligibilityResults = document.getElementById('eligibilityResults');
    const eligibleList = document.getElementById('eligibleList');

    // Chatbot Widget
    const chatLauncherBtn = document.getElementById('chatLauncherBtn');
    const chatContainer = document.getElementById('chatContainer');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInputField = document.getElementById('chatInputField');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatSuggestions = document.getElementById('chatSuggestions');
    const typingIndicator = document.getElementById('typingIndicator');
    const chatBadge = document.querySelector('.chat-badge');

    // ----------------------------------------------------------------------
    // 3. UI Helpers (Theme, Menus, Scroll)
    // ----------------------------------------------------------------------
    
    // Theme Toggle
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const theme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Scroll Progress & Active Link Highlighting
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;

        // Active link tracking
        let currentSec = 'hero';
        document.querySelectorAll('section, header').forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSec = section.getAttribute('id') || 'hero';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSec}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        // Toggle menu icon visual state
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ----------------------------------------------------------------------
    // 4. Organic Yield Estimator Logic
    // ----------------------------------------------------------------------
    calculateYieldBtn.addEventListener('click', () => {
        const crop = cropSelect.value;
        const acres = parseFloat(acreageInput.value);

        if (isNaN(acres) || acres <= 0) {
            alert('Please enter a valid acreage greater than 0.');
            return;
        }

        // Calculations based on scientific baseline averages
        let baseYield = 0; // Tons per acre for chemical farming
        let organicRatio = 0.85; // Organic yields are 80-90% of chemical yields in initial transition
        let savingsPerAcre = 0; // Savings in pesticide/fertilizers

        switch(crop) {
            case 'wheat':
                baseYield = 1.6; // ~1.6 tons/acre
                savingsPerAcre = 120; // $120/acre savings
                organicRatio = 0.88;
                break;
            case 'rice':
                baseYield = 2.2;
                savingsPerAcre = 160;
                organicRatio = 0.84;
                break;
            case 'maize':
                baseYield = 3.5;
                savingsPerAcre = 180;
                organicRatio = 0.82;
                break;
            case 'potato':
                baseYield = 12.0;
                savingsPerAcre = 240;
                organicRatio = 0.85;
                break;
            case 'pulses':
                baseYield = 0.7;
                savingsPerAcre = 90;
                organicRatio = 0.95; // Pulses are legumes, yields stay very high organically
                break;
        }

        const totalChemicalYield = baseYield * acres;
        const targetOrganicYield = totalChemicalYield * organicRatio;
        const totalSavings = savingsPerAcre * acres;

        // Animate Output Display
        yieldResults.classList.remove('hidden');
        
        detoxVal.innerText = '3 Years';
        organicYieldVal.innerText = `${targetOrganicYield.toFixed(1)} Tons`;
        savingsVal.innerText = `$${totalSavings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

        // Dynamic helper text
        let description = '';
        if (crop === 'pulses') {
            description = `Pulses adapt exceptionally well to organic cycles. Since they fix their own Nitrogen, you'll see instant fertilizer cost savings of $${totalSavings} while maintaining ${organicRatio * 100}% yield parity.`;
        } else {
            description = `For ${crop}, initial transition may show an 10-15% yield dip. However, by Year 3, soil biology stabilizes, soil carbon increases by 30%, and certified organic harvests will yield a premium price of 20-30% above commercial crops.`;
        }
        yieldGuideline.innerHTML = description;
    });

    // ----------------------------------------------------------------------
    // 5. Soil Testing Recommendation Engine
    // ----------------------------------------------------------------------
    
    // Live update pH badge text on slide change
    phInput.addEventListener('input', () => {
        const ph = parseFloat(phInput.value);
        let classification = '';

        if (ph < 5.0) classification = 'Strongly Acidic';
        else if (ph < 6.0) classification = 'Acidic';
        else if (ph < 7.0) classification = 'Slightly Acidic';
        else if (ph === 7.0) classification = 'Neutral';
        else if (ph < 8.0) classification = 'Slightly Alkaline';
        else if (ph < 9.0) classification = 'Alkaline';
        else classification = 'Strongly Alkaline';

        phValueBadge.innerText = `${ph.toFixed(1)} - ${classification}`;
        phValueBadge.style.backgroundColor = getPhColor(ph);
    });

    function getPhColor(ph) {
        if (ph < 5.0) return '#d32f2f'; // Dark Red
        if (ph < 6.0) return '#f57c00'; // Orange
        if (ph < 7.0) return '#388e3c'; // Green
        if (ph <= 7.5) return '#2e7d32'; // Forest Green
        if (ph < 8.5) return '#0288d1'; // Light Blue
        return '#1565c0'; // Deep Blue
    }

    analyzeSoilBtn.addEventListener('click', () => {
        const N = nitrogenSelect.value;
        const P = phosphorusSelect.value;
        const K = potassiumSelect.value;
        const pH = parseFloat(phInput.value);

        // Calculate Soil Health Score
        let score = 100;
        
        // Deduct points for low or excessive nutrients
        if (N === 'low') score -= 15;
        if (N === 'high') score -= 5; // Excess nitrogen is slightly toxic to micro-ecosystems
        if (P === 'low') score -= 15;
        if (P === 'high') score -= 5;
        if (K === 'low') score -= 15;
        if (K === 'high') score -= 5;

        // Deduct points for pH deviations from neutral ideal (6.0 - 7.2)
        const phDiff = Math.abs(6.5 - pH);
        score -= Math.min(score, Math.round(phDiff * 15));

        // Ensure score stays inside 10 - 100 range
        score = Math.max(10, Math.min(100, score));

        // Generate recommendations
        let nRecommendation = '';
        let pRecommendation = '';
        let kRecommendation = '';
        let phRecommendation = '';
        let fertilizers = [];

        // 1. Nitrogen recommendations
        if (N === 'low') {
            nRecommendation = 'Incorporate Nitrogen-fixing leguminous cover crops (cowpeas, alfalfa) and spread well-aged vermicompost. Apply organic blood meal or neem cake for immediate supplementation.';
            fertilizers.push('Vermicompost', 'Neem Cake', 'Blood Meal');
        } else if (N === 'high') {
            nRecommendation = 'Excess nitrogen encourages leafy growth but weakens stem structure and invites pests. Add carbon-rich browns (sawdust, woodchips) to temporarily lock up excess nitrogen. Grow nitrogen-demanding grains (maize, sorghum).';
        } else {
            nRecommendation = 'Nitrogen levels are optimal. Maintain healthy levels with light top-dressings of home compost and a regular crop rotation calendar.';
            fertilizers.push('Regular Compost');
        }

        // 2. Phosphorus recommendations
        if (P === 'low') {
            pRecommendation = 'Apply Rock Phosphate or steamed Bone Meal. Liquid seaweed feeds can also stimulate root phosphorus absorption. Encourage mycorrhizal fungi colonization which unlocks organic phosphorus bounds.';
            fertilizers.push('Rock Phosphate', 'Bone Meal');
        } else if (P === 'high') {
            pRecommendation = 'Avoid bone meal or phosphate fertilizers. High phosphorus can inhibit the absorption of iron and zinc. Implement deep tillage rotation to disperse accumulation.';
        } else {
            pRecommendation = 'Phosphorus is in the target zone. Excellent for root development. Continue organic crop residues.';
            fertilizers.push('Rock Phosphate (Light)');
        }

        // 3. Potassium recommendations
        if (K === 'low') {
            kRecommendation = 'Incorporate wood ash (sparingly, if pH allows), organic greensand, or kelp meal to restore potassium. Potassium regulates water efficiency and disease resistance.';
            fertilizers.push('Kelp Meal', 'Greensand', 'Wood Ash');
        } else if (K === 'high') {
            kRecommendation = 'Potassium excess can interfere with calcium and magnesium uptake. Avoid wood ash. Plant potassium-demanding brassicas or mustard crops to extract the abundance.';
        } else {
            kRecommendation = 'Potassium levels are optimal, facilitating excellent starch synthesis. Keep soil mulched to prevent run-off.';
            fertilizers.push('Kelp Meal (Pre-season)');
        }

        // 4. pH Adjustments
        if (pH < 5.5) {
            phRecommendation = 'Strongly Acidic. Apply agricultural lime (calcium carbonate) or dolomite lime (if magnesium is also low) at a rate of 5-8 lbs per 100 sq ft. Wood ash also naturally raises pH.';
            fertilizers.push('Dolomitic Lime');
        } else if (pH < 6.0) {
            phRecommendation = 'Slightly Acidic. Apply light lime applications or composted farmyard manure to buffer the acidity. Best suited for potatoes, but raise to 6.5 for pulses.';
            fertilizers.push('Agricultural Lime');
        } else if (pH <= 7.2) {
            phRecommendation = 'Neutral Zone. Ideal for 95% of agricultural crops. Soil biological activity is at its peak. Keep organic mulch active to maintain buffering stability.';
        } else if (pH <= 8.0) {
            phRecommendation = 'Slightly Alkaline. Apply organic composted leaves, peat moss, or ammonium-based organic feeds to create acidic pockets. Avoid wood ash.';
            fertilizers.push('Peat Moss / Pine Needle Mulch');
        } else {
            phRecommendation = 'Strongly Alkaline. Lower soil pH by incorporating elemental sulfur (2 lbs per 100 sq ft). Apply organic mulches continuously and avoid alkaline irrigation sources.';
            fertilizers.push('Elemental Sulfur');
        }

        // Update UI
        soilPlaceholder.classList.add('hidden');
        soilResultsContent.classList.remove('hidden');

        // Populate values
        soilScoreVal.innerText = `${score}%`;
        
        let classificationText = '';
        if (pH < 5.5) classificationText = 'Strongly Acidic Soil';
        else if (pH < 6.0) classificationText = 'Acidic Soil';
        else if (pH <= 7.2) classificationText = 'Optimal Neutral Soil';
        else if (pH <= 8.0) classificationText = 'Slightly Alkaline Soil';
        else classificationText = 'Alkaline Soil';

        soilClassification.innerText = `${classificationText} - Health Index: ${score >= 80 ? 'Excellent' : score >= 60 ? 'Moderate' : 'Critical'}`;
        
        nPrescText.innerText = nRecommendation;
        pPrescText.innerText = pRecommendation;
        kPrescText.innerText = kRecommendation;
        phPrescText.innerText = phRecommendation;

        // Render fertilizers list
        if (fertilizers.length > 0) {
            organicAmdList.innerHTML = fertilizers.map(f => `<strong>${f}</strong>`).join(', ');
        } else {
            organicAmdList.innerText = 'No urgent fertilizers required. Keep soil structure healthy with active mulch layers.';
        }

        // Smooth scroll to results
        soilResultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // ----------------------------------------------------------------------
    // 6. Government Schemes Database & Filters
    // ----------------------------------------------------------------------
    
    // Render Schemes Grid
    function renderSchemes(schemes) {
        schemesGrid.innerHTML = '';
        if (schemes.length === 0) {
            schemesGrid.innerHTML = `
                <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <p style="color: var(--text-muted);">No schemes match your query. Try different keywords or filter categories.</p>
                </div>
            `;
            return;
        }

        schemes.forEach(scheme => {
            const card = document.createElement('div');
            card.className = 'scheme-card glass-card';
            card.innerHTML = `
                <span class="card-badge">${scheme.category}</span>
                <h4>${scheme.name}</h4>
                <p class="scheme-desc">${scheme.desc}</p>
                <div class="scheme-meta">
                    <div class="meta-row">
                        <span class="meta-lbl">Financial Support:</span>
                        <span class="meta-val highlight">${scheme.subsidy}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-lbl">Policy Period:</span>
                        <span class="meta-val">${scheme.period}</span>
                    </div>
                </div>
                <a href="${scheme.link}" target="_blank" rel="noopener" class="scheme-btn">Apply / Read More</a>
            `;
            schemesGrid.appendChild(card);
        });
    }

    // Initial load of schemes
    renderSchemes(schemesData);

    // Filtering & Searching
    let activeCategory = 'all';
    let searchQuery = '';

    function filterSchemes() {
        const filtered = schemesData.filter(scheme => {
            const matchesCategory = activeCategory === 'all' || scheme.category === activeCategory;
            const matchesSearch = scheme.name.toLowerCase().includes(searchQuery) ||
                                  scheme.desc.toLowerCase().includes(searchQuery) ||
                                  scheme.category.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
        renderSchemes(filtered);
    }

    // Search bar event listener
    schemeSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterSchemes();
    });

    // Category button event listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-category');
            filterSchemes();
        });
    });

    // ----------------------------------------------------------------------
    // 7. Scheme Eligibility Quick Checker
    // ----------------------------------------------------------------------
    checkEligibilityBtn.addEventListener('click', () => {
        const type = farmerType.value;
        const practice = farmingPractice.value;
        const hasCard = soilCardStatus.value;

        let eligible = [];

        // Simple match making rules
        if (practice === 'organic' || practice === 'mixed') {
            eligible.push(schemesData.find(s => s.id === 'pkvy'));
            eligible.push(schemesData.find(s => s.id === 'nmsa'));
            eligible.push(schemesData.find(s => s.id === 'smaf'));
        }

        if (hasCard === 'no') {
            eligible.push(schemesData.find(s => s.id === 'shc'));
        }

        if (type === 'small') {
            eligible.push(schemesData.find(s => s.id === 'pmkisan'));
        }

        // PMFBY Crop insurance applies to all
        eligible.push(schemesData.find(s => s.id === 'pmfby'));

        // Remove duplicates/undefined
        eligible = [...new Set(eligible)].filter(Boolean);

        // Display results
        eligibilityResults.classList.remove('hidden');
        eligibleList.innerHTML = '';

        eligible.forEach(scheme => {
            const item = document.createElement('div');
            item.className = 'eligible-item';
            item.innerHTML = `
                <h6>${scheme.name}</h6>
                <p>${scheme.desc.slice(0, 110)}...</p>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.8rem; font-weight:700; color:var(--accent);">${scheme.subsidy}</span>
                    <a href="${scheme.link}" target="_blank" rel="noopener" class="eligible-apply">
                        Apply Online
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z"></path>
                        </svg>
                    </a>
                </div>
            `;
            eligibleList.appendChild(item);
        });

        eligibilityResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // ----------------------------------------------------------------------
    // 8. Simulated Azure Chatbot Widget Logic
    // ----------------------------------------------------------------------
    
    // Toggle Chat Panel visibility
    chatLauncherBtn.addEventListener('click', () => {
        chatContainer.classList.toggle('hidden');
        // Hide badge upon opening
        chatBadge.classList.add('hidden');
    });

    chatCloseBtn.addEventListener('click', () => {
        chatContainer.classList.add('hidden');
    });

    // Quick-reply suggestions
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const questionText = chip.innerText;
            handleUserMessage(questionText);
        });
    });

    // Send Message Event Listeners
    sendChatBtn.addEventListener('click', () => {
        const text = chatInputField.value.trim();
        if (text) {
            handleUserMessage(text);
            chatInputField.value = '';
        }
    });

    chatInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = chatInputField.value.trim();
            if (text) {
                handleUserMessage(text);
                chatInputField.value = '';
            }
        }
    });

    // Main Chat Message Handler
    function handleUserMessage(messageText) {
        // 1. Append User Message
        appendMessage(messageText, 'user');

        // 2. Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 3. Show Typing Indicator
        typingIndicator.classList.remove('hidden');
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 4. Process bot response with natural typing delay
        setTimeout(() => {
            const botResponse = generateBotResponse(messageText);
            typingIndicator.classList.add('hidden');
            appendMessage(botResponse, 'bot');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000 + Math.random() * 500); // 1.0 - 1.5s delay
    }

    // Append standard message to UI
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = `
            <div class="message-bubble">
                ${text}
            </div>
        `;
        chatMessages.appendChild(msgDiv);
    }

    // Knowledge matching logic
    function generateBotResponse(input) {
        const query = input.toLowerCase();

        // Standard greetings
        if (query.match(/\b(hi|hello|hey|greetings|good morning|good afternoon)\b/)) {
            return "Hello! I am here to help you. How is your farming season going? Ask me about organic fertilizers, crop rotations, soil tests, or schemes.";
        }

        if (query.match(/\b(thanks|thank you|great|awesome|helpful)\b/)) {
            return "You're very welcome! Promoting sustainable agriculture is my core mission. Let me know if you need anything else!";
        }

        // Loop through knowledge base to find matches
        for (const entry of chatbotKnowledgeBase) {
            const matchFound = entry.keywords.some(keyword => query.includes(keyword));
            if (matchFound) {
                return entry.answer;
            }
        }

        // Fallback response
        return "I'm sorry, I couldn't find a direct match for that. I can assist with:<br>- Organic transition steps<br>- Soil sampling instructions<br>- Managing pH levels<br>- Aphid/pest control remedies<br>- Specific schemes like PM-KISAN or PKVY.<br><br>Could you please rephrase your query?";
    }
});
