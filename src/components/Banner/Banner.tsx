/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./Banner.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../Button";

const cx = classNames.bind(styles);
const Banner = ({ title, description, background, thumb }: any) => {
  const wrapperStyles = {
    background: background
      ? `url(${background}) top center / cover no-repeat`
      : "none",
  };

  return (
    <div className={cx("wrapper")} style={wrapperStyles}>
      <Container>
        <Row className={cx("sub")} style={{ alignItems: "center" }}>
          <Col lg={6} md={6}>
            <div className={cx("banner_text")}>
              <h3>{title}</h3>
              <p>{description}</p>
              <Button primary large>
                Học ngay
              </Button>
            </div>
          </Col>
          <Col lg={6} md={6}>
            <div className={cx("banner_img")}>
              <img src={thumb} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
