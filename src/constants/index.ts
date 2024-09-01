import type { Whiskey, Bottle, BottleTop } from '@/types'

import {
  EssexBlackWax,
  EssexCopperWax,
  EssexGoldWax,
  EssexGunmetalGreyWax,
  EssexHunterGreenWax,
  EssexLightBlueWax,
  EssexLightGreenWax,
  EssexNavyWax,
  EssexOrangeWax,
  EssexPearlGreenWax,
  EssexPurpleWax,
  EssexRedWax,
  EssexRoyalBlueWax,
  EssexSilverWax,
  EssexWhiteWax,
  EssexYellowWax,
  GettyBlackWax,
  GettyCopperWax,
  GettyGoldWax,
  GettyGunmetalGreyWax,
  GettyHunterGreenWax,
  GettyLightBlueWax,
  GettyLightGreenWax,
  GettyNavyWax,
  GettyOrangeWax,
  GettyPearlGreenWax,
  GettyPurpleWax,
  GettyRedWax,
  GettyRoyalBlueWax,
  GettySilverWax,
  GettyWhiteWax,
  BlackwellBlackWax,
  BlackwellCopperWax,
  BlackwellGoldWax,
  BlackwellGunmetalGreyWax,
  BlackwellHunterGreenWax,
  BlackwellLightBlueWax,
  BlackwellLightGreenWax,
  BlackwellNavyWax,
  BlackwellOrangeWax,
  BlackwellPearlGreenWax,
  BlackwellPurpleWax,
  BlackwellRedWax,
  BlackwellRoyalBlueWax,
  BlackwellSilverWax,
  BlackwellWhiteWax
} from '@/assets'

export const whiskeys: Array<Whiskey> = [
  {
    name: 'Bourbon',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ornare felis consequat neque accumsan sed.',
    mix: '75% Corn, 21% Rye, and 4% Malted Barley',
    location: 'Indiana',
    color: 'Coppery Brown Sugar',
    nose: 'A classic bourbon aroma of smoke, oak, and leather with light spice and cashews.',
    palette:
      'An onset of caramel, vanilla, and mixed nuts, with leather and smokey oak mid-palate, and finishes bringing back the sweet caramel and nutty notes.'
  },
  {
    name: 'Kentucky Bourbon',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ornare felis consequat neque accumsan sed.',
    mix: '78% Corn, 10% Rye, 12% Malted Barley',
    location: 'Kentucky',
    color: 'Bright Amber',
    nose: 'A pleasing buttery caramel nose mixed with roasted peanuts and traces of apricot.',
    palette:
      'Pleasant leathery oak paired with dark chocolate and roasted peanuts, with a creamy caramel finish and lingering notes of stone fruit.'
  },
  {
    name: 'Rye',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ornare felis consequat neque accumsan sed.',
    mix: '95% Rye and 5% Malted Barley',
    location: 'Indiana',
    color: 'Burnt Amber',
    nose: 'An explosion of baking spice and complex brown sugar with subtle hints of fruit.',
    palette:
      'Smooth caramel with notes of brown sugar and baking spice. Leathery oak and dried orange peel leave a lingering dryness on the tongue that asks for a second sip.'
  }
]

export const bottles: Array<Bottle> = [
  {
    name: 'Blackwell',
    value: 'Blackwell',
    dimensions: '9.8” H X 3.28” W',
    volume: '750mL'
  },
  {
    name: 'Getty',
    value: 'Getty',
    dimensions: '11.5” H X 3.5" W',
    volume: '750mL'
  },
  {
    name: 'Essex',
    value: 'Essex',
    dimensions: '12” H X 3” W',
    volume: '750mL'
  }
]

export const bottleTops: Array<BottleTop> = [
  {
    color: '#9B2929',
    name: 'Red Wax',
    value: 'RedWax'
  },
  {
    color: '#EA7737',
    name: 'Orange Wax',
    value: 'OrangeWax'
  },
  {
    color: '#CD6B24',
    name: 'Copper Wax',
    value: 'CopperWax'
  },
  {
    color: '#D5A836',
    name: 'Gold Wax',
    value: 'GoldWax'
  },
  {
    color: '#ECD71B',
    name: 'Yellow Wax',
    value: 'YellowWax'
  },
  {
    color: '#A1D183',
    name: 'Light Green Wax',
    value: 'LightGreenWax'
  },
  {
    color: '#C9FFC4',
    name: 'Pearl Green Wax',
    value: 'PearlGreenWax'
  },
  {
    color: '#4E833B',
    name: 'Hunter Green Wax',
    value: 'HunterGreenWax'
  },
  {
    color: '#6FCBE0',
    name: 'Light Blue Wax',
    value: 'LightBlueWax'
  },
  {
    color: '#4C7FBC',
    name: 'Navy Wax',
    value: 'NavyWax'
  },
  {
    color: '#293EB2',
    name: 'Royal Blue Wax',
    value: 'RoyalBlueWax'
  },
  {
    color: '#6947C8',
    name: 'Purple Wax',
    value: 'PurpleWax'
  },
  {
    color: '#FFF7F2',
    name: 'White Wax',
    value: 'WhiteWax'
  },
  {
    color: '#B1B1B1',
    name: 'Silver Wax',
    value: 'SilverWax'
  },
  {
    color: '#040404',
    name: 'Black Wax',
    value: 'BlackWax'
  },
  {
    color: '#606060',
    name: 'Gunmetal Grey Wax',
    value: 'GunmetalGreyWax'
  }
]

export const variantImages = [
  EssexBlackWax,
  EssexCopperWax,
  EssexGoldWax,
  EssexGunmetalGreyWax,
  EssexHunterGreenWax,
  EssexLightBlueWax,
  EssexLightGreenWax,
  EssexNavyWax,
  EssexOrangeWax,
  EssexPearlGreenWax,
  EssexPurpleWax,
  EssexRedWax,
  EssexRoyalBlueWax,
  EssexSilverWax,
  EssexWhiteWax,
  EssexYellowWax,
  GettyBlackWax,
  GettyCopperWax,
  GettyGoldWax,
  GettyGunmetalGreyWax,
  GettyHunterGreenWax,
  GettyLightBlueWax,
  GettyLightGreenWax,
  GettyNavyWax,
  GettyOrangeWax,
  GettyPearlGreenWax,
  GettyPurpleWax,
  GettyRedWax,
  GettyRoyalBlueWax,
  GettySilverWax,
  GettyWhiteWax,
  BlackwellBlackWax,
  BlackwellCopperWax,
  BlackwellGoldWax,
  BlackwellGunmetalGreyWax,
  BlackwellHunterGreenWax,
  BlackwellLightBlueWax,
  BlackwellLightGreenWax,
  BlackwellNavyWax,
  BlackwellOrangeWax,
  BlackwellPearlGreenWax,
  BlackwellPurpleWax,
  BlackwellRedWax,
  BlackwellRoyalBlueWax,
  BlackwellSilverWax,
  BlackwellWhiteWax
]
