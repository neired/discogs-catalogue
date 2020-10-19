import React from 'react';
import { Card, Image, Typography } from 'antd';

const DetailBreadcrumb = props => {
  const { Title, Paragraph } = Typography;
    return (
      <Card className="detail-card">
        <div className="detail-header">
          <Image className="detail-img" width={150} src="https://generative-placeholders.glitch.me/image?width=150&height=150&style=tiles&colors=40"></Image>
          <div className="detail-header-text">
            <Title level={2}>Oops... Something went wrong!</Title>
            <Paragraph>Looks like the artist or album you are looking for doesn't exist yet...</Paragraph>
            <Paragraph>Have you ever considered starting a band of your own?</Paragraph>
          </div>
        </div>
      </Card>
    )
}

export default DetailBreadcrumb;