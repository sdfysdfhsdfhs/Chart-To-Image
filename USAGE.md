# 📊 Usage Guide

Complete guide to using Chart-To-Image CLI and API with all features and examples.

## 📑 Table of Contents

- [CLI Usage](#cli-usage)
- [Chart Types](#chart-types)
- [Color Options](#color-options)
- [Hide Elements](#hide-elements)
- [Scaling Options](#scaling-options)
- [Exchange Support](#exchange-support)
- [Timeframes](#timeframes)
- [Output Formats](#output-formats)
- [Error Handling](#error-handling)
- [Advanced Examples](#advanced-examples)

## 💻 CLI Usage

### 🔧 Basic Commands

| Command | Description | Example |
|---------|-------------|---------|
| `--symbol, -s` | Trading symbol | `BTC/USDT`, `ETH/USDT` |
| `--timeframe, -t` | Chart timeframe | `1h`, `4h`, `1d` |
| `--exchange, -e` | Exchange name | `binance`, `kraken` |
| `--output, -o` | Output file path | `chart.png`, `output.jpg` |
| `--width, -w` | Chart width (px) | `800`, `1200`, `1600` |
| `--height, -h` | Chart height (px) | `600`, `800`, `1000` |

### 📊 Chart Types

| Type | Description | Use Case |
|------|-------------|----------|
| `candlestick` | Traditional OHLC candles | Standard trading analysis |
| `line` | Simple line chart | Trend visualization |
| `area` | Filled area chart | Volume/price relationship |
| `heikin-ashi` | Trend-smoothed candles | Trend identification |
| `renko` | Price-based blocks | Noise filtering |

### 🎨 Themes & Colors

| Option | Format | Examples |
|--------|--------|----------|
| `--theme` | `light` \| `dark` | `--theme dark` |
| `--background-color` | Hex, RGB, Named, Gradient | `#1a1a2e`, `rgb(25,25,112)`, `midnightblue` |
| `--text-color` | Hex, RGB, Named | `#00d4ff`, `rgb(255,215,0)`, `gold` |

### 🎨 Custom Bar Colors

| Color Type | Description | Default |
|------------|-------------|---------|
| `bullish` | Upward candle color | `#26a69a` |
| `bearish` | Downward candle color | `#ef5350` |
| `wick` | Candle wick color | `#424242` |
| `border` | Candle border color | `#E0E0E0` |

**Format**: `type=color,type=color`

**Example**: `--custom-colors "bullish=#00ff88,bearish=#ff4444,wick=#ffffff,border=#333333"`

### 📈 Horizontal Levels

| Level Type | Description | Format |
|------------|-------------|--------|
| `value` | Price level | Number (e.g., 45000) |
| `color` | Line color | Hex, RGB, or named color |
| `style` | Line style | `solid` or `dotted` |
| `label` | Level label | Text (optional) |

**Format**: `value:color:style:label,value:color:style:label`

**Example**: `--levels "45000:#ff0000:solid:Resistance,40000:#00ff00:dotted:Support"`

### 👁️ Hide Elements

| Option | Description | Effect |
|--------|-------------|--------|
| `--hide-title` | Hide chart title | Removes title text |
| `--hide-time-axis` | Hide time labels | Removes X-axis labels |
| `--hide-grid` | Hide grid lines | Removes background grid |

### 📏 Scaling Options

| Option | Description | Values |
|--------|-------------|--------|
| `--auto-scale` | Enable auto-scaling | Boolean |
| `--scale-x` | X-axis scale factor | `0.5` - `2.0` |
| `--scale-y` | Y-axis scale factor | `0.5` - `2.0` |
| `--min-scale` | Minimum price | Any number |
| `--max-scale` | Maximum price | Any number |

### 📊 Data Options

| Option | Description | Default |
|--------|-------------|---------|
| `--fetch` | Fetch data only | `false` |
| `--limit` | Number of candles | `100` |

## 📈 Chart Types

### 🕯️ Candlestick Charts

```bash
# Basic candlestick
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1h --output candlestick.png

# Custom colors
npx @neabyte/chart-to-image --symbol ETH/USDT --timeframe 4h --output custom-candlestick.png \
  --custom-colors "bullish=#00ff88,bearish=#ff4444,wick=#ffffff,border=#333333"
```

### 📈 Line Charts

```bash
# Simple line chart
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1h --output line.png --chart-type line

# Custom theme
npx @neabyte/chart-to-image --symbol ETH/USDT --timeframe 4h --output line-dark.png \
  --chart-type line --theme dark --background-color "#1a1a2e"
```

### 📊 Area Charts

```bash
# Area chart
npx @neabyte/chart-to-image --symbol ADA/USDT --timeframe 1d --output area.png --chart-type area

# Light theme area
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1h --output area-light.png \
  --chart-type area --theme light
```

### 📊 Heikin-Ashi Charts

```bash
# Heikin-Ashi for trend analysis
npx @neabyte/chart-to-image --symbol ETH/USDT --timeframe 4h --output heikin-ashi.png \
  --chart-type heikin-ashi

# Custom colors for Heikin-Ashi
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1d --output ha-custom.png \
  --chart-type heikin-ashi --custom-colors "bullish=#00d4aa,bearish=#ff6b6b"
```

### 🧱 Renko Charts

```bash
# Renko chart for noise filtering
npx @neabyte/chart-to-image --symbol ETH/USDT --timeframe 1d --output renko.png \
  --chart-type renko

# Renko with custom theme
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1d --output renko-dark.png \
  --chart-type renko --theme dark --background-color "#000000"
```

### 📈 Horizontal Levels

```bash
# Support and resistance levels
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1h --output levels.png \
  --levels "45000:#ff0000:solid:Resistance,40000:#00ff00:dotted:Support"

# Multiple levels with labels
npx @neabyte/chart-to-image --symbol ETH/USDT --timeframe 4h --output multi-levels.png \
  --levels "3000:#ff6b6b:solid:Major Resistance,2500:#4ecdc4:dotted:Support Zone,2800:#f9ca24:solid:Pivot"
```

## 🎨 Color Options

### 🔷 Hex Colors

```bash
# Background and text colors
npx @neabyte/chart-to-image --symbol BTC/USDT --output hex-colors.png \
  --background-color "#1a1a2e" --text-color "#00d4ff"

# Custom bar colors with hex
npx @neabyte/chart-to-image --symbol ETH/USDT --output hex-bars.png \
  --custom-colors "bullish=#00ff88,bearish=#ff4444,wick=#ffffff,border=#333333"
```

### 🔴 RGB Colors

```bash
# RGB background and text
npx @neabyte/chart-to-image --symbol BTC/USDT --output rgb-colors.png \
  --background-color "rgb(25, 25, 112)" --text-color "rgb(255, 215, 0)"

# RGB bar colors
npx @neabyte/chart-to-image --symbol ETH/USDT --output rgb-bars.png \
  --custom-colors "bullish=rgb(0,255,136),bearish=rgb(255,68,68)"
```

### 🏷️ Named Colors

```bash
# Named color themes
npx @neabyte/chart-to-image --symbol BTC/USDT --output named-colors.png \
  --background-color "midnightblue" --text-color "gold"

# Named bar colors
npx @neabyte/chart-to-image --symbol ETH/USDT --output named-bars.png \
  --custom-colors "bullish=lime,bearish=red,wick=white,border=gray"
```

### 🌈 Gradients

```bash
# Linear gradient background
npx @neabyte/chart-to-image --symbol BTC/USDT --output gradient.png \
  --background-color "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" \
  --text-color "#ffffff"

# Complex gradient
npx @neabyte/chart-to-image --symbol ETH/USDT --output complex-gradient.png \
  --background-color "linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
```

## 👁️ Hide Elements

### 🚫 Hide Title

```bash
# Clean chart without title
npx @neabyte/chart-to-image --symbol BTC/USDT --output no-title.png \
  --hide-title --background-color "#1a1a2e" --text-color "#00d4ff"
```

### ⏰ Hide Time Axis

```bash
# Chart without time labels
npx @neabyte/chart-to-image --symbol ETH/USDT --output no-time-axis.png \
  --hide-time-axis --background-color "#2d1b69" --text-color "#ff6b6b"
```

### 🕸️ Hide Grid

```bash
# Chart without grid lines
npx @neabyte/chart-to-image --symbol ADA/USDT --output no-grid.png \
  --hide-grid --background-color "#16213e" --text-color "#4ecdc4"
```

### 🧹 Hide All Elements

```bash
# Ultra-clean chart
npx @neabyte/chart-to-image --symbol BTC/USDT --output ultra-clean.png \
  --hide-title --hide-time-axis --hide-grid \
  --background-color "#0f0f23" --text-color "#00ff88"
```

## 📏 Scaling Options

### 🔄 Auto Scaling

```bash
# Auto-scale to fit data
npx @neabyte/chart-to-image --symbol ETH/USDT --output auto-scale.png \
  --auto-scale --background-color "#1a1a2e"
```

### ⚙️ Manual Scaling

```bash
# Custom X and Y scaling
npx @neabyte/chart-to-image --symbol BTC/USDT --output manual-scale.png \
  --scale-x 1.2 --scale-y 1.1 --background-color "#2d1b69"
```

### 💰 Price Limits

```bash
# Set price range
npx @neabyte/chart-to-image --symbol BTC/USDT --output price-limits.png \
  --min-scale 45000 --max-scale 50000 --background-color "#16213e"
```

## 🏢 Exchange Support

| Exchange | Status | Features |
|----------|--------|----------|
| Binance | ✅ Supported | Full OHLCV data |
| Kraken | ✅ Supported | Full OHLCV data |
| Coinbase | ✅ Supported | Full OHLCV data |
| KuCoin | ✅ Supported | Full OHLCV data |
| OKX | ✅ Supported | Full OHLCV data |

### 💱 Exchange Examples

```bash
# Binance (default)
npx @neabyte/chart-to-image --symbol BTC/USDT --output binance.png

# Kraken
npx @neabyte/chart-to-image --symbol BTC/USDT --output kraken.png --exchange kraken

# Coinbase
npx @neabyte/chart-to-image --symbol ETH/USDT --output coinbase.png --exchange coinbase
```

## ⏱️ Timeframes

| Timeframe | Description | Use Case |
|-----------|-------------|----------|
| `1m` | 1 minute | Intraday analysis |
| `5m` | 5 minutes | Short-term trends |
| `15m` | 15 minutes | Medium-term analysis |
| `30m` | 30 minutes | Swing trading |
| `1h` | 1 hour | Daily trading |
| `4h` | 4 hours | Position trading |
| `1d` | 1 day | Long-term analysis |
| `1w` | 1 week | Investment analysis |

### 📅 Timeframe Examples

```bash
# Intraday (1 minute)
npx @neabyte/chart-to-image --symbol BTC/USDT --output intraday.png --timeframe 1m

# Short-term (5 minutes)
npx @neabyte/chart-to-image --symbol ETH/USDT --output short-term.png --timeframe 5m

# Daily (1 hour)
npx @neabyte/chart-to-image --symbol BTC/USDT --output daily.png --timeframe 1h

# Weekly (1 day)
npx @neabyte/chart-to-image --symbol ETH/USDT --output weekly.png --timeframe 1d
```

## 📁 Output Formats

| Format | Extension | Quality | Size | Use Case |
|--------|-----------|---------|------|----------|
| PNG | `.png` | High | Medium | Web, printing |
| JPEG | `.jpg`, `.jpeg` | Good | Small | Web, sharing |
| PNG | `.png` | Raster | High | Web, printing |

### 📄 Format Examples

```bash
# PNG (high quality)
npx @neabyte/chart-to-image --symbol BTC/USDT --output chart.png

# JPEG (compressed)
npx @neabyte/chart-to-image --symbol ETH/USDT --output chart.jpg

# PNG (high quality)
npx @neabyte/chart-to-image --symbol ADA/USDT --output chart.png
```

## ⚠️ Error Handling

### 🚨 Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid symbol format` | Wrong symbol format | Use `BASE/QUOTE` format |
| `Invalid timeframe` | Unsupported timeframe | Use supported timeframes |
| `--output is required` | Missing output path | Add `--output` parameter |
| `--symbol is required` | Missing symbol | Add `--symbol` parameter |
| `Invalid image extension` | Wrong file extension | Use `.png`, `.jpg`, `.jpeg` |

### ❌ Error Examples

```bash
# ❌ Wrong symbol format
npx @neabyte/chart-to-image --symbol BTCUSDT --output chart.png

# ✅ Correct symbol format
npx @neabyte/chart-to-image --symbol BTC/USDT --output chart.png

# ❌ Invalid timeframe
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 2h --output chart.png

# ✅ Valid timeframe
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1h --output chart.png
```

## 🚀 Advanced Examples

### 💼 Professional Trading Chart

```bash
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 4h --output professional.png \
  --chart-type candlestick \
  --theme dark \
  --background-color "#1a1a2e" \
  --text-color "#00d4ff" \
  --custom-colors "bullish=#00ff88,bearish=#ff4444,wick=#ffffff,border=#333333" \
  --width 1200 --height 800 \
  --auto-scale
```

### 🎨 Minimalist Chart

```bash
npx @neabyte/chart-to-image --symbol ETH/USDT --timeframe 1d --output minimalist.png \
  --chart-type line \
  --hide-title --hide-time-axis --hide-grid \
  --background-color "#000000" \
  --text-color "#00ffff" \
  --custom-colors "bullish=#00ff00,bearish=#ff00ff,wick=#ffff00,border=#00ffff"
```

### 🌈 Gradient Theme Chart

```bash
npx @neabyte/chart-to-image --symbol ADA/USDT --timeframe 1h --output gradient-theme.png \
  --chart-type area \
  --background-color "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" \
  --text-color "#ffffff" \
  --custom-colors "bullish=#ffd93d,bearish=#ff6b6b,wick=#ffffff,border=#4ecdc4" \
  --width 1400 --height 900
```

### 🌟 Neon Theme Chart

```bash
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1d --output neon-theme.png \
  --chart-type heikin-ashi \
  --background-color "#000000" \
  --text-color "#00ffff" \
  --custom-colors "bullish=#00ff00,bearish=#ff00ff,wick=#ffff00,border=#00ffff" \
  --hide-grid
```

### 🌅 Sunset Theme Chart

```bash
npx @neabyte/chart-to-image --symbol ETH/USDT --timeframe 4h --output sunset-theme.png \
  --chart-type candlestick \
  --background-color "linear-gradient(to right, #ff6b6b, #4ecdc4)" \
  --text-color "#ffffff" \
  --custom-colors "bullish=#ffd93d,bearish=#ff6b6b,wick=#ffffff,border=#4ecdc4"
```

### 📊 Data Fetching Only

```bash
# Fetch data without generating chart
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1h --fetch --limit 50

# Output: JSON data with OHLCV information
```

## ⚡ Performance Tips

### 📦 File Size Optimization

| Format | Optimization | Result |
|--------|-------------|--------|
| PNG | Default | Best quality |
| JPEG | `--quality 0.8` | Smaller size |
| PNG | Raster | High Quality |

### 🧠 Memory Usage

| Chart Type | Memory Usage | Recommendation |
|------------|-------------|----------------|
| Candlestick | Low | Default choice |
| Line | Very Low | Fast rendering |
| Area | Medium | Good visualization |
| Heikin-Ashi | Low | Trend analysis |
| Renko | Low | Noise filtering |

### ⚡ Rendering Speed

| Feature | Impact | When to Use |
|---------|--------|-------------|
| Auto-scale | Fast | Most cases |
| Manual scaling | Medium | Precise control |
| Custom colors | Low | Always available |
| Hide elements | Fast | Clean charts |
| Gradients | Medium | Visual appeal |

## 🔧 Troubleshooting

### 🚨 Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Chart not rendering | Invalid symbol | Check symbol format |
| Empty chart | No data available | Try different timeframe |
| Color not applied | Invalid color format | Use hex, rgb, or named colors |
| File not saved | Permission error | Check write permissions |
| Build errors | TypeScript issues | Run `npm run build` |

### 🐛 Debug Commands

```bash
# Check if data is available
npx @neabyte/chart-to-image --symbol BTC/USDT --timeframe 1h --fetch --limit 10

# Test with minimal options
npx @neabyte/chart-to-image --symbol BTC/USDT --output test.png

# Verify file creation
ls -la test.png
```

## ✅ Best Practices

### 🎨 Chart Design

1. **Choose appropriate chart type** for your analysis
2. **Use consistent color schemes** across charts
3. **Hide unnecessary elements** for clean presentation
4. **Set appropriate dimensions** for your use case
5. **Use auto-scaling** for most cases

### ⚡ Performance

1. **Use PNG for quality**, JPEG for size
2. **Limit data points** for faster rendering
3. **Cache generated charts** when possible
4. **Use appropriate timeframes** for your analysis

### 🛡️ Error Prevention

1. **Always specify output path**
2. **Use valid symbol formats**
3. **Check exchange availability**
4. **Validate color formats**
5. **Test with minimal options first**

---

For more information, see the [README.md](README.md) or visit the [GitHub repository](https://github.com/NeaByteLab/Chart-To-Image). 