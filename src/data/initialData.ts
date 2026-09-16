import { Project, ServiceItem, FAQItem } from '../types';

export const BUSINESS_INFO = {
  name: 'Ali Jan Traders & Interiors',
  tagline: 'Interior Design • Space Planning • Interior Solutions',
  category: 'Interior Designer',
  phone: '+92 321 4055675',
  phoneRaw: '+923214055675',
  whatsappUrl: 'https://wa.me/923214055675',
  address: 'ALI JAN TRADERS & Interior Design, Beadon Rd, Victoria Park Garhi Shahu, Lahore, 54000, Pakistan',
  city: 'Lahore, Pakistan',
  postalCode: '54000',
  area: 'Garhi Shahu / Beadon Road',
  workingHours: 'Monday – Saturday: 10:00 AM – 8:00 PM',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'residential-interiors',
    title: 'Residential Interiors',
    shortDesc: 'Living rooms, bedrooms, kitchens and complete home interiors tailored for modern living.',
    longDesc: 'Our residential interior design service turns houses into harmonious personal sanctuaries. We balance practical everyday movement with bespoke aesthetics, selecting durable finishes, custom millwork, and refined palettes that reflect your individual family lifestyle.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Home',
    keyFeatures: [
      'Comprehensive living room, bedroom, and kitchen planning',
      'Harmonized color schemes, lighting, and textures',
      'Bespoke cabinetry, wardrobe, and media unit layouts',
      'Flooring, ceiling, and ambient illumination coordination'
    ],
    suitableFor: [
      'Modern villas and townhouses in Lahore',
      'Apartments seeking maximum aesthetic spatial efficiency',
      'Homeowners undertaking comprehensive renovations'
    ]
  },
  {
    id: 'commercial-interiors',
    title: 'Commercial Interiors',
    shortDesc: 'Professional and functional environments for offices, businesses and commercial spaces.',
    longDesc: 'We craft commercial interiors that reinforce your enterprise identity while fostering productivity, collaboration, and client confidence. From executive boardrooms to retail boutiques, our spaces are designed with acoustic comfort and high-traffic durability in mind.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Building2',
    keyFeatures: [
      'Ergonomic workstation and meeting room layouts',
      'Brand-aligned reception areas and executive suites',
      'Commercial lighting, sound control, and durable flooring',
      'Zoned circulation paths for team productivity'
    ],
    suitableFor: [
      'Corporate headquarters, tech studios, and consulting offices',
      'Showrooms, retail shops, and commercial customer centers',
      'Medical and professional consultancy practices'
    ]
  },
  {
    id: 'interior-styling',
    title: 'Interior Styling',
    shortDesc: 'Furniture, colors, materials, lighting and decorative details curated with precision.',
    longDesc: 'The finishing layers define the soul of an interior. We curate furniture pieces, soft furnishings, textured textiles, artwork placement, and lighting fixtures to elevate existing architectural shells into magazine-grade spaces.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Palette',
    keyFeatures: [
      'Material curation: marble, wood veneer, brass accents, and fine textiles',
      'Layered lighting schemes (ambient, task, and architectural accent)',
      'Custom furniture sourcing and bespoke upholstery selection',
      'Art curation, botanical placement, and focal accessories'
    ],
    suitableFor: [
      'Spaces needing aesthetic transformation without structural demolition',
      'Newly constructed properties ready for interior furnishing',
      'Hospitality lounges and executive client spaces'
    ]
  },
  {
    id: 'space-planning',
    title: 'Space Planning',
    shortDesc: 'Smart layouts that maximize usability, flow, visual balance and natural lighting.',
    longDesc: 'Space planning is the fundamental backbone of our architectural interior approach. We analyze how people move, interact, and rest, reorganizing circulation paths to make even compact footprints feel expansive, logical, and serene.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Compass',
    keyFeatures: [
      'Detailed 2D floor plans with dimensional clearance checks',
      'Sightline optimization and natural daylight enhancement',
      'Zoning for privacy, public gathering, and storage efficiency',
      'Doorway, window, and partition realignment schematics'
    ],
    suitableFor: [
      'Pre-construction planning and architectural floor plan review',
      'Awkward or congested floor layouts requiring reorganization',
      'Multi-functional living-dining spaces and open-concept studios'
    ]
  },
  {
    id: 'wall-surface-design',
    title: 'Wall & Surface Design',
    shortDesc: 'Elegant wall treatments, textures, architectural panels and decorative finishes.',
    longDesc: 'Transform flat walls into striking architectural statements. We specialize in fluted timber cladding, acoustic panels, tactile plaster finishes, custom molding, and textured feature surfaces that bring depth and craftsmanship to your rooms.',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Layers',
    keyFeatures: [
      'Architectural wall paneling (fluted wood, CNC geometric, veneer)',
      'Textured micro-cement, Venetian plaster, and specialty lime wash',
      'Concealed ambient LED cove channels and shadow lines',
      'Custom stone, slate, and tile feature wall installations'
    ],
    suitableFor: [
      'Feature focal walls in formal living areas and reception lobbies',
      'Master bedroom bedhead backdrops and accent walls',
      'Dining rooms, executive offices, and hallway corridors'
    ]
  },
  {
    id: 'custom-interior-solutions',
    title: 'Custom Interior Solutions',
    shortDesc: 'Tailored solutions based on client requirements, space constraints and budget.',
    longDesc: 'Every project comes with unique structural conditions and personal aspirations. We provide custom-tailored interior engineering, bespoke built-ins, and flexible procurement packages that honor your timeline and budget parameters.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Sliders',
    keyFeatures: [
      'Custom carpentry and space-tailored storage joinery',
      'Material trade-off analysis matching target investment budgets',
      'Phased implementation options for staged interior investments',
      'Direct on-site supervision and material sourcing coordination'
    ],
    suitableFor: [
      'Non-standard room geometries requiring bespoke cabinetry',
      'Clients with specific aesthetic visions needing custom execution',
      'Cost-conscious homeowners desiring high-end architectural appeal'
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'gulberg-residence-living',
    title: 'The Linear Haven Residence',
    category: 'Living Room',
    description: 'An expansive open-concept living and dining lounge balancing warm walnut paneling with cool travertine stone and ambient architectural cove lighting.',
    concept: 'Harmonious fusion of modern Lahore architectural elegance with understated Scandinavian warmth.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Gulberg, Lahore (Concept)',
    designStyle: 'Contemporary Warm Minimalist',
    highlights: [
      'Custom floor-to-ceiling slatted wood divider with integrated brass reveal',
      'Recessed linear LED lighting creating glare-free ambient warmth',
      'Curated low-profile seating upholstered in tactile bouclé and linen',
      'Concealed media storage with bookmatched natural stone cladding'
    ],
    isDemo: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'dha-suite-master-bedroom',
    title: 'Serene Sanctuary Master Suite',
    category: 'Bedroom',
    description: 'A calming master bedroom suite designed with textured fluted wall paneling, integrated floating bedside tables, and layered soft illumination.',
    concept: 'A tranquil nocturnal sanctuary engineered for acoustic quiet and sensory restorative rest.',
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'DHA Phase 6, Lahore (Concept)',
    designStyle: 'Modern Architectural Serenity',
    highlights: [
      'Extended custom upholstered headboard running the full width of the room',
      'Acoustic felt and veneer wall composition behind sleeping zone',
      'Walk-through wardrobe with bronze-tinted glass and warm interior lighting',
      'Automated blackout drapery system recessed in ceiling pockets'
    ],
    isDemo: true,
    createdAt: '2026-02-01'
  },
  {
    id: 'commercial-corporate-hub',
    title: 'Apex Venture Corporate Office',
    category: 'Commercial',
    description: 'A sophisticated 2,400 sq.ft commercial office interior incorporating collaborative open benches, executive soundproof meeting suites, and brand reception.',
    concept: 'Fostering modern enterprise productivity through tactile materiality, glass zoning, and ergonomic circulation.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Mall Road, Lahore (Concept)',
    designStyle: 'Modern Industrial Corporate',
    highlights: [
      'Custom terrazzo reception desk with backlit bronze signage',
      'Double-glazed acoustic partitions preserving light while silencing speech',
      'Zoned collaborative lounge with durable high-abrasion upholstery',
      'Exposed services painted in charcoal with low-glare architectural pendants'
    ],
    isDemo: true,
    createdAt: '2026-02-18'
  },
  {
    id: 'model-town-villa-residence',
    title: 'Model Town Architectural Villa',
    category: 'Residential',
    description: 'Complete interior design transformation of a classic double-story family residence, optimizing airflow, natural illumination, and open social flow.',
    concept: 'Honoring traditional spatial courtyard qualities through sleek contemporary details.',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Model Town, Lahore (Concept)',
    designStyle: 'Transitional Modern',
    highlights: [
      'Double-height foyer featuring a sculptural suspended bronze light installation',
      'Seamless transition from informal family room to private veranda',
      'Custom oak kitchen cabinetry with engineered quartz island waterfall edges',
      'Integrated HVAC diffusers flush with custom plaster ceilings'
    ],
    isDemo: true,
    createdAt: '2026-03-05'
  },
  {
    id: 'wall-feature-fluted-timber',
    title: 'Monolithic Surface & Wall Gallery',
    category: 'Wall Design',
    description: 'Bespoke architectural wall surfaces combining fluted charcoal timber, micro-cement textures, and hidden warm perimeter illumination channels.',
    concept: 'Elevating planar vertical boundaries into kinetic textural sculptures.',
    images: [
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Cantt, Lahore (Concept)',
    designStyle: 'Architectural Surface Sculpting',
    highlights: [
      'Precision fluted oak ribs mounted on acoustic dampening underlayment',
      'Shadow-gap plinths and cornice lines with zero visible baseboards',
      'Hand-troweled Italian lime wash with natural organic mineral variations',
      'Hidden push-to-open door panels completely concealed within wall slats'
    ],
    isDemo: true,
    createdAt: '2026-03-12'
  },
  {
    id: 'modern-penthouse-interior',
    title: 'The Panorama Modern Penthouse',
    category: 'Modern',
    description: 'A crisp modern penthouse interior focusing on geometry, reflective glass, brushed brass trims, and floating furniture arrangements.',
    concept: 'Spatial weightlessness and panoramic vistas framed by disciplined geometry.',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Bahria Town, Lahore (Concept)',
    designStyle: 'Modern Luxury Minimalist',
    highlights: [
      'Full-height architectural pivot door with solid brass push bar',
      'Cantilevered marble fireplace unit separating dining and formal salon',
      'Curated sculptural lighting from minimalist European collections',
      'Reflective dark glass shelving display with dimmable shelf edge lighting'
    ],
    isDemo: true,
    createdAt: '2026-03-14'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'What interior design services do you provide?',
    answer: 'Ali Jan Traders & Interiors provides end-to-end interior design services including Residential Interior Design, Commercial & Office Interiors, Architectural Space Planning, Interior Styling & Material Curation, Wall & Surface Treatments (panels, textures, custom finishes), and Custom Tailored Interior Solutions.'
  },
  {
    question: 'Do you work on residential interiors?',
    answer: 'Yes. Residential design is one of our primary specializations. We work on living rooms, master bedrooms, dining areas, kitchens, bathrooms, and complete villa or apartment renovations across Lahore.'
  },
  {
    question: 'Do you handle commercial interior projects?',
    answer: 'Yes. We design functional and professional commercial environments for corporate offices, executive suites, retail outlets, showrooms, and customer consultation spaces that combine corporate branding with ergonomic comfort.'
  },
  {
    question: 'Can designs be customized according to budget?',
    answer: 'Absolutely. We believe great design stems from thoughtful spatial composition, color harmony, and intelligent material selection rather than unnecessary extravagance. We work closely with clients to specify finishes, joinery, and furnishings aligned with their defined budget parameters.'
  },
  {
    question: 'How can I request a consultation?',
    answer: 'You can easily request a consultation by completing our online consultation request form on the Contact page, calling us directly at +92 321 4055675, or messaging our design team via WhatsApp.'
  },
  {
    question: 'How can I contact Ali Jan Traders & Interiors?',
    answer: 'You can reach us by phone at +92 321 4055675, via WhatsApp at +92 321 4055675, or by visiting our office on Beadon Road, Victoria Park Garhi Shahu, Lahore.'
  },
  {
    question: 'Where are you located?',
    answer: 'Our studio is located at: ALI JAN TRADERS & Interior Design, Beadon Rd, Victoria Park Garhi Shahu, Lahore, 54000, Pakistan. You are welcome to schedule an appointment to discuss your project.'
  }
];
