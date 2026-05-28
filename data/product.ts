export interface Product {
  id: string;
  name: string;
  subName: string;
  price: string;
  folderPath: string;
  totalFrames: number;
  features: string[];
  detailsSection: { title: string; description: string };
  freshnessSection: { title: string; description: string };
  buyNowSection: { price: string; unit: string; deliveryPromise: string };
}

export const product: Product = {
  id: "shampoo",
  name: "Essential Shampoo",
  subName: "Aloe Vera & Chamomile",
  price: "R 520.00",
  folderPath: "/images/shampoo",
  totalFrames: 125,
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
};
