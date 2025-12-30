import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const dynamic = 'force-static'

export const alt = 'Risk Terminal - Professional Trading Risk Management Calculators'
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
            background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
            opacity: 0.6,
          }}
        />

        {/* Bottom border glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
            opacity: 0.6,
          }}
        />

        {/* Status indicator */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 24px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '4px',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
            }}
          />
          <span
            style={{
              fontSize: '16px',
              color: '#9ca3af',
              fontFamily: 'monospace',
              letterSpacing: '2px',
            }}
          >
            SYSTEM ONLINE
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            marginTop: '60px',
          }}
        >
          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <h1
              style={{
                fontSize: '96px',
                fontWeight: 'bold',
                letterSpacing: '4px',
                background: 'linear-gradient(90deg, #ffffff 0%, #10b981 50%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                margin: 0,
                padding: 0,
              }}
            >
              RISK TERMINAL
            </h1>

            <div
              style={{
                width: '120px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
              }}
            />
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '28px',
              color: '#9ca3af',
              textAlign: 'center',
              maxWidth: '900px',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Professional-grade trading calculators for institutional-level risk management
          </p>

          {/* Feature tags */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '4px',
                backgroundColor: 'rgba(6, 182, 212, 0.05)',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: '#06b6d4',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                }}
              >
                📊 POSITION SIZING
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '4px',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: '#10b981',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                }}
              >
                🎯 P&L ANALYSIS
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: '#4b5563',
              fontFamily: 'monospace',
            }}
          >
            whatsriskmanagement.com
          </span>
          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
            }}
          />
          <span
            style={{
              fontSize: '18px',
              color: '#4b5563',
              fontFamily: 'monospace',
            }}
          >
            FREE TRADING TOOLS
          </span>
        </div>

        {/* Corner accents */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.1), transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle at bottom right, rgba(6, 182, 212, 0.1), transparent)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
