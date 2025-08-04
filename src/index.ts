/**
 * Chart-To-Image Library
 * Convert trading charts to images using lightweight-charts and CCXT
 */

// Core classes
export { ChartRenderer } from '@/core/renderer'
export { ChartConfig } from '@/core/config'

// Data provider
export { DataProvider } from '@/utils/provider'

// Image exporter
export { ImageExporter } from '@/utils/exporter'

// Types
export type * from '@/types/types'

// Utilities
export * from '@/utils/utils'

// Import classes for internal use
import { ChartRenderer } from '@/core/renderer'
import { ChartConfig } from '@/core/config'
import { DataProvider } from '@/utils/provider'
import type { Exchange } from '@/types/types'

/**
 * Generates chart image from configuration
 * @param config - Chart configuration object
 * @returns Promise resolving to chart generation result
 */
export async function generateChartImage(config: any) {
  const chartConfig = new ChartConfig(config)
  const renderer = new ChartRenderer(chartConfig)
  return await renderer.generateChart()
}

/**
 * Processes multiple chart configurations
 * @param configs - Array of chart configuration objects
 * @returns Promise resolving to array of chart generation results
 */
export async function generateMultipleCharts(configs: any[]) {
  const results = []
  for (const config of configs) {
    try {
      const result = await generateChartImage(config)
      results.push(result)
    } catch (error) {
      results.push({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        config
      })
    }
  }
  return results
}

/**
 * Fetches market data from exchange
 * @param symbol - Trading symbol (e.g., 'BTC/USDT')
 * @param timeframe - Timeframe for data (e.g., '1h', '1d')
 * @param exchange - Exchange name (default: 'binance')
 * @param limit - Number of candles to fetch (default: 100)
 * @returns Promise resolving to OHLCV data array
 */
export async function fetchMarketData(symbol: string, timeframe: string, exchange: Exchange = 'binance', limit: number = 100) {
  const dataProvider = new DataProvider({
    name: exchange,
    sandbox: false
  })
  return await dataProvider.fetchOHLCV(symbol, timeframe, limit)
}

/**
 * Generates chart with minimal configuration
 * @param symbol - Trading symbol
 * @param outputPath - Output file path
 * @param options - Additional chart options
 * @returns Promise resolving to chart generation result
 */
export async function quickChart(symbol: string, outputPath: string, options: any = {}) {
  const config = {
    symbol,
    outputPath,
    timeframe: options.timeframe || '1h',
    exchange: options.exchange || 'binance',
    width: options.width || 800,
    height: options.height || 600,
    theme: options.theme || 'dark',
    ...options
  }
  return await generateChartImage(config)
}

export { ComparisonService, type ComparisonConfig, type ComparisonResult } from './core/comparison'
export { ComparisonRenderer, type ComparisonLayout } from './renderer/comparison' 