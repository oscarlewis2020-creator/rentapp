export interface Building {
  id: string;
  name: string;
  email: string;
  location: string;
  type: string;
  unitsAvailable: number;
  phone: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  amenities: string[];
}

export const MOCK_BUILDINGS: Building[] = [
  {
    id: "1",
    name: "Blue Gate",
    email: "njokijoyce720@gmail.com",
    location: "Moi uni (main), Eldoret",
    type: "Bedsitter",
    unitsAvailable: 46,
    phone: "+254796180852",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 5,
    reviewsCount: 0,
    amenities: [
      "High-speed internet access",
      "Ample parking",
      "24/7 Security",
      "Water supply",
    ],
  },
  {
    id: "2",
    name: "Pinecrest Residency",
    email: "pinecrest.mgt@gmail.com",
    location: "Kipkenyo, Eldoret-Kesses Road",
    type: "Single Room",
    unitsAvailable: 14,
    phone: "+254712345678",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4,
    reviewsCount: 3,
    amenities: ["Water supply", "Security guard", "CCTV Surveillance"],
  },
  {
    id: "3",
    name: "Savannah Heights",
    email: "savannah.apartments@yahoo.com",
    location: "Kesses Center, Near University Gate",
    type: "1 Bedroom",
    unitsAvailable: 8,
    phone: "+254789012345",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.5,
    reviewsCount: 7,
    amenities: ["Backup Generator", "Balcony", "Wi-Fi", "Paved Access"],
  },
  {
    id: "4",
    name: "Greenvalley Hostels",
    email: "greenvalley.info@outlook.com",
    location: "Township, Eldoret",
    type: "Hostel",
    unitsAvailable: 22,
    phone: "+254733654321",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.2,
    reviewsCount: 5,
    amenities: ["Reading Room", "Wi-Fi", "Hot Shower", "Perimeter Fence"],
  },
  {
    id: "5",
    name: "Royal Crown Suites",
    email: "royalcrown@gmail.com",
    location: "Annex, Eldoret",
    type: "Bedsitter",
    unitsAvailable: 19,
    phone: "+254755889900",
    images: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewsCount: 12,
    amenities: ["Elevator", "CCTV", "Borehole Water", "Fibre Internet"],
  },
];
