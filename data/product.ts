export interface ProductVariant {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface ProductParent {
  id: string;
  name: string;
  subName: string;
  shortDescription: string;
  coverImage: string;
  folderPath: string;
  totalFrames: number;
  fileExtension: string;
  variants: ProductVariant[];
}

export const products: ProductParent[] = [
  {
    id: "shampoo",
    name: "The Shampoo",
    subName: "Purifying Cleanser",
    shortDescription: "Formulated with crystal-clear botanical extracts and velvety nourishing creams to revitalize from root to tip, leaving hair feeling weightless and deeply clean.",
    coverImage: "/images/products/shampoo/shampoo-parent.png",
    folderPath: "/images/shampoo",
    totalFrames: 82,
    fileExtension: ".jpg",
    variants: [
      { 
        id: "shampoo-standard", 
        name: "Standard (Aloe Vera & Chamomile)", 
        description: "The daily gentle cleanse. Powered by cold-extracted aloe and hand-harvested chamomile to soothe the scalp and promote brilliant, natural shine.",
        price: "R 120.00",
        image: "/images/products/shampoo/essential-shampoo.png"
      },
      { 
        id: "shampoo-exclusive", 
        name: "Reserve (White Truffle & Orchid)", 
        description: "The ultimate luxury cleanse. An incredibly rare formulation combining white truffle extract and wild orchid for unprecedented moisture and color protection.",
        price: "R 170.00",
        image: "/images/products/shampoo/premium-shampoo.png"
      }
    ]
  },
  {
    id: "conditioner",
    name: "The Conditioner",
    subName: "Intense Restoration",
    shortDescription: "Immerse your hair in a rich blend of restorative oils and nourishing butter. This silicone-free conditioner penetrates deeply to repair damage and restore elasticity.",
    coverImage: "/images/products/conditioner/conditioner-parent.png",
    folderPath: "/images/conditioner",
    totalFrames: 87,
    fileExtension: ".jpg",
    variants: [
      { 
        id: "conditioner-standard", 
        name: "Standard (Argan Oil & Shea Butter)", 
        description: "A restorative blend of ethically sourced argan oil and pure shea butter. Smooths the cuticle and locks in moisture without weighing your hair down.",
        price: "R 120.00",
        image: "/images/products/conditioner/essential-conditioner.png"
      },
      { 
        id: "conditioner-exclusive", 
        name: "Reserve (Black Caviar & Silk)", 
        description: "A transformative mask-like experience for damaged hair. Infused with black caviar extract and liquid silk proteins to reconstruct the hair shaft.",
        price: "R 170.00",
        image: "/images/products/conditioner/premium-conditioner.png"
      }
    ]
  },
  {
    id: "hotoil",
    name: "The Hot Oil",
    subName: "Deep Nourishment",
    shortDescription: "A potent, deeply penetrating botanical oil treatment. Designed to be warmed before application, it melts into the hair cuticle to restore profound hydration, calm frizz, and deliver a mirror-like shine.",
    coverImage: "/images/products/hotoil/hotoil-parent.png",
    folderPath: "",
    totalFrames: 0,
    fileExtension: "",
    variants: [
      { 
        id: "hotoil-standard", 
        name: "Standard (Jojoba & Rosehip)", 
        description: "An intensive restorative oil treatment. Warmed to perfection, it instantly infuses parched strands with rich hydration and seals split ends for long-lasting smoothness.",
        price: "R 150.00",
        image: "/images/products/hotoil/hotoil-product.png"
      }
    ]
  }
];
