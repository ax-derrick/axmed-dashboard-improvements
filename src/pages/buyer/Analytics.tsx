import { Typography, Card, Row, Col, theme } from 'antd';
import { ShoppingCartOutlined, FileTextOutlined, TeamOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Buyer KPI data
const buyerKpiData = [
  { title: 'Total Procurement Value', value: '$4,567,890', icon: DollarOutlined },
  { title: 'Active Tenders', value: '28', icon: FileTextOutlined },
  { title: 'Registered Suppliers', value: '156', icon: TeamOutlined },
  { title: 'Pending Orders', value: '34', icon: ShoppingCartOutlined },
];

function BuyerAnalytics() {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <div className="analytics-page">
      {/* Header */}
      <Card style={{ marginBottom: 12 }} bodyStyle={{ padding: 16 }}>
        <Title level={4} style={{ margin: 0 }}>Buyer Analytics</Title>
      </Card>

      {/* KPI Summary Cards */}
      <Row gutter={[8, 8]} style={{ marginBottom: 12 }} className="analytics-kpi-row">
        {buyerKpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Col xs={12} sm={12} lg={6} key={index}>
              <Card className="rfq-metric-card" bodyStyle={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>{kpi.title}</Text>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#0a1929', marginTop: 4 }}>
                      {kpi.value}
                    </div>
                  </div>
                  <IconComponent style={{ fontSize: 24, color: token.colorPrimary, opacity: 0.6 }} />
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Placeholder sections for buyer analytics */}
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <Card title="Tender Performance" style={{ marginBottom: 12 }}>
            <Text type="secondary">Tender success rates and metrics coming soon...</Text>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Supplier Performance" style={{ marginBottom: 12 }}>
            <Text type="secondary">Supplier ratings and delivery metrics coming soon...</Text>
          </Card>
        </Col>
      </Row>

      <Card title="Procurement Trends">
        <Text type="secondary">Procurement analytics and spend analysis coming soon...</Text>
      </Card>
    </div>
  );
}

export default BuyerAnalytics;
