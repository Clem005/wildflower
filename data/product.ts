export interface Product {
  id: string;
  name: string;
  subName: string;
  price: string;
  folderPath: string;
  totalFrames: number;
  fileExtension: string;
  features: string[];
  detailsSection: { title: string; description: string };
  freshnessSection: { title: string; description: string };
  buyNowSection: { price: string; unit: string; deliveryPromise: string };
}

export const products: Product[] = [
  {
    id: "shampoo",
    name: "Essential Shampoo",
    subName: "Aloe Vera & Chamomile",
    price: "R 520.00",
    folderPath: "/images/shampoo",
    totalFrames: 82,
    fileExtension: ".jpg",
    features: ["Plant Based", "Sulphate Free", "Gentle Cleansing"],
    detailsSection: {
      title: "Botanical Purity",
      description:
        "Formulated with crystal-clear botanical extracts and velvety nourishing creams. Designed to harmonize with your scalp, this gentle, sulphate-free formula revitalizes from root to tip, leaving hair feeling weightless and deeply clean.",
    },
    freshnessSection: {
      title: "Plant-Based & Gentle",
      description:
        "We believe in the power of raw, uncompromised nature. By utilizing cold-extracted aloe and hand-harvested chamomile, we preserve the delicate active compounds that soothe the scalp and promote brilliant, natural shine.",
    },
    buyNowSection: {
      price: "R 520.00",
      unit: "per 250ml bottle",
      deliveryPromise:
        "Dispatched within 24 hours. Elegantly packaged in eco-conscious materials.",
    },
  },
  {
    id: "conditioner",
    name: "Nourishing Conditioner",
    subName: "Argan Oil & Shea Butter",
    price: "R 540.00",
    folderPath: "/images/conditioner",
    totalFrames: 87,
    fileExtension: ".jpg",
    features: ["Deep Hydration", "Silicone Free", "Frizz Control"],
    detailsSection: {
      title: "Intense Restoration",
      description:
        "Immerse your hair in a rich blend of restorative oils and nourishing butter. This silicone-free conditioner penetrates deeply to repair damage and restore elasticity, leaving your hair feeling incredibly soft, manageable, and radiant.",
    },
    freshnessSection: {
      title: "Richly Nourishing",
      description:
        "Crafted with ethically sourced argan oil and pure shea butter, our conditioner provides a powerful dose of antioxidants and essential fatty acids. It smooths the cuticle and locks in moisture without weighing your hair down.",
    },
    buyNowSection: {
      price: "R 540.00",
      unit: "per 250ml bottle",
      deliveryPromise:
        "Dispatched within 24 hours. Elegantly packaged in eco-conscious materials.",
    },
  },
];
