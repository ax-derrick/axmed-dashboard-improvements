import { useState, useRef, useEffect } from 'react';
import { Typography, Card, Row, Col, Button, Spin, Segmented, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

// Metabase embed URLs (same as supplier analytics)
const MARKETPLACE_IFRAME_URL =
  'https://axmed.metabaseapp.com/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjE4NDl9LCJwYXJhbXMiOnt9LCJleHAiOjE3NjQ5Mzk2MjMsImlhdCI6MTc2NDMzNDgyMn0.J1RtFbwp15EP5mCdDJs77HpVGZYmt6s1Wt8AeDvXtR8#bordered=false&titled=false&refresh=3600&downloads=false';

const MY_COUNTRY_IFRAME_URL =
  'https://axmed.metabaseapp.com/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjE4NDl9LCJwYXJhbXMiOnsiY291bnRyeSI6Ik5pZ2VyaWEifSwiZXhwIjoxNzY0OTM5NjIzLCJpYXQiOjE3NjQzMzQ4MjJ9.XVWBg3vRdzP6RqRpX0F3ovqaEC2Go1Y2Ing5Vf6-q9Q#bordered=false&titled=false&refresh=3600&downloads=false';

// Metabase iframe resizer script URL
const METABASE_RESIZER_URL = 'https://axmed.metabaseapp.com/app/iframeResizer.js';

type DataView = 'marketplace' | 'my-country';

// KPI data for buyer analytics
const kpiData = [
  { title: 'Total Orders', value: '142' },
  { title: 'Total Spend', value: '$1,234,567' },
  { title: 'Pending Orders', value: '12' },
  { title: 'Active Suppliers', value: '48' },
];

function BuyerAnalytics() {
  const navigate = useNavigate();
  const [iframeLoading, setIframeLoading] = useState(true);
  const [dataView, setDataView] = useState<DataView>('marketplace');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const iframeUrl = dataView === 'marketplace' ? MARKETPLACE_IFRAME_URL : MY_COUNTRY_IFRAME_URL;

  // Load Metabase iframeResizer script
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${METABASE_RESIZER_URL}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = METABASE_RESIZER_URL;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleViewChange = (value: DataView) => {
    setIframeLoading(true);
    setDataView(value);
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
    // Initialize iframeResizer when iframe loads
    if (iframeRef.current && (window as any).iFrameResize) {
      (window as any).iFrameResize({}, iframeRef.current);
    }
  };

  const handleBack = () => {
    navigate('/?r=buyer');
  };

  return (
    <div className="buyer-analytics-page">
      {/* Back Button */}
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        className="back-button"
        style={{ paddingLeft: 0, marginBottom: 16 }}
      >
        Back to Dashboard
      </Button>

      {/* Info Banner */}
      <Alert
        message={
          <span>
            More granular analytics are coming soon.{' '}
            <a
              href="https://form.asana.com/?k=syQQO9QJls5IRuUzlbUDTQ&d=1207382794046065"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 500 }}
            >
              Let us know what you'd like to see
            </a>
          </span>
        }
        type="info"
        showIcon
        style={{ marginBottom: 12 }}
      />

      {/* Header Card with Title and Tabs */}
      <Card style={{ marginBottom: 12 }} bodyStyle={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Title level={4} style={{ margin: 0 }}>Marketplace Analytics</Title>
          <Segmented
            options={[
              { label: 'Marketplace Data', value: 'marketplace' },
              { label: 'My Country', value: 'my-country' },
            ]}
            value={dataView}
            onChange={(value) => handleViewChange(value as DataView)}
          />
        </div>
      </Card>

      {/* KPI Summary Cards */}
      <Row gutter={[8, 8]} style={{ marginBottom: 12 }} className="analytics-kpi-row">
        {kpiData.map((kpi, index) => (
          <Col xs={12} sm={12} lg={6} key={index}>
            <Card className="rfq-metric-card" bodyStyle={{ padding: 16 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>{kpi.title}</Text>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#0a1929', marginTop: 4 }}>
                {kpi.value}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Metabase Dashboard Embed */}
      <div style={{ position: 'relative', minHeight: 400, borderRadius: 8, overflow: 'hidden' }}>
        {iframeLoading && (
          <div className="iframe-loading">
            <Spin size="large" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          key={dataView}
          src={iframeUrl}
          width="100%"
          style={{ border: 'none', display: 'block', minHeight: 400, borderRadius: 8 }}
          onLoad={handleIframeLoad}
          title="Marketplace Analytics Dashboard"
        />
      </div>
    </div>
  );
}

export default BuyerAnalytics;
