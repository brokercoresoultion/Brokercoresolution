// ─── BROKERCORESOLUTION — 11-Module B2B Services Data ───────────────────────────────────
// All copy is institutional-grade, B2B enterprise-focused.
// Adapted from BrokerCore Capital Markets Ltd. retail infrastructure
// and pivoted to a white-label / turnkey provider offering.

export const SERVICES_DATA = {

  // ── MODULE 1 ── BROKER SETUP ─────────────────────────────────────────────────

  'business-consulting': {
    id: 'business-consulting',
    module: 'Broker Setup',
    moduleSlug: 'broker-setup',
    title: 'Business Consulting',
    subtitle: 'End-to-End Brokerage Strategy & Advisory',
    metric: { label: 'Time-to-Launch', value: '90', unit: 'Days Avg.' },
    heroTag: 'Module 01 — Broker Setup',
    accent: 'cyan',

    overview: [
      `Launching a regulated brokerage is not a product decision — it is an institutional-grade infrastructure commitment requiring precise corporate architecture, jurisdictional alignment, and a monetization model engineered for longevity. BROKERCORESOLUTION Business Consulting provides a structured, milestone-driven advisory framework that begins at entity formation and culminates in a fully operational, revenue-generating brokerage brand. Our consultants operate at the intersection of regulatory law, financial technology, and market microstructure — delivering blueprint-level strategy that eliminates the guesswork endemic to first-time brokerage founders.`,

      `Our engagement model is modular and sequential. Phase one covers market positioning and feasibility analysis: identifying your target client demographic (retail FX, prop trading desks, high-net-worth portfolios, or institutional desks), selecting the appropriate regulatory jurisdiction, and defining your A-Book/B-Book internalization ratio based on projected order flow toxicity. Phase two encompasses corporate structuring — from nominee directorship arrangements and shareholding agreements to bank account facilitation in high-compliance jurisdictions such as the UAE, Cyprus, and Mauritius. Phase three transitions into operational workflow design, where we architect your internal risk desk protocols, client lifecycle management workflows, and introducing broker (IB) compensation structures.`,

      `Beyond setup, BROKERCORESOLUTION provides ongoing strategic advisory to help you navigate post-launch scaling events: expanding into new jurisdictions, onboarding institutional prime-of-prime credit lines, launching proprietary trading desk operations, or transitioning from an offshore FSC entity to a fully regulated CySEC brokerage. Our consultants carry direct experience structuring MIFID II-compliant European operations, FSC Mauritius brokerages, and SVGFSA offshore entities — giving you an advisory team that has executed in every major fintech jurisdiction on the planet.`,
    ],

    specs: [
      'Full brokerage feasibility analysis: target market mapping, competitive positioning, and financial modeling (P&L projections to 36 months)',
      'Corporate entity formation across 8+ jurisdictions: FSC Mauritius, CySEC Cyprus, SVGFSA, BVI, Seychelles, ADGM, DIFC, Labuan Malaysia',
      'A-Book / B-Book monetization architecture design: risk internalization ratios, spread markup calibration, and overnight financing (swap) revenue blueprints',
      'Introducing Broker (IB) and affiliate partner program design: multi-tier commission structures, CPA vs. revenue-share hybrid models, sub-IB master trees',
      'Bank account facilitation: institutional EMI accounts, payment processor pre-approvals, and crypto-custody arrangements for licensed entities',
      'Technology vendor selection advisory: MT5 white-label negotiation, CRM procurement, liquidity provider credit assessment, and data-feed SLA benchmarking',
      'Operational Procedures Manual (OPM) drafting: internal risk desk SOPs, compliance officer workflows, AML/CTF detection escalation trees',
      'Dedicated senior project manager assigned from kickoff to live launch, with weekly milestone reporting and direct founder access',
    ],

    businessValue: `For a brokerage founder, the cost of a structuring error is not a failed sprint — it is regulatory rejection, bank account freezes, or a liquidity provider refusing to onboard a non-compliant entity. BROKERCORESOLUTION's consulting practice exists to eliminate that existential risk. By architecting your corporate structure, monetization model, and operational protocols before a single server is provisioned, we de-risk your entire capital deployment. Brokers that launch through our advisory framework consistently achieve profitability 40–60% faster than industry benchmarks, because their technology, liquidity, and compliance layers are designed to interoperate from day one. Our advisory is not an add-on — it is the foundation on which every other BROKERCORESOLUTION module is built.`,
  },

  'licensing-regulations': {
    id: 'licensing-regulations',
    module: 'Broker Setup',
    moduleSlug: 'broker-setup',
    title: 'Licensing & Regulations',
    subtitle: 'Multi-Jurisdiction Regulatory Frameworks',
    metric: { label: 'License Ready', value: 'FSC & CySEC', unit: 'Supported' },
    heroTag: 'Module 02 — Broker Setup',
    accent: 'cyan',

    overview: [
      `Regulatory licensing is the single most critical determinant of a brokerage's operational credibility, banking relationships, and long-term institutional survivability. BROKERCORESOLUTION provides a comprehensive, end-to-end licensing facilitation service across the full spectrum of global financial regulatory frameworks — from offshore Tier-3 jurisdictions designed for rapid market entry to fully regulated Tier-1 European and Middle Eastern regimes. Our legal and compliance team maintains active relationships with regulatory bodies across Mauritius, Cyprus, the Seychelles, the British Virgin Islands, Saint Vincent & the Grenadines, the UAE (ADGM / DIFC), and Labuan Malaysia — enabling BROKERCORESOLUTION to deliver jurisdiction-matched regulatory advice based on your target client geography, capital position, and operational risk appetite.`,

      `The licensing process is executed through a structured compliance pipeline: entity incorporation is completed in parallel with the preparation of the regulatory application dossier, including the Business Plan, AML/CFT Policy Manual, Risk Management Framework, Compliance Monitoring Program, and all required director/shareholder due diligence documentation. For FSC Mauritius engagements, our team prepares the Investment Dealer (Full-Service Dealer) or Investment Dealer (Broker) license application and manages all back-and-forth correspondence with the FSC on your behalf. For CySEC-ready structures, we build the full Cyprus Investment Firm (CIF) application package, coordinate with local Cyprus legal counsel, and facilitate the appointment of compliance officers, internal auditors, and risk managers that meet CySEC's MiFID II personnel fit-and-proper requirements.`,

      `Beyond initial licensing, BROKERCORESOLUTION maintains a regulatory sandbox advisory service for startups seeking to test their brokerage model under regulatory supervision before committing to a full license. We also facilitate ongoing regulatory maintenance — annual audits, suspicious transaction reporting (STR) compliance, FATF watchlist screening integrations, and cross-border passport notifications for CySEC-licensed entities seeking to operate across the EEA. Our compliance templates are maintained and updated quarterly in response to evolving FATF guidance, EU DORA requirements, and emerging crypto-asset regulatory frameworks, ensuring your brokerage always operates on the current edge of compliance.`,
    ],

    specs: [
      'FSC Mauritius Investment Dealer license facilitation: Full-Service Dealer and Broker categories, full dossier preparation and FSC liaison',
      'CySEC CIF application support: MiFID II compliance package, fit-and-proper documentation, capital adequacy (€125K EUR initial capital) advisory',
      'SVGFSA, BVI FSC, Seychelles FSA, and Labuan IBFC offshore entity formation and regulatory registration',
      'ADGM Financial Services Permission (FSP) advisory for UAE-based institutional operations',
      'AML/CTF Policy Manual drafting: FATF-aligned, jurisdiction-specific, with STR/SAR escalation workflows',
      'Compliance Officer, MLRO, and Risk Manager appointment facilitation: fit-and-proper CV advisory and regulatory declaration preparation',
      'Corporate governance documentation: Board Resolutions, Shareholder Agreements, Director Service Contracts, and Data Protection (GDPR) policies',
      'Regulatory sandbox onboarding advisory for pilot-phase brokerage operations',
      'Annual compliance maintenance: regulatory filing calendar management, audit preparation, and ongoing FSC/CySEC correspondence management',
      'Passporting advisory for CySEC entities seeking EEA cross-border notification under MiFID II Article 34 / Article 35',
    ],

    businessValue: `A licensed brokerage commands 3–5x the institutional credibility of an unlicensed offshore operation, unlocking access to Tier-1 prime brokerage credit lines, international payment processor approvals, and institutional client acquisition channels that are categorically unavailable to unregulated entities. BROKERCORESOLUTION's licensing facilitation eliminates the 12–18 month learning curve that kills most self-directed licensing attempts, compressing your regulatory approval timeline to as little as 60–90 days for select jurisdictions. This speed-to-market advantage translates directly into earlier revenue generation, earlier capital deployment, and a sustainable competitive moat in an increasingly regulated global FX market.`,
  },

  // ── MODULE 2 ── HOSTING SERVER SUPPORT ──────────────────────────────────────

  'hosting-server-support': {
    id: 'hosting-server-support',
    module: 'Hosting Server Support',
    moduleSlug: 'hosting-server-support',
    title: 'Hosting Server Support',
    subtitle: 'Ultra-Low Latency Co-Location Infrastructure',
    metric: { label: 'Execution Latency', value: '<0.01s', unit: 'Round Trip' },
    heroTag: 'Module 03 — Infrastructure',
    accent: 'purple',

    overview: [
      `In institutional-grade FX trading, network topology is not an IT consideration — it is a revenue-critical variable that directly determines the quality of your price feeds, the reliability of your trade execution, and your brokerage's resilience against quote arbitrage and latency exploitation. BROKERCORESOLUTION operates co-located server infrastructure across three of the world's premier financial data centers: Equinix LD4 (Slough, UK) — the de facto hub of the European FX market and home to the largest concentration of FX liquidity providers on earth; Equinix NY4 (Secaucus, New Jersey) — the epicenter of North American institutional FX flow; and Equinix TY3 (Tokyo, Japan) — the primary execution node for Asia-Pacific liquidity access. This tri-continental footprint ensures your brokerage operates with sub-millisecond latency across all major trading sessions.`,

      `Our co-location architecture is built on a cross-connect physical fiber model: your brokerage's MT5 trading server is provisioned within the same data center cage as your designated liquidity provider's matching engine, eliminating the additional network hops that degrade execution quality in cloud-hosted or remote server configurations. Cross-connect paths are established at the meet-me-room (MMR) level, ensuring that the physical distance between your order router and the LP's price engine is measured in meters, not kilometers. This physical proximity translates into a round-trip latency profile consistently below 0.01 seconds for LD4, and below 0.5ms for intra-datacenter order routing — figures that are materially competitive with prime brokerage-level infrastructure at a fraction of the capital cost.`,

      `BROKERCORESOLUTION's server support team provides 24×7 infrastructure monitoring, proactive capacity scaling, and a guaranteed 99.99% network uptime SLA backed by contractual remediation credits. Each brokerage deployment is provisioned with redundant network paths, automatic failover mechanisms, and daily encrypted server snapshots to a geographically separated disaster recovery node. Server hardening follows CIS Benchmark Level 2 standards, with UFW firewall rule sets, SSH key-only access, and active intrusion detection (IDS) monitoring via Wazuh agents — ensuring that your brokerage's trading infrastructure is not only fast, but operationally fortified.`,
    ],

    specs: [
      'Co-location in Equinix LD4 (UK), NY4 (USA), and TY3 (Japan): the three primary global FX execution hubs',
      'Cross-connect physical fiber paths to Tier-1 liquidity providers: eliminates multi-hop latency degradation',
      'Sub-millisecond intra-datacenter order routing latency; <0.01s full round-trip execution profile',
      '99.99% network uptime SLA with contractual remediation credits and real-time status dashboard',
      'Dedicated bare-metal server provisioning for MT5 Server (Manager API + Dealer API), MT5 Gateway, and CRM backend',
      'Automated daily encrypted server snapshots to geo-separated disaster recovery node',
      'Active 24×7 infrastructure monitoring: Zabbix/Grafana stack, automated PagerDuty alerting for threshold breaches',
      'CIS Benchmark Level 2 server hardening: UFW firewall, SSH key-only access, SELinux enforcement',
      'Wazuh IDS/SIEM agent deployment for real-time intrusion detection and compliance log management',
      'Horizontal scaling architecture: burst capacity provisioning within 4-hour SLA during high-volume market events (NFP, FOMC, ECB)',
      'IPv4 and IPv6 dual-stack networking with DDoS mitigation up to 10 Gbps sustained attack volumetric',
    ],

    businessValue: `Every millisecond of latency advantage your brokerage holds over competitors translates into better fill rates, reduced slippage complaints, and a dramatically lower rate of order rejections from your liquidity provider — all of which directly improve your client retention metrics and your brokerage's P&L. Co-located infrastructure is the single investment that simultaneously improves client experience (faster execution), operational risk (reduced re-quote exposure), and competitive positioning (the ability to offer institutional-grade execution quality to retail-facing clients). BROKERCORESOLUTION's managed co-location solution delivers this infrastructure without the capital expenditure of a direct data center contract, providing your brokerage with enterprise-class execution topology from the first day of live operations.`,
  },

  // ── MODULE 3 ── LIQUIDITY PROVIDER ──────────────────────────────────────────

  'liquidity-provider': {
    id: 'liquidity-provider',
    module: 'Liquidity Provider',
    moduleSlug: 'liquidity-provider',
    title: 'Liquidity Provider',
    subtitle: 'Tier-1 Deep Order-Book Connections',
    metric: { label: 'Raw Spread From', value: '0.0', unit: 'Pips (Interbank)' },
    heroTag: 'Module 04 — Liquidity',
    accent: 'cyan',

    overview: [
      `BROKERCORESOLUTION aggregates institutional liquidity from a curated panel of Tier-1 Prime Brokers and Prime-of-Prime (PoP) liquidity providers, delivering a consolidated, deep order book that covers 80+ FX currency pairs, Spot Metals (XAU/USD, XAG/USD), Energy CFDs (Brent Crude, WTI, Natural Gas), Equity Indices, and Cryptocurrency CFDs (BTC/USD, ETH/USD, and 20+ altcoin pairs) — all accessible through a single LP connectivity agreement. Our multi-venue aggregation engine applies smart order routing (SOR) logic to each incoming trade request, dynamically selecting the best available bid/offer from the aggregated pool based on price, depth, and venue reliability scores computed in real time. This SOR architecture ensures your clients consistently receive best execution, while your brokerage minimizes reject rates and latency variance across market conditions.`,

      `The pricing architecture operates on a Non-Dealing Desk (NDD) / Straight Through Processing (STP) model — meaning your clients' orders are transmitted directly to the interbank liquidity pool without internal dealer intervention, eliminating the conflict-of-interest inherent in B-Book market-maker models. Raw interbank spreads from 0.0 pips are passed through to your MT5 gateway, over which your brokerage applies a configurable spread markup via the BROKERCORESOLUTION Spread Management Plugin — enabling you to engineer precise margin capture per instrument and per client segment without touching the underlying raw feed. Liquidity depth is provided at multiple price levels (top-of-book, Level 2 depth), giving your risk desk real-time visibility into market impact thresholds and enabling informed A-Book routing decisions for large-notional institutional client orders.`,

      `Our LP connectivity is delivered via industry-standard FIX 4.4 / FIX 5.0 protocol, with full session management, heartbeat monitoring, and automatic reconnection logic built into our gateway middleware. For MT5 White-Label deployments, liquidity is bridged through our certified Gateway infrastructure (compatible with MetaQuotes' MT5 server architecture), eliminating the need for your brokerage to manage LP connectivity independently. BROKERCORESOLUTION maintains active liquidity relationships with institutional counterparties including Tier-1 bank market makers and regulated Prime-of-Prime providers — ensuring that your brokerage's credit line and aggregated liquidity remain available even during high-volatility tail-risk events such as central bank interventions or geopolitical black-swan episodes.`,
    ],

    specs: [
      '80+ FX currency pairs: Majors, Minors, Exotics — raw interbank spreads from 0.0 pips on EUR/USD, GBP/USD, USD/JPY',
      'Spot Metals: XAU/USD (Gold), XAG/USD (Silver) — institutional spreads, no last-look execution',
      'Energy CFDs: Brent Crude Oil, WTI Crude Oil, Natural Gas — direct futures roll management',
      'Equity Index CFDs: US30, SPX500, NAS100, UK100, GER40 — continuous pricing across market hours',
      'Cryptocurrency CFDs: BTC/USD, ETH/USD, LTC/USD, XRP/USD, and 20+ major digital asset pairs',
      'Multi-venue Smart Order Routing (SOR): real-time best execution logic across 6–10 concurrent LP venues',
      'FIX 4.4 / FIX 5.0 protocol connectivity: session management, heartbeat monitoring, auto-reconnect failover',
      'Non-Dealing Desk (NDD) / Straight Through Processing (STP) architecture: zero dealer intervention model',
      'Level 2 order book depth: top-of-book + full depth-of-market (DOM) data for risk desk visibility',
      'Configurable spread markup engine: per-instrument, per-account-group, per-client-tier markup calibration via MT5 plugin',
      'No-last-look execution available on premium LP tiers: institutional fill guarantee at quoted price',
      'Post-trade reporting: full FIX execution reports, trade confirmations, and end-of-day position reconciliation feeds',
    ],

    businessValue: `Access to deep, aggregated Tier-1 liquidity is the single most powerful differentiator between a premium brokerage brand and a commodity white-label. BROKERCORESOLUTION's LP aggregation eliminates the minimum volume thresholds and credit pre-approval timelines that prevent startup brokers from accessing direct prime brokerage relationships — delivering institutional-quality pricing from day one. The NDD/STP model removes dealer risk from your operational equation, converting your brokerage's revenue model from a directional bet on client losses to a sustainable, volume-driven spread capture business. Coupled with our configurable markup engine, BROKERCORESOLUTION enables your brokerage to achieve a blended spread revenue margin of 0.3–1.2 pips per round-turn across your instrument suite — generating predictable, scalable fee income that grows linearly with your client trading volume.`,
  },

  // ── MODULE 4 ── GATEWAY SOLUTIONS ───────────────────────────────────────────

  'gateway-solutions': {
    id: 'gateway-solutions',
    module: 'Gateway Solutions',
    moduleSlug: 'gateway-solutions',
    title: 'Gateway Solutions',
    subtitle: 'Multi-Currency Payment Processing Architecture',
    metric: { label: 'Settlement Speed', value: 'T+0', unit: 'Automated' },
    heroTag: 'Module 05 — Payments',
    accent: 'purple',

    overview: [
      `Payment infrastructure is the circulatory system of your brokerage — without seamless, fast, and multi-currency deposit and withdrawal capabilities, even the best trading platform cannot retain clients at institutional scale. BROKERCORESOLUTION's Gateway Solutions module delivers a fully integrated, multi-channel payment processing architecture that connects your brokerage's CRM and MT5 back-office to a curated network of high-risk-approved payment processors, crypto payment gateways, and bank wire facilitation partners. Our payment integration layer supports deposits and withdrawals in 30+ fiat currencies alongside major cryptocurrencies (BTC, ETH, USDT, USDC), managed through a single unified API that abstracts the complexity of individual gateway relationships from your operational team.`,

      `The gateway architecture is built around an automated merchant routing engine that applies intelligent failover logic across your configured payment provider stack. When a primary payment processor declines or throttles a transaction — a common occurrence in high-risk merchant categories — the routing engine immediately re-routes the client's payment attempt to a secondary or tertiary provider, transparently and without client-side error. This multi-rail redundancy ensures deposit acceptance rates of 85–95% across mature gateway configurations, dramatically outperforming the 55–65% acceptance rates typical of single-gateway brokerage setups. Settlement is automated on T+0 to T+2 cycles depending on payment method, with reconciliation feeds pushed directly to your CRM's client balance ledger via API, eliminating manual reconciliation overhead.`,

      `BROKERCORESOLUTION's gateway integrations include dedicated chargeback protection mechanisms: real-time 3DS2 authentication enforcement on card transactions, velocity-based fraud scoring on deposit attempts, and automated flagging of high-risk transaction patterns to your compliance team. For crypto payment channels, our integration supports non-custodial wallet detection, on-chain AML screening via Chainalysis or Elliptic integrations, and automated USDT/USDC stablecoin settlement — enabling your brokerage to offer crypto funding pathways while maintaining full regulatory compliance with FATF Travel Rule obligations. All payment data is handled under PCI DSS Level 1 compliant infrastructure, ensuring that your brokerage's payment operations meet the highest available data security standard in the payments industry.`,
    ],

    specs: [
      'Multi-channel gateway integration: credit/debit cards (Visa, Mastercard), bank wire (SWIFT, SEPA), local e-wallets, and crypto',
      'Automated merchant routing engine: intelligent failover across 3–6 concurrent payment processors with real-time provider health monitoring',
      'Cryptocurrency payment gateway: BTC, ETH, USDT (TRC20/ERC20), USDC, LTC, XRP — with automated fiat conversion at live rates',
      'On-chain AML screening: Chainalysis KYT / Elliptic API integration for crypto deposit risk classification',
      'FATF Travel Rule compliance: originator/beneficiary data capture for crypto transactions exceeding $1,000 equivalent',
      '3DS2 (Three-Domain Secure 2.0) authentication enforcement on all card-not-present transactions',
      'Velocity-based fraud scoring engine: real-time transaction risk profiling with configurable threshold alerts',
      'T+0 automated settlement for crypto; T+1 / T+2 for card and bank wire channels',
      'API reconciliation feeds: real-time balance credit/debit notifications pushed to CRM client ledger',
      'Chargeback management: automated dispute documentation package generation with evidence upload workflows',
      '30+ fiat currency support with automated FX conversion at mid-market rates',
      'PCI DSS Level 1 compliant infrastructure for all card data handling and storage',
    ],

    businessValue: `A brokerage's deposit funnel conversion rate is the most direct lever on its revenue growth velocity. Every 10-percentage-point improvement in payment acceptance rate translates directly into incremental funded accounts, higher first-deposit volumes, and accelerated time-to-first-trade for new clients — the single most predictive metric of long-term client lifetime value. BROKERCORESOLUTION's multi-rail payment architecture, combined with crypto funding pathways and automated settlement, positions your brokerage to capture deposit intent from clients who would otherwise abandon the funding process entirely due to payment failures. Furthermore, by handling chargeback protection and AML-screened crypto processing at the infrastructure layer, BROKERCORESOLUTION eliminates two of the most common operational failure modes that cause startup brokerages to lose their payment processor relationships within the first 12 months of operation.`,
  },

  // ── MODULE 5 ── TECH SOLUTIONS: CRM ─────────────────────────────────────────

  'crm-software': {
    id: 'crm-software',
    module: 'Tech Solutions',
    moduleSlug: 'tech-solutions',
    title: 'CRM Software',
    subtitle: 'Intelligent Client Lifecycle Management',
    metric: { label: 'KYC Onboarding', value: '<5', unit: 'Minutes Automated' },
    heroTag: 'Module 06 — Technology',
    accent: 'purple',

    overview: [
      `A brokerage without an institutional-grade CRM is operationally blind. The client relationship management system is the operational nucleus of your brokerage — it orchestrates every touchpoint of the client lifecycle, from initial lead capture and KYC verification through deposit processing, trading activity monitoring, IB commission calculation, and retention campaign execution. BROKERCORESOLUTION deploys a fully configured, white-label CRM solution built on proven institutional frameworks (compatible with Techysquad CRM architecture and SumSub KYC/AML API integration), pre-integrated with your MT5 trading environment, payment gateways, and LP back-office — delivering a unified operational command center accessible to your compliance, sales, risk, and finance teams from a single web-based interface.`,

      `The KYC/AML onboarding pipeline is fully automated through SumSub integration: clients upload identity documents, which are verified against government databases and biometric liveness checks in real time, with results returned to the CRM within 60–120 seconds. AML risk scoring is applied at account registration, flagging high-risk nationalities, PEP (Politically Exposed Persons) matches, and sanctions list hits — with automated workflow routing to your compliance officer for manual review escalation. The entire flow eliminates paper-based onboarding entirely, compressing the average client activation time from 24–72 hours (manual process) to under 5 minutes for low-risk profiles. This directly accelerates your brokerage's deposit cycle, as clients can fund and trade the same day they register.`,

      `The IB (Introducing Broker) and affiliate management module supports unlimited hierarchy depth: Master IB → Sub-IB → Agent → Client, with per-level commission configurations supporting percentage-of-spread, per-lot rebate, CPA (cost-per-acquisition), and hybrid revenue-share models. Commission calculations are automated on a configurable cycle (daily, weekly, or monthly), with IB dashboards providing real-time visibility into referred client volumes, generated commission balances, and withdrawal request management. The CRM also provides a comprehensive back-office suite for your finance team: balance adjustments, credit/bonus management, fund transfer workflows, and daily MT5 position reconciliation — all with full audit trail logging for regulatory compliance.`,
    ],

    specs: [
      'White-label CRM deployment: fully branded with your brokerage logo, color scheme, domain, and client-facing portal URL',
      'SumSub KYC/AML API integration: automated ID verification, biometric liveness detection, and AML risk scoring in <120 seconds',
      'PEP / Sanctions screening: real-time cross-reference against OFAC, EU, UN, and UK HM Treasury watchlists',
      'Multi-tier IB management: unlimited hierarchy depth (Master IB → Sub-IB → Agent → Client) with per-node commission configuration',
      'Commission engine: percentage-of-spread, per-lot rebate, CPA, and hybrid revenue-share models with automated calculation cycles',
      'Integrated payment gateway management: deposit/withdrawal requests, approval workflows, and real-time MT5 balance synchronization',
      'MT5 account management: account creation, leverage adjustment, account group assignment, and position monitoring from CRM',
      'Client segmentation and tagging: auto-grouping by deposit tier, trading volume, geographic region, and risk score',
      'Compliance audit trail: immutable, timestamped log of all client data changes, account actions, and compliance review decisions',
      'Sales CRM pipeline: lead assignment, follow-up scheduling, conversion funnel tracking, and retention campaign triggering',
      'Multi-language client portal: English, Arabic, Spanish, French, Chinese — with RTL layout support for Arabic markets',
      'Role-based access control (RBAC): granular permission sets for compliance officers, sales agents, IB managers, and finance teams',
    ],

    businessValue: `The CRM is the single system that converts your brokerage's technology investment into measurable revenue performance. An operationally mature CRM reduces client onboarding friction (increasing deposit conversion rates by 30–50%), automates IB commission management (eliminating the operational overhead that kills affiliate programs at scale), and provides the compliance infrastructure necessary to maintain your regulatory license in good standing. BROKERCORESOLUTION's CRM deployment is pre-configured and live within 7–14 business days — compared to the 3–6 month build timelines of custom CRM development projects — delivering an immediate operational capability that lets your team focus on client acquisition rather than software development.`,
  },

  'risk-management-software': {
    id: 'risk-management-software',
    module: 'Tech Solutions',
    moduleSlug: 'tech-solutions',
    title: 'Risk Management Software',
    subtitle: 'Real-Time Exposure & Drawdown Control',
    metric: { label: 'A/B Routing Switch', value: 'Real-Time', unit: 'Automated' },
    heroTag: 'Module 07 — Technology',
    accent: 'purple',

    overview: [
      `The risk management layer is where your brokerage's profitability is won or lost. A brokerage operating without institutional-grade risk controls is exposed to three categories of existential threat: directional market risk from internalized (B-Book) client positions, operational risk from unchecked toxic order flow exploiting execution latency or pricing anomalies, and counterparty risk from over-concentration in a single LP venue. BROKERCORESOLUTION's Risk Management Software module integrates Centroid Solutions' industry-leading risk bridge platform with your MT5 server and LP connectivity layer — delivering a real-time, automated risk orchestration system that protects your brokerage's capital book across all three risk vectors simultaneously.`,

      `The Centroid integration provides a full A-Book/B-Book automated routing switch, operating on a per-client-segment and per-instrument rule set configured by your risk desk. Client orders from identified toxic flow sources (high-frequency EA traders, statistical arbitrageurs, and latency scalpers — detected via Centroid's behavioral profiling engine) are automatically routed A-Book to the LP, transferring market risk to the interbank market in real time. Low-risk, organically-flowing client orders are retained B-Book for internalization, capturing the full spread revenue without LP markup. The routing switch operates with sub-50ms decisioning latency, ensuring that routing decisions are made and executed before order conditions change — a critical performance requirement in fast-moving markets.`,

      `Exposure management is enforced through a configurable cap system: maximum net open exposure (NOE) per instrument, per currency pair basket, and per overall portfolio is monitored in real time and alerted to your risk desk when thresholds are breached. Automatic hedging triggers can be configured to place offsetting orders with your LP the moment aggregate client net exposure exceeds a defined percentage of your brokerage's regulatory capital. Drawdown circuit breakers halt new position opening for at-risk client accounts when daily or cumulative losses approach pre-defined limits — a feature required for MiFID II compliance and increasingly expected by institutional clients as a proof of operational risk sophistication.`,
    ],

    specs: [
      'Centroid Solutions bridge integration: certified MT5-compatible risk management bridge with real-time A/B routing engine',
      'Automated A-Book/B-Book routing: per-client, per-instrument, and per-account-group rule-based order routing with sub-50ms decisioning',
      'Toxic flow detection: behavioral profiling of EA traders, latency arbitrageurs, and statistical scalpers via Centroid\'s client classification engine',
      'Real-time Net Open Exposure (NOE) monitoring: per-instrument, per-basket, and portfolio-level exposure dashboards',
      'Configurable exposure caps with automated LP hedging triggers: offsetting orders placed when NOE exceeds defined % of regulatory capital',
      'Drawdown circuit breakers: daily and cumulative loss limits enforced at account level with automated position-close or new-trade halt',
      'Margin call and stop-out management: customizable margin level thresholds, automated notification workflows, and force-close execution',
      'Liquidity concentration risk monitoring: per-LP volume distribution tracking with automated rebalancing alerts',
      'P&L attribution reports: real-time and historical separation of A-Book LP cost vs. B-Book internalization revenue',
      'Slippage and rejection analysis: LP execution quality reporting with reject rate, average slippage, and fill ratio KPIs',
      'Risk desk alert system: configurable SMS, email, and Telegram notifications for threshold breaches, toxic flow events, and high-impact news windows',
      'Regulatory capital monitoring: real-time Own Funds calculation vs. regulatory capital requirement (for CySEC/MiFID II regulated entities)',
    ],

    businessValue: `For a brokerage operating a B-Book or hybrid model, the risk management system is the primary P&L optimization lever. A well-calibrated Centroid bridge can increase net brokerage margin by 15–35% compared to a pure STP model, by intelligently retaining profitable client flow B-Book while externalizing toxic flow to the LP. Equally critical, robust exposure controls and toxic flow detection prevent the catastrophic single-event losses that have destroyed under-capitalized brokerages during black-swan market events — CHF de-peg, COVID liquidity crises, and post-FOMC gap events being the most visible examples. BROKERCORESOLUTION's risk management module does not just protect your capital — it actively converts your brokerage's client flow analysis into a systematic, data-driven revenue engineering capability.`,
  },

  // ── MODULE 6 ── TRADING PLATFORMS ───────────────────────────────────────────

  'trading-platforms': {
    id: 'trading-platforms',
    module: 'Trading Platforms',
    moduleSlug: 'trading-platforms',
    title: 'Trading Platforms',
    subtitle: 'MT5, cTrader & Custom White-Label Builds',
    metric: { label: 'Platform Deploy', value: '7–14', unit: 'Business Days' },
    heroTag: 'Module 08 — Platforms',
    accent: 'cyan',

    overview: [
      `The trading terminal is your brokerage's primary product — the interface through which your clients interact with your liquidity, execute their strategies, and form their subjective assessment of your brand's quality. BROKERCORESOLUTION delivers a fully customized, institutionally provisioned MetaTrader 5 (MT5) White-Label environment that places your brokerage's brand, color scheme, and domain at the center of the platform experience. The MT5 White-Label includes the complete MT5 ecosystem: Desktop platform (Windows and macOS), Web Terminal (browser-native, no installation required), and Mobile Apps (iOS and Android) — all co-branded and pre-configured with your instrument suite, account groups, leverage settings, and margin structure from day one.`,

      `The backend provisioning covers the full MT5 Server infrastructure: the MetaTrader 5 Server executable, MT5 Manager API (for back-office account management and trade surveillance), MT5 Dealer API (for manual intervention and quote management), and MT5 Gateway configuration (for LP feed bridging and order routing). Your brokerage receives a dedicated MT5 Admin account with full server configuration access — enabling your risk desk to modify account groups, adjust instrument specifications, configure server-side scripts, and manage the complete MT5 symbol library. In addition to MT5, BROKERCORESOLUTION facilitates cTrader White-Label deployments for brokerages targeting NDD/ECN-native client segments, and supports custom proprietary platform development for institutional clients with unique UX or regulatory requirements.`,

      `Advanced Manager Terminal capabilities are delivered as standard: bulk position management, client account surveillance, P&L monitoring at the account and group level, execution speed analytics, and trade intervention controls. The MT5 environment is pre-integrated with BROKERCORESOLUTION's CRM (via Manager API), payment gateway (for automated balance crediting), and risk management bridge (via Centroid or equivalent), creating a fully interconnected operational architecture. All platform deployments are delivered on BROKERCORESOLUTION's co-located infrastructure at Equinix LD4/NY4/TY3, ensuring that your branded MT5 environment inherits the sub-millisecond execution profile of our institutional server network from the moment of go-live.`,
    ],

    specs: [
      'MetaTrader 5 (MT5) White-Label: full brand customization — logo, color scheme, broker name, and custom domain across Desktop, Web, and Mobile',
      'MT5 Server infrastructure: Server executable, Manager API, Dealer API, and Gateway configuration — fully provisioned and managed',
      'Complete instrument library setup: 80+ FX pairs, Metals, Energies, Indices, and Crypto CFDs — with custom symbol naming and specification',
      'Account group architecture: Standard, ECN, Islamic (swap-free), Pro, and VIP account tiers with independent commission/spread configurations',
      'Leverage and margin configuration: per-account-group and per-instrument leverage settings, with automated margin call and stop-out levels',
      'MT5 Manager Terminal: bulk account management, real-time P&L surveillance, trade intervention, and execution quality analytics',
      'cTrader White-Label: browser-based and desktop deployment for ECN/NDD-native client segments with Level 2 DOM display',
      'Custom platform development: proprietary front-end trading terminals for institutional or high-net-worth client acquisition strategies',
      'MT5 Web Terminal: fully functional browser-native trading environment — no client-side installation required',
      'iOS and Android mobile apps: co-branded MT5 Mobile with custom splash screens and App Store / Google Play deployment assistance',
      'Server-side automated trading (Expert Advisor) support: MT5 MQL5 EA execution environment with configurable per-group EA permissions',
      'Multi-server architecture for scale: separate MT5 servers for live trading, demo environment, and manager/admin operations',
    ],

    businessValue: `The MT5 White-Label is the fastest path to a fully operational, client-facing brokerage brand — compressing a 12–18 month custom platform build into a 7–14 business day deployment cycle. By deploying on the world's most widely adopted institutional trading platform, your brokerage immediately inherits the trust, familiarity, and third-party EA ecosystem that MT5 commands among professional traders — a market positioning advantage that no proprietary platform can replicate on a startup timeline. BROKERCORESOLUTION's fully managed provisioning model means your team focuses on client acquisition and retention, while our infrastructure team manages server uptime, MetaQuotes license compliance, and platform update deployments — allowing you to scale your trading operations without building an in-house DevOps team.`,
  },

  // ── MODULE 7 ── PLUGIN SOLUTIONS ────────────────────────────────────────────

  'plugin-solutions': {
    id: 'plugin-solutions',
    module: 'Plugin Solutions',
    moduleSlug: 'plugin-solutions',
    title: 'Plugin Solutions',
    subtitle: 'Proprietary Performance-Enhancing Server Plugins',
    metric: { label: 'Plugin Execution', value: '<1ms', unit: 'Server-Side' },
    heroTag: 'Module 09 — Plugins',
    accent: 'purple',

    overview: [
      `The MT5 platform's native feature set, while comprehensive, does not encompass the full spectrum of monetization, execution management, and client experience tools required to operate a competitive institutional-grade brokerage. BROKERCORESOLUTION's Plugin Solutions module delivers a suite of proprietary and third-party server-side MT5 plugins — certified by MetaQuotes for MT5 compatibility — that extend the platform's native capabilities across four critical operational dimensions: revenue optimization, execution quality enhancement, corporate action management, and advanced trade analytics. These plugins operate at the MT5 server level, executing within the platform's native execution environment with sub-millisecond response times that are invisible to the client but materially impactful to your brokerage's P&L.`,

      `The BROKERCORESOLUTION Spread Management Plugin provides granular, real-time control over the spread markup applied to each instrument and account group. Rather than applying a static, platform-level markup, the plugin enables dynamic spread adjustments based on configurable variables: market session (London/New York/Tokyo sessions carry different liquidity profiles), account tier (Standard clients receive higher markup than ECN/Pro tiers), and real-time volatility index (spreads widen automatically during high-volatility events such as NFP releases, preventing your brokerage from inadvertently providing below-market spreads during periods of maximum LP spread expansion). This dynamic pricing capability alone can increase your brokerage's net spread revenue by 20–40% versus a static markup configuration.`,

      `Additional plugins in the BROKERCORESOLUTION suite include: the Dividend Adjustment Plugin (automatically calculates and applies daily dividend adjustments on equity CFD positions, eliminating manual finance team intervention); the Trade Copier / PAMM Manager Plugin (enabling your institutional and high-net-worth clients to operate managed account programs directly within the MT5 environment); and a suite of execution management plugins from the Tools for Brokers ecosystem, including the Trade Simulator (for demo account realism enhancement) and the Margin Manager (for real-time group-level capital utilization optimization). Each plugin is deployed, tested, and maintained by BROKERCORESOLUTION's technical team — ensuring compatibility across MetaQuotes software updates without operational downtime.`,
    ],

    specs: [
      'BROKERCORESOLUTION Dynamic Spread Management Plugin: real-time per-instrument, per-account-group, per-session spread markup with volatility-responsive pricing',
      'Automatic Dividend Adjustment Plugin: daily ex-dividend credit/debit calculation and application for equity index and single-stock CFD positions',
      'PAMM / MAM (Percent Allocation Management Module): multi-account management system for fund managers operating within your MT5 environment',
      'Trade Copier Plugin: automated signal replication across multiple accounts with configurable lot-size scaling and filter rules',
      'Tools for Brokers (TFB) ecosystem integration: Trade Simulator, Margin Manager, Spread Monitor, and Bridge Adapter plugins',
      'Execution Wrapper Plugin: configurable execution delay (0–100ms), slippage range enforcement, and partial fill management for B-Book optimization',
      'Price Manipulation Detection Plugin: real-time server-side flagging of coordinated quote exploitation, latency arbitrage, and statistical arbitrage patterns',
      'News Filter Plugin: automated trading halt (configurable per-instrument) during high-impact economic news windows with MT5 Economic Calendar integration',
      'Custom MQL5 server-side script development: bespoke automation logic for unique brokerage operational requirements',
      'Plugin performance monitoring: latency profiling and throughput benchmarking for all installed plugins via Grafana dashboard',
      'Zero-downtime plugin updates: staged deployment with canary testing and automatic rollback on performance threshold breach',
    ],

    businessValue: `Server-side plugins are the highest-ROI technology investment available to an MT5-based brokerage. The Spread Management Plugin alone can increase net spread revenue by 20–40% through dynamic markup optimization — a recurring, compounding revenue uplift that pays for the entire BROKERCORESOLUTION plugin suite within weeks of deployment. The Execution Wrapper and Toxic Flow Detection plugins directly reduce your A-Book LP hedging costs by filtering out the high-frequency flow that generates reject rates and negative LP PnL — preserving your LP relationship quality and avoiding the volume surcharges that LP providers impose on brokers with poor order flow quality profiles. BROKERCORESOLUTION manages the entire plugin lifecycle — deployment, testing, update management, and performance monitoring — so your operational team never needs to engage with MT5 server administration.`,
  },

  // ── MODULE 8 ── GROWTH SUPPORT ──────────────────────────────────────────────

  'digital-growth-solutions': {
    id: 'digital-growth-solutions',
    module: 'Growth Support',
    moduleSlug: 'growth-support',
    title: 'Digital Growth Solutions',
    subtitle: 'Data-Driven Acquisition & Retention Funnels',
    metric: { label: 'Avg. CPA Reduction', value: '35–50%', unit: 'vs. Benchmark' },
    heroTag: 'Module 10 — Growth',
    accent: 'cyan',

    overview: [
      `A technologically superior brokerage that cannot acquire clients at a sustainable cost-per-acquisition (CPA) is an infrastructure investment without a return. BROKERCORESOLUTION's Digital Growth Solutions module provides a vertically specialized digital marketing execution capability, built exclusively for FX and CFD brokerages operating in a heavily regulated, high-competition advertising environment. Unlike generalist digital marketing agencies, our growth team operates with deep native knowledge of platform-level advertising restrictions (Google Ads, Meta, TikTok for FX financial products), regional compliance requirements for financial promotions, and the specific funnel mechanics that convert FX-educated audiences into funded brokerage accounts.`,

      `Our acquisition funnel architecture begins with audience segmentation at the traffic source level: performance media (Google Search, Meta, programmatic display, and affiliate networks) is configured to reach audiences with demonstrated intent signals for FX trading, investment products, or proprietary trading. Traffic is routed through conversion-optimized landing pages built with geo-specific compliance disclosures, social proof elements (live spreads, platform screenshots, regulatory credential displays), and A/B-tested headline/CTA permutations — calibrated to your brokerage's offer structure (welcome bonus, commission-free trading, Islamic account promotion). Attribution is tracked end-to-end via server-side conversion APIs, ensuring that campaign performance data survives browser-level privacy restrictions (iOS 17, GA4 migration, Safari ITP) that invalidate most pixel-based analytics setups.`,

      `Retention funnel management covers the critical 30-day post-registration period that determines whether a new registrant becomes a long-term, high-value depositor. BROKERCORESOLUTION designs automated email and SMS nurture sequences (via Klaviyo or HubSpot integrations) that guide new registrants through platform activation milestones: identity verification completion, first deposit, first trade, and first profitable outcome. Behavioral triggers fire personalized retention messages based on client activity signals from the MT5 server (e.g., "we noticed you haven't placed your first trade yet — here's a step-by-step guide to your first EUR/USD position"). For high-value client segments, BROKERCORESOLUTION deploys a VIP concierge onboarding program: dedicated account manager assignment, personal onboarding calls, and a curated market research report package designed to increase initial deposit sizes by 2–4x.`,
    ],

    specs: [
      'Performance media management: Google Ads (Search, Display, YouTube), Meta Ads (Facebook/Instagram), and programmatic display for FX financial audiences',
      'FX-compliant landing page development: geo-specific regulatory disclosures, live spread widgets, social proof modules, and A/B-tested conversion elements',
      'Server-side conversion API implementation: Meta CAPI, Google Enhanced Conversions — for cookie-less attribution resilience',
      'SEO and organic content strategy: FX trading educational content, broker comparison targeting, and long-tail keyword authority building',
      'Affiliate and IB network management: affiliate program setup, tracking link infrastructure, commission reporting dashboards, and performance optimization',
      'Email and SMS nurture automation: Klaviyo/HubSpot integration with behavioral-trigger sequences mapped to MT5 client activation milestones',
      'CRM-integrated retention campaigns: churn prediction scoring, win-back sequences, and deposit upsell automations for dormant accounts',
      'Social media content strategy: LinkedIn institutional positioning, Telegram community management for trading signal audiences, and YouTube platform tutorials',
      'Influencer and financial educator partnership facilitation: due diligence, compliance vetting, and performance-based partnership structuring',
      'VIP client onboarding program: personal account manager assignment, first-deposit concierge call, and curated market research report delivery',
      'Monthly analytics reporting: CPA, LTV, ROAS, and deposit volume attribution across all channels with media mix modeling recommendations',
    ],

    businessValue: `Client acquisition is the primary operating cost for any brokerage past its initial infrastructure investment phase. BROKERCORESOLUTION's performance media team has optimized FX brokerage acquisition funnels across 12+ markets, achieving average CPA reductions of 35–50% versus industry benchmarks through funnel conversion rate optimization and media efficiency improvements. More critically, our retention automation systems directly address the 60–80% 90-day client churn rate endemic to retail-facing brokerages — recovering dormant accounts and extending client trading lifespans in ways that multiply the LTV generated per acquired client. For a brokerage with 500 active clients, a 20% improvement in 90-day retention equates to the revenue equivalent of acquiring 100 additional clients — at zero additional acquisition cost.`,
  },

  'technical-training': {
    id: 'technical-training',
    module: 'Growth Support',
    moduleSlug: 'growth-support',
    title: 'Technical Training',
    subtitle: 'Platform, Compliance & Operations Training',
    metric: { label: 'Training Completion', value: '5–10', unit: 'Day Program' },
    heroTag: 'Module 11 — Training',
    accent: 'cyan',

    overview: [
      `A world-class brokerage infrastructure is only as effective as the team operating it. BROKERCORESOLUTION's Technical Training program delivers a structured, role-specific operational handoff curriculum that transforms your newly hired compliance officers, risk desk operators, sales managers, and technical administrators into fully proficient operators of your brokerage's complete technology stack — from MT5 server management and CRM back-office workflows to regulatory compliance maintenance and live risk monitoring. The training program is designed around the operational reality of a startup-to-scale brokerage: it prioritizes the highest-impact operational capabilities first, ensuring your team can operate the brokerage independently and competently from day one of live client operations.`,

      `The MT5 Platform Management module covers the full spectrum of MT5 administrative operations: account group creation and configuration, symbol library management, server restart procedures, Manager API trade intervention workflows, real-time position monitoring, and MT5 server performance tuning. Risk Desk training covers Centroid bridge operation, A-Book/B-Book routing rule configuration, exposure monitoring interpretation, and the escalation decision framework for high-volatility market events. The Compliance and AML Training module provides your MLRO and compliance officer with the procedural knowledge required to operate your CRM's KYC/AML pipeline, conduct internal audits, generate suspicious transaction reports (STRs), and respond to regulatory information requests — all mapped specifically to the requirements of your chosen regulatory jurisdiction.`,

      `Training delivery is flexible and designed to accommodate international team locations: live virtual instructor-led sessions via Zoom or Google Meet, supported by recorded session libraries, written Standard Operating Procedures (SOPs) for each operational role, and interactive sandbox environments where trainees can practice MT5 administration, CRM workflows, and risk management operations on a fully configured demo instance of your brokerage's infrastructure. Post-training support is provided via a dedicated BROKERCORESOLUTION operations helpdesk for 90 days post-go-live — ensuring your team has immediate access to expert guidance during the critical early operational phase when edge cases and unfamiliar scenarios are most likely to arise. Quarterly refresher sessions are available for regulatory compliance updates and new feature orientations as BROKERCORESOLUTION expands its technology suite.`,
    ],

    specs: [
      'MT5 Platform Administration training: account group management, symbol library configuration, Server restart & monitoring, and Manager API workflows',
      'Risk Desk operations training: Centroid bridge dashboard, A/B routing rule configuration, real-time exposure monitoring, and escalation decision trees',
      'CRM Back-Office training: client onboarding workflows, KYC review procedures, IB commission management, and payment gateway operations',
      'Compliance and AML training: jurisdiction-specific AML/CTF procedures, STR/SAR filing workflows, sanctions screening operations, and regulatory audit preparation',
      'Payment operations training: deposit/withdrawal approval workflows, payment dispute management, and reconciliation procedures',
      'Sales team training: CRM pipeline management, client segmentation strategy, retention call scripts, and VIP client handling protocols',
      'Technical administration training: server monitoring dashboards, backup verification procedures, and incident escalation workflows',
      'Role-specific SOPs (Standard Operating Procedures): written procedural documentation for each operational role in your brokerage',
      'Interactive sandbox training environment: fully configured demo MT5 + CRM instance for hands-on practice without live capital risk',
      'Live virtual instructor-led sessions: 5–10 day structured curriculum delivered via Zoom/Google Meet with recorded replay access',
      '90-day post-go-live operations helpdesk: priority support channel for your team during the critical early operational phase',
      'Quarterly compliance refresher sessions: regulatory update briefings and new feature orientations as BROKERCORESOLUTION\'s platform evolves',
    ],

    businessValue: `Operational errors in a live brokerage environment are not abstract — they have direct P&L consequences: misconfigured margin settings trigger client equity burns, incorrect KYC approval workflows create regulatory exposure, and uninformed risk desk decisions can result in unhedged directional market risk that exceeds your brokerage's capital buffer. BROKERCORESOLUTION's Technical Training program converts your team from dependent to operationally independent within 5–10 days, eliminating the 3–6 month "ramp-up tax" that new operational hires typically impose on a brokerage's first year of profitability. Furthermore, a compliance-trained MLRO and risk desk team are essential prerequisites for maintaining your regulatory license in good standing — regulators assess operational competence through staff training records, SOPs, and evidenced compliance procedures as part of routine supervisory reviews.`,
  },
};

// ── Flat array for list/navigation purposes ───────────────────────────────────
export const SERVICES_LIST = Object.values(SERVICES_DATA);

// ── Navigation order for prev/next within each module ────────────────────────
export const MODULE_GROUPS = {
  'broker-setup': ['business-consulting', 'licensing-regulations'],
  'hosting-server-support': ['hosting-server-support'],
  'liquidity-provider': ['liquidity-provider'],
  'gateway-solutions': ['gateway-solutions'],
  'tech-solutions': ['crm-software', 'risk-management-software'],
  'trading-platforms': ['trading-platforms'],
  'plugin-solutions': ['plugin-solutions'],
  'growth-support': ['digital-growth-solutions', 'technical-training'],
};
