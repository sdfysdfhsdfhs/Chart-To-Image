/**
 * Chart Type Renderers
 *
 * Individual renderers for different chart visualization types including
 * candlestick, line, area, Heikin-Ashi, and Renko charts. Each renderer
 * implements specific drawing algorithms optimized for their respective
 * chart type and trading analysis requirements.
 */

import type { CanvasRenderingContext2D } from 'canvas'

import type { ChartDimensions, PriceRange } from './types'

import type { ChartOptions } from '@/types/types'

/**
 * OHLC candle data structure for chart rendering
 */
interface ChartOHLC {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume?: number | undefined
}

/**
 * Renko block data structure with directional information
 */
interface RenkoBlock extends ChartOHLC {
  direction: number
}

/**
 * Abstract base class for chart type renderers
 *
 * Provides common functionality and interface for all chart type renderers.
 * Defines the standard constructor and render method that all chart
 * renderers must implement for consistent chart generation.
 */
export abstract class ChartTypeRenderer {
  protected ctx: CanvasRenderingContext2D
  protected dimensions: ChartDimensions
  protected priceRange: PriceRange
  protected config: ChartOptions

  /**
   * Creates a new chart type renderer instance
   *
   * Initializes the renderer with canvas context, chart dimensions,
   * price range for scaling, and configuration options. Sets up the
   * common properties used by all chart type renderers.
   *
   * @param ctx - Canvas rendering context for drawing operations
   * @param dimensions - Chart dimensions and margin configuration
   * @param priceRange - Price range for coordinate scaling
   * @param config - Chart styling and configuration options
   */
  constructor(
    ctx: CanvasRenderingContext2D,
    dimensions: ChartDimensions,
    priceRange: PriceRange,
    config: ChartOptions
  ) {
    this.ctx = ctx
    this.dimensions = dimensions
    this.priceRange = priceRange
    this.config = config
  }

  /**
   * Renders chart data to canvas
   *
   * Abstract method that must be implemented by each chart type renderer.
   * Handles the specific drawing logic for the chart type including
   * coordinate calculations, styling, and visual elements.
   *
   * @param candles - Array of OHLC candle data for rendering
   */
  // eslint-disable-next-line no-unused-vars
  abstract render(_candles: ChartOHLC[]): void
}

/**
 * Candlestick chart renderer
 *
 * Renders price data as traditional Japanese candlestick bars with
 * wicks showing high/low prices and filled bodies for open/close
 * relationships. Uses color coding to distinguish bullish and bearish
 * price movements.
 */
export class CandlestickRenderer extends ChartTypeRenderer {
  /**
   * Renders candlestick chart data
   *
   * Draws individual candlestick bars with proper scaling and positioning.
   * Calculates candle dimensions, applies color coding based on price
   * movement direction, and renders wicks and bodies with appropriate styling.
   *
   * @param candles - Array of OHLC candle data for candlestick rendering
   */
  render(candles: ChartOHLC[]): void {
    const candleWidth = Math.max(1, (this.dimensions.chartWidth / candles.length) * 0.8)
    const spacing = this.dimensions.chartWidth / candles.length
    candles.forEach((candle, index) => {
      const x = this.dimensions.margin.left + index * spacing + spacing / 2
      const openY =
        this.dimensions.margin.top +
        ((this.priceRange.maxPrice - candle.open) / this.priceRange.priceRange) * this.dimensions.chartHeight
      const closeY =
        this.dimensions.margin.top +
        ((this.priceRange.maxPrice - candle.close) / this.priceRange.priceRange) * this.dimensions.chartHeight
      const highY =
        this.dimensions.margin.top +
        ((this.priceRange.maxPrice - candle.high) / this.priceRange.priceRange) * this.dimensions.chartHeight
      const lowY =
        this.dimensions.margin.top +
        ((this.priceRange.maxPrice - candle.low) / this.priceRange.priceRange) * this.dimensions.chartHeight
      const isBullish = candle.close >= candle.open
      const color = isBullish
        ? this.config.customBarColors?.bullish || '#26a69a'
        : this.config.customBarColors?.bearish || '#ef5350'
      this.ctx.strokeStyle = this.config.customBarColors?.wick || '#424242'
      this.ctx.lineWidth = 1
      this.ctx.beginPath()
      this.ctx.moveTo(x, highY)
      this.ctx.lineTo(x, lowY)
      this.ctx.stroke()
      this.ctx.fillStyle = color
      const bodyHeight = Math.max(1, Math.abs(closeY - openY))
      const bodyY = Math.min(openY, closeY)
      this.ctx.fillRect(x - candleWidth / 2, bodyY, candleWidth, bodyHeight)
      if (this.config.customBarColors?.border) {
        this.ctx.strokeStyle = this.config.customBarColors.border
        this.ctx.lineWidth = 1
        this.ctx.strokeRect(x - candleWidth / 2, bodyY, candleWidth, bodyHeight)
      }
    })
  }
}

/**
 * Line chart renderer
 *
 * Renders price data as connected line segments showing price movement
 * over time. Creates smooth visual representation of price trends with
 * customizable line styling and thickness.
 */
export class LineRenderer extends ChartTypeRenderer {
  /**
   * Renders line chart data
   *
   * Draws connected line segments between price points to show price
   * movement trends. Uses closing prices for line positioning and
   * applies consistent line styling across all segments.
   *
   * @param candles - Array of OHLC candle data for line rendering
   */
  render(candles: ChartOHLC[]): void {
    const spacing = this.dimensions.chartWidth / (candles.length - 1)
    this.ctx.strokeStyle = this.config.customBarColors?.bullish || '#26a69a'
    this.ctx.lineWidth = 2
    this.ctx.beginPath()
    candles.forEach((candle, index) => {
      const x = this.dimensions.margin.left + index * spacing
      const y =
        this.dimensions.margin.top +
        ((this.priceRange.maxPrice - candle.close) / this.priceRange.priceRange) * this.dimensions.chartHeight
      if (index === 0) {
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
      }
    })
    this.ctx.stroke()
  }
}

/**
 * Area chart renderer
 *
 * Renders price data as filled area with gradient styling below the
 * price line. Creates visual emphasis on price movement with both
 * filled area and line overlay for comprehensive trend visualization.
 */
export class AreaRenderer extends ChartTypeRenderer {
  /**
   * Renders area chart data
   *
   * Draws filled area below the price line with gradient styling and
   * overlays a line on top for complete trend visualization. Creates
   * visual emphasis on price movement patterns.
   *
   * @param candles - Array of OHLC candle data for area rendering
   */
  render(candles: ChartOHLC[]): void {
    const spacing = this.dimensions.chartWidth / (candles.length - 1)
    const gradient = this.ctx.createLinearGradient(
      0,
      this.dimensions.margin.top,
      0,
      this.dimensions.margin.top + this.dimensions.chartHeight
    )
    gradient.addColorStop(0, this.config.customBarColors?.bullish || '#26a69a')
    gradient.addColorStop(1, (this.config.customBarColors?.bullish || '#26a69a') + '40')
    this.ctx.fillStyle = gradient
    this.ctx.beginPath()
    candles.forEach((candle, index) => {
      const x = this.dimensions.margin.left + index * spacing
      const y =
        this.dimensions.margin.top +
        ((this.priceRange.maxPrice - candle.close) / this.priceRange.priceRange) * this.dimensions.chartHeight
      if (index === 0) {
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
      }
    })
    this.ctx.lineTo(
      this.dimensions.margin.left + this.dimensions.chartWidth,
      this.dimensions.margin.top + this.dimensions.chartHeight
    )
    this.ctx.lineTo(this.dimensions.margin.left, this.dimensions.margin.top + this.dimensions.chartHeight)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.strokeStyle = this.config.customBarColors?.bullish || '#26a69a'
    this.ctx.lineWidth = 2
    this.ctx.beginPath()
    candles.forEach((candle, index) => {
      const x = this.dimensions.margin.left + index * spacing
      const y =
        this.dimensions.margin.top +
        ((this.priceRange.maxPrice - candle.close) / this.priceRange.priceRange) * this.dimensions.chartHeight
      if (index === 0) {
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
      }
    })
    this.ctx.stroke()
  }
}

/**
 * Heikin-Ashi chart renderer
 *
 * Renders modified candlestick data using Heikin-Ashi calculations
 * for enhanced trend analysis. Uses modified OHLC values to reduce
 * noise and highlight trend direction more clearly.
 */
export class HeikinAshiRenderer extends ChartTypeRenderer {
  /**
   * Calculates Heikin-Ashi values from OHLC data
   *
   * Applies Heikin-Ashi formula to transform standard OHLC data into
   * modified values that emphasize trend direction and reduce market noise.
   * Uses weighted averages of current and previous candle data.
   *
   * @param ohlc - Array of original OHLC data for transformation
   * @returns Array of Heikin-Ashi calculated values
   */
  private calculateHeikinAshi(ohlc: ChartOHLC[]): ChartOHLC[] {
    const ha = []
    for (let i = 0; i < ohlc.length; i++) {
      const candle = ohlc[i]
      if (i === 0) {
        ha.push({
          time: candle.time,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
          volume: candle.volume
        })
      } else {
        const prev: ChartOHLC = ha[i - 1]
        const haClose = (candle.open + candle.high + candle.low + candle.close) / 4
        const haOpen = (prev.open + prev.close) / 2
        const haHigh = Math.max(candle.high, haOpen, haClose)
        const haLow = Math.min(candle.low, haOpen, haClose)
        ha.push({
          time: candle.time,
          open: haOpen,
          high: haHigh,
          low: haLow,
          close: haClose,
          volume: candle.volume
        })
      }
    }
    return ha
  }

  /**
   * Renders Heikin-Ashi chart data
   *
   * Draws candlestick bars using calculated Heikin-Ashi values with
   * muted color scheme optimized for trend analysis. Recalculates
   * price range to accommodate modified values.
   *
   * @param candles - Array of OHLC candle data for Heikin-Ashi rendering
   */
  render(candles: ChartOHLC[]): void {
    const haData = this.calculateHeikinAshi(candles)
    const prices = haData.flatMap(candle => [candle.high, candle.low])
    const minPrice = Math.min(...prices)
    const maxPriceHA = Math.max(...prices)
    const priceRangeHA = maxPriceHA - minPrice
    const candleWidth = Math.max(1, (this.dimensions.chartWidth / haData.length) * 0.8)
    const spacing = this.dimensions.chartWidth / haData.length
    haData.forEach((candle, index) => {
      const x = this.dimensions.margin.left + index * spacing + spacing / 2
      const openY =
        this.dimensions.margin.top + ((maxPriceHA - candle.open) / priceRangeHA) * this.dimensions.chartHeight
      const closeY =
        this.dimensions.margin.top + ((maxPriceHA - candle.close) / priceRangeHA) * this.dimensions.chartHeight
      const highY =
        this.dimensions.margin.top + ((maxPriceHA - candle.high) / priceRangeHA) * this.dimensions.chartHeight
      const lowY = this.dimensions.margin.top + ((maxPriceHA - candle.low) / priceRangeHA) * this.dimensions.chartHeight
      const isBullish = candle.close >= candle.open
      const color = isBullish
        ? this.config.customBarColors?.bullish || '#4CAF50'
        : this.config.customBarColors?.bearish || '#F44336'
      this.ctx.strokeStyle = this.config.customBarColors?.wick || '#666666'
      this.ctx.lineWidth = 1
      this.ctx.beginPath()
      this.ctx.moveTo(x, highY)
      this.ctx.lineTo(x, lowY)
      this.ctx.stroke()
      this.ctx.fillStyle = color
      const bodyHeight = Math.max(1, Math.abs(closeY - openY))
      const bodyY = Math.min(openY, closeY)
      this.ctx.fillRect(x - candleWidth / 2, bodyY, candleWidth, bodyHeight)
    })
  }
}

/**
 * Renko chart renderer
 *
 * Renders price data as Renko blocks based on significant price movements.
 * Creates brick-like visualizations that filter out minor price fluctuations
 * and focus on substantial price movements for trend analysis.
 */
export class RenkoRenderer extends ChartTypeRenderer {
  /**
   * Calculates Renko blocks from OHLC data
   *
   * Converts standard OHLC data into Renko blocks based on significant
   * price movements. Filters out minor fluctuations and creates blocks
   * only when price changes exceed the specified brick size threshold.
   *
   * @param ohlc - Array of OHLC data for Renko conversion
   * @param brickSize - Size of each brick as percentage of price (default: 0.01)
   * @returns Array of Renko block data with directional information
   */
  private calculateRenko(ohlc: ChartOHLC[], brickSize: number = 0.01): RenkoBlock[] {
    const renko = []
    let currentPrice = ohlc[0].close
    for (let i = 1; i < ohlc.length; i++) {
      const candle = ohlc[i]
      const priceChange = candle.close - currentPrice
      const priceChangePercent = Math.abs(priceChange / currentPrice)
      if (priceChangePercent >= brickSize) {
        const blocksNeeded = Math.floor(priceChangePercent / brickSize)
        const direction = priceChange > 0 ? 1 : -1
        for (let j = 0; j < blocksNeeded; j++) {
          const newPrice = currentPrice + direction * brickSize * currentPrice
          renko.push({
            time: candle.time,
            open: currentPrice,
            close: newPrice,
            high: Math.max(currentPrice, newPrice),
            low: Math.min(currentPrice, newPrice),
            direction: direction
          })
          currentPrice = newPrice
        }
      }
    }
    return renko
  }

  /**
   * Renders Renko chart data
   *
   * Draws Renko blocks as filled or hollow rectangles based on price
   * movement direction. Uses larger block sizes than traditional candles
   * and applies directional styling for clear trend visualization.
   *
   * @param candles - Array of OHLC candle data for Renko rendering
   */
  render(candles: ChartOHLC[]): void {
    const renkoData = this.calculateRenko(candles, 0.02)
    if (renkoData.length === 0) return
    const prices = renkoData.flatMap(block => [block.high, block.low])
    const minPrice = Math.min(...prices)
    const maxPriceRenko = Math.max(...prices)
    const priceRangeRenko = maxPriceRenko - minPrice
    const blockWidth = Math.max(10, (this.dimensions.chartWidth / renkoData.length) * 0.9)
    const spacing = this.dimensions.chartWidth / renkoData.length
    renkoData.forEach((block, index) => {
      const x = this.dimensions.margin.left + index * spacing + spacing / 2
      const openY =
        this.dimensions.margin.top + ((maxPriceRenko - block.open) / priceRangeRenko) * this.dimensions.chartHeight
      const closeY =
        this.dimensions.margin.top + ((maxPriceRenko - block.close) / priceRangeRenko) * this.dimensions.chartHeight
      const isUp = block.direction > 0
      const color = isUp
        ? this.config.customBarColors?.bullish || '#26a69a'
        : this.config.customBarColors?.bearish || '#ef5350'
      this.ctx.fillStyle = color
      const blockHeight = Math.max(1, Math.abs(closeY - openY))
      const blockY = Math.min(openY, closeY)
      this.ctx.fillRect(x - blockWidth / 2, blockY, blockWidth, blockHeight)
      if (!isUp) {
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = 2
        this.ctx.strokeRect(x - blockWidth / 2, blockY, blockWidth, blockHeight)
      }
    })
  }
}
