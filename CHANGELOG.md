# 📊 Changelog

All notable changes to the Chart-To-Image library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-08-04

### 🔧 Fixed
- **Package Size**: Reduced from 191.7 kB to 26.7 kB by excluding source files
- **Documentation**: Fixed duplicate PNG entries in USAGE.md
- **Build Process**: Clean TypeScript compilation with Terser minification

## [1.0.0] - 2025-08-04

### 🎉 Initial Release

#### ✨ Added
- **Core Chart Generation**: Convert trading data to high-quality images using Node.js Canvas
- **Multiple Chart Types**: 
  - Candlestick charts (traditional OHLC)
  - Line charts (trend visualization)
  - Area charts (filled price charts)
  - Heikin-Ashi charts (trend-smoothed candles)
  - Renko charts (price-based blocks)
- **Export Formats**: PNG and JPEG with configurable quality
- **Real Market Data**: Integration with CCXT for live exchange data
- **Multiple Exchanges**: Support for Binance, Kraken, Coinbase, and more
- **CLI Interface**: Command-line tool for quick chart generation
- **Programmatic API**: TypeScript library for integration

#### 🎨 Styling & Customization
- **Theme Support**: Light and dark themes
- **Custom Bar Colors**: Configurable bullish/bearish candle colors
- **Background Colors**: Hex, RGB, named colors, and CSS gradients
- **Text Colors**: Customizable text color for all elements
- **Horizontal Levels**: Support/resistance lines with custom styling
- **Watermarks**: Customizable text watermarks with positioning
- **Hide Elements**: Option to hide title, time axis, and grid

#### 📏 Scaling & Dimensions
- **Auto-scaling**: Automatic price range calculation
- **Manual Scaling**: X/Y axis scale factors
- **Custom Dimensions**: Configurable width and height
- **Price Limits**: Min/max price constraints

#### ⚡ Performance & Quality
- **Optimized Rendering**: Efficient canvas-based chart generation
- **Minified Build**: Compressed output for faster loading
- **TypeScript**: Full type safety and IntelliSense support
- **Error Handling**: Comprehensive error handling and validation

#### 🔧 Developer Experience
- **ESLint**: Code quality and consistency
- **Prettier**: Consistent code formatting
- **JSDoc**: Comprehensive documentation
- **Modular Architecture**: Clean separation of concerns

#### 📚 Documentation
- **README.md**: Complete project overview and quick start
- **USAGE.md**: Comprehensive usage guide with examples
- **CLI Help**: Detailed command-line help and examples
- **API Documentation**: Full TypeScript definitions

#### 🛠️ Technical Features
- **Node.js Canvas**: High-performance 2D graphics rendering
- **CCXT Integration**: Unified cryptocurrency exchange API
- **Buffer Export**: Direct buffer output for programmatic use
- **File Export**: Direct file system writing
- **Data URL**: Base64 encoded output for web applications

#### 🎯 CLI Features
- **Symbol Support**: All major trading pairs (BTC/USDT, ETH/USDT, etc.)
- **Timeframes**: 1m, 5m, 15m, 30m, 1h, 4h, 1d, 1w
- **Exchange Selection**: Multiple exchange support
- **Batch Processing**: Multiple chart generation
- **Quality Control**: Configurable JPEG quality settings

#### 📦 Package Features
- **NPM Ready**: Proper package.json configuration
- **Global Installation**: CLI tool available globally
- **Type Definitions**: Complete TypeScript support
- **Minified Distribution**: Optimized for production use

### 🔧 Technical Implementation
- **Modular Architecture**: Separated renderer, config, and utilities
- **Type Safety**: Comprehensive TypeScript interfaces
- **Error Handling**: Multi-layer try-catch with structured results
- **Performance**: Optimized canvas operations and memory usage
- **Compatibility**: Node.js 18+ support with cross-platform compatibility

### 📖 Examples
```bash
# Basic chart generation
npx @neabyte/chart-to-image --symbol BTC/USDT --output chart.png

# Advanced customization
npx @neabyte/chart-to-image -s ETH/USDT -t 4h -o eth.png \
  --theme light --chart-type heikin-ashi \
  --custom-colors "bullish=#00ff88,bearish=#ff4444" \
  --levels "45000:#ff0000:solid:Resistance,40000:#00ff00:dotted:Support"

# Programmatic usage
import { quickChart } from '@neabyte/chart-to-image'
const result = await quickChart('BTC/USDT', 'chart.png', {
  timeframe: '1h',
  theme: 'dark',
  chartType: 'candlestick'
})
```

---

## Version History

### [1.0.0] - 2025-08-04
- 🎉 Initial release with full feature set
- 📊 5 chart types (candlestick, line, area, heikin-ashi, renko)
- 🎨 Complete customization options
- 🖼️ PNG and JPEG export formats
- 💻 CLI and programmatic API
- 📚 Comprehensive documentation

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 