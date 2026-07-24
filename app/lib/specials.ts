// Hand-picked highlights for the Chef's Picks slider — flavour descriptors are
// editorial copy, not ingredient claims. Edit freely.

export type Special = { name: string; nameHindi: string; tags: string; price: string; image: string }

export const SPECIALS: Special[] = [
  {
    name: 'Hot & Spicy Chicken Tikka',
    nameHindi: 'हॉट एंड स्पाइसी टिक्का',
    tags: 'Chilli ◍ Garlic ◍ Char',
    price: 'From ₹380',
    image: '/butterflied_tandoori_chicken_passage_to_india.jpeg',
  },
  {
    name: 'Creamy Chicken',
    nameHindi: 'क्रीमी चिकन',
    tags: 'Cream ◍ Cashew ◍ Smoke',
    price: 'From ₹190',
    image: '/images.jpg',
  },
  {
    name: 'Classic Chicken Roll',
    nameHindi: 'चिकन रोल',
    tags: 'Tandoori ◍ Rumali ◍ Chutney',
    price: '₹180',
    image: '/pngtree-grilled-tandoori-chicken-leg-piece-image_20244660.webp',
  },
  {
    name: 'Classic Chicken',
    nameHindi: 'क्लासिक चिकन',
    tags: 'Overnight ◍ Marinade ◍ Clay Oven',
    price: 'From ₹180',
    image: '/Classic%20Chicken%20Tikka%20Skewers.jpg',
  },
]
