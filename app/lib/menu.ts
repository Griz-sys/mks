// Menu data — edit prices/items here, the Menu section renders straight from this.

export type PriceOption = { label: string; price: string }
export type MenuItem = { name: string; nameHindi?: string; desc: string; prices: PriceOption[]; image?: string }
export type MenuCategory = { id: string; title: string; titleHindi: string; note: string; items: MenuItem[] }

export const MENU: MenuCategory[] = [
  {
    id: 'chicken',
    title: 'Chicken',
    titleHindi: 'चिकन',
    note: 'Marinated overnight, roasted in a clay tandoor',
    items: [
      { name: 'Classic Chicken', nameHindi: 'क्लासिक चिकन', desc: 'Overnight marinade, clay tandoor', image: '/classic-chicken-tandoori.jpg', prices: [
        { label: '2 Pc', price: '₹180' }, { label: '4 Pc', price: '₹350' }, { label: '8 Pc', price: '₹650' },
      ] },
      { name: 'Creamy Chicken', nameHindi: 'क्रीमी चिकन', desc: 'Rich cream marinade, clay tandoor', image: '/creamy-chicken-tandoori.jpg', prices: [
        { label: '2 Pc', price: '₹190' }, { label: '4 Pc', price: '₹380' }, { label: '8 Pc', price: '₹680' },
      ] },
      { name: 'Classic Chicken Tikka', nameHindi: 'क्लासिक टिक्का', desc: 'Boneless, classic spice blend', image: '/classic-chicken-tikka.jpg', prices: [
        { label: '4 Pc', price: '₹350' }, { label: '8 Pc', price: '₹650' },
      ] },
      { name: 'Creamy Chicken Tikka', nameHindi: 'क्रीमी टिक्का', desc: 'Boneless, cream & cashew marinade', image: '/creamy-chicken-tikka.jpg', prices: [
        { label: '4 Pc', price: '₹350' }, { label: '8 Pc', price: '₹650' },
      ] },
      { name: 'Hot & Spicy Chicken Tikka', nameHindi: 'हॉट एंड स्पाइसी टिक्का', desc: 'Boneless, extra chilli marinade', prices: [
        { label: '4 Pc', price: '₹380' }, { label: '8 Pc', price: '₹680' },
      ] },
    ],
  },
  {
    id: 'chaap',
    title: 'Soya Chaap',
    titleHindi: 'सोया चाप',
    note: 'Slow marinated, tandoor roasted — 3 strips a plate',
    items: [
      { name: 'Classic Soya Chaap', nameHindi: 'क्लासिक चाप', desc: 'Classic spice marinade, tandoor', image: '/classic-soya-chaap.png', prices: [{ label: '3 strips', price: '₹250' }] },
      { name: 'Creamy Soya Chaap', nameHindi: 'क्रीमी चाप', desc: 'Cream marinade, tandoor roasted', image: '/creamy-soya-chaap.png', prices: [{ label: '3 strips', price: '₹250' }] },
      { name: 'Pickled Soya Chaap', nameHindi: 'अचारी चाप', desc: 'Achari marinade, tandoor roasted', image: '/classic-soya-chaap.png', prices: [{ label: '3 strips', price: '₹250' }] },
    ],
  },
  {
    id: 'rolls',
    title: 'Rolls & Bread',
    titleHindi: 'रोल्स और रोटी',
    note: 'Hand-rolled, fresh off the tawa',
    items: [
      { name: 'Classic Chicken Roll', nameHindi: 'चिकन रोल', desc: 'Tandoori chicken, rumali, chutney', image: '/classic-chicken-roll.jpg', prices: [{ label: '', price: '₹180' }] },
      { name: 'Classic Soya Roll', nameHindi: 'सोया रोल', desc: 'Soya chaap, rumali, chutney', image: '/Creamy%20Chicken%20Roll%202.png', prices: [{ label: '', price: '₹150' }] },
      { name: 'Rumali Roti', nameHindi: 'रुमाली रोटी', desc: 'Thin hand-stretched, tawa roasted', image: '/Roomali-roti.jpg', prices: [{ label: '', price: '₹25' }] },
    ],
  },
  {
    id: 'beverages',
    title: 'Beverages',
    titleHindi: 'पेय पदार्थ',
    note: 'All priced at MRP',
    items: [
      { name: 'Coke', desc: 'Chilled, 250ml', prices: [{ label: '', price: 'MRP' }] },
      { name: 'Limca', desc: 'Chilled, 250ml', prices: [{ label: '', price: 'MRP' }] },
      { name: 'Sprite', desc: 'Chilled, 250ml', prices: [{ label: '', price: 'MRP' }] },
      { name: 'Marinda', desc: 'Chilled, 250ml', prices: [{ label: '', price: 'MRP' }] },
      { name: 'Soda', desc: 'Chilled, 250ml', prices: [{ label: '', price: 'MRP' }] },
      { name: 'Redbull', desc: 'Chilled, 250ml', prices: [{ label: '', price: 'MRP' }] },
      { name: 'Ginger Ale', desc: 'Chilled, 250ml', prices: [{ label: '', price: 'MRP' }] },
    ],
  },
]
