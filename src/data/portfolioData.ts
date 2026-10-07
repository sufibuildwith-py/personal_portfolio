export interface ServicePillar {
  number: string
  title: string
  subtitle: string
  description: string
  features: string[]
  badge: string
}

export interface SystemCaseStudy {
  number: string
  title: string
  tag: string
  subtitle: string
  technologies: string[]
  problem: string
  architecture: string
  governance: string
  benchmark: string
  verificationBadge: string
  githubUrl: string
  demoUrl?: string
  specs: {
    runtime: string
    verification: string
  }
}

export interface ArchitectureLayer {
  id: string
  number: string
  name: string
  layerTag: string
  tagline: string
  description: string
  technicalDetails: string[]
  guarantee: string
}

export interface TechItem {
  number: string
  name: string
  category: string
  role: string
  badge: string
}

export interface ExperienceItem {
  number: string
  role: string
  organization: string
  location: string
  period: string
  stack: string
  summary: string
  deliverables: string[]
  verifiedBadge: string
}

export const PERSONAL_BRAND = {
  name: 'Sufiyan Khan',
  firstName: 'SUFIYAN',
  lastName: 'KHAN',
  tagline: 'AI/ML ENGINEER · BACKEND & FULL-STACK · FORWARD-DEPLOYED ENGINEERING',
  thesis: 'I build AI systems that survive contact with reality. Agents reason. Deterministic guardrails decide.',
  subtext:
    'Building end-to-end systems from architecture, APIs, and databases through UI, local AI, and self-contained deployments. Real systems, evidence-grounded reasoning, and deterministic failure handling.',
  location: 'Kanpur, India',
  email: 'sufiyan.builds.py@gmail.com',
  phone: '+91 8299625564',
  phoneDisplay: '+91 8299625564',
  githubUrl: 'https://github.com/sufibuildwith-py',
  linkedinUrl: 'https://linkedin.com/in/sufi-builds',
  education: 'B.Tech: Artificial Intelligence & Machine Learning · MPGI Kanpur (2023 - 2027)',
}

export const PHILOSOPHY_STATEMENT =
  "Most AI demos collapse the moment they face unstructured data, network failures, or unconstrained execution. I connect intelligent reasoning to deterministic software boundaries — enforcing tamper-evident audit trails, idempotent execution, and evidence-grounded verification before any critical action executes."

export const PHILOSOPHY_STANDARDS = [
  {
    number: '01',
    title: 'Deterministic Policy Over Raw Models',
    desc: 'AI agents propose structured findings; separate deterministic engines enforce policy gates before critical execution.',
  },
  {
    number: '02',
    title: 'End-to-End System Ownership',
    desc: 'Moving fluidly from relational schemas and REST APIs to local inference, desktop packaging, and 60 FPS interfaces.',
  },
  {
    number: '03',
    title: 'Tamper-Evident Auditability',
    desc: 'Transactional outbox patterns, raw-byte HMAC verification, and append-only state ensure every transition is provable.',
  },
  {
    number: '04',
    title: 'Forward-Deployed Reality',
    desc: 'Engineering software for messy real-world operations: offline local AI, zero-internet packaging, and consent-based telemetry.',
  },
]

export const MARQUEE_ROW_1 = [
  { label: 'GOVERNED MULTI-AGENT RECOVERY', detail: 'Sentinel Engine' },
  { label: 'EVE OFFLINE LOCAL-AI CORE', detail: 'SA Command' },
  { label: 'DETERMINISTIC SYSTEM GRAPH', detail: 'GuideIn Control Plane' },
  { label: 'OFFLINE MRZ PASSPORT EXTRACTION', detail: 'Ideal Web Solutions' },
  { label: '30M CRYPTOGRAPHIC VEIL SESSIONS', detail: 'Tauri Desktop' },
  { label: 'TRANSACTIONAL OUTBOX & JOBS', detail: 'PostgreSQL 18' },
  { label: 'FORCE ROW-LEVEL SECURITY', detail: 'Tenant Isolation' },
  { label: '2-STAGE QWEN SEMANTIC RERANKING', detail: 'Local Inference' },
]

export const MARQUEE_ROW_2 = [
  { label: 'IDEMPOTENT RAZORPAY TEST MODE', detail: 'Financial Safety' },
  { label: 'RAW-BYTE HMAC WEBHOOK INGRESS', detail: 'Provider Verification' },
  { label: 'WEBSOCKET / STOMP TELEMETRY', detail: 'Crew Tracking' },
  { label: 'CONCURRENCY-SAFE INVENTORY', detail: 'Headquarters System' },
  { label: 'BILINGUAL TESSERACT OCR PIPELINE', detail: 'Hindi & English' },
  { label: 'SELF-CONTAINED ELECTRON RUNTIME', detail: 'Zero-Internet Deploy' },
  { label: '10,000+ BENCHMARK TEST SUITE', detail: '8/8 Safety Gates' },
  { label: '50K NODES / 250K EDGES SCALE', detail: 'Graph Traversal' },
]

export const ANATOMY_LAYERS: ArchitectureLayer[] = [
  {
    id: 'database',
    number: '01',
    name: 'DATABASE & PERSISTENCE',
    layerTag: 'FOUNDATIONAL STATE',
    tagline: 'PostgreSQL 16/18 · Double-Entry Ledgers · Flyway · Force RLS',
    description:
      'The single source of operational truth. Enforces strict schema migrations, append-only financial journals, tenant isolation via PostgreSQL FORCE RLS, and transactional outbox tables to guarantee zero event loss.',
    technicalDetails: [
      'Double-entry balanced debits and credits for all commercial transactions',
      'Row Level Security (FORCE RLS) enforcing strict multi-tenant boundaries',
      'Transactional outbox pattern preventing dual-write inconsistencies',
      'Immutable audit ledgers with tamper-evident record hashing',
    ],
    guarantee: 'ACID Guarantees & Zero-Loss Outbox',
  },
  {
    id: 'backend',
    number: '02',
    name: 'BACKEND CONTROL PLANE',
    layerTag: 'SYSTEM LOGIC & SECURITY',
    tagline: 'Java 21 · Spring Boot 3 · REST APIs · OIDC/JWT · Raw-Byte HMAC',
    description:
      'High-throughput, enterprise-grade application core. Handles cryptographic webhook signature verification, worker lease claiming, structured error propagation, and idempotent API request lifecycles.',
    technicalDetails: [
      'Raw-byte HMAC signature verification on incoming provider webhooks',
      'State-machine driven execution pipelines with deterministic guards',
      'Worker lease leases with automatic heartbeat recovery',
      'Structured OpenTelemetry tracing and comprehensive metrics',
    ],
    guarantee: 'Idempotent Execution & Signed Ingress',
  },
  {
    id: 'ai-engine',
    number: '03',
    name: 'GOVERNED AI & REASONING',
    layerTag: 'INTELLIGENCE LAYER',
    tagline: 'EVE Local Core · Qwen Reranker · Gemini RAG · Policy Engine',
    description:
      'Where intelligent models meet deterministic authority. Models generate hypotheses, parse ambiguous text, and rank semantic context—while independent deterministic policy governors evaluate blast radius and enforce action safety.',
    technicalDetails: [
      '2-stage local semantic reranking using quantized Qwen embeddings',
      'Bounded multi-agent investigation grounded in persisted evidence',
      'Independent Recovery Safety Governor with AUTO / HUMAN / DENY gates',
      'Offline fallback routines when external models are unreachable',
    ],
    guarantee: 'AI Proposes · Deterministic Engines Decide',
  },
  {
    id: 'realtime',
    number: '04',
    name: 'REAL-TIME TELEMETRY',
    layerTag: 'STREAMING & EVENTS',
    tagline: 'WebSockets · STOMP Protocol · Consent-Based Geolocation',
    description:
      'Low-latency event distribution for dynamic physical environments. Delivers live crew location updates, instant inventory lock releases, and streaming system logs without polling overhead.',
    technicalDetails: [
      'STOMP over WebSockets for bi-directional event distribution',
      'Consent-based, production-scoped mobile geolocation feeds',
      'Optimistic concurrency checks on shared gear reservations',
      'Heartbeat monitoring and automated reconnection mechanics',
    ],
    guarantee: 'Low-Latency Stream & Concurrency Safety',
  },
  {
    id: 'desktop',
    number: '05',
    name: 'DESKTOP & OFFLINE RUNTIMES',
    layerTag: 'SYSTEM DELIVERY',
    tagline: 'Tauri 2 · Electron · Bundled Tesseract.js · Self-Contained Installers',
    description:
      'Native desktop environments built to run without cloud reliance. Overcomes packaged worker-path failures, bundles offline machine learning weights, and isolates sensitive operating workflows from the browser sandbox.',
    technicalDetails: [
      'Self-contained Windows MSI / NSIS packages with zero external dependencies',
      'Bundled Hindi and English language trained data for offline OCR',
      '30-minute cryptographic session grants with shoulder-privacy veils',
      'Direct OS file-system streaming for high-volume document batching',
    ],
    guarantee: '100% Offline Operation & Self-Contained',
  },
  {
    id: 'ui',
    number: '06',
    name: 'CLIENT UI & INTERACTION',
    layerTag: 'HUMAN INTERACTION',
    tagline: 'React 19/18 · Next.js · GSAP · Framer Motion · Lenis Inertia',
    description:
      'High-performance interfaces designed with editorial restraint. Direct-DOM transforms, zero-rerender pointer physics, and composable component hierarchies that communicate complex operational data clearly.',
    technicalDetails: [
      'Capability-aware inertia scrolling with 120 FPS native mobile pass-through',
      'MotionValue and RAF-batched transforms eliminating React state thrash',
      'Editorial quiet-luxury design system optimized for readability and calm',
      'Accessible focus rings, reduced-motion compliance, and semantic markup',
    ],
    guarantee: '60-120 FPS Compositor-Level Motion',
  },
]

export const DISCIPLINES_DATA: ServicePillar[] = [
  {
    number: '01',
    title: 'AI & AGENTIC ENGINEERING',
    subtitle: 'Governed Agents, RAG Pipelines & Semantic Reranking',
    description:
      'Designing intelligent reasoning systems that operate within deterministic software guardrails. Experience includes grounded retrieval, semantic reranking, prompt evaluation, and multi-agent coordination.',
    features: [
      '2-stage local semantic reranking with quantized embedding models',
      'Grounded RAG architecture backed by immutable historical evidence',
      'Deterministic policy governors that enforce blast-radius controls',
      'Model evaluation harnesses and automated benchmark validation',
      'Graceful fallbacks that keep core workflows operable offline',
    ],
    badge: 'Governed AI Architecture',
  },
  {
    number: '02',
    title: 'BACKEND & CONTROL PLANES',
    subtitle: 'Java 21, Spring Boot, Transactional Outbox & Security',
    description:
      'Building resilient server backends, asynchronous worker pools, and cryptographically verified webhook pipelines that remain rock-solid under network failures.',
    features: [
      'Java 21 / Spring Boot 3 enterprise application architectures',
      'Raw-byte HMAC signature verification on financial webhooks',
      'Transactional outbox pattern preventing dual-write inconsistencies',
      'Idempotent API execution with dedicated idempotency ledgers',
      'Flyway database migrations and Testcontainers integration suites',
    ],
    badge: 'Enterprise Backend',
  },
  {
    number: '03',
    title: 'DATA PLATFORMS & PERSISTENCE',
    subtitle: 'PostgreSQL, Force RLS, Double-Entry Ledgers & Schemas',
    description:
      'Relational modeling for mission-critical domain truths. Specializing in balanced double-entry accounting journals, strict tenant security, and graph traversal.',
    features: [
      'Double-entry balanced accounting (Assets, Liabilities, Equity, Revenue, Expense)',
      'PostgreSQL Row Level Security (FORCE RLS) for absolute multi-tenancy',
      'Deterministic graph traversal algorithms for change-impact analysis',
      'Schema evolution with zero-downtime database migrations',
      'Audit trails with cryptographic record chaining and verification',
    ],
    badge: 'Data Integrity',
  },
  {
    number: '04',
    title: 'OFFLINE & DESKTOP RUNTIMES',
    subtitle: 'Tauri 2, Electron, Local OCR & Self-Contained Delivery',
    description:
      'Shipping native desktop software for operational workers. Solving packaged worker-path failures, bundling offline ML engines, and eliminating internet dependencies.',
    features: [
      'Tauri 2 (Rust/Web) and Electron packaged native applications',
      '100% offline Tesseract.js OCR pipelines with bundled language models',
      'Self-contained installers eliminating Node.js and npm on client PCs',
      'High-throughput PDF and image preprocessing pipelines (Sharp, PDF.js)',
      'Native OS file-system streaming and review-ready Excel exports',
    ],
    badge: 'Forward-Deployed Desktop',
  },
  {
    number: '05',
    title: 'SYSTEM GRAPH & CHANGE INTELLIGENCE',
    subtitle: 'Dependency Traversal, Provenance & Code Impact',
    description:
      'Systems that understand software topology. Ingesting repository events, extracting code-level entities, building deterministic dependency graphs, and validating safety.',
    features: [
      'Provenance-aware GitHub webhook ingestion and event normalization',
      'Deterministic System Graph architecture scaling to 50k+ nodes',
      'Impact analysis algorithms tracing ripple effects of code changes',
      'Automated test suites validating 100% recall across thousands of edges',
      'Tamper-evident revision tracking with immutable source snapshots',
    ],
    badge: 'Change Intelligence',
  },
  {
    number: '06',
    title: 'CLIENT SYSTEMS & MOTION',
    subtitle: 'React, Next.js, Framer Motion, GSAP & Performance',
    description:
      'Crafting editorial web applications that feel tactile, physical, and expensive. Direct-DOM transforms and inertia physics that operate without unnecessary React re-renders.',
    features: [
      'High-end editorial design systems with quiet luxury aesthetics',
      'Zero-rerender pointer physics and GSAP ticker animation engines',
      'Capability-aware Lenis smooth scrolling with mobile pass-through',
      'Sticky stacked scaling case-study sheets and interactive rails',
      'Strict accessibility, responsive choreography, and reduced-motion support',
    ],
    badge: 'Precision Interaction',
  },
]

export const SYSTEM_CASE_STUDIES: SystemCaseStudy[] = [
  {
    number: '01',
    title: 'SA COMMAND',
    tag: 'ENTERPRISE OPERATIONS OS',
    subtitle: 'Unified operational infrastructure for SA Productions',
    technologies: ['Java 21', 'Spring Boot', 'PostgreSQL', 'React 19', 'Tauri 2', 'React Native', 'Docker'],
    problem:
      'Production operations were fractured across disconnected spreadsheets, unstructured WhatsApp call-sheets, personal paper ledgers, and verbal equipment commitments — causing scheduling collisions and lost financial context.',
    architecture:
      'Engineered an end-to-end platform connecting crew scheduling, double-entry accounting, GST billing, and Navigator real-time location tracking via WebSockets/STOMP. Packaged as a multi-platform Tauri desktop and mobile client.',
    governance:
      'Includes EVE, a fully offline local-AI core featuring 2-stage Qwen semantic reranking for instant context lookup, plus 30-minute cryptographic session grants ("shoulder-privacy veil") to safeguard sensitive commercial data.',
    benchmark:
      'Concurrency-safe equipment reservation engine with automated conflict prevention, audit trails, and double-entry financial reconciliation across production runs.',
    verificationBadge: 'Active Operations System',
    githubUrl: 'https://github.com/sufibuildwith-py/sa-controlcentre',
    specs: {
      runtime: 'Spring Boot 3 + Tauri 2 Desktop + React Native',
      verification: 'Double-entry finance · Concurrency-safe gear lock',
    },
  },
  {
    number: '02',
    title: 'SENTINEL',
    tag: 'GOVERNED REVENUE RECOVERY',
    subtitle: 'Governed multi-agent platform for payment failure recovery',
    technologies: ['Java 17', 'Spring Boot 3.3', 'PostgreSQL 16', 'Gemini RAG', 'Next.js', 'Razorpay Test Mode', 'Docker'],
    problem:
      'Payment failure clusters leak critical SaaS revenue. Unattended retries create duplicate charges and trigger chargeback penalties, while raw generative AI cannot be safely trusted with financial authority.',
    architecture:
      'Built a governed multi-agent architecture where Gemini agents investigate failure clusters using historical RAG evidence, while a deterministic policy engine enforces strict AUTO / HUMAN / DENY gates before any action.',
    governance:
      'Recovery Safety Governor independently evaluates blast radius and exposure. Implements idempotent Razorpay Test Mode execution, signed webhook verification, and provider reconciliation before attribution.',
    benchmark:
      'Validated against 10,000+ deterministic benchmark test cases across 29 failure categories; passed 8/8 safety gates with 0 unauthorized financial actions.',
    verificationBadge: '10,000+ Benchmarks · 8/8 Gates Passed',
    githubUrl: 'https://github.com/sufibuildwith-py/Sentinel',
    demoUrl: 'https://sentinelxops.vercel.app',
    specs: {
      runtime: 'Spring Boot 3.3 + Next.js + Razorpay Test Mode',
      verification: '10,000+ test cases · Signed webhook reconciliation',
    },
  },
  {
    number: '03',
    title: 'GUIDEIN',
    tag: 'CHANGE INTELLIGENCE CONTROL PLANE',
    subtitle: 'Evidence-governed control plane for software change safety',
    technologies: ['Java 21', 'Spring Boot', 'PostgreSQL 18 (Force RLS)', 'Flyway', 'OIDC/JWT', 'OpenTelemetry', 'GitHub API'],
    problem:
      'High-risk code changes ship without clear evidence of downstream impact. Teams lack deterministic visibility into what services, endpoints, or data models will break before deployment.',
    architecture:
      'Engineered a multi-tenant change intelligence control plane that ingests GitHub webhook events with raw-byte HMAC verification, stores durable delivery receipts, and processes tasks via a transactional outbox/jobs pattern.',
    governance:
      'Constructs a deterministic System Graph mapping changes to dependencies. Enforces strict tenant boundary isolation via PostgreSQL 18 Row Level Security (FORCE RLS) and tamper-evident audit logging.',
    benchmark:
      '189/189 test suite passed with 100% recall across 2,132 expected dependency edges (0 false trusted edges); validated graph scalability up to 50,000 nodes and 250,000 edges.',
    verificationBadge: '189/189 Tests · 100% Edge Recall',
    githubUrl: 'https://github.com/sufibuildwith-py/GuideIn',
    specs: {
      runtime: 'Java 21 / Spring Boot + PostgreSQL 18 FORCE RLS',
      verification: '50k nodes / 250k edges graph scale · Zero false edges',
    },
  },
  {
    number: '04',
    title: 'OFFLINE DOCUMENT ADVISOR',
    tag: 'FORWARD-DEPLOYED DESKTOP TOOLING',
    subtitle: 'Self-contained Indian identity OCR application for Ideal Web Solutions',
    technologies: ['Electron', 'TypeScript', 'Node.js', 'Tesseract.js', 'PDF.js', 'Sharp', 'ExcelJS'],
    problem:
      'Client employees manually verified thousands of identity documents (Aadhaar, PAN, Voter ID, Passport) sent over WhatsApp. Cloud OCR introduced severe latency, privacy concerns, and recurring API costs.',
    architecture:
      'Shipped a 100% offline Windows desktop application with bundled English and Hindi OCR models, automated PDF rendering, document-specific parsers, and machine-readable zone (MRZ) passport extraction.',
    governance:
      'Cross-verifies extracted fields, flags name and DOB mismatches, and outputs a review-ready Excel workflow. Overcame packaged-app worker-path failures to produce a self-contained installer requiring zero internet or Node.js setup.',
    benchmark:
      'Production deployed at Ideal Web Solutions; processed complex mixed documents locally with zero cloud API dependencies and zero client setup friction.',
    verificationBadge: 'Production Deployed · 100% Offline',
    githubUrl: 'https://github.com/sufibuildwith-py/OCR---Offline-Docs-Application',
    specs: {
      runtime: 'Electron + Tesseract.js (Bundled Eng/Hin) + Sharp',
      verification: 'Zero internet dependency · Self-contained installer',
    },
  },
]

export const TECH_ECOSYSTEM: TechItem[] = [
  { number: '01', name: 'Java 21 & Spring Boot 3', category: 'Backend Systems', role: 'Enterprise microservices, security, transactional outbox', badge: 'Core Language' },
  { number: '02', name: 'Python & AI Engineering', category: 'AI / Reasoning', role: 'LLMs, RAG, Qwen embeddings, semantic reranking, prompt evaluation', badge: 'AI Core' },
  { number: '03', name: 'PostgreSQL & Flyway', category: 'Persistence', role: 'Double-entry ledgers, row level security (Force RLS), schema migrations', badge: 'Database' },
  { number: '04', name: 'TypeScript & Node.js', category: 'Full-Stack', role: 'Full-stack applications, desktop workers, typed contracts, tooling', badge: 'Full-Stack' },
  { number: '05', name: 'Docker & Testcontainers', category: 'DevOps & Testing', role: 'Reproducible environments, isolated integration testing, multi-arch builds', badge: 'Infrastructure' },
  { number: '06', name: 'Tauri 2 & Electron', category: 'Desktop Runtimes', role: 'Cross-platform native applications, packaged offline AI, native IPC', badge: 'Desktop' },
  { number: '07', name: 'React 19 & Next.js 14', category: 'Client UI', role: 'High-performance interactive web systems, server components, motion', badge: 'Frontend' },
  { number: '08', name: 'C++ & Core CS', category: 'Systems Engineering', role: 'Data structures, algorithms, computer networks, systems programming', badge: 'Foundations' },
  { number: '09', name: 'WebSockets & STOMP', category: 'Streaming & Real-Time', role: 'Bi-directional messaging, consent-based telemetry, event streaming', badge: 'Networking' },
]

export const WORK_HISTORY: ExperienceItem[] = [
  {
    number: '01',
    role: 'Freelance Software Engineer',
    organization: 'SA Production',
    location: 'Varanasi, India',
    period: 'September 2026 — Present',
    stack: 'Java 21, Spring Boot, PostgreSQL, React, TypeScript, Tauri, React Native, Docker',
    summary:
      'Designed and built SA Command, an operations platform unifying people, productions, crew scheduling, double-entry finance, GST billing, and an offline local-AI core.',
    deliverables: [
      'Engineered the Spring Boot/PostgreSQL backend and React/Tauri desktop featuring shoulder-privacy veil access control (30m cryptographic session grants).',
      'Built EVE, an offline local-AI core featuring 2-stage Qwen semantic reranking and 2-phase governed execution.',
      'Built Navigator for consent-based real-time crew location tracking via WebSockets/STOMP, and Headquarters for concurrency-safe equipment reservations.',
    ],
    verifiedBadge: 'Production Operations Platform',
  },
  {
    number: '02',
    role: 'Backend Development Intern',
    organization: 'Ideal Web Solutions',
    location: 'Remote, India',
    period: 'August 2026 — Present',
    stack: 'Electron, TypeScript, Node.js, Tesseract.js, PDF.js, Sharp, ExcelJS',
    summary:
      'Shipped an offline Windows OCR application for Aadhaar, PAN, Voter ID and Passport documents received over WhatsApp.',
    deliverables: [
      'Built a fully offline OCR pipeline with bundled English/Hindi models, PDF pre-processing, document-specific parsers, and MRZ passport extraction.',
      'Implemented automated cross-verification of extracted fields, discrepancy detection, and review-ready Excel workflow exports.',
      'Resolved packaged-app worker-path failures to produce a self-contained installer, eliminating Node.js, npm, and internet dependencies on client PCs.',
    ],
    verifiedBadge: 'Production Desktop Application',
  },
  {
    number: '03',
    role: 'Freelance Web Developer',
    organization: 'Laptop Care',
    location: 'Kanpur & Prayagraj, India',
    period: 'October 2026 — Present',
    stack: 'React.js, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP, Lenis',
    summary:
      'Built and deployed a responsive, high-performance web application featuring 60-120 FPS compositor animations, interactive reels, and zero-rerender DOM physics.',
    deliverables: [
      'Engineered custom GSAP ticker and RAF direct-DOM physics engines for smooth infinite drag interactions without React state re-renders.',
      'Optimized asset delivery, capability-aware inertial scrolling, and responsive layouts across desktop and mobile devices.',
    ],
    verifiedBadge: 'Live Production Deployment',
  },
]
