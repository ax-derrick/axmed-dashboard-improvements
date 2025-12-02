import { Layout, Menu, Badge, Avatar, Button, Typography, Space, Dropdown, Drawer, Tag, Checkbox, Input, Spin } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import {
  HomeOutlined,
  FolderOutlined,
  TeamOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  DownOutlined,
  ClockCircleOutlined,
  EditOutlined,
  CloseOutlined,
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { HashRouter, Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import SupplierDashboard from './pages/supplier/Dashboard';
import SupplierAnalytics from './pages/supplier/Analytics';
import BuyerDashboard from './pages/buyer/Dashboard';
import BuyerAnalytics from './pages/buyer/Analytics';
import './App.css';

// Draft bids organized by tender
const draftBidsByTender = [
  {
    tenderId: 211,
    tenderName: 'Tender 211',
    closingSoon: true,
    bids: [
      {
        id: 1,
        medication: 'Abiraterone',
        form: 'Tablet',
        dose: '250Mg',
        volume: '100,000 Tablets',
        packSize: 233,
        prodLeadTime: '44 weeks',
        typeOfStock: 'new',
        countries: ['Ghana'],
        standardShelfLife: '44 months',
        incoterms: 'Cost Paid To, Austria',
        packPriceLow: '$1',
        packPriceMid: '$1',
        packPriceHigh: '$1',
        packagingNotes: 'dvd',
        createdOn: '08 Oct 2025',
        bidValidity: '44 days',
      },
      {
        id: 2,
        medication: 'Abiraterone',
        form: 'Tablet',
        dose: '250Mg',
        volume: '400 Tablets',
        packSize: 233,
        prodLeadTime: '44 weeks',
        typeOfStock: 'new',
        countries: ['Ghana'],
        standardShelfLife: '44 months',
        incoterms: 'Cost Paid To, Austria',
        packPriceLow: '$1',
        packPriceMid: '$1',
        packPriceHigh: '$1',
        packagingNotes: 'dvd',
        createdOn: '08 Oct 2025',
        bidValidity: '44 days',
      },
      {
        id: 3,
        medication: 'Abiraterone',
        form: 'Tablet',
        dose: '250Mg',
        volume: '200 Tablets',
        packSize: 233,
        prodLeadTime: '44 weeks',
        typeOfStock: 'new',
        countries: ['Ghana'],
        standardShelfLife: '44 months',
        incoterms: 'Cost Paid To, Austria',
        packPriceLow: '$1',
        packPriceMid: '$1',
        packPriceHigh: '$1',
        packagingNotes: 'dvd',
        createdOn: '08 Oct 2025',
        bidValidity: '44 days',
      },
    ],
  },
  {
    tenderId: 198,
    tenderName: 'Tender 198',
    closingSoon: false,
    bids: [
      {
        id: 4,
        medication: 'Metformin',
        form: 'Tablet',
        dose: '500Mg',
        volume: '50,000 Tablets',
        packSize: 100,
        prodLeadTime: '12 weeks',
        typeOfStock: 'existing',
        countries: ['Kenya', 'Uganda'],
        standardShelfLife: '36 months',
        incoterms: 'CIF Mombasa',
        packPriceLow: '$0.80',
        packPriceMid: '$0.75',
        packPriceHigh: '$0.70',
        packagingNotes: 'Blister pack',
        createdOn: '15 Oct 2025',
        bidValidity: '30 days',
      },
      {
        id: 5,
        medication: 'Amoxicillin',
        form: 'Capsule',
        dose: '500Mg',
        volume: '25,000 Capsules',
        packSize: 500,
        prodLeadTime: '8 weeks',
        typeOfStock: 'new',
        countries: ['Nigeria'],
        standardShelfLife: '24 months',
        incoterms: 'FOB Lagos',
        packPriceLow: '$2.50',
        packPriceMid: '$2.30',
        packPriceHigh: '$2.10',
        packagingNotes: 'Bottle',
        createdOn: '18 Oct 2025',
        bidValidity: '45 days',
      },
    ],
  },
  {
    tenderId: 175,
    tenderName: 'Tender 175',
    closingSoon: true,
    bids: [
      {
        id: 6,
        medication: 'Paracetamol',
        form: 'Tablet',
        dose: '500Mg',
        volume: '200,000 Tablets',
        packSize: 1000,
        prodLeadTime: '6 weeks',
        typeOfStock: 'existing',
        countries: ['Tanzania', 'Rwanda'],
        standardShelfLife: '48 months',
        incoterms: 'DDP Dar es Salaam',
        packPriceLow: '$0.50',
        packPriceMid: '$0.45',
        packPriceHigh: '$0.40',
        packagingNotes: 'Strip pack',
        createdOn: '20 Oct 2025',
        bidValidity: '60 days',
      },
    ],
  },
];

// Calculate total bids count
const totalBidsCount = draftBidsByTender.reduce((acc, tender) => acc + tender.bids.length, 0);

const BASE_URL = import.meta.env.BASE_URL || '/';

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedTenders, setExpandedTenders] = useState<number[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [switchingRole, setSwitchingRole] = useState<'supplier' | 'buyer' | null>(null);

  // Get role from URL, default to 'supplier'
  const roleParam = searchParams.get('r');
  const userRole: 'supplier' | 'buyer' = roleParam === 'buyer' ? 'buyer' : 'supplier';

  const setUserRole = (role: 'supplier' | 'buyer') => {
    setSwitchingRole(role);
    setTimeout(() => {
      setSearchParams({ r: role });
      setSwitchingRole(null);
    }, 800);
  };

  // Supplier sidebar menu items (Analytics now accessed via Marketplace Pulse)
  const supplierMenuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/portfolio',
      icon: <FolderOutlined />,
      label: 'Portfolio',
    },
    {
      key: '/open-tenders',
      icon: <TeamOutlined />,
      label: (
        <Space>
          Open Tenders
          <Badge count={9} size="small" />
        </Space>
      ),
    },
    {
      key: '/my-bids',
      icon: <FileTextOutlined />,
      label: 'My Bids',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`${key}?r=${userRole}`);
  };

  // Buyer Layout Component
  const BuyerLayout = () => (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Buyer Top Navigation Header */}
      <Header className="buyer-header">
        <div className="buyer-header-content">
          {/* Left: Logo + Nav Links */}
          <div className="buyer-header-left">
            <img src={`${BASE_URL}axmed-logo.png`} alt="Axmed" height="28" className="buyer-logo" />
            <nav className="buyer-nav-links">
              <span
                className={`buyer-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => navigate(`/?r=buyer`)}
              >
                Dashboard
              </span>
              <span
                className={`buyer-nav-link ${location.pathname === '/catalogue' ? 'active' : ''}`}
                onClick={() => navigate(`/catalogue?r=buyer`)}
              >
                Catalogue
              </span>
              <span
                className={`buyer-nav-link ${location.pathname === '/my-orders' ? 'active' : ''}`}
                onClick={() => navigate(`/my-orders?r=buyer`)}
              >
                My Orders
              </span>
            </nav>
          </div>
          {/* Right: Support, Draft Order, Profile */}
          <div className="buyer-header-right">
            <a
              href="https://form.asana.com/?k=syQQO9QJls5IRuUzlbUDTQ&d=1207382794046065"
              target="_blank"
              rel="noopener noreferrer"
              className="buyer-header-link"
            >
              <QuestionCircleOutlined />
              <span>Support</span>
            </a>
            <div className="buyer-header-link" style={{ cursor: 'pointer' }}>
              <ShoppingCartOutlined />
              <span>Draft Order</span>
            </div>
            <Dropdown
              menu={{
                items: [
                  { key: 'profile', label: 'Profile' },
                  { key: 'settings', label: 'Settings' },
                  { type: 'divider' },
                  {
                    key: 'switch',
                    label: 'Switch to Supplier',
                    onClick: () => setUserRole('supplier')
                  },
                  { type: 'divider' },
                  { key: 'logout', label: 'Logout' },
                ] as MenuProps['items'],
              }}
              trigger={['click']}
            >
              <Space className="buyer-profile-trigger">
                <Avatar style={{ backgroundColor: '#392AB0' }}>A</Avatar>
                <span className="buyer-profile-name">Axmed</span>
                <DownOutlined style={{ fontSize: 10 }} />
              </Space>
            </Dropdown>
          </div>
        </div>
      </Header>

      {/* Main Content Area */}
      <Content className="buyer-content">
        <Routes>
          <Route path="/" element={<BuyerDashboard />} />
          <Route path="/analytics" element={<BuyerAnalytics />} />
        </Routes>
      </Content>
    </Layout>
  );

  // Supplier Layout Component with blue top header + sidebar
  const SupplierLayout = () => (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Blue Top Header */}
      <Header className="supplier-top-header">
        <div className="supplier-top-header-content">
          {/* Left: Logo */}
          <div className="supplier-top-header-left">
            <img src={`${BASE_URL}axmed-logo.png`} alt="Axmed" height="28" className="supplier-logo" />
          </div>
          {/* Right: Support, Draft Bids, Profile */}
          <div className="supplier-top-header-right">
            <a
              href="https://form.asana.com/?k=syQQO9QJls5IRuUzlbUDTQ&d=1207382794046065"
              target="_blank"
              rel="noopener noreferrer"
              className="supplier-header-link"
            >
              <QuestionCircleOutlined />
              <span>Support</span>
            </a>
            <div className="supplier-header-link" onClick={() => setDrawerOpen(true)} style={{ cursor: 'pointer' }}>
              <FileTextOutlined />
              <span>Draft Bids</span>
              <Badge count={totalBidsCount} size="small" style={{ marginLeft: 4 }} />
            </div>
            <Dropdown
              menu={{
                items: [
                  { key: 'profile', label: 'Profile' },
                  { key: 'settings', label: 'Settings' },
                  { type: 'divider' },
                  {
                    key: 'switch',
                    label: 'Switch to Buyer',
                    onClick: () => setUserRole('buyer')
                  },
                  { type: 'divider' },
                  { key: 'logout', label: 'Logout' },
                ] as MenuProps['items'],
              }}
              trigger={['click']}
            >
              <Space className="supplier-profile-trigger">
                <Avatar
                  src="https://axmed-demo-static-files.s3.eu-west-1.amazonaws.com/uploads/CIPLA-logo381353.png"
                  size={32}
                  style={{ border: '2px solid rgba(255,255,255,0.3)' }}
                />
                <span className="supplier-profile-name">Cipla Pharmaceuticals</span>
                <DownOutlined style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)' }} />
              </Space>
            </Dropdown>
          </div>
        </div>
      </Header>

      <Layout>
        {/* Sidebar - Below top header */}
        <Sider
          theme="light"
          width={160}
          collapsedWidth={64}
          collapsed={sidebarCollapsed}
          className="supplier-sider desktop-sider"
          style={{
            borderRight: '1px solid #f0f0f0',
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
            overflow: 'auto',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.2s ease',
            background: '#fff',
          }}
        >
          {/* Collapse Toggle */}
          <div className="sidebar-collapse-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          {/* Navigation Menu */}
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={supplierMenuItems}
            onClick={handleMenuClick}
            style={{ borderRight: 'none', flex: 1 }}
          />
        </Sider>

        {/* Main Content Area */}
        <Content
          className="supplier-content"
          style={{
            marginLeft: sidebarCollapsed ? 64 : 160,
            marginTop: 64,
            background: '#f8f9fc',
            minHeight: 'calc(100vh - 64px)',
            padding: 24,
            transition: 'margin-left 0.2s ease'
          }}
        >
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Routes>
              <Route path="/" element={<SupplierDashboard />} />
              <Route path="/analytics" element={<SupplierAnalytics />} />
            </Routes>
          </div>
        </Content>
      </Layout>

      {/* Draft Bids Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Draft bids ({totalBidsCount})</span>
          </div>
        }
        placement="right"
        width={720}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        extra={
          <Space>
            <Input placeholder="Search for medicine" prefix={<SearchOutlined />} style={{ width: 200 }} />
            <Button icon={<FilterOutlined />}>Filter</Button>
          </Space>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">Please review and submit your draft bids for us to share with the different buyers</Text>
        </div>

        {/* Tender Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {draftBidsByTender.map((tender) => (
            <div key={tender.tenderId} className="tender-group">
              <div
                className="tender-group-header"
                onClick={() => setExpandedTenders(prev =>
                  prev.includes(tender.tenderId) ? prev.filter(id => id !== tender.tenderId) : [...prev, tender.tenderId]
                )}
                style={{ cursor: 'pointer' }}
              >
                <div className="tender-group-title">
                  <DownOutlined
                    className="collapse-icon"
                    style={{
                      transform: expandedTenders.includes(tender.tenderId) ? 'rotate(0deg)' : 'rotate(-90deg)',
                      transition: 'transform 0.2s'
                    }}
                  />
                  <Text strong>{tender.tenderName}</Text>
                  <Text type="secondary">({tender.bids.length} bids)</Text>
                  {tender.closingSoon && <Tag color="error" icon={<ClockCircleOutlined />}>Closing soon</Tag>}
                </div>
                <div className="tender-group-actions" onClick={(e) => e.stopPropagation()}>
                  <Checkbox>Select All</Checkbox>
                  <Button size="small" icon={<DownloadOutlined />}>Export to xls</Button>
                  <Button type="primary" size="small">Submit</Button>
                </div>
              </div>

              {expandedTenders.includes(tender.tenderId) && (
                <div className="draft-bids-list">
                  {tender.bids.map((bid) => (
                    <div key={bid.id} className="draft-bid-card">
                      <div className="draft-bid-header">
                        <div>
                          <Text strong>{bid.medication}</Text>
                          <Tag color="blue" style={{ marginLeft: 8 }}>{bid.form}</Tag>
                        </div>
                        <Space>
                          <Button type="text" size="small" icon={<EditOutlined />} />
                          <Button type="text" size="small" icon={<CloseOutlined />} danger />
                          <Button type="link" size="small">View Tender</Button>
                        </Space>
                      </div>

                      <div className="draft-bid-details">
                        <div className="detail-row">
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Dose:</Text>
                            <Text>{bid.dose}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Volume:</Text>
                            <Text>{bid.volume}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Pack size:</Text>
                            <Text>{bid.packSize}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Countries:</Text>
                            <Text>{bid.countries.join(', ')}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Pack price (&lt;40%):</Text>
                            <Text>{bid.packPriceLow}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Pack price (40-75%):</Text>
                            <Text>{bid.packPriceMid}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Pack price (&gt;75%):</Text>
                            <Text>{bid.packPriceHigh}</Text>
                          </div>
                        </div>
                        <div className="detail-row">
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Created on:</Text>
                            <Text>{bid.createdOn}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Bid validity:</Text>
                            <Text>{bid.bidValidity}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Type of stock:</Text>
                            <Text>{bid.typeOfStock}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Prod. lead time:</Text>
                            <Text>{bid.prodLeadTime}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Standard shelf life:</Text>
                            <Text>{bid.standardShelfLife}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Incoterms:</Text>
                            <Text>{bid.incoterms}</Text>
                          </div>
                          <div className="detail-item">
                            <Text type="secondary" className="detail-label">Packaging notes:</Text>
                            <Text>{bid.packagingNotes}</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Drawer>

      {/* Mobile Navigation Drawer */}
      <Drawer
        placement="left"
        width={280}
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="mobile-nav-drawer"
        styles={{ body: { padding: 0 } }}
      >
        {/* Logo */}
        <div className="mobile-drawer-logo">
          <img src={`${BASE_URL}axmed-logo.png`} alt="Axmed" height="28" />
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={supplierMenuItems}
          onClick={({ key }) => {
            navigate(`${key}?r=${userRole}`);
            setMobileMenuOpen(false);
          }}
          style={{ borderRight: 'none' }}
        />

        {/* Bottom section */}
        <div className="mobile-drawer-bottom">
          {/* Switch Role Button */}
          <div
            className="sidebar-switch-role"
            onClick={() => setUserRole(userRole === 'supplier' ? 'buyer' : 'supplier')}
          >
            <SwapOutlined />
            <span>Switch to {userRole === 'supplier' ? 'Buyer' : 'Supplier'}</span>
          </div>

          {/* Support Link */}
          <a
            href="https://form.asana.com/?k=syQQO9QJls5IRuUzlbUDTQ&d=1207382794046065"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-support-link"
          >
            <QuestionCircleOutlined />
            <span>Support</span>
          </a>

          {/* Profile */}
          <div className="sidebar-profile">
            <Dropdown
              menu={{
                items: [
                  { key: 'profile', label: 'Profile' },
                  { key: 'settings', label: 'Settings' },
                  { type: 'divider' },
                  { key: 'logout', label: 'Logout' },
                ] as MenuProps['items'],
              }}
              trigger={['click']}
              placement="topRight"
            >
              <Space className="profile-trigger sidebar-profile-trigger">
                <Avatar
                  src="https://axmed-demo-static-files.s3.eu-west-1.amazonaws.com/uploads/CIPLA-logo381353.png"
                  size={32}
                />
                <div className="profile-info">
                  <span className="org-name">Cipla Pharmaceuticals</span>
                  <span className="role-label" style={{ fontSize: 11, color: '#8c8c8c', textTransform: 'capitalize' }}>{userRole}</span>
                </div>
                <DownOutlined className="caret-icon" />
              </Space>
            </Dropdown>
          </div>
        </div>
      </Drawer>
    </Layout>
  );

  // Main return - conditionally render based on role
  return (
    <>
      {/* Role Switching Overlay */}
      {switchingRole && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          gap: 16,
        }}>
          <Spin size="large" />
          <Text style={{ fontSize: 16, color: '#595959' }}>
            Switching to {switchingRole.charAt(0).toUpperCase() + switchingRole.slice(1)}...
          </Text>
        </div>
      )}
      {userRole === 'buyer' ? <BuyerLayout /> : <SupplierLayout />}
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}

export default App;
