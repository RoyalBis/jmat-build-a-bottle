export interface Whiskey {
  name: string
  description: string
  mix: string
  location: string
  color: string
  nose: string
  palette: string
}

export interface Bottle {
  name: string
  value: string
  dimensions: string
  volume: string
}

export interface BottleTop {
  name: string
  value: string
  color: string
  icon?: string
}
