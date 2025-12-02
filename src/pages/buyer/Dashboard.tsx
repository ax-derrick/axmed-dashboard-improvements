import { useState, useRef, useEffect } from 'react';
import { Typography, Card, Row, Col, Button, Spin } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const BASE_URL = import.meta.env.BASE_URL || '/';

// Metabase dashboard URL
const DASHBOARD_SNAPSHOT_URL = "https://axmed.metabaseapp.com/public/dashboard/e32a226c-b319-42e4-a640-a48e3b2ddbb5#titled=false";
const METABASE_RESIZER_URL = "https://axmed.metabaseapp.com/app/iframeResizer.js";

// Quickstart items matching the reference image
const quickstartItems = [
  {
    key: 'create-order',
    title: 'Create An Order',
    icon: 'catalogue.svg',
    comingSoon: false,
  },
  {
    key: 'my-orders',
    title: 'My Orders',
    icon: 'orders.svg',
    comingSoon: false,
  },
  {
    key: 'org-profile',
    title: 'Organization Profile',
    icon: 'organization-profile.svg',
    comingSoon: false,
  },
  {
    key: 'insights',
    title: 'Insights',
    icon: 'insights.svg',
    comingSoon: true,
  },
];

function BuyerDashboard() {
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Load iframeResizer script for Metabase
    const script = document.createElement('script');
    script.src = METABASE_RESIZER_URL;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  return (
    <div className="buyer-dashboard">
      {/* Welcome Header Card */}
      <Card className="welcome-header-card buyer-welcome-card" style={{ marginBottom: 24 }} bodyStyle={{ padding: '32px 40px' }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={3} style={{ margin: 0, marginBottom: 8 }}>
              Welcome back, Derrick!
            </Title>
            <Text type="secondary" style={{ fontSize: 15, maxWidth: 500, display: 'block' }}>
              We partner exclusively with authorized, high-quality pharmaceutical companies and certified caregivers to accelerate access to medicines.
            </Text>
          </Col>
          <Col className="welcome-illustration">
            <img
              src="https://axmed-demo-static-files.s3.eu-west-1.amazonaws.com/uploads/buyer-dashboard-illustration.png"
              alt="Dashboard illustration"
              style={{ height: 140 }}
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
            <Col xs={12} sm={12} md={6} key={item.key}>
              <Card
                hoverable={!item.comingSoon}
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
                  src={`${BASE_URL}images/quickstart/buyer/${item.icon}`}
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
            </Col>
          ))}
        </Row>
      </div>

      {/* Marketplace Pulse Section */}
      <Card
        title="Marketplace Pulse"
        extra={<Link to="/buyer/analytics"><Button type="link" size="small" style={{ padding: 0 }}>View full analytics <RightOutlined /></Button></Link>}
        style={{ marginBottom: 12 }}
        bodyStyle={{ padding: 0 }}>
        <div style={{ position: 'relative', minHeight: 400, overflow: 'hidden', borderRadius: 8 }}>
          {iframeLoading && (
            <div className="iframe-loading">
              <Spin size="large" />
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={DASHBOARD_SNAPSHOT_URL}
            width="100%"
            style={{ border: 'none', borderRadius: 8, display: 'block', minHeight: 400 }}
            onLoad={handleIframeLoad}
            title="Marketplace Pulse"
          />
        </div>
      </Card>
    </div>
  );
}

export default BuyerDashboard;
