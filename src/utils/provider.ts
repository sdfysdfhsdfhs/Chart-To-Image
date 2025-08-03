/**
 * Data Provider
 *
 * Fetches market data from cryptocurrency exchanges using CCXT library.
 * Provides comprehensive data retrieval capabilities with support for multiple
 * exchanges, timeframes, and data formats. Handles API authentication,
 * rate limiting, and error management for reliable data access.
 */

import ccxt from 'ccxt'

import type { ChartData, ExchangeConfig } from '@/types/types'

/**
 * Market data provider class
 * Handles data fetching from cryptocurrency exchanges
 */
interface ExchangeInstance {
  loadMarkets(): Promise<void>
  // eslint-disable-next-line no-unused-vars
  fetchOHLCV(_symbol: string, _timeframe: string, _since?: number, _limit?: number): Promise<unknown[]>
  markets: Record<string, unknown>
  timeframes: Record<string, string>
}

export class DataProvider {
  private exchange: ExchangeInstance
  private config: ExchangeConfig

  /**
   * Creates a new data provider
   * @param config - Exchange configuration object
   */
  constructor(config: ExchangeConfig) {
    this.config = config
    this.exchange = this.createExchange()
  }

  /**
   * Creates exchange instance
   *
   * Initializes CCXT exchange object with appropriate configuration.
   * Handles API key authentication and sandbox mode settings.
   *
   * @returns Configured exchange instance
   */
  private createExchange(): ExchangeInstance {
    const exchangeClass = ccxt[this.config.name as keyof typeof ccxt] as any
    if (!exchangeClass) {
      throw new Error(`Unsupported exchange: ${this.config.name}`)
    }
    const exchange = new exchangeClass({
      apiKey: this.config.apiKey,
      secret: this.config.secret,
      sandbox: this.config.sandbox || false,
      enableRateLimit: true
    })
    return exchange as ExchangeInstance
  }

  /**
   * Fetches OHLCV data from exchange
   *
   * Retrieves candlestick data for the specified symbol and timeframe.
   * Handles data formatting and validation for chart rendering.
   * Supports multiple timeframes and configurable data limits.
   *
   * @param symbol - Trading symbol (e.g., 'BTC/USDT')
   * @param timeframe - Timeframe interval (e.g., '1h', '1d')
   * @param limit - Number of candles to fetch (default: 100)
   * @returns Promise resolving to array of chart data
   */
  public async fetchOHLCV(symbol: string, timeframe: string, limit: number = 100): Promise<ChartData[]> {
    try {
      await this.exchange.loadMarkets()
      const ohlcv = await this.exchange.fetchOHLCV(symbol, timeframe, undefined, limit)
      return ohlcv.map((candle: unknown) => {
        const candleArray = candle as number[]
        return {
          timestamp: candleArray[0],
          open: candleArray[1],
          high: candleArray[2],
          low: candleArray[3],
          close: candleArray[4],
          volume: candleArray[5]
        }
      })
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Gets exchange information
   *
   * Retrieves comprehensive exchange details including supported symbols,
   * timeframes, and trading rules. Useful for validation and configuration.
   *
   * @returns Exchange information object
   */
  public getExchangeInfo(): Record<string, unknown> {
    return {
      name: this.config.name,
      sandbox: this.config.sandbox,
      markets: this.exchange.markets,
      timeframes: this.exchange.timeframes
    }
  }

  /**
   * Checks if symbol is supported by exchange
   *
   * Validates whether the specified trading symbol is available
   * on the configured exchange. Useful for input validation.
   *
   * @param symbol - Trading symbol to check
   * @returns Promise resolving to true if symbol is supported
   */
  public async isSymbolSupported(symbol: string): Promise<boolean> {
    try {
      await this.exchange.loadMarkets()
      return symbol in this.exchange.markets
    } catch {
      return false
    }
  }

  /**
   * Gets supported timeframes
   *
   * Retrieves list of available timeframes for the configured exchange.
   * Provides timeframe options for chart configuration.
   *
   * @returns Array of supported timeframe strings
   */
  public getSupportedTimeframes(): string[] {
    return Object.keys(this.exchange.timeframes || {})
  }
}
