import { Typography, Collapse, Card, Row, Col } from 'antd';
import {
  MailOutlined,
  FormOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  DownOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export const OPEN_CHAT_EVENT = 'axmed:open-chat';

const faqItems = [
  {
    key: '1',
    label: 'What is Axmed?',
    children: (
      <Paragraph>
        Axmed is a medicine marketplace born to accelerate access to medicines in Low- and
        Middle-Income countries. It brings technology to the center of this global challenge through
        demand aggregation and increased purchasing power, combining commercial innovation with
        social impact.
      </Paragraph>
    ),
  },
  {
    key: '2',
    label: 'How can I purchase medicines through the Axmed platform?',
    children: (
      <Paragraph>
        To purchase, first sign up and complete the verification process. Once verified, you can
        explore available medicines, submit your order request or offers, and review prices. Our team
        will confirm availability and finalize logistics.
      </Paragraph>
    ),
  },
  {
    key: '3',
    label: 'How does ordering work on the platform?',
    children: (
      <Paragraph>
        Ordering is simple: once verified, buyers can search for the products they need, compare
        offers from multiple suppliers, and place a request. Our team then confirms availability,
        pricing, and shipping details, and coordinates fulfillment through our trusted logistics
        partners. You'll receive updates every step of the way.
      </Paragraph>
    ),
  },
  {
    key: '4',
    label: 'How does making offers work on the platform?',
    children: (
      <Paragraph>
        Our platform automatically connects suppliers with open orders that match their portfolio.
        When a match is detected, the supplier is notified and can navigate to the Open Tenders tab
        on the Marketplace. There, they can place a bid by providing key information — such as price,
        lead time, and shelf life — which the buyer will use to evaluate and select the most
        promising offer.
      </Paragraph>
    ),
  },
  {
    key: '5',
    label: "I have signed up but can't login",
    children: (
      <Paragraph>
        Once you've signed up our regulatory team will need some time to verify your account. When
        this is done, you'll receive an email notification and after that you'll be able to login and
        use the platform.
      </Paragraph>
    ),
  },
  {
    key: '6',
    label: 'I cannot remember my password',
    children: (
      <Paragraph>
        You can use the "Forgot password?" button on the login page. Enter your email address and
        click submit, then enter the OTP to reset your password.
      </Paragraph>
    ),
  },
  {
    key: '7',
    label: 'Can I track my order?',
    children: (
      <Paragraph>
        Yes. Once your order is confirmed and shipped, you'll receive regular updates through your
        dashboard and email, including shipping status, estimated delivery times, and relevant
        documentation.
      </Paragraph>
    ),
  },
  {
    key: '8',
    label: "How can I see the medicines available in Axmed's portfolio?",
    children: (
      <Paragraph>
        Axmed is a marketplace, not a supplier, and does not maintain its own stockpile of medicines.
        You can sign up to access the platform and explore the medicine catalogue of our suppliers.
        After submitting an order, suppliers on the platform will respond with quotes for the items
        you've requested. If a specific medicine is not listed, you can request it to be added to the
        catalogue.
      </Paragraph>
    ),
  },
  {
    key: '9',
    label: 'What kind of regulatory documentation do I need to upload?',
    children: (
      <Paragraph>
        To get started, buyers need to upload a valid business registration certificate and proof of
        regulatory authorization to procure or handle medicines. For suppliers, we request company
        registration, GMP certificates (where applicable), quality management system details, and
        evidence of regulatory approvals for their products. This ensures all parties meet our
        standards for quality, compliance, and traceability.
      </Paragraph>
    ),
  },
  {
    key: '10',
    label: 'How long does verification take?',
    children: (
      <Paragraph>
        Most buyer and seller verification reviews are completed within 2–3 business days, depending
        on how quickly complete documentation is submitted. You'll be notified as soon as your
        account is approved and ready to use.
      </Paragraph>
    ),
  },
];

function Support() {
  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
  };

  return (
    <div className="support-page">
      {/* Hero Section */}
      <div className="support-hero">
        <QuestionCircleOutlined className="support-hero-icon" />
        <Title level={2} className="support-hero-title">
          How can we help?
        </Title>
        <Text className="support-hero-subtitle">
          Find answers to common questions or reach out to our support team.
        </Text>
      </div>

      {/* FAQ Accordion */}
      <div className="support-faq-section">
        <Title level={4} style={{ marginBottom: 16 }}>
          Frequently Asked Questions
        </Title>
        <Collapse
          accordion
          items={faqItems}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <DownOutlined
              style={{
                fontSize: 12,
                transition: 'transform 0.2s',
                transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          )}
          className="support-faq-collapse"
        />
      </div>

      {/* Action Cards */}
      <div className="support-actions-section">
        <Title level={4} style={{ marginBottom: 16 }}>
          Still need help?
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <a href="mailto:support@axmed.com" className="support-action-card-link">
              <Card hoverable className="support-action-card">
                <MailOutlined className="support-action-icon" />
                <Title level={5}>Email Support</Title>
                <Text type="secondary">support@axmed.com</Text>
              </Card>
            </a>
          </Col>
          <Col xs={24} sm={8}>
            <a
              href="https://form.asana.com/?k=syQQO9QJls5IRuUzlbUDTQ&d=1207382794046065"
              target="_blank"
              rel="noopener noreferrer"
              className="support-action-card-link"
            >
              <Card hoverable className="support-action-card">
                <FormOutlined className="support-action-icon" />
                <Title level={5}>Submit a Ticket</Title>
                <Text type="secondary">Report an issue or request help</Text>
              </Card>
            </a>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              hoverable
              className="support-action-card"
              onClick={handleOpenChat}
              style={{ cursor: 'pointer' }}
            >
              <MessageOutlined className="support-action-icon" />
              <Title level={5}>Live Chat</Title>
              <Text type="secondary">Chat with our team now</Text>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Support;
