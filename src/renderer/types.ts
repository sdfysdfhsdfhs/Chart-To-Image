/**
 * Renderer Types
 *
 * Type definitions for chart rendering components including data structures,
 * dimension configurations, price ranges, and watermark settings. Provides
 * comprehensive type safety for all chart rendering operations.
 */

import type { ChartOptions } from '@/types/types'

/**
 * Chart data structure for Node.js renderer
 *
 * Contains all necessary data for chart rendering including OHLC values,
 * horizontal levels, and configuration settings. Provides complete
 * data encapsulation for chart generation workflows.
 */
export interface NodeChartData {
  ohlc: Array<{
    time: number
    open: number
    high: number
    low: number
    close: number
    volume?: number
  }>
  levels?: Array<{
    value: number
    color: string
    lineStyle: 'solid' | 'dotted'
    label?: string
  }>
  config: ChartOptions
}

/**
 * Chart dimensions and margin configuration
 *
 * Defines the complete dimensional layout of the chart including
 * overall size, margin settings, and available drawing area.
 * Provides precise coordinate system for chart element positioning.
 */
export interface ChartDimensions {
  width: number
  height: number
  margin: {
    top: number
    bottom: number
    left: number
    right: number
  }
  chartWidth: number
  chartHeight: number
}

/**
 * Price range for chart scaling
 *
 * Defines the minimum, maximum, and range values for price scaling
 * across the chart coordinate system. Enables accurate price-to-pixel
 * conversion for all chart elements and price-based visualizations.
 */
export interface PriceRange {
  minPrice: number
  maxPrice: number
  priceRange: number
}

/**
 * Watermark configuration settings
 *
 * Defines watermark text, positioning, styling, and opacity settings
 * for chart overlays. Supports multiple positioning options and
 * customizable appearance for branding and attribution purposes.
 */
export interface WatermarkConfig {
  text: string
  position?: 'top' | 'center' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  color?: string
  fontSize?: number
  opacity?: number
}
