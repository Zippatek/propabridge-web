import type { ReactElement } from 'react';

import type { LucideIcon } from 'lucide-react';
import {
  Armchair,
  ArrowUpDown,
  Bath,
  Building2,
  Bus,
  Car,
  Droplets,
  Dumbbell,
  FerrisWheel,
  Flame,
  Flower2,
  GraduationCap,
  Home,
  Lock,
  Package,
  Shield,
  Shirt,
  ShoppingBag,
  Sparkles,
  SquareArrowOutUpRight,
  Sun,
  TrainFront,
  TreePine,
  Trophy,
  Utensils,
  Video,
  Waves,
  Wifi,
} from 'lucide-react';

/** Lowercase, strip accents, unify slashes/hyphens for keyword matching. */
export function normalizeAmenityLabel(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[/\\,_]+/g, ' ')
    .replace(/[-–—]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Match phrase as substring, or as whole word for single-token phrases (avoids `car` in `care`). */
function labelMatches(normalizedLabel: string, phrase: string): boolean {
  const p = phrase.trim().toLowerCase();
  if (!p) return false;
  if (p.includes(' ')) return normalizedLabel.includes(p);
  const re = new RegExp(`(^|[^a-z0-9])${escapeRegex(p)}([^a-z0-9]|$)`);
  return re.test(normalizedLabel);
}

type PhraseIcon = { phrases: string[]; Icon: LucideIcon };

/** Longer / more specific phrases first within reason; first matching rule wins. */
const PHRASE_ICONS: PhraseIcon[] = [
  { phrases: ['walk-in closet', 'walk in closet'], Icon: Package },
  { phrases: ['highway access'], Icon: SquareArrowOutUpRight },
  { phrases: ['near bus stop', 'bus stop'], Icon: Bus },
  { phrases: ['boys quarters', 'boys quarter', 'b q', 'bq'], Icon: Home },
  { phrases: ['swimming pool', 'pool'], Icon: Waves },
  { phrases: ['clubhouse', 'club house'], Icon: Building2 },
  { phrases: ['solar panel', 'solar power', 'solar', 'inverter'], Icon: Sun },
  { phrases: ['borehole', 'water treatment', 'bore hole'], Icon: Droplets },
  { phrases: ['cctv', 'surveillance', 'camera'], Icon: Video },
  { phrases: ['wifi', 'wi fi', 'internet', 'broadband'], Icon: Wifi },
  { phrases: ['laundry', 'washing'], Icon: Shirt },
  { phrases: ['playground', 'play ground'], Icon: FerrisWheel },
  { phrases: ['elevator', 'lift'], Icon: ArrowUpDown },
  { phrases: ['mall', 'shopping centre', 'shopping center', 'supermarket'], Icon: ShoppingBag },
  { phrases: ['train', 'metro', 'rail', 'station'], Icon: TrainFront },
  { phrases: ['fire safety', 'fire place', 'fireplace', 'fire pit'], Icon: Flame },
  { phrases: ['gated', 'gate', 'estate gate'], Icon: Lock },
  { phrases: ['sports', 'tennis', 'basketball', 'court', 'stadium'], Icon: Trophy },
  { phrases: ['gym', 'fitness', 'exercise'], Icon: Dumbbell },
  { phrases: ['parking', 'garage', 'car park', 'carpark'], Icon: Car },
  { phrases: ['security', 'guard', 'patrol'], Icon: Shield },
  { phrases: ['school', 'university', 'college', 'academy'], Icon: GraduationCap },
  { phrases: ['terrace', 'patio', 'deck'], Icon: Armchair },
  { phrases: ['garden', 'lawn', 'yard'], Icon: Flower2 },
  { phrases: ['kitchen', 'fitted kitchen', 'pantry'], Icon: Utensils },
  { phrases: ['balcony', 'veranda'], Icon: Home },
  { phrases: ['park', 'green area', 'recreation ground'], Icon: TreePine },
  { phrases: ['jacuzzi', 'hot tub', 'sauna', 'spa'], Icon: Bath },
];

const FALLBACK_ICON = Sparkles;

const SIZE_DEFAULT = 18;

export function amenityIconForLabel(
  normalized: string,
  size: number = SIZE_DEFAULT,
): ReactElement {
  const n = normalized;
  for (const { phrases, Icon } of PHRASE_ICONS) {
    for (const phrase of phrases) {
      if (labelMatches(n, phrase)) {
        return <Icon size={size} aria-hidden className="shrink-0" focusable={false} />;
      }
    }
  }
  return <FALLBACK_ICON size={size} aria-hidden className="shrink-0" focusable={false} />;
}
