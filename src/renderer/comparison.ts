/**
 * Chart Comparison Renderer
 *
 * Manages rendering of multiple charts in comparison layouts including
 * side-by-side, grid layouts, and synchronized timeframes. Handles
 * multi-chart canvas creation, coordinate system setup, and layout
 * positioning for comprehensive chart analysis.
 */

import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas'
import { NodeChartRenderer } from '@/renderer'
import type { NodeChartData } from '@/renderer/types'

/**
 * Configuration for chart comparison layout
 *
 * Defines the layout type and parameters for positioning multiple
 * charts in a comparison view with configurable spacing and grid
 * dimensions.
 */
export interface ComparisonLayout {
  /** Layout type for chart arrangement */
  type: 'side-by-side' | 'grid'
  /** Number of columns in grid layout */
  columns?: number
  /** Number of rows in grid layout */
  rows?: number
  /** Gap between charts in pixels */
  gap?: number
}

/**
 * Individual chart within a comparison layout
 *
 * Contains chart data and positioning information for rendering
 * a single chart within the comparison canvas.
 */
export interface ComparisonChart {
  /** Chart data and configuration */
  data: NodeChartData
  /** Position and dimensions within the comparison canvas */
  position: { x: number; y: number; width: number; height: number }
}

/**
 * Multi-chart comparison renderer
 *
 * Renders multiple charts in various layouts including side-by-side
 * and grid configurations. Manages synchronized timeframes, shared
 * coordinate systems, and layout positioning for comprehensive
 * chart comparison and analysis.
 */
export class ComparisonRenderer {
  private canvas: Canvas
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private charts: ComparisonChart[] = []
  private layout: ComparisonLayout

  /**
   * Creates a new comparison renderer
   *
   * Initializes the comparison renderer with specified dimensions
   * and layout configuration for multi-chart rendering.
   *
   * @param width - Canvas width in pixels
   * @param height - Canvas height in pixels
   * @param layout - Layout configuration for chart arrangement
   */
  constructor(width: number, height: number, layout: ComparisonLayout = { type: 'side-by-side' }) {
    this.width = width
    this.height = height
    this.layout = layout
    this.canvas = createCanvas(width, height)
    this.ctx = this.canvas.getContext('2d')
  }

  /**
   * Adds a chart to the comparison layout
   *
   * @param chartData - Chart data and configuration
   * @param position - Optional custom position for the chart in the layout
   */
  public addChart(chartData: NodeChartData, position?: { x: number; y: number; width: number; height: number }): void {
    const defaultPosition = this.calculatePosition(this.charts.length, this.charts.length + 1)
    this.charts.push({
      data: chartData,
      position: position || defaultPosition
    })
  }

  /**
   * Renders all charts in the comparison layout
   *
   * Creates individual chart renderers for each chart and positions
   * them according to the specified layout. Manages background
   * rendering, chart coordination, and canvas composition.
   */
  public async renderComparison(): Promise<void> {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.fillStyle = '#1e222d'
    this.ctx.fillRect(0, 0, this.width, this.height)
    for (let i = 0; i < this.charts.length; i++) {
      const chart = this.charts[i]
      await this.renderChartInPosition(chart)
    }
  }

  /**
   * Renders a single chart in its designated position
   *
   * Creates a chart renderer for the specified chart data and
   * positions it within the comparison canvas according to the
   * layout configuration.
   *
   * @param chart - Chart data and position information
   */
  private async renderChartInPosition(chart: ComparisonChart): Promise<void> {
    const { data, position } = chart
    const renderer = new NodeChartRenderer(position.width, position.height)
    const adjustedData: NodeChartData = {
      ...data,
      config: {
        ...data.config,
        width: position.width,
        height: position.height,
        margin: this.adjustMargins(data.config.margin, position.width, position.height)
      }
    }
    await renderer.renderChart(adjustedData)
    const chartCanvas = renderer.chartElement()
    this.ctx.drawImage(chartCanvas, position.x, position.y)
  }

  /**
   * Calculates position for a chart based on layout
   *
   * Determines the position and dimensions of a chart within the
   * comparison layout. Supports side-by-side and grid layouts
   * with configurable gaps and spacing.
   *
   * @param index - Chart index in the array
   * @param totalCharts - Total number of charts in the comparison
   * @returns Position coordinates and dimensions
   */
  private calculatePosition(index: number, totalCharts?: number): { x: number; y: number; width: number; height: number } {
    const gap = this.layout.gap || 10
    if (this.layout.type === 'side-by-side') {
      const chartWidth = (this.width - gap) / Math.max(this.charts.length, 2)
      return {
        x: index * (chartWidth + gap),
        y: 0,
        width: chartWidth,
        height: this.height
      }
    }
    if (this.layout.type === 'grid') {
      const maxCharts = Math.min(totalCharts || this.charts.length, 2)
      const columns = Math.min(this.layout.columns || 2, 2)
      const rows = Math.ceil(maxCharts / columns)
      const chartWidth = (this.width - (columns - 1) * gap) / columns
      const chartHeight = (this.height - (rows - 1) * gap) / rows
      const row = Math.floor(index / columns)
      const col = index % columns
      return {
        x: col * (chartWidth + gap),
        y: row * (chartHeight + gap),
        width: chartWidth,
        height: chartHeight
      }
    }
    return {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    }
  }

  /**
   * Adjusts margins for smaller chart dimensions
   *
   * Scales chart margins proportionally based on the new chart
   * dimensions while maintaining minimum margin requirements for
   * readability and visual clarity.
   *
   * @param originalMargin - Original margin configuration
   * @param width - New chart width
   * @param height - New chart height
   * @returns Adjusted margin configuration
   */
  private adjustMargins(originalMargin: { top?: number; bottom?: number; left?: number; right?: number } | undefined, width: number, height: number): { top: number; bottom: number; left: number; right: number } {
    const scale = Math.min(width / 800, height / 600)
    const defaultMargin = { top: 60, bottom: 40, left: 60, right: 40 }
    const margin = originalMargin || defaultMargin
    return {
      top: Math.max((margin.top || 60) * scale, 20),
      bottom: Math.max((margin.bottom || 40) * scale, 15),
      left: Math.max((margin.left || 60) * scale, 20),
      right: Math.max((margin.right || 40) * scale, 15)
    }
  }

  /**
   * Exports the comparison chart
   *
   * Converts the comparison canvas to a buffer in the specified
   * format with configurable quality settings for image output.
   *
   * @param options - Export options including format and quality
   * @returns Buffer containing the image data
   */
  public async exportComparison(options: { format: 'png' | 'jpeg' | 'jpg'; quality?: number }): Promise<Buffer> {
    if (options.format === 'jpeg' || options.format === 'jpg') {
      return this.canvas.toBuffer('image/jpeg', { quality: options.quality || 0.9 })
    }
    return this.canvas.toBuffer('image/png')
  }

  /**
   * Saves the comparison chart to file
   *
   * Exports the comparison chart to a file in the specified format
   * and quality settings, writing the image data to the given path.
   *
   * @param outputPath - Output file path
   * @param options - Export options including format and quality
   */
  public async saveComparison(
    outputPath: string,
    options: { format: 'png' | 'jpeg' | 'jpg'; quality?: number }
  ): Promise<void> {
    const buffer = await this.exportComparison(options)
    const fs = await import('fs/promises')
    await fs.writeFile(outputPath, buffer)
  }

  /**
   * Gets the canvas element
   *
   * Returns the underlying canvas object for direct manipulation
   * or additional rendering operations.
   *
   * @returns Canvas element
   */
  public getCanvas(): Canvas {
    return this.canvas
  }
}
