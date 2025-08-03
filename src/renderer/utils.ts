/**
 * Renderer Utilities
 *
 * Utility functions for chart rendering operations including price formatting,
 * time formatting, price range calculations, and data validation. Provides
 * essential helper functions for chart generation and coordinate system setup.
 */

import type { PriceRange } from './types'

import type { ChartOptions } from '@/types/types'

/**
 * Formats price values with appropriate decimal precision
 *
 * Converts numerical price values to formatted strings with decimal
 * places optimized for readability. Uses different precision levels
 * based on price magnitude for optimal display across various
 * financial instruments and price ranges.
 *
 * @param price - Numerical price value to format
 * @returns Formatted price string with appropriate decimal places
 */
export function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toFixed(0)
  } else if (price >= 100) {
    return price.toFixed(1)
  } else if (price >= 10) {
    return price.toFixed(2)
  } else {
    return price.toFixed(4)
  }
}

/**
 * Formats timestamp to human-readable time string
 *
 * Converts Unix timestamp to localized time string with appropriate
 * formatting for different time contexts. Shows time only for today's
 * data and includes date for historical data points.
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted time string in local timezone
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  if (isToday) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}

/**
 * Calculates price range with scaling options
 *
 * Determines the minimum, maximum, and range values for chart scaling
 * with support for automatic padding, manual scale factors, and
 * minimum/maximum scale limits. Enables flexible chart scaling for
 * optimal price visualization across different market conditions.
 *
 * @param ohlc - Array of OHLC candle data for price range calculation
 * @param config - Chart configuration with scaling options
 * @returns Price range object with min, max, and range values
 */
export function calculatePriceRange(
  ohlc: Array<{ time: number; open: number; high: number; low: number; close: number; volume?: number }>,
  config: ChartOptions
): PriceRange {
  const prices = ohlc.flatMap(candle => [candle.high, candle.low])
  let minPrice = Math.min(...prices)
  let maxPrice = Math.max(...prices)
  if (config.scale?.autoScale) {
    const padding = 0.05
    const range = maxPrice - minPrice
    minPrice -= range * padding
    maxPrice += range * padding
  }
  if (config.scale?.x) {
    const centerX = (minPrice + maxPrice) / 2
    const rangeX = (maxPrice - minPrice) * config.scale.x
    minPrice = centerX - rangeX / 2
    maxPrice = centerX + rangeX / 2
  }
  if (config.scale?.y) {
    const centerY = (minPrice + maxPrice) / 2
    const rangeY = (maxPrice - minPrice) * config.scale.y
    minPrice = centerY - rangeY / 2
    maxPrice = centerY + rangeY / 2
  }
  if (config.scale?.minScale !== undefined) {
    minPrice = Math.max(minPrice, config.scale.minScale)
  }
  if (config.scale?.maxScale !== undefined) {
    maxPrice = Math.min(maxPrice, config.scale.maxScale)
  }
  const priceRange = maxPrice - minPrice
  return { minPrice, maxPrice, priceRange }
}

/**
 * Checks if volume data is available in OHLC data
 *
 * Validates whether the provided OHLC data contains meaningful volume
 * information for volume bar rendering. Ensures volume data exists
 * and is greater than zero for accurate volume visualization.
 *
 * @param ohlc - Array of OHLC candle data to check for volume
 * @returns True if volume data exists and is greater than zero
 */
export function hasVolumeData(
  ohlc: Array<{ time: number; open: number; high: number; low: number; close: number; volume?: number }>
): boolean {
  return ohlc.some(candle => candle.volume !== undefined && candle.volume > 0)
}
