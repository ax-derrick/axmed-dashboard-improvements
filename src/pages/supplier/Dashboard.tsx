import { useState, useRef, useEffect } from 'react';
import { Typography, Card, Row, Col, Button, Spin } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const BASE_URL = import.meta.env.BASE_URL || '/';

// Metabase dashboard URL (same embed as buyer dashboard)
const DASHBOARD_SNAPSHOT_URL = "https://axmed.metabaseapp.com/public/dashboard/e32a226c-b319-42e4-a640-a48e3b2ddbb5#titled=false";
const METABASE_RESIZER_URL = "https://axmed.metabaseapp.com/app/iframeResizer.js";

// Quickstart items for supplier using actual Axmed URLs
const quickstartItems = [
  {
    key: 'open-tenders',
    title: 'Open tenders',
    subtitle: '(9)',
    icon: 'https://app-demo.axmed.com/images/quickstart/seller/open-tenders.svg',
    comingSoon: false,
    link: '/open-tenders',
  },
  {
    key: 'portfolio',
    title: 'Portfolio',
    icon: 'https://app-demo.axmed.com/images/quickstart/seller/portfolio.svg',
    comingSoon: false,
    link: '/portfolio',
  },
  {
    key: 'insights',
    title: 'Insights',
    icon: `${BASE_URL}images/quickstart/buyer/insights.svg`,
    comingSoon: true,
    link: null,
  },
];

function SupplierDashboard() {
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Load iframeResizer script for Metabase
    const script = document.createElement('script');
    script.src = METABASE_RESIZER_URL;
    script.async = true;
    script.onload = () => {
      if (iframeRef.current && (window as any).iFrameResize) {
        (window as any).iFrameResize({ checkOrigin: false }, iframeRef.current);
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleIframeLoad = () => {
    setIframeLoading(false);
    if (iframeRef.current && (window as any).iFrameResize) {
      (window as any).iFrameResize({ checkOrigin: false }, iframeRef.current);
    }
  };

  return (
    <div className="supplier-dashboard">
      {/* Welcome Header Card */}
      <Card
        className="supplier-welcome-card"
        style={{ marginBottom: 24, background: '#fff' }}
        bodyStyle={{ padding: '20px 24px' }}
      >
        <Row align="middle" justify="space-between" gutter={16}>
          <Col flex="1">
            <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
              Welcome back, Derrick!
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>
              Here you can manage your portfolio, bid on tenders and track your awarded bids.
            </Text>
          </Col>
          <Col className="welcome-illustration">
            <img
              src="https://app-demo.axmed.com/_next/image?url=%2Fimages%2Fdashboard-greeting.png&w=256&q=75"
              alt="Dashboard illustration"
              style={{ height: 100 }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* Quickstart Section */}
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 16 }}>Quickstart to</Title>
        <Row gutter={[16, 16]}>
          {quickstartItems.map((item) => (
            <Col xs={12} sm={12} md={8} key={item.key}>
              {item.link && !item.comingSoon ? (
                <Link to={`${item.link}?r=supplier`}>
                  <Card
                    hoverable
                    className="quickstart-card"
                    bodyStyle={{
                      padding: 24,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 180,
                      position: 'relative',
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="quickstart-icon"
                      style={{
                        width: 80,
                        height: 100,
                        objectFit: 'contain',
                        marginBottom: 12,
                      }}
                    />
                    <Text strong style={{ fontSize: 14, textAlign: 'center' }}>
                      {item.title} {item.subtitle && <span style={{ fontWeight: 400 }}>{item.subtitle}</span>}
                    </Text>
                  </Card>
                </Link>
              ) : (
                <Card
                  className={`quickstart-card ${item.comingSoon ? 'quickstart-card-disabled' : ''}`}
                  bodyStyle={{
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 180,
                    position: 'relative',
                  }}
                >
                  {item.comingSoon && (
                    <img
                      src={`${BASE_URL}images/quickstart/comingsoon.svg`}
                      alt="Coming soon"
                      className="coming-soon-badge"
                    />
                  )}
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="quickstart-icon"
                    style={{
                      width: 80,
                      height: 100,
                      objectFit: 'contain',
                      marginBottom: 12,
                      opacity: item.comingSoon ? 0.5 : 1,
                    }}
                  />
                  <Text strong style={{ fontSize: 14, textAlign: 'center' }}>
                    {item.title}
                  </Text>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </div>

      {/* Marketplace Pulse Section */}
      <Card
        title="Marketplace Pulse"
        extra={<Link to="/analytics?r=supplier"><Button type="link" size="small" style={{ padding: 0 }}>View full analytics <RightOutlined /></Button></Link>}
        style={{ marginBottom: 12 }}
        bodyStyle={{ padding: 0 }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8 }}>
          {iframeLoading && (
            <div className="iframe-loading">
              <Spin size="large" />
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={DASHBOARD_SNAPSHOT_URL}
            width="100%"
            style={{ border: 'none', borderRadius: 8, display: 'block', minHeight: 200 }}
            onLoad={handleIframeLoad}
            title="Marketplace Pulse"
          />
        </div>
      </Card>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '24px 0',
        color: '#8c8c8c',
        fontSize: 12,
        borderTop: '1px solid #f0f0f0',
        marginTop: 24
      }}>
        © 2025 | All Rights Reserved
        <span style={{ margin: '0 16px' }}>
          <a href="/terms" style={{ color: '#8c8c8c' }}>Terms</a>
          {' | '}
          <a href="/privacy" style={{ color: '#8c8c8c' }}>Privacy Policy</a>
        </span>
      </div>
    </div>
  );
}

export default SupplierDashboard;
