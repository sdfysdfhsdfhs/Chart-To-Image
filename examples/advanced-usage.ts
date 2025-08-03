/**
 * Advanced Usage Example
 * 
 * Demonstrates advanced chart generation with custom styling, watermarks,
 * horizontal levels, and complex configurations. Shows the full capabilities
 * of the Chart-To-Image module.
 */

import { generateChartImage, generateMultipleCharts, ChartRenderer, ChartConfig } from '../src/index'
import { DataProvider } from '../src/utils/provider'
import type { Exchange, RenderResult } from '../src/types/types'

/**
 * Advanced chart with custom styling
 * 
 * Creates a chart with custom colors, watermarks, and horizontal levels.
 * Demonstrates comprehensive styling capabilities.
 */
async function advancedStylingExample() {
  try {
    console.log('🎨 Generating advanced styled chart...')
    
    const result = await generateChartImage({
      symbol: 'BTC/USDT',
      timeframe: '4h',
      outputPath: './examples/advanced-styled.png',
      width: 1200,
      height: 800,
      theme: 'dark',
      chartType: 'candlestick',
      
      // Custom colors
      customBarColors: {
        bullish: '#00ff88',
        bearish: '#ff4444',
        wick: '#ffffff',
        border: '#333333'
      },
      
      // Custom background and text colors
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      
      // Watermark configuration
      watermark: {
        text: 'Chart-To-Image Demo',
        position: 'bottom-right',
        color: '#ffffff',
        fontSize: 14,
        opacity: 0.3
      },
      
      // Horizontal support/resistance levels
      horizontalLevels: [
        {
          value: 45000,
          color: '#ff0000',
          lineStyle: 'solid',
          label: 'Resistance',
          type: 'resistance'
        },
        {
          value: 40000,
          color: '#00ff00',
          lineStyle: 'dotted',
          label: 'Support',
          type: 'support'
        },
        {
          value: 42500,
          color: '#ffff00',
          lineStyle: 'solid',
          label: 'Pivot',
          type: 'custom'
        }
      ],
      
      // Chart title and display options
      title: 'Bitcoin/USDT - Advanced Analysis',
      showTitle: true,
      showTimeAxis: true,
      showGrid: true,
      
      // Scaling configuration
      scale: {
        autoScale: true,
        minScale: 35000,
        maxScale: 50000
      }
    })

    if (result.success) {
      console.log(`✅ Advanced styled chart saved to: ${result.outputPath}`)
    } else {
      console.error(`❌ Failed to generate chart: ${result.error}`)
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Heikin-Ashi chart example
 * 
 * Demonstrates Heikin-Ashi chart type for trend analysis.
 * Shows how to use specialized chart types for technical analysis.
 */
async function heikinAshiExample() {
  try {
    console.log('📊 Generating Heikin-Ashi chart...')
    
    const result = await generateChartImage({
      symbol: 'ETH/USDT',
      timeframe: '1d',
      outputPath: './examples/heikin-ashi.png',
      width: 1000,
      height: 700,
      theme: 'dark',
      chartType: 'heikin-ashi',
      
      // Custom colors for Heikin-Ashi
      customBarColors: {
        bullish: '#4CAF50',
        bearish: '#F44336',
        wick: '#666666'
      },
      
      title: 'Ethereum/USDT - Heikin-Ashi Analysis',
      watermark: 'Heikin-Ashi Chart'
    })

    if (result.success) {
      console.log(`✅ Heikin-Ashi chart saved to: ${result.outputPath}`)
    } else {
      console.error(`❌ Failed to generate Heikin-Ashi chart: ${result.error}`)
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Renko chart example
 * 
 * Demonstrates Renko chart type for price movement analysis.
 * Shows how to use brick-based charting for trend identification.
 */
async function renkoExample() {
  try {
    console.log('🧱 Generating Renko chart...')
    
    const result = await generateChartImage({
      symbol: 'ADA/USDT',
      timeframe: '1h',
      outputPath: './examples/renko-chart.png',
      width: 1000,
      height: 700,
      theme: 'light',
      chartType: 'renko',
      
      // Custom styling for Renko
      customBarColors: {
        bullish: '#26a69a',
        bearish: '#ef5350'
      },
      
      backgroundColor: '#ffffff',
      textColor: '#000000',
      
      title: 'Cardano/USDT - Renko Analysis',
      watermark: {
        text: 'Renko Chart',
        position: 'top-left',
        color: '#666666',
        fontSize: 12,
        opacity: 0.5
      }
    })

    if (result.success) {
      console.log(`✅ Renko chart saved to: ${result.outputPath}`)
    } else {
      console.error(`❌ Failed to generate Renko chart: ${result.error}`)
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Batch chart generation example
 * 
 * Demonstrates generating multiple charts with different configurations.
 * Useful for creating chart collections or comparative analysis.
 */
async function batchGenerationExample() {
  try {
    console.log('📦 Generating batch charts...')
    
    const chartConfigs = [
      {
        symbol: 'BTC/USDT',
        outputPath: './examples/batch-btc.png',
        timeframe: '1h',
        theme: 'dark',
        chartType: 'candlestick' as const,
        title: 'Bitcoin - 1 Hour'
      },
      {
        symbol: 'ETH/USDT',
        outputPath: './examples/batch-eth.png',
        timeframe: '4h',
        theme: 'dark',
        chartType: 'line' as const,
        title: 'Ethereum - 4 Hour'
      },
      {
        symbol: 'ADA/USDT',
        outputPath: './examples/batch-ada.png',
        timeframe: '1d',
        theme: 'light',
        chartType: 'area' as const,
        title: 'Cardano - Daily'
      }
    ]

    const results = await generateMultipleCharts(chartConfigs)
    
    console.log('\n📊 Batch Results:')
    results.forEach((result: RenderResult, index) => {
      if (result.success) {
        console.log(`✅ Chart ${index + 1}: ${result.outputPath}`)
      } else {
        console.error(`❌ Chart ${index + 1}: ${result.error}`)
      }
    })
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Direct renderer usage example
 * 
 * Demonstrates using the ChartRenderer class directly for advanced control.
 * Shows how to access the underlying renderer for custom operations.
 */
async function directRendererExample() {
  try {
    console.log('🔧 Using ChartRenderer directly...')
    
    // Create configuration
    const config = new ChartConfig({
      symbol: 'BTC/USDT',
      timeframe: '1h',
      outputPath: './examples/direct-renderer.png',
      width: 800,
      height: 600,
      theme: 'dark',
      chartType: 'candlestick',
      title: 'Direct Renderer Example'
    })

    // Create renderer
    const renderer = new ChartRenderer(config)
    
    // Generate chart
    const result = await renderer.generateChart()
    
    if (result.success) {
      console.log(`✅ Direct renderer chart saved to: ${result.outputPath}`)
      
      // Access the underlying chart renderer
      const chart = renderer.getChart()
      console.log('📊 Chart renderer instance available for further operations')
      
      // Clean up
      renderer.destroy()
    } else {
      console.error(`❌ Failed to generate chart: ${result.error}`)
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Custom data provider example
 * 
 * Demonstrates using the DataProvider class directly for custom data fetching.
 * Shows how to access raw market data and perform custom processing.
 */
async function customDataProviderExample() {
  try {
    console.log('📊 Using DataProvider directly...')
    
    // Create data provider
    const dataProvider = new DataProvider({
      name: 'binance' as Exchange,
      sandbox: false
    })
    
    // Fetch data
    const data = await dataProvider.fetchOHLCV('BTC/USDT', '1h', 100)
    console.log(`📈 Fetched ${data.length} candles from Binance`)
    
    // Get exchange information
    const exchangeInfo = dataProvider.getExchangeInfo()
    console.log('🏢 Exchange:', exchangeInfo.name)
    
    // Check symbol support
    const isSupported = await dataProvider.isSymbolSupported('BTC/USDT')
    console.log('✅ Symbol supported:', isSupported)
    
    // Get supported timeframes
    const timeframes = dataProvider.getSupportedTimeframes()
    console.log('⏰ Supported timeframes:', timeframes.slice(0, 5))
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Watermark variations example
 * 
 * Demonstrates different watermark configurations and positioning.
 * Shows how to create branded charts with various watermark styles.
 */
async function watermarkVariationsExample() {
  try {
    console.log('💧 Generating watermark variations...')
    
    const watermarkConfigs = [
      {
        text: 'Top Left',
        position: 'top-left' as const,
        color: '#ffffff',
        fontSize: 16,
        opacity: 0.5
      },
      {
        text: 'Center',
        position: 'center' as const,
        color: '#ffff00',
        fontSize: 20,
        opacity: 0.3
      },
      {
        text: 'Bottom Right',
        position: 'bottom-right' as const,
        color: '#00ffff',
        fontSize: 12,
        opacity: 0.7
      }
    ]

    for (let i = 0; i < watermarkConfigs.length; i++) {
      const watermark = watermarkConfigs[i]
      const result = await generateChartImage({
        symbol: 'BTC/USDT',
        timeframe: '1h',
        outputPath: `./examples/watermark-${i + 1}.png`,
        width: 800,
        height: 600,
        theme: 'dark',
        chartType: 'candlestick',
        watermark,
        title: `Watermark Example ${i + 1}`
      })

      if (result.success) {
        console.log(`✅ Watermark variation ${i + 1} saved`)
      } else {
        console.error(`❌ Failed to generate watermark variation ${i + 1}: ${result.error}`)
      }
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

/**
 * Main execution function
 * 
 * Runs all advanced examples in sequence to demonstrate
 * the full capabilities of the Chart-To-Image module.
 */
async function runAdvancedExamples() {
  console.log('🚀 Starting advanced usage examples...\n')
  
  await advancedStylingExample()
  console.log()
  
  await heikinAshiExample()
  console.log()
  
  await renkoExample()
  console.log()
  
  await batchGenerationExample()
  console.log()
  
  await directRendererExample()
  console.log()
  
  await customDataProviderExample()
  console.log()
  
  await watermarkVariationsExample()
  console.log()
  
  console.log('✅ Advanced examples completed!')
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAdvancedExamples().catch(console.error)
}

export {
  advancedStylingExample,
  heikinAshiExample,
  renkoExample,
  batchGenerationExample,
  directRendererExample,
  customDataProviderExample,
  watermarkVariationsExample,
  runAdvancedExamples
} 