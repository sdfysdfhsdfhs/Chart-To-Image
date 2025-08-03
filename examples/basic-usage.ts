/**
 * Basic Usage Example
 * 
 * Demonstrates simple chart generation with minimal configuration.
 * Shows how to create basic candlestick charts with default settings.
 */

import { generateChartImage, fetchMarketData } from '../src/index'

/**
 * Basic chart generation example
 * 
 * Creates a simple candlestick chart with default settings.
 * Fetches market data and generates a chart image file.
 */
async function basicChartExample() {
  try {
    console.log('📊 Generating basic chart...')
    
    const result = await generateChartImage({
      symbol: 'BTC/USDT',
      timeframe: '1h',
      outputPath: './examples/basic-chart.png',
      width: 800,
      height: 600,
      theme: 'dark'
    })

    if (result.success) {
      console.log(`✅ Chart saved to: ${result.outputPath}`)
    } else {
      console.error(`❌ Failed to generate chart: ${result.error}`)
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Fetch market data example
 * 
 * Demonstrates how to fetch raw market data from an exchange.
 * Useful for data analysis and custom processing.
 */
async function fetchDataExample() {
  try {
    console.log('📈 Fetching market data...')
    
    const data = await fetchMarketData('ETH/USDT', '4h', 'binance', 50)
    
    console.log(`📊 Fetched ${data.length} candles`)
    console.log('Sample data:', data.slice(0, 3))
    
    // Calculate some basic statistics
    const prices = data.map(candle => candle.close)
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    
    console.log(`📈 Price Statistics:`)
    console.log(`   Average: $${avgPrice.toFixed(2)}`)
    console.log(`   Range: $${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`)
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Multiple chart types example
 * 
 * Demonstrates generating different chart types with the same data.
 * Shows line, area, and candlestick variations.
 */
async function multipleChartTypesExample() {
  try {
    console.log('🎨 Generating multiple chart types...')
    
    const chartTypes = ['candlestick', 'line', 'area'] as const
    const baseConfig = {
      symbol: 'BTC/USDT',
      timeframe: '1d',
      width: 800,
      height: 600,
      theme: 'dark'
    }

    for (const chartType of chartTypes) {
      const result = await generateChartImage({
        ...baseConfig,
        chartType,
        outputPath: `./examples/${chartType}-chart.png`
      })

      if (result.success) {
        console.log(`✅ ${chartType} chart saved`)
      } else {
        console.error(`❌ Failed to generate ${chartType} chart: ${result.error}`)
      }
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Theme comparison example
 * 
 * Generates the same chart in both light and dark themes.
 * Useful for comparing visual styles and choosing appropriate themes.
 */
async function themeComparisonExample() {
  try {
    console.log('🎨 Generating theme comparison...')
    
    const themes = ['light', 'dark'] as const
    const baseConfig = {
      symbol: 'BTC/USDT',
      timeframe: '1h',
      chartType: 'candlestick' as const,
      width: 800,
      height: 600
    }

    for (const theme of themes) {
      const result = await generateChartImage({
        ...baseConfig,
        theme,
        outputPath: `./examples/theme-${theme}.png`
      })

      if (result.success) {
        console.log(`✅ ${theme} theme chart saved`)
      } else {
        console.error(`❌ Failed to generate ${theme} theme: ${result.error}`)
      }
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Main execution function
 * 
 * Runs all basic examples in sequence to demonstrate
 * the core functionality of the Chart-To-Image module.
 */
async function runBasicExamples() {
  console.log('🚀 Starting basic usage examples...\n')
  
  await basicChartExample()
  console.log()
  
  await fetchDataExample()
  console.log()
  
  await multipleChartTypesExample()
  console.log()
  
  await themeComparisonExample()
  console.log()
  
  console.log('✅ Basic examples completed!')
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runBasicExamples().catch(console.error)
}

export {
  basicChartExample,
  fetchDataExample,
  multipleChartTypesExample,
  themeComparisonExample,
  runBasicExamples
} 