import classNames from "classnames/bind";
import styles from "./DetailCourse.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);
const DetailCourse = () => {
  const { id } = useParams();

  const [course, setCourse] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/courses/${id}`)
      .then((res) => res.json())
      .then((res) => setCourse(res));
  }, []);
  return (
    <>
      <div className={cx("detail-course")}>
        <Container>
          <Row>
            <Col lg={8}>
              <div>
                <h2 className={cx("course_name")}>{course?.name}</h2>
                <p className={cx("course_text")}>{course?.description}</p>
                <div className={cx("learning__bar")}>
                  <h1 className={cx("learning__bar--title")}>
                    Nội dung khóa học
                  </h1>
                  <div className={cx("course_topic")}>
                    <div className={cx("learning__chapter")}>
                      <h3 className={cx("learning__chapter--txt")}>
                        ten chuong
                      </h3>
                      <div className={cx("trackItem")}>
                        <h3 className={cx("trackItem--title")}>
                          1. ten chuong
                          <span>
                            <FontAwesomeIcon
                              style={{ color: "#f76b1c" }}
                              icon={faGraduationCap}
                            />
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="course_img_wrapper">
                <img className={cx("course_img")} src={course?.image} alt="" />
                <h4 className={cx("course_free")}>Miễn phí</h4>
                <div className={cx("firstLessonBtn")}>
                  <button className={cx("course_btn-learn")}>Học ngay</button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DetailCourse;
