// Hand-picked highlights for the Chef's Picks slider — flavour descriptors are
// editorial copy, not ingredient claims. Edit freely.

import { pic } from './menu'

export type Special = { name: string; nameHindi: string; tags: string; price: string; image: string }

export const SPECIALS: Special[] = [
  {
    name: 'Fiery Chicken Tikka',
    nameHindi: 'फायरी चिकन टिक्का',
    tags: 'Red Chilli ◍ Lemon ◍ Char',
    price: 'From ₹349',
    image: pic('hot and spicy chicken tikka.jpg'),
  },
  {
    name: 'Malai Tandoori Chicken',
    nameHindi: 'मलाई तंदूरी चिकन',
    tags: 'Cream ◍ Cashew ◍ Cardamom',
    price: 'From ₹249',
    image: pic('crwamy chicken.jpg'),
  },
  {
    name: 'Classic Chicken Tikka Roll',
    nameHindi: 'चिकन टिक्का रोल',
    tags: 'Tikka ◍ Rumali ◍ Chutney',
    price: '₹199',
    image: pic('classic chicken roll.jpg'),
  },
  {
    name: 'Classic Tandoori Chicken',
    nameHindi: 'क्लासिक तंदूरी चिकन',
    tags: 'Yogurt ◍ Ginger-Garlic ◍ Smoke',
    price: 'From ₹219',
    image: pic('classic chicken.jpg'),
  },
  {
    name: 'Chicken Tikka Rice Bowl',
    nameHindi: 'चिकन टिक्का राइस बाउल',
    tags: 'Tikka ◍ Basmati ◍ Onion',
    price: '₹219',
    image: pic('cheicken tikka rice bowl.jpg'),
  },
]
