// Menu data — edit prices/items here, the Menu section renders straight from this.

export type PriceOption = { label: string; price: string }
export type MenuItem = { name: string; nameHindi?: string; desc: string; prices: PriceOption[]; image?: string }
// A category `image` shows as one banner photo; its items then list without photos (used for combos).
export type MenuCategory = { id: string; title: string; titleHindi: string; note: string; image?: string; items: MenuItem[] }

// Dish photos live in /public/pics — filenames have spaces, so encode them.
export const pic = (file: string) => `/pics/${encodeURIComponent(file)}`

export const MENU: MenuCategory[] = [
  {
    id: 'tikka',
    title: 'Boneless Tikkas',
    titleHindi: 'बोनलेस टिक्का',
    note: 'Boneless, marinated and roasted in a clay tandoor',
    items: [
      { name: 'Classic Chicken Tikka', nameHindi: 'क्लासिक चिकन टिक्का', desc: 'Charbroiled tender chicken marinated in yogurt, fresh ginger, garlic, and a blend of aromatic spices for a smoky finish.', image: pic('classic chicken tikka.jpg'), prices: [
        { label: '4 Pc', price: '₹349' }, { label: '8 Pc', price: '₹649' },
      ] },
      { name: 'Fiery Chicken Tikka', nameHindi: 'फायरी चिकन टिक्का', desc: 'Packed with heat — succulent smoky chicken steeped in crushed red chilies, spices, and a splash of lemon.', image: pic('hot and spicy chicken tikka.jpg'), prices: [
        { label: '4 Pc', price: '₹349' }, { label: '8 Pc', price: '₹649' },
      ] },
      { name: 'Malai Chicken Tikka', nameHindi: 'मलाई चिकन टिक्का', desc: 'Velvety chicken, marinated in a rich cream, cashew paste, and spices, roasted to perfection. Has nuts.', image: pic('creamy chicken tikka.jpg'), prices: [
        { label: '4 Pc', price: '₹379' }, { label: '8 Pc', price: '₹679' },
      ] },
    ],
  },
  {
    id: 'chicken',
    title: 'Tandoori Chicken',
    titleHindi: 'तंदूरी चिकन',
    note: 'Bone-in, roasted in a clay tandoor',
    items: [
      { name: 'Classic Tandoori Chicken', nameHindi: 'क्लासिक तंदूरी चिकन', desc: 'Charbroiled tender chicken marinated in yogurt, fresh ginger, garlic, and a blend of aromatic spices for a smoky finish.', image: pic('classic chicken.jpg'), prices: [
        { label: '2 Pc', price: '₹219' }, { label: '4 Pc', price: '₹399' }, { label: '8 Pc', price: '₹749' },
      ] },
      { name: 'Malai Tandoori Chicken', nameHindi: 'मलाई तंदूरी चिकन', desc: 'Velvety, melt-in-your-mouth chicken marinated in a rich reduction of cream, cashew paste, green cardamom, and spices, roasted to golden perfection.', image: pic('crwamy chicken.jpg'), prices: [
        { label: '2 Pc', price: '₹249' }, { label: '4 Pc', price: '₹429' }, { label: '8 Pc', price: '₹779' },
      ] },
    ],
  },
  {
    id: 'chaap',
    title: 'Soya Chaap',
    titleHindi: 'सोया चाप',
    note: 'High-protein (less maida) soya chaap, tandoor roasted',
    items: [
      { name: 'Classic Chaap', nameHindi: 'क्लासिक चाप', desc: 'High-protein (less maida) soya chaap, marinated in yogurt, ginger-garlic, and house garam masala, then tandoor-roasted.', image: pic('classic-chaap-web.jpg'), prices: [{ label: '', price: '₹249' }] },
      { name: 'Malai Chaap', nameHindi: 'मलाई चाप', desc: 'High-protein (less maida) soya chaap, marinated in fresh cream, cashew, and aromatic spices, then grilled.', image: pic('creamy soya chaap.jpg'), prices: [{ label: '', price: '₹249' }] },
      { name: 'Achari Chaap', nameHindi: 'अचारी चाप', desc: 'High-protein (less maida) soya chaap, tossed in tangy achari spices, mustard oil and charred.', image: pic('classic-chaap-web.jpg'), prices: [{ label: '', price: '₹249' }] },
    ],
  },
  {
    id: 'rolls',
    title: 'Rolls',
    titleHindi: 'रोल्स',
    note: 'Wrapped fresh in a soft rumali roti',
    items: [
      { name: 'Classic Soya Chaap Roll', nameHindi: 'सोया चाप रोल', desc: 'Juicy, smoky soya chaap tossed with crisp onions and coriander chutney, wrapped in a rumali roti.', image: pic('classic soya roll.jpg'), prices: [{ label: '', price: '₹159' }] },
      { name: 'Classic Chicken Tikka Roll', nameHindi: 'चिकन टिक्का रोल', desc: 'Tender, roasted chicken tikka wrapped with sliced onions and coriander chutney, in a soft rumali roti.', image: pic('classic chicken roll.jpg'), prices: [{ label: '', price: '₹199' }] },
    ],
  },
  {
    id: 'bowls',
    title: 'Rice Bowls',
    titleHindi: 'राइस बाउल',
    note: 'Served over spiced basmati rice',
    items: [
      { name: 'Soya Keema Rice Bowl', nameHindi: 'सोया कीमा राइस बाउल', desc: 'Savory, finely minced soya keema simmered in a rich spiced gravy, served over a bed of spiced, fragrant basmati rice.', image: pic('soya keema rice bowl.jpg'), prices: [{ label: '', price: '₹159' }] },
      { name: 'Tandoori Chicken Rice Bowl', nameHindi: 'तंदूरी चिकन राइस बाउल', desc: 'Two succulent pieces of flame-grilled chicken tikka layered over aromatic, spice and onion-tossed basmati rice.', image: pic('classic chicken rice bowl.jpg'), prices: [{ label: '', price: '₹189' }] },
      { name: 'Classic Chicken Tikka Rice Bowl', nameHindi: 'चिकन टिक्का राइस बाउल', desc: '2 succulent pieces of flame-grilled chicken tikka layered over aromatic, spice and onion-tossed basmati rice. Add 1 more tikka for ₹89.', image: pic('cheicken tikka rice bowl.jpg'), prices: [{ label: '', price: '₹219' }] },
    ],
  },
  {
    id: 'combos',
    title: 'Combos',
    titleHindi: 'कॉम्बो',
    note: 'A full meal, sorted',
    image: pic('classic combo.jpg'),
    items: [
      { name: 'Veggie Combo', desc: '4 pcs Soya Chaap + 1 Soya Keema Bowl + 2 Rumali Rotis', prices: [{ label: '', price: '₹439' }] },
      { name: 'Classic Combo', desc: '2 pcs Classic Tandoori + 4 pcs Classic Tikka + 2 Rumali Rotis', prices: [{ label: '', price: '₹549' }] },
      { name: 'Malai-Classic Combo', desc: '2 pcs Malai Tandoori + 4 pcs Classic Tikka + 2 Rumali Rotis', prices: [{ label: '', price: '₹609' }] },
      { name: 'Classic-Malai Combo', desc: '2 pcs Classic Tandoori + 4 pcs Malai Tikka + 2 Rumali Rotis', prices: [{ label: '', price: '₹609' }] },
      { name: 'Malai Combo', desc: '2 pcs Malai Tandoori + 4 pcs Malai Tikka + 2 Rumali Rotis', prices: [{ label: '', price: '₹609' }] },
    ],
  },
  {
    id: 'addons',
    title: 'Add-ons',
    titleHindi: 'ऐड-ऑन',
    note: 'Beverages priced at MRP',
    items: [
      { name: 'Rumali Roti', nameHindi: 'रुमाली रोटी', desc: 'Thin, hand-stretched, tawa roasted', image: pic('romali roti.jpg'), prices: [{ label: '', price: '₹25' }] },
      { name: 'Tomato Garlic Chutney', desc: 'House-made, tangy and garlicky', image: pic('sauce.JPG'), prices: [{ label: '', price: '₹39' }] },
      { name: 'Beverages', desc: 'Chilled soft drinks', prices: [{ label: '', price: 'MRP' }] },
    ],
  },
]
