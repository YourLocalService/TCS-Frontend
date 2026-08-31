export type ServicePageData = {
  slug: string;
  metaTitle: string;
  h1: string;
  subtitle: string;
  ctaLabel: string;
  intro: { heading?: string; body: string; image?: string }[];
  bullets?: { heading: string; items: string[]; images?: string[] };
  closing?: string;
};

export const serviceContent: Record<string, ServicePageData> = {
  mounting: {
    slug: "mounting",
    metaTitle: "Installation of Asphalt Shingles and Professional Roofing Services with Warranty",
    h1: "Installation of Asphalt Shingles and Professional Roofing Services with Warranty",
    subtitle: "Trust us with your roof and ensure reliable protection for your home.",
    ctaLabel: "Get a Free Consultation",
    intro: [
      {
        heading: "Craftsmanship and Reliability",
        body: "The professionalism of our specialists and their knowledge of various types of soft roof installation technologies allow us to hold leading positions in the market of roofing and installation works in Canada. We take pride in offering high-quality turnkey installation services for various configurations of soft roofs.",
        image: "/images/mounting-row-1.png",
      },
      {
        body: "Our advantages include:\n• Highly skilled specialists whose professional expertise is confirmed by years of experience and successful projects.\n• Deep knowledge of soft roof installation technologies, including various materials and configurations.\n• Utilization of advanced technologies and innovative approaches to ensure the durability and aesthetic appeal of roofing materials.\n• Thorough quality control at every stage of the roof installation process.\nOur goal is to provide high quality and long-lasting results.",
        image: "/images/mounting-row-2.png",
      },
      {
        heading: "Wide Range of Services",
        body: "TCS Company offers a complete range of services for the installation of asphalt shingles and roofing. Regardless of the size or complexity of the project, our team is ready to take on the task. We perform installation of new roofs, repair and restoration of existing roofs, replacement of damaged elements, and other types of work.\nOur team specializes in the following services:\n• Installation of asphalt shingles\n• Roofing installation\n• Roof repair and restoration\n• Replacement of damaged elements\n• Gutters and drainage systems\nWe are ready to offer individual solutions that meet your needs and budget.",
        image: "/images/mounting-row-3.png",
      },
      {
        heading: "Professional Team",
        body: "Our team consists of experienced and qualified specialists in the installation of asphalt shingles and roofing works. We carefully select our employees to ensure a high level of professionalism and quality in every project. We provide transparency and communication at every stage of the work so that you are informed about the process and confident in the outcome.",
      },
    ],
    bullets: {
      heading: "Types of roofing work",
      items: [
        "Bituminous tiles (shingles)",
        "Built-up roof (flat rufen)",
        "Metal roofing",
        "Roof with professional sheet",
        "Liquid rubber",
        "Membrane roofing",
      ],
      images: [
        "/images/mounting-gal-106.png",
        "/images/mounting-gal-107.png",
        "/images/mounting-gal-108.png",
        "/images/mounting-gal-109.png",
        "/images/mounting-gal-110.png",
        "/images/mounting-gal-111.png",
      ],
    },
  },
  thermal: {
    slug: "thermal",
    metaTitle: "Thermal Imaging Inspection",
    h1: "Thermal Imaging Inspection",
    subtitle: "Ensure Thermal Insulation of Your Premises with Thermal Imaging Inspection",
    ctaLabel: "Get a Free Consultation",
    intro: [
      {
        heading: "Types of Thermal Imaging Services",
        body: "TCS offers a wide range of thermal imaging inspection services, including:\n• Building and Structure Thermal Scanning\n• Detection of Heat Leaks and Thermal Loss\n• Identification of Hidden Defects in Electrical Systems and Wiring\n• Roof Inspection for Leaks and Defects\n• Heating and Ventilation System Diagnostics\n• Assessment of Insulation Efficiency and Air Tightness",
        image: "/images/thermal-row-1.png",
      },
      {
        body: "Advantages of Thermal Imaging Inspection\n• Heat Leak Detection: Thermal imaging inspection accurately identifies areas of heat leaks in your property, helping to reduce energy consumption and save on heating costs.\n• Identification of Hidden Defects: With the use of thermal cameras, we can detect hidden defects in building structures, electrical systems, and pipelines, preventing potential issues and enhancing the safety of your property.\n• Optimization of Energy Efficiency: After a thermal imaging inspection, we provide recommendations for improving the energy efficiency of your property, reducing energy expenses, and making your property more environmentally sustainable.\n• Quality Assurance of Repairs: Thermal imaging diagnostics allows you to assess the quality of repairs, identify potential deficiencies, and ensure the correctness and reliability of the performed changes.",
        image: "/images/thermal-row-2.png",
      },
      {
        heading: "Thermal Imaging Inspection: Professional and Reliable Solution for Your Property",
        body: "Looking for a reliable company to conduct thermal imaging inspection for your property? The TCS team offers quality thermal imaging inspection services in Canada. We have experience and knowledge in this field, utilizing advanced equipment and technologies to ensure accuracy and reliability of results.",
        image: "/images/thermal-row-3.png",
      },
      {
        heading: "Benefits of working with TCS:",
        body: "Professional Approach: Our specialists individually approach each project, considering all the specifics, conducting thorough data analysis, and providing comprehensive assessments of the property's condition.\nHigh Quality and Reliability: Our modern equipment allows for precise and detailed data collection.\nClear Results: We provide clear and visual reports on the conducted inspections. You will easily interpret the results and take measures to optimize the energy efficiency of your property.\nCustomized Approach: We consider your needs and goals, offering the best solutions. We are ready to answer all your questions and develop a customized action plan to enhance the energy efficiency of your property.",
        image: "/images/thermal-row-4.png",
      },
    ],
    bullets: {
      heading: "What defects can be detected with a thermal imager?",
      items: [
        "Air leak",
        "Fungus and mold",
        "Condensate",
        "Locking the corners of the house",
        "Blocking the walls of the house",
        "Foundation locking",
        "Baseman Castle",
        "Leaking pipes in the house",
        "Heating of electric machines",
      ],
      images: [
        "/images/thermal-gal-1.png",
        "/images/thermal-gal-5.png",
        "/images/thermal-gal-9.png",
        "/images/thermal-gal-13.png",
        "/images/thermal-gal-17.png",
        "/images/thermal-gal-21.png",
        "/images/thermal-gal-25.png",
        "/images/thermal-gal-29.png",
        "/images/thermal-gal-33.png",
      ],
    },
  },
  "hydro-isolation": {
    slug: "hydro-isolation",
    metaTitle: "Waterproofing Works for Reliable Protection of Your Structure",
    h1: "Waterproofing Works for Reliable Protection of Your Structure",
    subtitle: "Guaranteed Safety and Durability",
    ctaLabel: "Request Free Consultation",
    intro: [
      {
        heading: "Waterproofing Works: Protecting Your Structure from Moisture",
        body: "At every stage of construction or renovation, waterproofing works are carried out to achieve one goal - protecting the structure from the negative effects of moisture, whether it's from the soil or the atmosphere. This protection can be achieved through various methods and the use of different materials.\n\"TCS\" is an experienced provider of waterproofing works for projects in Canada, the United States, and Ukraine. We employ modern technologies and have highly skilled personnel, enabling us to effectively carry out moisture protection treatments even in the most challenging conditions.",
        image: "/images/hydro-isolation-row-1.png",
      },
      {
        heading: "Waterproofing Methods: Reliable Technologies for Moisture Protection",
        body: "• Penetrating Waterproofing: Deep penetration of solutions with a special composition into the structure of concrete, providing crystallization upon contact with moisture and strengthening of the concrete. It is applied to foundations, floor slabs, walls, and other concrete structures.\n• Installation of Rolled Materials: A two-layer technology for creating a strong and waterproof barrier. It is used for foundations, basement walls, podiums, and flat roofs. Profiled membranes can be installed for additional protection of the foundation waterproofing layer.\n• Coating Materials: Creating a continuous waterproof layer used on curved surfaces.\n• Cementitious Compounds: Used in the construction of floors and protection of vertical surfaces. They form a seamless waterproof barrier.",
        image: "/images/hydro-isolation-row-2.png",
      },
      {
        heading: "Advantages of Our Waterproofing Works",
        body: "1. Reliable Protection: We provide high-quality waterproofing that effectively protects your structure from moisture and leaks, preventing damage and material decay.\n2. Professional Execution: Our experienced specialists possess deep knowledge and expertise in waterproofing. We guarantee the execution of works with the use of advanced technologies and materials.\n3. Individual Approach: We take into account the specific requirements of each project and develop customized solutions to ensure optimal waterproofing for your structure, considering its design, materials, and unique characteristics.\n4. Durability: Our waterproofing provides long-lasting protection for your structure, minimizing the need for repairs and replacements in the future.\n5. Affordable Cost: We offer competitive prices.",
        image: "/images/hydro-isolation-row-3.png",
      },
    ],
    bullets: {
      heading: "Waterproofing works",
      items: [
        "Torch-on roofing (flat roofing)",
        "Installation of corners and joints using torch-on materials",
        "Liquid rubber  2-component",
        "Brush-on waterproofing",
        "Waterproofing with high-pressure equipment",
        "Membrane installation",
      ],
      images: [
        "/images/hydro-isolation-gal-1.png",
        "/images/hydro-isolation-gal-5.png",
        "/images/hydro-isolation-gal-9.png",
        "/images/hydro-isolation-gal-13.png",
        "/images/hydro-isolation-gal-17.png",
        "/images/hydro-isolation-gal-21.png",
      ],
    },
  },
  remont: {
    slug: "remont",
    metaTitle: "Construction from concept to reality: all-inclusive services",
    h1: "Construction from concept to reality: all-inclusive services",
    subtitle: "Professional services for construction of any complexity",
    ctaLabel: "Get a Free Consultation",
    intro: [
      {
        body: "Construction is one of the core activities of \"TCS\" company. We offer comprehensive solutions for various types of construction works, including organizational, design, construction and installation, commissioning, and repair works. Each project is unique, so before starting the tasks, our team thoroughly analyzes all the nuances, taking into account the specific project requirements.",
        image: "/images/remont-row-1.png",
      },
      {
        heading: "General construction works:\n a full range of services",
        body: "Our team of specialists has experience and knowledge in all aspects of general construction processes. We carry out construction, finishing, engineering design, earthworks, transportation, and installation of structures.",
        image: "/images/remont-row-2.png",
      },
      {
        heading: "Transparent prices for general construction works",
        body: "We offer competitive prices for general construction works. The cost depends on the project type, complexity, materials used, and duration of the works. For accurate pricing information, please contact us for individual consultation and a commercial proposal. We guarantee transparency and the alignment of prices with the quality of our services.",
        image: "/images/remont-row-3.png",
      },
    ],
    bullets: {
      heading: "Types of civil works",
      items: [
        "Drywall device",
        "Tile device",
        "Dismantling works",
        "Paintwork",
        "Wall putty",
        "Installation of window doors",
        "Installing Laminate Parquet",
        "Professional work on all types of wallpapering",
        "Installation of decorative stone",
        "Installation of plinths (boards) walls ceilings",
        "Kitchen installation",
      ],
      images: [
        "/images/remont-gal-1.png",
        "/images/remont-gal-5.png",
        "/images/remont-gal-9.png",
        "/images/remont-gal-13.png",
        "/images/remont-gal-17.png",
        "/images/remont-gal-21.png",
        "/images/remont-gal-25.png",
        "/images/remont-gal-29.png",
        "/images/remont-gal-37.png",
        "/images/remont-gal-41.png",
        "/images/remont-gal-45.png",
      ],
    },
  },
  dismantling: {
    slug: "dismantling",
    metaTitle: "Dismantling works of any complexity",
    h1: "Building Demolition Project Planning",
    subtitle: "Professional Planning and Development",
    ctaLabel: "Get a Free Consultation",
    intro: [
      {
        heading: "We Handle the Full Process of Planning and Development for Building Demolition Projects.",
        body: "TCS experts in demolition works carefully analyze every aspect of your project, starting from assessing the overall condition of the building to determining the most efficient and safe demolition methods. Our approach includes thorough site inspections, technical specifications, planning the sequence of demolition works, and assessing potential risks.",
        image: "/images/dismantling-row-1.png",
      },
      {
        heading: "Services",
        body: "We consider various factors such as structural integrity, presence of hazardous materials, environmental impact, as well as requirements and regulations to develop an optimal demolition plan. Our team will provide you with a clear and detailed action plan, including timelines, resources, and budget estimates. We guarantee that your demolition project will be carried out efficiently, safely, and to high-quality standards.",
        image: "/images/dismantling-row-2.png",
      },
    ],
    bullets: {
      heading: "Our advantages",
      items: [
        "Years of experience in demolition works",
        "Qualified staff and professional equipment",
        "Strict adherence to safety and deadlines",
        "Guaranteed quality of work",
      ],
    },
  },
  "landscaping-and-interlocking": {
    slug: "landscaping-and-interlocking",
    metaTitle: "Landscaping and interlocking",
    h1: "Landscaping and Interlocking Services",
    subtitle:
      "A beautiful and functional landscape with minimal hassle, thanks to our comprehensive and professional landscaping services",
    ctaLabel: "Get a Free Consultation",
    intro: [
      {
        heading: "Create the landscape of your dreams",
        body: "Create the Landscape of Your Dreams Transform your outdoor space with our landscaping services. The TCS expert team will help you create a unique and attractive garden that reflects your style and preferences. We offer various types of landscaping, including:\n• Flowerbed and border formation\n• Greening plans development\n• Creation of rock gardens and rockeries\n• Installation of water features: fountains, ponds, waterfalls",
        image: "/images/landscaping-and-interlocking-row-1.png",
      },
      {
        heading: "Interlocking Installation - Modern and Reliable Solution for Landscape Design",
        body: "Looking to create beautiful patios, walkways, and terraces on your property? \nWe provide professional interlocking installation services. The benefits of interlocking include its durability, load-bearing capacity, longevity, and aesthetic appeal. \nWe offer the following types of interlocking:\n• Classic interlocking\n• Patterned interlocking\n• Modular interlocking \nBy choosing our services, you'll receive professional interlocking installation \nand a guarantee of quality workmanship.",
        image: "/images/landscaping-and-interlocking-row-2.png",
      },
      {
        heading: "Landscape Maintenance and Care",
        body: "We offer comprehensive services for the maintenance and care of your landscape. Our company provides lawn mowing, plant trimming, and flowerbed maintenance. We ensure regular watering and fertilization of plants to keep your garden healthy and beautiful. Entrust us with the care of your outdoor space.",
        image: "/images/landscaping-and-interlocking-row-3.png",
      },
      {
        heading: "Interlocking Repair and Renovation",
        body: "If you need interlocking repair or renovation, our specialists are ready to assist you. We professionally restore damaged areas or offer options for its renovation.",
        image: "/images/landscaping-and-interlocking-row-4.png",
      },
    ],
  },
  deck: {
    slug: "deck",
    metaTitle: "Trusted Local Deck and Fence Builder with 25 Years of Experience",
    h1: "Trusted Local Deck and Fence Builder with 25 Years of Experience",
    subtitle: "Creating Beautiful Outdoor Spaces for Residential and Commercial Properties",
    ctaLabel: "Request Free Consultation",
    intro: [
      {
        heading: "Building Quality Decks and Fences with Years of Expertise",
        body: "The TCS team in Toronto has 25 years of experience in constructing high-quality fences, decks, and gates of various sizes, styles, and configurations. We know what works and have developed construction processes and installation methods to ensure the highest level of quality and durability for each project. Our professional employees take their work seriously and share our passion for excellence. We are always ready to provide expert advice on available materials and design options to help you plan a project that exceeds your expectations.",
        image: "/images/deck-row-1.jpg",
      },
      {
        heading: "Why Choose Our Decks & Fences Services?",
        body: "Experience and Professionalism: With our 25 years of expertise in construction, we are a trusted partner for building high-quality decks and fences. We know how to execute projects of any complexity and ensure their longevity.\nPersonalized Approach: We always listen to your needs and offer customized solutions that fit your preferences and budget. Our team takes into account every detail to create unique and functional decks and fences that meet your requirements.\nQuality Materials: We work only with reliable material suppliers, guaranteeing the quality and durability of every project. We offer a variety of materials for you to choose from, ensuring the optimal solution that matches your taste and preferences.",
        image: "/images/deck-row-2.png",
      },
      {
        heading: "Our Decks & Fences Services Include:",
        body: "1. Design and Planning: Our team of experts will help you plan and create the perfect deck or fence, considering your needs and preferences.\n2. Installation and Construction: We provide quality installation of decks and fences, adhering to strict standards and utilizing advanced technologies.\n3. Maintenance and Repairs: We offer comprehensive maintenance and repair services for decks and fences to keep them in optimal condition throughout their lifespan.\n4. Additional Options: We provide various additional options such as lighting, pergolas, railings, and more to add functionality and style to your deck or fence.\n5. Quality Guarantee: We stand behind the quality of our services and materials, ensuring that you receive a reliable and long-lasting deck or fence that will serve you for many years.",
        image: "/images/deck-row-3.png",
      },
    ],
    bullets: {
      heading: "Our decks & fences services include",
      items: [
        "Design and planning",
        "Installation and construction",
        "Maintenance and repairs",
        "Additional options: lighting, pergolas, railings",
        "Quality guarantee on materials and workmanship",
      ],
    },
  },
  walls: {
    slug: "walls",
    metaTitle: "Construction of Reliable Retaining Walls for Your Property",
    h1: "Construction of Reliable Retaining Walls for Your Property",
    subtitle: "Strength and Aesthetics in Every Project",
    ctaLabel: "Request Free Consultation",
    intro: [
      {
        heading: "Reliable Retaining Walls for Your Property",
        body: "We specialize in constructing high-quality retaining walls, providing you with reliable and aesthetically appealing solutions for your property. Regardless of the size or complexity of the project, our team has the experience and expertise to create retaining walls that will last for years to come. We take pride in our reputation as a trustworthy and professional construction contractor, especially in the field of retaining walls. Our team of skilled specialists possesses deep knowledge and skills in the design and construction of various types and configurations of retaining walls.",
        image: "/images/walls-row-1.jpg",
      },
      {
        heading: "Why Choose Our Retaining Wall Services?",
        body: "Rich Experience: We have years of experience in constructing retaining walls, working with clients of different scales and requirements.\nProfessional Team: Our specialists have expertise in designing, constructing, and installing retaining walls, ensuring a high level of workmanship.\nQuality Materials: We only use tested, high-quality materials, ensuring the strength and durability of each retaining wall.\nIndividual Approach: We listen to your needs and provide customized solutions that match the specific characteristics of your property.",
        image: "/images/walls-row-2.png",
      },
      {
        heading: "Our Retaining Wall Services Include:",
        body: "1. Design and planning of retaining walls according to your requirements and preferences.\n2. Construction of different types of retaining walls, including gravity walls, cantilever walls, and segmental walls.\n3. Installation of drainage systems to ensure longevity and protection against moisture.\n4. Application of quality materials and the use of advanced construction technologies for retaining walls.",
        image: "/images/walls-row-3.png",
      },
    ],
    bullets: {
      heading: "Our retaining wall services include",
      items: [
        "Design and planning to your requirements",
        "Gravity, cantilever, and segmental retaining walls",
        "Installation of drainage systems",
        "Advanced construction technologies and quality materials",
      ],
    },
  },
  gazebo: {
    slug: "gazebo",
    metaTitle: "Custom-designed gazebos by professionals for your relaxation",
    h1: "Gazebos for Your Backyard",
    subtitle: "Custom-designed gazebos by professionals for your relaxation",
    ctaLabel: "Request Free Consultation",
    intro: [
      {
        heading: "Gazebos for Your Backyard",
        body: "Transform your backyard into the oasis you've always dreamed of. TCS offers custom-made gazebos for backyards. Whether you're looking for a quiet spot to read a book, entertain guests, or simply enjoy the fresh air, our gazebos will be the perfect addition to your backyard.\nWe create gazebos for backyards using premium materials, ensuring strength and durability. We carefully consider every detail, from the frames to the canopies, to provide our clients with the best solutions. Our company is ready to bring any of your ideas to life, creating unique gazebos that fully cater to your needs and preferences. Choose us to get the most suitable gazebo for your backyard!",
        image: "/images/gazebo-row-1.jpg",
      },
      {
        heading: "Benefits of Having a Gazebo in Your Yard",
        body: "Terraces and patios are wonderful additions to any yard. However, gazebos have their own unique features that make them valuable investments for homeowners. They help save money over time, enhance the functionality of your yard, and add overall beauty to it.\nBoth adults and children enjoy spending time in gazebos. They create a cozy atmosphere for romantic moments, parties, and family gatherings with friends. Here are a few amazing ways to use our gazebos:\nUnique party venue: becomes a splendid centerpiece for outdoor gatherings.\nCost-saving: no need to rent a canopy for special events.Kids' play area: provide them with a safe and comfortable space for play in a shaded area.\nGames: enjoy games with family and guests in the shade of the gazebo. \nSpecial occasions: create the perfect setting for weddings, receptions, and other outdoor events.\nBuilt-in shade: the presence of a roof protects you and your family from the sun or rain.",
        image: "/images/gazebo-row-2.png",
      },
      {
        heading: "Why Choose Us to Create Your Perfect Gazebo?",
        body: "Experience and professionalism: We are professionals in the field of custom gazebo design and fabrication. Our extensive experience and knowledge enable us to create unique and functional gazebos that fully meet your requirements.\nPremium materials: We only use high-quality materials when creating our gazebos. This ensures strength, durability, and resistance to various weather conditions, allowing you to enjoy your gazebo for many years.\nPersonalized approach: We value the uniqueness of each client and their needs. We carefully listen to your preferences and provide you with a personalized solution that perfectly suits your backyard. Your gazebo will reflect your style and blend in with the surrounding environment.\nQuality guarantee: We are confident in the quality of our gazebos and provide a warranty on the workmanship. This gives you additional peace of mind and assurance of the long-term reliability of your gazebo.",
        image: "/images/gazebo-row-3.png",
      },
    ],
    bullets: {
      heading: "Types of gazebo projects:",
      items: [
        "Wooden gazebo",
        "Metal gazebo",
        "Stone gazebo",
      ],
      images: [
        "/images/gazebo-gal-1.png",
        "/images/gazebo-gal-5.png",
        "/images/gazebo-gal-9.png",
      ],
    },
  },
  side: {
    slug: "side",
    metaTitle: "Facing Houses and Cottages with Siding",
    h1: "Facing houses and cottages with siding",
    subtitle:
      "Insulated, decorative and ventilated facades in vinyl, acrylic, ceramic, fibre cement and metal siding",
    ctaLabel: "Submit Your Application",
    intro: [
      {
        heading: "Siding",
        body: "For every homeowner, it is important that his house is not only solid, but also looks presentable. Sheathing the house with siding, which is designed for finishing the plinths and facades of buildings, will help to translate what you want into reality. This material serves simultaneously as an exterior finish and for protecting the walls of structures. When placing an order for house siding with us, you are guaranteed to receive high-quality work performed in the shortest possible time. We will help turn your wishes into reality. Upon completion of the work, your house will not only look attractive, but at the same time will be reliably protected from external adverse influences for a long period.\nWhen starting to order siding, our experienced craftsmen, after examining the object, will be able to take into account all the nuances and find the best solutions to decorate and protect the walls of your house. The order will be completed on time, even if there may be any difficulties in the process of work.",
        image: "/images/side-row-1.png",
      },
    ],
    bullets: {
      heading: "Siding materials we work with",
      items: [
        "Vinyl siding",
        "Acrylic siding",
        "Ceramic siding",
        "Fibre cement siding",
        "Metal siding",
        "Ventilated facade systems",
      ],
    },
  },
};
