import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Utensils,
  Flame,
  Coffee,
  Heart,
  ShoppingBag,
  Music,
  Disc,
  Star,
  Trash2,
  Plus,
  Minus,
  Check,
  Clock,
  MapPin,
  X,
  Sparkles,
  ChevronRight,
  MessageSquare,
  Volume2,
  VolumeX,
  Smartphone,
  Award
} from 'lucide-react';

// --- RETRO DESIGN CONSTANTS ---
const CHECKERED_BG_RED = {
  backgroundImage: 'repeating-conic-gradient(#d62828 0% 25%, #fdfbf7 0% 50%)',
  backgroundSize: '24px 24px',
};

const CHECKERED_BG_BLACK = {
  backgroundImage: 'repeating-conic-gradient(#1a1a1a 0% 25%, #ffffff 0% 50%)',
  backgroundSize: '16px 16px',
};

// --- DICTIONARIES & MOCK DATA ---
interface MenuItem {
  id: string;
  name: string;
  category: 'burgers' | 'shakes' | 'sides' | 'desserts';
  price: number;
  calories: number;
  rating: number;
  badge?: string;
  description: string;
  image: string;
  color: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'b1',
    name: 'The Cadillac Double',
    category: 'burgers',
    price: 9.99,
    calories: 820,
    rating: 4.9,
    badge: 'CHEF\'S CHOICE',
    description: 'Double flame-grilled beef patties, melted retro cheddar, signature atomic sauce, pickles, & crispy lettuce on a toasted brioche bun.',
    image: '🍔',
    color: '#fdf0d5',
  },
  {
    id: 'b2',
    name: 'Route 66 Spicy Classic',
    category: 'burgers',
    price: 8.49,
    calories: 740,
    rating: 4.8,
    badge: 'HOT & SPICY',
    description: 'Crispy jalapeños, spicy pepper jack cheese, smoky chipotle diner mayo, lettuce, tomato, & charred onions.',
    image: '🌶️',
    color: '#fefae0',
  },
  {
    id: 'b3',
    name: 'Neon Cheese Cruiser',
    category: 'burgers',
    price: 7.99,
    calories: 690,
    rating: 4.7,
    badge: 'BESTSELLER',
    description: 'Single signature patty drowned in liquid gold retro cheese sauce, grilled onions, mustard, & old-school ketchup.',
    image: '🧀',
    color: '#e2ece9',
  },
  {
    id: 's1',
    name: 'Atomic Cherry Vanilla Malt',
    category: 'shakes',
    price: 5.99,
    calories: 510,
    rating: 4.9,
    badge: 'MUST TRY',
    description: 'Real vanilla bean ice cream spun with sweet cherry syrup, topped with whip, sprinkles, and a classic brandied cherry.',
    image: '🥤',
    color: '#ffccd5',
  },
  {
    id: 's2',
    name: 'Blue Moon Blueberry Shake',
    category: 'shakes',
    price: 5.49,
    calories: 480,
    rating: 4.6,
    description: 'A nostalgic neon blue raspberry & wild blueberry thick shake with custom blue sugar rimming.',
    image: '🥤',
    color: '#c0fdff',
  },
  {
    id: 's3',
    name: 'Double Fudge Malty Way',
    category: 'shakes',
    price: 5.99,
    calories: 620,
    rating: 4.8,
    badge: 'VINTAGE',
    description: 'Rich dark chocolate malt, chocolate drizzle, cookie crumble topper, and a chocolate-dipped wafer biscuit.',
    image: '🍫',
    color: '#f5ebe0',
  },
  {
    id: 'sd1',
    name: 'Crinkle Cut Neon Fries',
    category: 'sides',
    price: 3.49,
    calories: 320,
    rating: 4.7,
    badge: 'LEGENDARY',
    description: 'Golden, crispy, deep crinkle-cut potatoes generously dusted with secret smoky diner seasoning.',
    image: '🍟',
    color: '#ffe5ec',
  },
  {
    id: 'sd2',
    name: 'O-Rings of Fire',
    category: 'sides',
    price: 4.29,
    calories: 380,
    rating: 4.5,
    description: 'Thick beer-battered yellow onions fried to golden excellence, served with side of spicy neon sauce.',
    image: '🧅',
    color: '#faedcd',
  },
  {
    id: 'd1',
    name: 'Grandma’s Hot Apple Pocket',
    category: 'desserts',
    price: 4.99,
    calories: 440,
    rating: 4.9,
    badge: 'WARM & SWEET',
    description: 'Flaky fried pastry pie packed with spiced granny smith apple filing, drizzled with caramel.',
    image: '🥧',
    color: '#ffe5ec',
  }
];

interface CartItem {
  item: MenuItem | CustomBurger;
  quantity: number;
  isCustom?: boolean;
}

interface CustomBurger {
  id: string;
  name: string;
  price: number;
  calories: number;
  layers: string[];
  description: string;
  image: string;
}

interface GuestBookEntry {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const BURGER_INGREDIENTS = [
  { id: 'top-bun', name: 'Toasted Brioche Bun (Top)', price: 0.50, color: '#e7a96d', type: 'bun', image: '🍞' },
  { id: 'bacon', name: 'Smoked Crispy Bacon', price: 1.50, color: '#b54d31', type: 'meat', image: '🥓' },
  { id: 'cheese', name: 'Vintage Cheddar Melt', price: 0.75, color: '#f7b025', type: 'cheese', image: '🧀' },
  { id: 'tomato', name: 'Vine-Ripened Tomato Slice', price: 0.40, color: '#f24822', type: 'veggie', image: '🍅' },
  { id: 'lettuce', name: 'Crispy Iceberg Lettuce', price: 0.30, color: '#4cb050', type: 'veggie', image: '🥬' },
  { id: 'patty', name: 'Flame-Grilled Beef Patty', price: 2.50, color: '#6d4534', type: 'meat', image: '🥩' },
  { id: 'bottom-bun', name: 'Toasted Brioche Bun (Bottom)', price: 0.50, color: '#e7a96d', type: 'bun', image: '🍞' },
];

const JUKEBOX_PLAYLIST = [
  { id: 'j1', title: 'Rock Around the Clock', artist: 'Bill Haley & His Comets', duration: '2:11', file: 'rock_around.mp3' },
  { id: 'j2', title: 'Jailhouse Rock', artist: 'Elvis Presley', duration: '2:27', file: 'jailhouse.mp3' },
  { id: 'j3', title: 'Johnny B. Goode', artist: 'Chuck Berry', duration: '2:41', file: 'johnny_b_goode.mp3' },
  { id: 'j4', title: 'Peggy Sue', artist: 'Buddy Holly', duration: '2:30', file: 'peggy_sue.mp3' },
];

export default function App() {
  // --- STATES ---
  const [activeTab, setActiveTab] = useState<'burgers' | 'shakes' | 'sides' | 'desserts'>('burgers');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [jukeboxPlaying, setJukeboxPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<{ orderId: string; total: number; items: CartItem[] } | null>(null);

  // Custom Burger States
  const [customBurgerLayers, setCustomBurgerLayers] = useState<string[]>(['bottom-bun', 'patty', 'cheese', 'lettuce', 'top-bun']);
  const [customBurgerName, setCustomBurgerName] = useState('My Custom Cadillac');

  // Guestbook comments state
  const [guestBook, setGuestBook] = useState<GuestBookEntry[]>([
    { id: '1', name: 'Johnny Retro', rating: 5, comment: 'The milkshakes here take me right back to 1958! Outstanding cherry flavor!', date: 'Just now', avatar: '🕺' },
    { id: '2', name: 'Betty Diner-Fan', rating: 5, comment: 'Crispiest crinkle fries in the state! The Neon Cadillac sauce is magic.', date: '2 hours ago', avatar: '💃' },
    { id: '3', name: 'Peggy-Sue S.', rating: 4, comment: 'Love building my own crazy triple bacon cheeseburger. Best diner vibe ever!', date: '1 day ago', avatar: '🎀' },
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(5);

  // Auto scroll effect simulation for the Jukebox
  useEffect(() => {
    let interval: any;
    if (jukeboxPlaying) {
      interval = setInterval(() => {
        // Mock progression or fun visualizer trigger
      }, 500);
    }
    return () => clearInterval(interval);
  }, [jukeboxPlaying]);

  // --- ACTIONS ---
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => !i.isCustom && i.item.id === item.id);
      if (existing) {
        return prev.map(i => (!i.isCustom && i.item.id === item.id) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const addCustomBurgerToCart = () => {
    const burgerPrice = customBurgerLayers.reduce((total, layerId) => {
      const ing = BURGER_INGREDIENTS.find(i => i.id === layerId);
      return total + (ing ? ing.price : 0);
    }, 4.00); // base price

    const burgerCal = customBurgerLayers.reduce((total, layerId) => {
      return total + (layerId === 'patty' ? 240 : layerId === 'bacon' ? 120 : layerId === 'cheese' ? 90 : 30);
    }, 200);

    const newBurger: CustomBurger = {
      id: `custom-${Date.now()}`,
      name: customBurgerName || 'Custom Classic Diner Burger',
      price: Number(burgerPrice.toFixed(2)),
      calories: burgerCal,
      layers: [...customBurgerLayers],
      description: 'Hand-crafted retro custom build stacked with high-quality ingredients.',
      image: '🍔',
    };

    setCart(prev => [...prev, { item: newBurger, quantity: 1, isCustom: true }]);
    // Reset burger builder values
    setCustomBurgerName('My Custom Cadillac');
    alert('🍔 Your Custom Masterpiece has been added to the Cart!');
  };

  const updateCartQuantity = (id: string, delta: number, isCustom = false) => {
    setCart(prev => {
      return prev.map(i => {
        const itemId = i.isCustom ? (i.item as CustomBurger).id : i.item.id;
        const matches = (i.isCustom === isCustom) && (itemId === id);
        if (matches) {
          const nextQty = i.quantity + delta;
          return nextQty > 0 ? { ...i, quantity: nextQty } : null;
        }
        return i;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string, isCustom = false) => {
    setCart(prev => prev.filter(i => {
      const itemId = i.isCustom ? (i.item as CustomBurger).id : i.item.id;
      return !(i.isCustom === isCustom && itemId === id);
    }));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, cartItem) => {
      return total + (cartItem.item.price * cartItem.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    return calculateSubtotal() * appliedPromo.discount;
  };

  const calculateTotal = () => {
    const sub = calculateSubtotal();
    const dis = calculateDiscount();
    const tax = sub * 0.08; // 8% retro tax
    return Number((sub - dis + tax).toFixed(2));
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase().trim();
    if (code === 'RETRO50') {
      setAppliedPromo({ code, discount: 0.50 });
      alert('🎉 Awesome! 50% discount applied!');
    } else if (code === 'FREEBIE') {
      setAppliedPromo({ code, discount: 0.20 });
      alert('🎉 Sweet! 20% discount applied!');
    } else {
      alert('❌ Retro code not recognized! Try: RETRO50');
    }
    setPromoCode('');
  };

  const handleCheckout = () => {
    if (cart.length === 0) return alert('Your vintage bag is empty! Fill it with goodies first.');
    const orderId = `DINE-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastReceipt({
      orderId,
      total: calculateTotal(),
      items: [...cart],
    });
    setCart([]);
    setAppliedPromo(null);
    setIsCartOpen(false);
    setShowReceipt(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName || !newCommentText) return alert('Please enter both your Diner handle & feedback!');
    const newEntry: GuestBookEntry = {
      id: `${Date.now()}`,
      name: newCommentName,
      comment: newCommentText,
      rating: newCommentRating,
      date: 'Just now',
      avatar: ['🕺', '💃', '🕶️', '🍦', '🍔'][Math.floor(Math.random() * 5)],
    };
    setGuestBook([newEntry, ...guestBook]);
    setNewCommentName('');
    setNewCommentText('');
    setNewCommentRating(5);
  };

  const toggleLayer = (layerId: string) => {
    setCustomBurgerLayers(prev => {
      // If we are adding, add it right beneath the top bun (or atop the bottom stack)
      if (prev.includes(layerId)) {
        // Keep at least bottom and top bun for visual consistency
        if (layerId === 'bottom-bun' || layerId === 'top-bun') return prev;
        return prev.filter(l => l !== layerId);
      } else {
        const next = [...prev];
        // Insert right below the top bun (index 1 or last but one)
        const topIndex = next.indexOf('top-bun');
        if (topIndex !== -1) {
          next.splice(topIndex, 0, layerId);
        } else {
          next.push(layerId);
        }
        return next;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a] font-mono selection:bg-[#f77f00] selection:text-white pb-16 relative overflow-x-hidden">
      
      {/* GLOWING NEON STRIPS */}
      <div className="h-2 w-full bg-[#d62828] shadow-[0_0_15px_#d62828]" />
      <div className="h-1 w-full bg-[#f77f00]" />

      {/* TOP HEADER & NEWS BAR */}
      <div className="bg-[#1a1a1a] text-[#fcbf49] text-center py-2 text-xs font-bold tracking-widest border-b border-[#fcbf49] flex items-center justify-center gap-6 overflow-hidden px-4">
        <span className="flex items-center gap-1 shrink-0"><Clock size={14} className="animate-pulse text-[#d62828]" /> OPEN 24/7 SINCE 1956</span>
        <span className="hidden md:inline text-white">•</span>
        <span className="hidden md:flex items-center gap-1 shrink-0"><Award size={14} className="text-[#00b4d8]" /> VOTED "BEST BURGERS IN THE TRI-STATE AREA!"</span>
        <span className="hidden lg:inline text-white">•</span>
        <span className="hidden lg:flex items-center gap-1 shrink-0"><Sparkles size={14} className="text-[#e63946]" /> USE CODE <strong className="text-white underline px-1 bg-[#d62828]">RETRO50</strong> FOR 50% OFF!</span>
      </div>

      {/* DIAL-UP RETRO NAVIGATION & BANNER */}
      <header className="sticky top-0 z-40 bg-[#fdfbf7] border-b-4 border-double border-[#1a1a1a] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Diner Logo brand */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-[#d62828] border-2 border-[#1a1a1a] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#1a1a1a] text-white text-3xl font-black rotate-[-6deg] hover:rotate-[6deg] transition-all duration-300">
              ⚡
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-[#1a1a1a] flex items-center gap-1">
                CADILLAC <span className="text-[#d62828] italic">DINER</span>
              </h1>
              <p className="text-xs uppercase font-extrabold tracking-widest text-[#f77f00] flex items-center gap-1">
                <Flame size={12} className="inline fill-current text-[#f77f00]" /> Real Flame-Grilled Happiness
              </p>
            </div>
          </div>

          {/* Nav Buttons & Interactive Jukebox Quick Control */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            
            {/* Quick Jukebox Controller */}
            <div className="bg-[#1a1a1a] text-white p-2 rounded-lg border-2 border-[#fcbf49] flex items-center gap-3 text-xs shadow-[3px_3px_0px_#1a1a1a]">
              <div className={`p-1 bg-[#d62828] rounded-full ${jukeboxPlaying ? 'animate-spin' : ''}`}>
                <Disc size={16} className="text-[#fcbf49]" />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-[10px] uppercase text-[#fcbf49]">Retro Jukebox</p>
                <p className="text-[11px] truncate w-24 text-gray-300">
                  {jukeboxPlaying ? JUKEBOX_PLAYLIST[currentTrack].title : "Silent Night"}
                </p>
              </div>
              <button 
                onClick={() => setJukeboxPlaying(!jukeboxPlaying)}
                className="bg-[#fcbf49] text-black px-2 py-1 rounded font-black text-[10px] uppercase hover:bg-yellow-400"
              >
                {jukeboxPlaying ? 'PAUSE' : 'PLAY'}
              </button>
            </div>

            {/* Shopping Bag Button with Retro Counter badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#d62828] text-white hover:bg-[#b52121] px-5 py-3 rounded-none font-black text-sm uppercase flex items-center gap-2 border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] transform active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              <ShoppingBag size={18} />
              <span>Vintage Bag</span>
              <span className="bg-[#fcbf49] text-[#1a1a1a] w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs ml-1 border border-[#1a1a1a]">
                {cart.reduce((total, cur) => total + cur.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
        
        {/* Checkered Bar Divider */}
        <div style={CHECKERED_BG_RED} className="h-4 w-full border-t-2 border-b-2 border-[#1a1a1a]" />
      </header>

      {/* MAIN LAYOUT HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-cover bg-center border-b-4 border-[#1a1a1a]" style={{ backgroundImage: "radial-gradient(circle, #fbf7f0 60%, #faecd6 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start space-y-6">
            
            {/* Retro Stamp badge */}
            <div className="inline-block bg-[#00b4d8] text-white text-xs font-black tracking-widest uppercase px-3 py-1.5 border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] rotate-[-2deg]">
              ★ EST. 1956 ★ RETRO AMERICAN DINER
            </div>

            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#1a1a1a] uppercase leading-none">
              TASTE THE <br />
              <span className="text-white bg-[#d62828] px-3 inline-block transform skew-y-[-2deg] border-4 border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] my-2">GOLDEN</span> <br />
              ERA OF MEALS!
            </h2>

            <p className="text-base md:text-lg text-gray-700 max-w-xl font-sans leading-relaxed">
              Step into the Cadillac Diner, where the shakes are atomic, the beef is juicy, and the jukebox spins all night long. Crafted using grandma's original secret seasoning from 1956.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#menu"
                className="bg-[#fcbf49] text-[#1a1a1a] hover:bg-yellow-400 font-black px-8 py-4 text-base border-3 border-[#1a1a1a] shadow-[5px_5px_0px_#1a1a1a] uppercase tracking-wide transform hover:-translate-y-1 transition-transform"
              >
                Browse Vintage Menu ↓
              </a>
              <a 
                href="#custom-burger-builder"
                className="bg-[#00b4d8] text-white hover:bg-[#0096c7] font-black px-8 py-4 text-base border-3 border-[#1a1a1a] shadow-[5px_5px_0px_#1a1a1a] uppercase tracking-wide transform hover:-translate-y-1 transition-transform"
              >
                Build-A-Burger 🍔
              </a>
            </div>

            {/* Micro details bar */}
            <div className="grid grid-cols-3 gap-4 w-full pt-6 border-t-2 border-dashed border-gray-300">
              <div>
                <span className="text-3xl font-black text-[#d62828] block">100%</span>
                <span className="text-xs uppercase font-extrabold text-gray-500">Angus Beef</span>
              </div>
              <div>
                <span className="text-3xl font-black text-[#f77f00] block">8 Flavors</span>
                <span className="text-xs uppercase font-extrabold text-gray-500">Hand-Spun Malts</span>
              </div>
              <div>
                <span className="text-3xl font-black text-[#00b4d8] block">Classic</span>
                <span className="text-xs uppercase font-extrabold text-gray-500">1950s Recipes</span>
              </div>
            </div>

          </div>

          {/* Hero Right Visuals - Neon Sign Stack / Promos */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* The Big Cadillac Diner Sign Container */}
            <div className="relative bg-[#1a1a1a] text-white p-6 rounded-3xl border-4 border-[#fcbf49] shadow-[0_0_30px_rgba(252,191,73,0.3)] max-w-sm w-full transform rotate-[2deg] hover:rotate-[0deg] transition-all duration-500">
              
              {/* Neon Red glowing light bulb rings around */}
              <div className="absolute -inset-1 border-2 border-[#d62828] rounded-3xl animate-pulse" />
              
              {/* Retro Crown/Top sign piece */}
              <div className="text-center pb-4 border-b border-gray-700">
                <span className="text-[#00b4d8] font-bold text-xs tracking-widest uppercase">★★★★★ STAR DINER ★★★★★</span>
                <h3 className="text-3xl font-black italic text-[#d62828] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1">OPEN NOW</h3>
              </div>

              {/* Central burger showcase */}
              <div className="my-6 text-center relative py-6 bg-amber-50 rounded-2xl border-2 border-dashed border-[#fcbf49]">
                
                {/* Vintage Badge Stamp */}
                <div className="absolute -top-4 -right-4 bg-[#f77f00] text-white text-[10px] font-black p-2 rounded-full border border-black rotate-12 shadow">
                  ONLY $9.99!
                </div>

                <span className="text-8xl block animate-bounce">🍔</span>
                <p className="text-black font-black text-xl mt-3 uppercase tracking-tight">The Cadillac Double</p>
                <p className="text-[#d62828] font-black text-xs">Our #1 Flagship Burger since day one</p>
              </div>

              {/* Footer promo lines */}
              <div className="text-center space-y-2 text-xs">
                <p className="text-[#fcbf49] font-bold">📢 TONIGHT'S LIVE SPECIAL:</p>
                <p className="text-gray-300">Buy any double patty burger, get a side of Neon Fries for absolutely <strong className="text-white underline">FREE!</strong></p>
                
                <button 
                  onClick={() => addToCart(MENU_ITEMS[0])}
                  className="w-full bg-[#d62828] text-white font-black py-2 mt-2 border-2 border-white hover:bg-white hover:text-black transition-colors"
                >
                  ADD SPECIAL TO BAG
                </button>
              </div>

            </div>

            {/* Extra retro badge background accent */}
            <div className="absolute -bottom-6 -left-6 bg-[#fcbf49] text-black px-4 py-2 border-2 border-black rotate-[-12deg] hidden sm:block font-black text-xs shadow-md">
              🥤 SHAKES MADE WITH REAL MALT!
            </div>

          </div>

        </div>
      </section>

      {/* JUKEBOX & RETRO CHILL ZONE SECTION */}
      <section className="bg-[#1a1a1a] text-white py-12 border-b-4 border-black relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={CHECKERED_BG_BLACK} />
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Retro Jukebox Column */}
          <div className="lg:col-span-4 bg-[#2a2a2a] p-6 rounded-2xl border-4 border-[#d62828] shadow-[0_0_20px_#d62828]">
            <div className="text-center pb-4 border-b border-gray-700">
              <h4 className="text-[#fcbf49] text-lg font-black tracking-widest flex items-center justify-center gap-2">
                <Music className="animate-bounce" /> RETRO WURLITZER JUKEBOX
              </h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Select your favorite vintage background melody</p>
            </div>

            {/* Audio Equalizer visual simulation */}
            <div className="flex justify-center items-end gap-1.5 h-12 my-6">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2.5 bg-[#00b4d8] rounded-t"
                  animate={{
                    height: jukeboxPlaying ? [10, 48, 20, 40, 15, 30, 48, 12][(i + currentTrack) % 8] : 8
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Playlist mapping */}
            <div className="space-y-2">
              {JUKEBOX_PLAYLIST.map((track, idx) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(idx);
                    setJukeboxPlaying(true);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                    currentTrack === idx && jukeboxPlaying
                      ? 'bg-[#d62828] border-white text-white'
                      : 'bg-[#1a1a1a] border-gray-700 text-gray-300 hover:bg-[#333]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#fcbf49]">{idx + 1}.</span>
                    <div>
                      <p className="font-black">{track.title}</p>
                      <p className="text-[10px] text-gray-400">{track.artist}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold">{track.duration}</span>
                </button>
              ))}
            </div>

            {/* Play controls bottom */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700 justify-center">
              <button 
                onClick={() => setJukeboxPlaying(!jukeboxPlaying)}
                className="bg-white text-black font-black px-4 py-2 text-xs rounded uppercase flex items-center gap-2 hover:bg-[#fcbf49] transition-colors"
              >
                {jukeboxPlaying ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {jukeboxPlaying ? 'Mute Jukebox' : 'Unmute Jukebox'}
              </button>
            </div>
          </div>

          {/* Sizzling Story/Promo Column */}
          <div className="lg:col-span-8 space-y-6">
            <span className="text-[#00b4d8] font-bold tracking-widest uppercase block">★ LOCAL VINTAGE HANGOUT ★</span>
            <h3 className="text-3xl md:text-5xl font-extrabold uppercase text-[#fcbf49]">WHERE ROCK 'N' ROLL MET THE MEAT GRINDER</h3>
            <p className="text-gray-300 font-sans leading-relaxed text-sm md:text-base">
              The original Cadillac Diner opened on Route 66 in the summer of 1956. Known then as the only place where teens could blast jukebox rock & roll and sink their teeth into custom beef patties layered to perfection. Decades may have rolled by, but we still make everything completely fresh by hand!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="bg-[#2a2a2a] p-4 border-l-4 border-[#00b4d8] rounded">
                <h5 className="font-black text-white text-sm uppercase">100% REAL HAND-SPUN MILKSHAKES</h5>
                <p className="text-gray-400 text-xs mt-1 font-sans">We never use powder or artificial fillers. Only fresh local dairy, whole eggs, and real malt extracts. Creamy bliss in every cherry-topped sip.</p>
              </div>
              <div className="bg-[#2a2a2a] p-4 border-l-4 border-[#f77f00] rounded">
                <h5 className="font-black text-white text-sm uppercase">VINTAGE FLAME-CHARRED PROCESS</h5>
                <p className="text-gray-400 text-xs mt-1 font-sans">Every single burger patty is individually seared on a cast iron griddle to trap the fats, then finished over open red-hot rock flames for smoky flavor.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE CUSTOM BURGER BUILDER (STEP-BY-STEP STACKER) */}
      <section id="custom-burger-builder" className="py-20 bg-[#fdfbf7] border-b-4 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block bg-[#f77f00] text-white font-black text-xs px-4 py-1.5 border-2 border-black rotate-[-3deg] uppercase tracking-widest mb-4">
              ✨ Retro Science Laboratory ✨
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1a1a1a]">
              BUILD A <span className="text-[#d62828] underline">CADILLAC</span>
            </h2>
            <p className="text-gray-600 font-sans mt-2">
              Choose your custom stack layers! Watch your vintage masterpiece build itself in real time, calculate calories instantly, and drop it straight to your cart.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Stacking Control Board */}
            <div className="lg:col-span-5 bg-[#ffffff] p-6 rounded-2xl border-4 border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a]">
              <h4 className="text-lg font-black text-white bg-[#1a1a1a] px-3 py-1.5 inline-block uppercase tracking-wider mb-6">
                1. SELECT INGREDIENTS
              </h4>

              <div className="space-y-3">
                {BURGER_INGREDIENTS.map((ingredient) => {
                  const isChecked = customBurgerLayers.includes(ingredient.id);
                  return (
                    <button
                      key={ingredient.id}
                      onClick={() => toggleLayer(ingredient.id)}
                      className={`w-full flex items-center justify-between p-3 border-2 transition-all ${
                        isChecked 
                          ? 'border-[#d62828] bg-[#fff5f5] translate-x-1' 
                          : 'border-[#1a1a1a] bg-[#fdfbf7] hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{ingredient.image}</span>
                        <div className="text-left">
                          <p className="font-black text-sm text-[#1a1a1a]">{ingredient.name}</p>
                          <p className="text-[10px] font-sans text-gray-500 uppercase">{ingredient.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#d62828] text-sm">+${ingredient.price.toFixed(2)}</span>
                        <div className={`w-5 h-5 border-2 border-[#1a1a1a] rounded flex items-center justify-center ${isChecked ? 'bg-[#d62828]' : 'bg-white'}`}>
                          {isChecked && <Check size={12} className="text-white font-black" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom burger settings (Name option) */}
              <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200">
                <label className="block text-xs uppercase font-extrabold text-gray-500 mb-2">Give Your Burger a Retro Name:</label>
                <input
                  type="text"
                  value={customBurgerName}
                  onChange={(e) => setCustomBurgerName(e.target.value)}
                  placeholder="My Custom Cadillac"
                  className="w-full p-2.5 border-2 border-[#1a1a1a] bg-white text-sm focus:outline-none focus:border-[#d62828] font-bold"
                />
              </div>
            </div>

            {/* Middle Column: Visual Live Stack Assembly */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center bg-amber-50 py-12 rounded-3xl border-4 border-dashed border-[#fcbf49] min-h-[500px] relative overflow-hidden">
              
              <div className="absolute top-4 left-4 text-[10px] font-bold tracking-widest text-[#fcbf49] uppercase bg-[#1a1a1a] px-2 py-1">
                LIVE ASSEMBLED VISUAL
              </div>

              {/* Stack Visual rendering */}
              <div className="flex flex-col-reverse items-center justify-center w-full min-h-[340px] px-8 relative mt-6">
                
                {/* Burger Stack Loop with framer-motion stagger */}
                <AnimatePresence>
                  {customBurgerLayers.map((layerId, index) => {
                    const ing = BURGER_INGREDIENTS.find(i => i.id === layerId);
                    if (!ing) return null;

                    // Customize visual shapes of burger items to make them look retro
                    let shapeClass = "w-48 h-5 rounded-full my-0.5 border-2 border-black";
                    if (ing.id === 'top-bun') shapeClass = "w-52 h-14 rounded-t-full border-2 border-black shadow-md bg-amber-600";
                    else if (ing.id === 'bottom-bun') shapeClass = "w-48 h-8 rounded-b-xl border-2 border-black shadow-md bg-amber-600";
                    else if (ing.id === 'patty') shapeClass = "w-48 h-8 rounded-xl border-2 border-black bg-amber-950 shadow-inner";
                    else if (ing.id === 'cheese') shapeClass = "w-48 h-2 rounded-sm border-2 border-black bg-yellow-400 rotate-2";
                    else if (ing.id === 'tomato') shapeClass = "w-44 h-4 rounded-md border-2 border-black bg-red-600";
                    else if (ing.id === 'lettuce') shapeClass = "w-46 h-3 rounded-lg border-2 border-black bg-emerald-500 -rotate-1";
                    else if (ing.id === 'bacon') shapeClass = "w-48 h-2 rounded-sm border-2 border-black bg-red-800 rotate-3";

                    return (
                      <motion.div
                        key={layerId}
                        initial={{ y: -150, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 150, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        style={{ backgroundColor: ing.color, zIndex: index }}
                        className={`${shapeClass} flex items-center justify-center relative shadow-sm`}
                      >
                        <span className="text-[10px] text-white font-black uppercase drop-shadow tracking-wider select-none">
                          {ing.image} {ing.name.split(' (')[0]}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Empty plate at bottom */}
                <div className="w-56 h-4 bg-white border-2 border-black rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.15)] mt-3 z-0" />
                <div className="w-40 h-1 bg-[#1a1a1a] opacity-25 rounded-full filter blur-xs mt-1" />
              </div>
            </div>

            {/* Right Side: Price, Nutrition, and Final add button */}
            <div className="lg:col-span-3 space-y-6">
              
              <div className="bg-[#1a1a1a] text-white p-6 border-4 border-[#00b4d8] rounded-xl text-center shadow-[4px_4px_0px_#1a1a1a]">
                <p className="text-[#00b4d8] text-xs font-black tracking-widest uppercase">ESTIMATED NUTRITION</p>
                
                <div className="my-4">
                  <span className="text-4xl font-black text-white">
                    {customBurgerLayers.reduce((total, layerId) => {
                      return total + (layerId === 'patty' ? 240 : layerId === 'bacon' ? 120 : layerId === 'cheese' ? 90 : 30);
                    }, 200)}
                  </span>
                  <span className="text-xs text-gray-400 block uppercase font-bold mt-1">Total Calories (kcal)</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-300 border-t border-gray-700 pt-3">
                  <div>
                    <span className="font-bold text-white block">24g</span>
                    <span>Proteins</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block">48g</span>
                    <span>Fats</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#fcbf49] text-black p-6 border-4 border-black rounded-xl text-center shadow-[4px_4px_0px_#1a1a1a]">
                <p className="text-xs font-black tracking-widest uppercase">CUSTOM PRICE</p>
                
                <div className="my-3">
                  <span className="text-4xl font-extrabold text-[#1a1a1a]">
                    ${customBurgerLayers.reduce((total, layerId) => {
                      const ing = BURGER_INGREDIENTS.find(i => i.id === layerId);
                      return total + (ing ? ing.price : 0);
                    }, 4.00).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-700 block uppercase font-bold mt-1">Includes grill prep fee</span>
                </div>

                <button
                  onClick={addCustomBurgerToCart}
                  disabled={customBurgerLayers.length <= 2}
                  className={`w-full py-3 mt-2 font-black text-sm uppercase border-2 border-black shadow-[3px_3px_0px_#1a1a1a] transition-all transform active:translate-x-[2px] active:translate-y-[2px] ${
                    customBurgerLayers.length <= 2 
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                      : 'bg-[#d62828] text-white hover:bg-[#b52121]'
                  }`}
                >
                  🍔 ADD CUSTOM BURGER TO BAG
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CHOOSE YOUR FLAVOR: VINTAGE MENU GRID */}
      <section id="menu" className="py-20 bg-[#fcbf49] relative">
        <div style={CHECKERED_BG_RED} className="h-4 w-full absolute top-0 left-0 border-b border-black" />

        <div className="max-w-7xl mx-auto px-4 mt-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-[#d62828] font-black tracking-widest uppercase text-xs block">★ FRESH OFF THE GRILL & GRIDDLE ★</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase text-[#1a1a1a]">DINER FAVORITES</h2>
            </div>

            {/* Retro Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {(['burgers', 'shakes', 'sides', 'desserts'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#1a1a1a] transition-all transform hover:-translate-y-0.5 ${
                    activeTab === tab 
                      ? 'bg-[#d62828] text-white' 
                      : 'bg-[#fdfbf7] text-[#1a1a1a]'
                  }`}
                >
                  {tab} {tab === 'burgers' ? '🍔' : tab === 'shakes' ? '🥤' : tab === 'sides' ? '🍟' : '🥧'}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_ITEMS.filter(item => item.category === activeTab).map((item) => (
              <div 
                key={item.id}
                style={{ backgroundColor: item.color }}
                className="group relative border-4 border-[#1a1a1a] rounded-none p-6 shadow-[6px_6px_0px_#1a1a1a] hover:shadow-[10px_10px_0px_#1a1a1a] transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Decorative retro angle stars */}
                <div className="absolute top-2 right-2 opacity-15 text-3xl group-hover:opacity-40 transition-opacity">★</div>

                {/* Badge top */}
                {item.badge && (
                  <div className="absolute -top-3 left-4 bg-[#1a1a1a] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 border border-white rotate-[-2deg]">
                    {item.badge}
                  </div>
                )}

                <div>
                  {/* Image and name line */}
                  <div className="flex justify-between items-start mt-2">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300 select-none">{item.image}</span>
                    <div className="bg-[#1a1a1a] text-[#fcbf49] text-lg font-black px-2.5 py-1 border border-black rotate-[2deg]">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-tight text-[#1a1a1a] mt-4 mb-2 group-hover:text-[#d62828] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-700 font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="border-t-2 border-dashed border-gray-400 pt-4 flex items-center justify-between mt-auto">
                  <div className="text-[10px] uppercase font-extrabold text-gray-500 space-y-0.5">
                    <p>🔥 {item.calories} kcal</p>
                    <p className="flex items-center gap-0.5 text-[#f77f00]">⭐ {item.rating} rating</p>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-[#1a1a1a] hover:bg-[#d62828] text-white font-extrabold text-xs uppercase px-4 py-2.5 border-2 border-black shadow-[2px_2px_0px_#fcbf49] hover:shadow-[2px_2px_0px_#1a1a1a] transition-all transform active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    ADD TO BAG +
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Sizzling Bottom Callout */}
          <div className="mt-16 bg-[#1a1a1a] text-white p-6 rounded-none border-4 border-white shadow-[8px_8px_0px_#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🚨</span>
              <div>
                <h4 className="font-black text-lg text-[#fcbf49] uppercase tracking-wider">COUPON CODE UNLOCKED!</h4>
                <p className="text-xs text-gray-300 font-sans">Apply coupon code <strong className="text-white underline">RETRO50</strong> inside the vintage shopping bag drawer for half-price off total order!</p>
              </div>
            </div>
            <button
              onClick={() => {
                setPromoCode('RETRO50');
                setIsCartOpen(true);
              }}
              className="bg-[#fcbf49] text-[#1a1a1a] font-black px-6 py-3 text-xs uppercase tracking-widest border-2 border-white hover:bg-white transition-colors shrink-0"
            >
              APPLY NOW
            </button>
          </div>

        </div>

        <div style={CHECKERED_BG_RED} className="h-4 w-full absolute bottom-0 left-0 border-t border-black" />
      </section>

      {/* CADILLAC DINER GUEST BOOK / COMMENTS SECTION */}
      <section className="py-20 bg-[#fdfbf7] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Guestbook input form */}
          <div className="lg:col-span-5 bg-[#ffffff] p-6 rounded-2xl border-4 border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a]">
            <span className="text-xs font-black text-[#d62828] uppercase tracking-widest block mb-1">✍️ GUESTBOOK NOTES</span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a] mb-6">LEAVE A DINER COMMENT!</h3>

            <form onSubmit={handleAddComment} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-extrabold text-gray-500 mb-1">Your Diner Name/Handle:</label>
                <input
                  type="text"
                  required
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  placeholder="e.g. Danny Zuko"
                  className="w-full p-2.5 border-2 border-[#1a1a1a] bg-white text-sm focus:outline-none focus:border-[#d62828] font-bold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-gray-500 mb-1">Rating (1 to 5 Stars):</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewCommentRating(star)}
                      className={`text-2xl transition-transform hover:scale-125 ${newCommentRating >= star ? 'text-[#fcbf49]' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-gray-500 mb-1">Feedback / Message:</label>
                <textarea
                  required
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Write your nostalgic burger thoughts here..."
                  className="w-full p-2.5 border-2 border-[#1a1a1a] bg-white text-sm focus:outline-none focus:border-[#d62828] font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#d62828] hover:bg-[#b52121] text-white font-black py-3 border-2 border-black shadow-[3px_3px_0px_#1a1a1a] uppercase text-xs tracking-wider transition-all transform active:translate-x-[1px] active:translate-y-[1px]"
              >
                SIGN THE GUEST BOOK 🕺
              </button>
            </form>
          </div>

          {/* List of comments rendering */}
          <div className="lg:col-span-7 space-y-4 max-h-[460px] overflow-y-auto pr-2">
            <h4 className="font-extrabold text-[#1a1a1a] text-lg uppercase flex items-center gap-2">
              <MessageSquare size={18} className="text-[#f77f00]" /> Recent Customer Memories ({guestBook.length})
            </h4>

            <div className="space-y-4">
              {guestBook.map((entry) => (
                <div key={entry.id} className="bg-white p-4 rounded-xl border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#fcbf49] transition-all hover:translate-y-[-1px]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl bg-gray-100 p-1.5 rounded-full border border-black">{entry.avatar}</span>
                      <div>
                        <h5 className="font-black text-sm text-[#1a1a1a]">{entry.name}</h5>
                        <p className="text-[10px] text-gray-500">{entry.date}</p>
                      </div>
                    </div>
                    <div className="text-xs text-[#fcbf49]">
                      {'★'.repeat(entry.rating)}
                      {'☆'.repeat(5 - entry.rating)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-sans italic leading-relaxed">
                    "{entry.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* MOCK MAP / STORE FINDER / HOURS SECTION */}
      <section className="py-12 bg-[#1a1a1a] text-white relative border-t-4 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#fcbf49]">
              <MapPin size={20} />
              <h5 className="font-black uppercase tracking-wider text-base">DINER LOCATION</h5>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              1956 Route 66 Parkway, <br />
              Albuquerque, New Mexico NM 87104
            </p>
            <p className="text-[10px] text-gray-400 font-mono italic">
              *Right behind the iconic Cadillac neon sign archway!
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#00b4d8]">
              <Clock size={20} />
              <h5 className="font-black uppercase tracking-wider text-base">OPERATING HOURS</h5>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              Mon - Thu: 6:00 AM - Midnight <br />
              Fri - Sun: <strong className="text-white underline">OPEN 24 HOURS</strong>
            </p>
            <p className="text-[10px] text-gray-400 font-mono">
              Serving breakfast, lunch, dinner & late night shakes.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#e63946]">
              <Smartphone size={20} />
              <h5 className="font-black uppercase tracking-wider text-base">HOTLINE TELEPHONE</h5>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              (505) 1956-CARB <br />
              (505) 555-MALT
            </p>
            <p className="text-[10px] text-gray-400 font-mono">
              Call ahead to reserve our retro red vinyl leather booths!
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER CHECKERED BAR & COPYRIGHTS */}
      <footer className="pt-8 text-center text-xs text-gray-500 font-mono space-y-4">
        <div className="flex justify-center items-center gap-4">
          <span className="text-xl">🍔</span>
          <span className="text-xl">🥤</span>
          <span className="text-xl">🍟</span>
          <span className="text-xl">🥧</span>
        </div>
        <p className="uppercase tracking-widest font-extrabold text-[#1a1a1a]">
          © {new Date().getFullYear()} CADILLAC DINER CORP. ALL VINTAGE RIGHTS RESERVED.
        </p>
        <p className="text-[10px] text-gray-400 max-w-md mx-auto font-sans leading-normal px-4">
          All images, pricing models, and customizable stack items are simulation graphics. Made with extreme retro appreciation and calorie overload!
        </p>
      </footer>


      {/* --- CART DRAWER OVERLAY --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#fdfbf7] border-l-4 border-[#1a1a1a] z-50 flex flex-col justify-between shadow-2xl"
            >
              
              {/* Drawer Header */}
              <div className="p-4 border-b-2 border-black bg-[#1a1a1a] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛍️</span>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wider">YOUR VINTAGE ORDER BAG</h3>
                    <p className="text-[10px] text-[#fcbf49] font-mono">Cadillac Diner - Quick Check out</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#d62828] text-white p-1 rounded hover:bg-red-700 border border-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Checkered Spacer bar */}
              <div style={CHECKERED_BG_RED} className="h-2 w-full border-b border-black" />

              {/* Drawer Content Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <span className="text-6xl block animate-bounce">🥤</span>
                    <h4 className="font-black text-[#1a1a1a] uppercase text-sm">Your vintage bag is totally empty!</h4>
                    <p className="text-xs text-gray-500 font-sans">Hop over to our vintage burger menus and begin stacking tasty old-school meals!</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                      }}
                      className="bg-[#fcbf49] text-black font-black text-xs px-4 py-2 border-2 border-black"
                    >
                      BROWSE BURGERS NOW
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((cartItem) => {
                      const isCustom = cartItem.isCustom;
                      const item = cartItem.item;
                      const uniqueId = isCustom ? (item as CustomBurger).id : item.id;

                      return (
                        <div 
                          key={`${uniqueId}-${isCustom ? 'custom' : 'regular'}`}
                          className="bg-white p-3 border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] flex justify-between gap-3 relative"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{item.image}</span>
                              <div>
                                <h4 className="font-black text-xs text-[#1a1a1a] uppercase">
                                  {item.name}
                                </h4>
                                {isCustom && (
                                  <span className="bg-[#00b4d8] text-white text-[9px] font-black px-1.5 py-0.5 border border-black uppercase tracking-widest mt-0.5 inline-block">
                                    Custom Stacked
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-[10px] text-gray-500 font-sans mt-1">
                              {isCustom 
                                ? `Includes: ${(item as CustomBurger).layers.join(', ')}` 
                                : (item as MenuItem).description.slice(0, 50) + '...'}
                            </p>

                            <p className="text-xs font-black text-[#d62828] mt-2">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>

                          <div className="flex flex-col justify-between items-end">
                            <button
                              onClick={() => removeFromCart(uniqueId, isCustom)}
                              className="text-gray-400 hover:text-[#d62828] p-1"
                            >
                              <Trash2 size={14} />
                            </button>

                            <div className="flex items-center border-2 border-[#1a1a1a] bg-white text-xs font-black">
                              <button
                                onClick={() => updateCartQuantity(uniqueId, -1, isCustom)}
                                className="px-1.5 py-1 bg-gray-100 border-r-2 border-[#1a1a1a] hover:bg-gray-200"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="px-2.5 text-xs">{cartItem.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(uniqueId, 1, isCustom)}
                                className="px-1.5 py-1 bg-gray-100 border-l-2 border-[#1a1a1a] hover:bg-gray-200"
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Drawer Footer Price details */}
              {cart.length > 0 && (
                <div className="p-4 bg-white border-t-2 border-black space-y-4">
                  
                  {/* Promo Input Section */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER PROMO CODE..."
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 text-xs font-bold uppercase p-2 border-2 border-[#1a1a1a] focus:outline-none"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-[#1a1a1a] hover:bg-black text-white px-3 font-black text-xs uppercase"
                    >
                      APPLY
                    </button>
                  </div>

                  {/* Calculations breakdown */}
                  <div className="space-y-1 text-xs border-b border-dashed border-gray-300 pb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-extrabold text-[#1a1a1a]">${calculateSubtotal().toFixed(2)}</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-[#d62828]">
                        <span>Discount ({appliedPromo.code}):</span>
                        <span className="font-extrabold">-${calculateDiscount().toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">State Diner Tax (8%):</span>
                      <span className="font-extrabold text-[#1a1a1a]">${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center my-2">
                    <span className="font-black text-sm uppercase text-[#1a1a1a]">TOTAL OLD-SCHOOL DUE:</span>
                    <span className="text-2xl font-black text-[#d62828]">${calculateTotal()}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#fcbf49] hover:bg-yellow-400 text-black font-black py-4 border-2 border-black shadow-[4px_4px_0px_#1a1a1a] text-center uppercase text-sm tracking-wider"
                  >
                    🚀 TRANSMIT ORDER FOR COOKING!
                  </button>
                  
                  <p className="text-[10px] text-center text-gray-500 font-sans">
                    By submitting your transmission, you confirm that you love delicious burgers.
                  </p>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- RECEIPT MODAL POPUP after checking out --- */}
      <AnimatePresence>
        {showReceipt && lastReceipt && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-sm w-full border-4 border-[#1a1a1a] shadow-[8px_8px_0px_#000] p-6 text-[#1a1a1a] relative font-mono text-xs overflow-hidden"
            >
              
              {/* Retro decorative checkered line */}
              <div style={CHECKERED_BG_BLACK} className="h-2 w-full absolute top-0 left-0" />

              {/* Receipt Header logo */}
              <div className="text-center pt-4 pb-6 border-b-2 border-dashed border-[#1a1a1a]">
                <h3 className="text-xl font-black uppercase tracking-tight text-[#1a1a1a]">CADILLAC DINER</h3>
                <p className="text-[10px] uppercase text-gray-500 font-sans">Route 66, Albuquerque NM</p>
                <p className="text-[10px] text-gray-400 font-sans">ORDER TRANSMISSION CONFIRMED!</p>
                
                <div className="mt-4 bg-[#1a1a1a] text-[#fcbf49] py-1 px-4 inline-block font-black text-sm border border-black rotate-[-2deg]">
                  ORDER #{lastReceipt.orderId}
                </div>
              </div>

              {/* Receipt Details and items map */}
              <div className="py-4 space-y-3">
                <p className="font-bold text-gray-500 text-[10px] uppercase">ITEMS PURCHASED:</p>
                
                <div className="space-y-1">
                  {lastReceipt.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs font-sans">
                      <span className="text-[#1a1a1a]">
                        <span className="font-bold font-mono">{item.quantity}x</span> {item.item.name}
                      </span>
                      <span className="font-bold font-mono">${(item.item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-gray-300 pt-3 text-[11px] font-sans space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono">${(lastReceipt.total / 1.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span className="font-mono">${(lastReceipt.total - (lastReceipt.total / 1.08)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#d62828] border-t border-dashed border-[#1a1a1a] pt-2 font-mono">
                    <span>TOTAL PAID:</span>
                    <span>${lastReceipt.total}</span>
                  </div>
                </div>
              </div>

              {/* Success animation decorative elements */}
              <div className="bg-amber-50 p-3 rounded text-center border-2 border-dashed border-[#fcbf49] my-4">
                <p className="font-extrabold uppercase text-[10px] text-[#1a1a1a] flex items-center justify-center gap-1">
                  <Flame size={12} className="text-[#d62828]" /> SIZZLING COOKING UNDERWAY!
                </p>
                <p className="text-[9px] text-gray-500 font-sans mt-1">Our kitchen griddle just received your order data! Your meals will be prepared within 15 minutes.</p>
              </div>

              {/* Action buttons footer */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="w-full bg-[#1a1a1a] hover:bg-black text-white font-black py-2.5 uppercase text-xs text-center border border-black"
                >
                  🖨️ PRINT RECEIPT
                </button>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="w-full bg-[#d62828] hover:bg-[#b52121] text-white font-black py-2.5 uppercase text-xs text-center border border-black shadow-[2px_2px_0px_#1a1a1a]"
                >
                  CLOSE & ORDER MORE!
                </button>
              </div>

              {/* Retro barcode */}
              <div className="mt-6 flex flex-col items-center">
                <div className="h-8 w-48 bg-gray-200 border-l-2 border-r-2 border-[#1a1a1a] flex items-center justify-around opacity-45">
                  <div className="w-1 bg-[#1a1a1a] h-full" />
                  <div className="w-2 bg-[#1a1a1a] h-full" />
                  <div className="w-1 bg-[#1a1a1a] h-full" />
                  <div className="w-3 bg-[#1a1a1a] h-full" />
                  <div className="w-1 bg-[#1a1a1a] h-full" />
                  <div className="w-2 bg-[#1a1a1a] h-full" />
                  <div className="w-1 bg-[#1a1a1a] h-full" />
                </div>
                <p className="text-[9px] text-gray-400 font-mono mt-1">THANK YOU FOR CHOOSING CADILLAC DINER!</p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}