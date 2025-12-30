import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const dynamic = 'force-static'

export const alt = 'Trading Calculators - Position Size & Profit Analysis | Risk Terminal'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #0a0a0a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #0a0a0a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          position: 'relative',
        }}
      >
        {/* Top border glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
            opacity: 0.6,
          }}
        />

        {/* Terminal header */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              color: '#9ca3af',
              fontFamily: 'monospace',
              letterSpacing: '2px',
            }}
          >
            ACTIVE_SESSION
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '0 80px',
            gap: '40px',
            marginTop: '40px',
          }}
        >
          {/* Left side - Position Size Calculator */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '32px',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '8px',
              backgroundColor: 'rgba(6, 182, 212, 0.05)',
              position: 'relative',
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  padding: '6px 12px',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: '#06b6d4',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                  }}
                >
                  🛡️ RISK-CALC
                </span>
              </div>
              <span
                style={{
                  fontSize: '32px',
                  color: 'rgba(6, 182, 212, 0.3)',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
              >
                01
              </span>
            </div>

            <h2
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#ffffff',
                margin: '0 0 12px 0',
              }}
            >
              Position Sizing
            </h2>

            <p
              style={{
                fontSize: '16px',
                color: '#9ca3af',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Calculate optimal position size based on risk tolerance and stop loss levels
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '20px',
              }}
            >
              {['Risk-Based Sizing', 'Leverage Control'].map((feature) => (
                <div
                  key={feature}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid rgba(156, 163, 175, 0.2)',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#d1d5db',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Profit Calculator */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '32px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.05)',
              position: 'relative',
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  padding: '6px 12px',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: '#10b981',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                  }}
                >
                  🎯 P&L-CALC
                </span>
              </div>
              <span
                style={{
                  fontSize: '32px',
                  color: 'rgba(16, 185, 129, 0.3)',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
              >
                02
              </span>
            </div>

            <h2
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#ffffff',
                margin: '0 0 12px 0',
              }}
            >
              Profit Analysis
            </h2>

            <p
              style={{
                fontSize: '16px',
                color: '#9ca3af',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Analyze profit potential across multiple take-profit levels with ROI calculations
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '20px',
              }}
            >
              {['Multi-TP Analysis', 'R:R Ratios'].map((feature) => (
                <div
                  key={feature}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid rgba(156, 163, 175, 0.2)',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#d1d5db',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '24px',
              color: '#ffffff',
              fontWeight: 'bold',
              letterSpacing: '2px',
            }}
          >
            RISK TERMINAL
          </span>
          <span
            style={{
              fontSize: '14px',
              color: '#6b7280',
              fontFamily: 'monospace',
            }}
          >
            Professional Trading Risk Management
          </span>
        </div>

        {/* Corner accents */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle at top right, rgba(6, 182, 212, 0.1), transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.1), transparent)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
