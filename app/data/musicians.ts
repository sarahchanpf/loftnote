export type Review = {
  author: string;
  role: string;
  rating: number;
  text: string;
};

export type Musician = {
  id: string;
  name: string;
  tagline: string;
  city: string;
  genres: string[];
  eventTypes: string[];
  rate: number; // hourly USD
  rateUnit: "hour";
  rating: number;
  reviewsCount: number;
  initials: string;
  bg: string; // tailwind bg class — fallback while photo loads / on error
  fg: string;
  photo: string; // Unsplash URL
  bio: string;
  about: string;
  highlights: string[];
  setlist: string[];
  reviews: Review[];
};

// Unsplash photo URLs (faces, 800x800 cropped)
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=800&fit=crop&crop=faces&auto=format&q=80`;

const COLORS = [
  { bg: "bg-[var(--color-lavender)]", fg: "text-[var(--color-lavender-deep)]" },
  { bg: "bg-[var(--color-blush)]", fg: "text-[var(--color-blush-deep)]" },
  { bg: "bg-[var(--color-sage)]", fg: "text-[var(--color-sage-deep)]" },
  { bg: "bg-[var(--color-peach)]", fg: "text-[var(--color-peach-deep)]" },
  { bg: "bg-[var(--color-butter)]", fg: "text-[var(--color-butter-deep)]" },
];
const c = (i: number) => COLORS[i % COLORS.length];

const GENRE_TONES: Record<string, { bg: string; fg: string }> = {
  Jazz: { bg: "bg-[var(--color-lavender)]", fg: "text-[var(--color-lavender-deep)]" },
  Soul: { bg: "bg-[var(--color-blush)]", fg: "text-[var(--color-blush-deep)]" },
  Blues: { bg: "bg-[var(--color-peach)]", fg: "text-[var(--color-peach-deep)]" },
  "R&B": { bg: "bg-[var(--color-blush)]", fg: "text-[var(--color-blush-deep)]" },
  Pop: { bg: "bg-[var(--color-lavender)]", fg: "text-[var(--color-lavender-deep)]" },
  Acoustic: { bg: "bg-[var(--color-sage)]", fg: "text-[var(--color-sage-deep)]" },
  Folk: { bg: "bg-[var(--color-sage)]", fg: "text-[var(--color-sage-deep)]" },
  Classical: { bg: "bg-[var(--color-butter)]", fg: "text-[var(--color-butter-deep)]" },
  Latin: { bg: "bg-[var(--color-peach)]", fg: "text-[var(--color-peach-deep)]" },
};

export function genreTone(g: string): { bg: string; fg: string } {
  return GENRE_TONES[g] ?? { bg: "bg-[var(--color-cream)]", fg: "text-[var(--color-ink)]" };
}

export const musicians: Musician[] = [
  {
    id: "ava-lune",
    name: "Ava Lune",
    tagline: "Jazz vocalist & pianist who melts a room",
    city: "Brooklyn, NY",
    genres: ["Jazz", "Soul"],
    eventTypes: ["Restaurant", "Cocktail bar", "Wedding"],
    rate: 220,
    rateUnit: "hour",
    rating: 4.97,
    reviewsCount: 142,
    initials: "AL",
    photo: u("1494790108377-be9c29b29330"),
    ...c(0),
    bio: "Resident jazz voice at three of NYC's most beloved rooms.",
    about:
      "Ava Lune has been the resident voice at three of NYC's most beloved jazz rooms. Expect velvety standards, a Rhodes-leaning piano, and the kind of vibe that makes guests linger an extra hour.",
    highlights: ["Solo or trio", "Brings own keys & PA", "Will learn 1 song free"],
    setlist: [
      "Fly Me to the Moon",
      "At Last",
      "Feeling Good",
      "Sunday Kind of Love",
      "La Vie en Rose",
    ],
    reviews: [
      {
        author: "Maya R.",
        role: "Wedding planner • Tribeca",
        rating: 5,
        text: "Ava made the cocktail hour. Our guests are still texting us about her.",
      },
      {
        author: "The Velvet Room",
        role: "Cocktail bar • Brooklyn",
        rating: 5,
        text: "Books out our Fridays. Easy to work with, always on time, always magic.",
      },
    ],
  },
  {
    id: "marcus-bell",
    name: "Marcus Bell",
    tagline: "Soulful blues guitar & vocals from the South",
    city: "Nashville, TN",
    genres: ["Blues", "Soul"],
    eventTypes: ["Bar", "Brewery", "Restaurant"],
    rate: 185,
    rateUnit: "hour",
    rating: 4.92,
    reviewsCount: 118,
    initials: "MB",
    photo: u("1507003211169-0a1dd7228f2d"),
    ...c(1),
    bio: "Mississippi-born blues player, Nashville-honed performer.",
    about:
      "Marcus has been picking guitar since he was ten in Greenwood, MS. His solo blues sets bring an honest, growling sound that fills any room with grit and groove.",
    highlights: ["Solo electric blues", "Brings amp & loop pedal", "Originals + standards"],
    setlist: [
      "Hoochie Coochie Man",
      "The Thrill Is Gone",
      "Sweet Home Chicago",
      "Texas Flood",
      "Originals from his EP 'Backroads'",
    ],
    reviews: [
      {
        author: "Tin Roof",
        role: "Honky-tonk • Nashville",
        rating: 5,
        text: "Marcus is a Tuesday-night regular. Tourists ask if he's signed yet.",
      },
    ],
  },
  {
    id: "sofia-reyes",
    name: "Sofia Reyes",
    tagline: "Flamenco & Latin guitar for romantic nights",
    city: "Miami, FL",
    genres: ["Latin", "Acoustic"],
    eventTypes: ["Restaurant", "Hotel", "Private dinner"],
    rate: 200,
    rateUnit: "hour",
    rating: 4.91,
    reviewsCount: 96,
    initials: "SR",
    photo: u("1438761681033-6461ffad8d80"),
    ...c(2),
    bio: "Cuban-American flamenco guitarist, Miami-based.",
    about:
      "Trained in Seville, raised in Little Havana — Sofia weaves flamenco, bolero, and bossa nova into sets that feel like a warm patio in summer.",
    highlights: ["Solo classical guitar", "No power needed", "2-hour minimum"],
    setlist: [
      "Asturias — Albéniz",
      "Garota de Ipanema",
      "Bésame Mucho",
      "Entre Dos Aguas",
      "Concierto de Aranjuez",
    ],
    reviews: [
      {
        author: "Casa Tua",
        role: "Restaurant • Miami Beach",
        rating: 5,
        text: "Our dinner service is a different experience when Sofia is on.",
      },
    ],
  },
  {
    id: "jordan-patel",
    name: "Jordan Patel",
    tagline: "R&B vocalist with a butter-smooth top register",
    city: "Los Angeles, CA",
    genres: ["R&B", "Soul", "Pop"],
    eventTypes: ["Wedding", "Corporate", "Birthday"],
    rate: 260,
    rateUnit: "hour",
    rating: 4.94,
    reviewsCount: 87,
    initials: "JP",
    photo: u("1500648767791-00dcc994a43e"),
    ...c(3),
    bio: "Session vocalist for major labels, available for private events.",
    about:
      "Jordan has sung backup for Khalid, H.E.R., and Anderson .Paak. His private-event sets blend modern R&B with smooth covers from the 90s and 2000s.",
    highlights: ["Solo w/ tracks or band", "Custom song requests welcome", "Tux or streetwear vibe"],
    setlist: [
      "Adorn — Miguel",
      "Best Part — Daniel Caesar",
      "Lost Without U — Robin Thicke",
      "Pink + White — Frank Ocean",
      "Originals",
    ],
    reviews: [
      {
        author: "Skylight West",
        role: "Wedding venue • LA",
        rating: 5,
        text: "Jordan stops conversation when he opens his mouth. Pure butter.",
      },
    ],
  },
  {
    id: "eliana-rosen",
    name: "Eliana Rosen",
    tagline: "Concert violinist — weddings, ceremonies, galas",
    city: "New York, NY",
    genres: ["Classical"],
    eventTypes: ["Wedding", "Gala", "Corporate"],
    rate: 310,
    rateUnit: "hour",
    rating: 4.99,
    reviewsCount: 73,
    initials: "ER",
    photo: u("1517841905240-472988babdf9"),
    ...c(4),
    bio: "Juilliard-trained violinist, performs solo + in quartet.",
    about:
      "Eliana plays the ceremony like it's Carnegie Hall. Trained at Juilliard, she can also lead a string quartet for receptions and galas.",
    highlights: ["Solo violin", "Quartet add-on available", "Hundreds of arrangements"],
    setlist: [
      "Canon in D — Pachelbel",
      "Ave Maria — Schubert",
      "A Thousand Years (string ver.)",
      "Vivaldi — Spring",
      "Levitating (string quartet)",
    ],
    reviews: [
      {
        author: "The Plaza Hotel",
        role: "Wedding venue • NYC",
        rating: 5,
        text: "Our top-recommended ceremony musician. Elegance personified.",
      },
    ],
  },
  {
    id: "theo-nakashima",
    name: "Theo Nakashima",
    tagline: "Acoustic singer-songwriter, gentle and warm",
    city: "Austin, TX",
    genres: ["Acoustic", "Folk", "Pop"],
    eventTypes: ["Cafe", "Brewery", "Wedding"],
    rate: 170,
    rateUnit: "hour",
    rating: 4.86,
    reviewsCount: 64,
    initials: "TN",
    photo: u("1531123897727-8f129e1688ce"),
    ...c(0),
    bio: "Austin-based songwriter, easy room-filler.",
    about:
      "Theo's voice has the easy warmth of a Sunday morning. Perfect for cocktail hours, brunches, and ceremonies that need acoustic charm without taking over.",
    highlights: ["Solo acoustic", "Brings small PA", "Originals + tasteful covers"],
    setlist: [
      "Vienna — Billy Joel",
      "Make You Feel My Love",
      "Better Together — Jack Johnson",
      "The Night We Met",
      "Originals from 'Open Window'",
    ],
    reviews: [
      {
        author: "Hotel Magdalena",
        role: "Boutique hotel • Austin",
        rating: 5,
        text: "Theo plays our Sunday brunch — guests Shazam him constantly.",
      },
    ],
  },
  {
    id: "naomi-carter",
    name: "Naomi Carter",
    tagline: "Soul/gospel vocalist, raises any roof",
    city: "Chicago, IL",
    genres: ["Soul", "R&B", "Pop"],
    eventTypes: ["Wedding", "Gala", "Corporate"],
    rate: 245,
    rateUnit: "hour",
    rating: 4.95,
    reviewsCount: 109,
    initials: "NC",
    photo: u("1534528741775-53994a69daeb"),
    ...c(1),
    bio: "Chicago soul singer with full-band capability.",
    about:
      "Grew up in Chicago church choirs, now leads a 4-piece soul band that has played corporate events for Google, Nike, and Allstate. Bring tissues — first-dance specialist.",
    highlights: ["Solo w/ tracks, duo, or full band", "MC option available", "Soul + pop crossover"],
    setlist: [
      "At Last",
      "Lovely Day",
      "Ain't No Mountain High Enough",
      "Stand By Me",
      "Halo — Beyoncé",
    ],
    reviews: [
      {
        author: "The Langham",
        role: "Hotel ballroom • Chicago",
        rating: 5,
        text: "Naomi headlines our New Year's Eve every year. She's untouchable.",
      },
    ],
  },
  {
    id: "diego-martinez",
    name: "Diego Martinez",
    tagline: "Latin dance band — salsa, merengue, bachata",
    city: "Miami, FL",
    genres: ["Latin", "Pop"],
    eventTypes: ["Wedding", "Corporate", "Birthday"],
    rate: 380,
    rateUnit: "hour",
    rating: 4.93,
    reviewsCount: 81,
    initials: "DM",
    photo: u("1488161628813-04466f872be2"),
    ...c(2),
    bio: "5-piece Latin band that owns the dance floor.",
    about:
      "Diego leads a 5-piece Latin band (timbales, conga, bass, piano, vocals) that turns receptions into clubs. Quinceañeras, weddings, and bilingual MC service available.",
    highlights: ["5-piece band", "Bilingual MC", "Salsa lesson add-on"],
    setlist: [
      "Vivir Mi Vida — Marc Anthony",
      "La Bicicleta",
      "Pedro Navaja",
      "Suavemente",
      "Bailando — Enrique Iglesias",
    ],
    reviews: [
      {
        author: "Vizcaya Museum",
        role: "Wedding venue • Miami",
        rating: 5,
        text: "Diego turned a wedding into the best party we've thrown in 5 years.",
      },
    ],
  },
  {
    id: "wren-donovan",
    name: "Wren Donovan",
    tagline: "Folk/Americana duo with stunning harmonies",
    city: "Nashville, TN",
    genres: ["Folk", "Acoustic"],
    eventTypes: ["Wedding", "Cafe", "Brunch"],
    rate: 190,
    rateUnit: "hour",
    rating: 4.88,
    reviewsCount: 92,
    initials: "WD",
    photo: u("1573496359142-b8d87734a5a2"),
    ...c(3),
    bio: "Husband-and-wife folk duo from East Nashville.",
    about:
      "A guitar-and-mandolin husband-and-wife duo with three-part harmonies you'd swear come from four people. Fleetwood Mac to Phoebe Bridgers, plus their own tunes.",
    highlights: ["Acoustic duo", "300+ song catalogue", "Ceremony + cocktail combo"],
    setlist: [
      "Landslide",
      "The Night We Met",
      "Wagon Wheel",
      "Make You Feel My Love",
      "Vienna",
    ],
    reviews: [
      {
        author: "Sage & Stone Venue",
        role: "Wedding venue • Hudson Valley",
        rating: 5,
        text: "We recommend Wren to every couple. They never miss.",
      },
    ],
  },
  {
    id: "asha-williams",
    name: "Asha Williams",
    tagline: "Pop vocalist, top-40 specialist w/ live band",
    city: "Los Angeles, CA",
    genres: ["Pop", "R&B"],
    eventTypes: ["Wedding", "Birthday", "Corporate"],
    rate: 290,
    rateUnit: "hour",
    rating: 4.9,
    reviewsCount: 121,
    initials: "AW",
    photo: u("1463453091185-61582044d556"),
    ...c(4),
    bio: "LA pop vocalist, can lead band or sing solo w/ tracks.",
    about:
      "Asha is your modern wedding-band lead. Sweat-the-details setlists, choreo to match, and a band who can read a crowd and pivot mid-song.",
    highlights: ["Solo to 7-piece band", "Custom dance medleys", "Choreography option"],
    setlist: [
      "About Damn Time",
      "Cruel Summer",
      "Levitating",
      "Crazy in Love",
      "Don't Start Now",
    ],
    reviews: [
      {
        author: "Calamigos Ranch",
        role: "Wedding venue • Malibu",
        rating: 5,
        text: "Asha's band is the #1 reason guests stay until last call.",
      },
    ],
  },
  {
    id: "felix-brennan",
    name: "Felix Brennan",
    tagline: "Jazz saxophonist for cocktail hours & lounges",
    city: "New York, NY",
    genres: ["Jazz"],
    eventTypes: ["Cocktail bar", "Hotel", "Wedding"],
    rate: 230,
    rateUnit: "hour",
    rating: 4.96,
    reviewsCount: 134,
    initials: "FB",
    photo: u("1492562080023-ab3db95bfbce"),
    ...c(0),
    bio: "Tenor sax + occasional flute, NYC jazz scene veteran.",
    about:
      "Felix has been a fixture at Smalls, Mezzrow, and a half-dozen midtown hotel bars for over a decade. Solo or with a backing track — Miles, Coltrane, Stevie.",
    highlights: ["Solo sax w/ tracks", "Trio add-on", "Bar-friendly volume"],
    setlist: [
      "So What — Miles Davis",
      "My Favorite Things",
      "Take Five",
      "Cantaloupe Island",
      "Isn't She Lovely",
    ],
    reviews: [
      {
        author: "The Standard",
        role: "Hotel bar • NYC",
        rating: 5,
        text: "Felix is the sound of our lobby on Friday nights. Irreplaceable.",
      },
    ],
  },
  {
    id: "camille-okafor",
    name: "Camille Okafor",
    tagline: "Acoustic guitarist + soft vocals for events",
    city: "Brooklyn, NY",
    genres: ["Acoustic", "Folk", "Pop"],
    eventTypes: ["Cafe", "Wedding", "Brunch"],
    rate: 165,
    rateUnit: "hour",
    rating: 4.85,
    reviewsCount: 58,
    initials: "CO",
    photo: u("1488426862026-3ee34a7d66df"),
    ...c(1),
    bio: "Brooklyn-based acoustic player, gentle and reliable.",
    about:
      "Camille fingerpicks a nylon-string guitar and sings with a smoky, intimate voice. Perfect for ceremonies, brunches, and quiet cafés.",
    highlights: ["Solo acoustic", "Compact setup", "Brunch + ceremony combo"],
    setlist: [
      "Skinny Love",
      "Holocene",
      "Crazy on You",
      "Hallelujah",
      "Originals",
    ],
    reviews: [
      {
        author: "Sunday in Brooklyn",
        role: "Restaurant • Brooklyn",
        rating: 5,
        text: "Camille plays our Sunday brunch — bookings up 22% since she started.",
      },
    ],
  },
  {
    id: "otis-reed",
    name: "Otis Reed",
    tagline: "Blues harmonica & gravel-voice vocals",
    city: "Chicago, IL",
    genres: ["Blues"],
    eventTypes: ["Bar", "Brewery", "Festival"],
    rate: 175,
    rateUnit: "hour",
    rating: 4.89,
    reviewsCount: 71,
    initials: "OR",
    photo: u("1545167622-3a6ac756afa4"),
    ...c(2),
    bio: "South-Side Chicago bluesman, harmonica wizard.",
    about:
      "Otis grew up on Maxwell Street and learned harmonica from his uncle. His solo blues sets — voice, harp, and stomp box — are pure Chicago grit.",
    highlights: ["Solo blues", "Harmonica + stomp box", "Self-contained"],
    setlist: [
      "Hoochie Coochie Man",
      "Mannish Boy",
      "Got My Mojo Working",
      "Smokestack Lightnin'",
      "Originals",
    ],
    reviews: [
      {
        author: "Kingston Mines",
        role: "Blues club • Chicago",
        rating: 5,
        text: "Otis brings the South Side to whatever room he's in.",
      },
    ],
  },
  {
    id: "sienna-park",
    name: "Sienna Park",
    tagline: "Concert pianist — galas, hotels, events",
    city: "San Francisco, CA",
    genres: ["Classical", "Jazz"],
    eventTypes: ["Gala", "Hotel", "Corporate"],
    rate: 340,
    rateUnit: "hour",
    rating: 4.98,
    reviewsCount: 67,
    initials: "SP",
    photo: u("1521119989659-a83eee488004"),
    ...c(3),
    bio: "SF Conservatory grad, classical with jazz crossover.",
    about:
      "Sienna plays Chopin like it's Sunday morning and George Gershwin like it's last call. Built for hotel lobbies, galas, and ceremonies that want elegance with personality.",
    highlights: ["Solo piano", "Brings own keyboard if needed", "Classical + jazz repertoire"],
    setlist: [
      "Nocturne in E-flat — Chopin",
      "Clair de Lune",
      "Rhapsody in Blue (excerpts)",
      "Misty",
      "The Way You Look Tonight",
    ],
    reviews: [
      {
        author: "Fairmont Hotel",
        role: "Hotel lobby • SF",
        rating: 5,
        text: "Our guests routinely ask who's playing. She's a treasure.",
      },
    ],
  },
  {
    id: "jasper-wood",
    name: "Jasper Wood",
    tagline: "Folk fingerstyle guitarist, instrumental",
    city: "Austin, TX",
    genres: ["Folk", "Acoustic"],
    eventTypes: ["Wedding", "Cafe", "Hotel"],
    rate: 155,
    rateUnit: "hour",
    rating: 4.84,
    reviewsCount: 49,
    initials: "JW",
    photo: u("1502823403499-6ccfcf4fb453"),
    ...c(4),
    bio: "Instrumental folk fingerpicker, perfect for ambience.",
    about:
      "Jasper plays solo fingerstyle guitar — no vocals, just gorgeous instrumental folk that fills the room without competing with conversation.",
    highlights: ["Solo instrumental", "Compact, no PA needed for small rooms", "Background-friendly"],
    setlist: [
      "Blackbird — Beatles (instrumental)",
      "Tears in Heaven (instrumental)",
      "Classical Gas",
      "Originals",
    ],
    reviews: [
      {
        author: "South Congress Hotel",
        role: "Boutique hotel • Austin",
        rating: 5,
        text: "Jasper is our go-to for lobby afternoons. Guests love it.",
      },
    ],
  },
  {
    id: "lila-hayes",
    name: "Lila Hayes",
    tagline: "R&B band leader — full-production weddings",
    city: "Los Angeles, CA",
    genres: ["R&B", "Soul", "Pop"],
    eventTypes: ["Wedding", "Corporate", "Gala"],
    rate: 420,
    rateUnit: "hour",
    rating: 4.96,
    reviewsCount: 84,
    initials: "LH",
    photo: u("1519085360753-af0119f7cbe7"),
    ...c(0),
    bio: "8-piece R&B band, full production. Wedding specialists.",
    about:
      "Lila fronts an 8-piece band — full horns, two backup singers, full rhythm section. Their weddings have made multiple Brides Magazine 'best of' lists.",
    highlights: ["8-piece band", "Full horns", "Choreographed sets"],
    setlist: [
      "September — Earth, Wind & Fire",
      "Uptown Funk",
      "Superstition",
      "Get Lucky",
      "Crazy in Love",
    ],
    reviews: [
      {
        author: "Hummingbird Nest Ranch",
        role: "Wedding venue • Santa Susana",
        rating: 5,
        text: "Lila's band is the difference between a wedding and a party of the year.",
      },
    ],
  },
  {
    id: "khalil-ahmed",
    name: "Khalil Ahmed",
    tagline: "Jazz pianist for dinner & cocktail hour",
    city: "New York, NY",
    genres: ["Jazz"],
    eventTypes: ["Restaurant", "Cocktail bar", "Hotel"],
    rate: 250,
    rateUnit: "hour",
    rating: 4.93,
    reviewsCount: 99,
    initials: "KA",
    photo: u("1506794778202-cad84cf45f1d"),
    ...c(1),
    bio: "NYC jazz pianist, standards + modern jazz fluent.",
    about:
      "Khalil studied at the New School and gigs across NYC's jazz rooms. His solo piano sets — and trio when needed — bring quiet sophistication to any space.",
    highlights: ["Solo piano (Rhodes optional)", "Trio add-on", "Standards + modern jazz"],
    setlist: [
      "Stella by Starlight",
      "Autumn Leaves",
      "Nardis",
      "Body and Soul",
      "Originals",
    ],
    reviews: [
      {
        author: "The Carlyle",
        role: "Hotel lounge • NYC",
        rating: 5,
        text: "Khalil holds down our cocktail hour with effortless taste.",
      },
    ],
  },
  {
    id: "bea-chen",
    name: "Bea Chen",
    tagline: "Pop singer with loop pedal — one-woman band",
    city: "San Francisco, CA",
    genres: ["Pop", "Acoustic", "R&B"],
    eventTypes: ["Bar", "Brewery", "Birthday"],
    rate: 215,
    rateUnit: "hour",
    rating: 4.87,
    reviewsCount: 76,
    initials: "BC",
    photo: u("1539571696357-5a69c17a67c6"),
    ...c(2),
    bio: "Loop-pedal looper from the Bay, big sound, tiny footprint.",
    about:
      "Bea layers vocals, guitar, and beats live with a loop station. Sounds like a full band, fits in the corner of a small bar. Pop + indie crossover.",
    highlights: ["Solo (loop pedal)", "Brings own PA", "Originals + covers"],
    setlist: [
      "Sweater Weather",
      "Stay — Rihanna (loop ver.)",
      "Pink + White",
      "Originals from EP 'Smaller Hours'",
    ],
    reviews: [
      {
        author: "The Riddler",
        role: "Champagne bar • SF",
        rating: 5,
        text: "Bea is our most-rebooked artist. The loop sets are addictive.",
      },
    ],
  },
  {
    id: "hugo-fontaine",
    name: "Hugo Fontaine",
    tagline: "Classical string quartet leader, gala specialist",
    city: "Chicago, IL",
    genres: ["Classical", "Pop"],
    eventTypes: ["Gala", "Wedding", "Corporate"],
    rate: 580,
    rateUnit: "hour",
    rating: 4.99,
    reviewsCount: 52,
    initials: "HF",
    photo: u("1564564295391-7f24f26f568b"),
    ...c(3),
    bio: "Cellist leading a top-shelf Chicago string quartet.",
    about:
      "Hugo leads a four-piece string quartet that's done the Bridgerton-style pop covers thing better than most. Symphony chops, Spotify-ready arrangements.",
    highlights: ["4-piece quartet", "200+ song arrangements", "Custom requests welcome"],
    setlist: [
      "Canon in D",
      "Levitating (string ver.)",
      "Vivaldi — Spring",
      "Comptine d'un autre été",
      "Bittersweet Symphony",
    ],
    reviews: [
      {
        author: "The Field Museum",
        role: "Gala venue • Chicago",
        rating: 5,
        text: "Our top-recommended quartet. Black tie, every time.",
      },
    ],
  },
  {
    id: "maya-singh",
    name: "Maya Singh",
    tagline: "Bossa nova vocalist with Portuguese fluency",
    city: "Miami, FL",
    genres: ["Latin", "Jazz", "Acoustic"],
    eventTypes: ["Restaurant", "Hotel", "Wedding"],
    rate: 195,
    rateUnit: "hour",
    rating: 4.91,
    reviewsCount: 63,
    initials: "MS",
    photo: u("1493225457124-a3eb161ffa5f"),
    ...c(4),
    bio: "Bossa-nova-fluent vocalist, sings in PT, ES, EN.",
    about:
      "Maya grew up between São Paulo and Miami. Her bossa nova sets — voice + classical guitarist — are the soundtrack to a thousand sunset dinners.",
    highlights: ["Duo w/ guitarist", "Sings in EN/PT/ES", "Sunset-dinner perfect"],
    setlist: [
      "Garota de Ipanema",
      "Águas de Março",
      "Desafinado",
      "Mas Que Nada",
      "Corcovado",
    ],
    reviews: [
      {
        author: "1 Hotel South Beach",
        role: "Hotel rooftop • Miami",
        rating: 5,
        text: "Maya is sunset on our rooftop. Pure magic, every Friday.",
      },
    ],
  },
];

export const allGenres = Array.from(
  new Set(musicians.flatMap((m) => m.genres)),
).sort();

export const allEventTypes = Array.from(
  new Set(musicians.flatMap((m) => m.eventTypes)),
).sort();

export const allCities = Array.from(new Set(musicians.map((m) => m.city))).sort();

export function getMusician(id: string): Musician | undefined {
  return musicians.find((m) => m.id === id);
}

export function formatRate(m: Musician): string {
  return `$${m.rate.toLocaleString("en-US")}/hr`;
}
