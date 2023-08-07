import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "./Courses.module.scss";
import Banner from "../../../components/Banner";
import { base_banner } from "../../../components/Banner/Base";

import images from "../../../assets/images";
import CourseItem from "../../../components/CourseItem";
import { useEffect, useState } from "react";
import { ICourses } from "../../../types/ICourses";
import { getAllCourse } from "../../../api/courses";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const Courses = () => {
  const { group } = images;
  const [courses, setCourses] = useState<ICourses[]>([]);

  useEffect(() => {
    getAllCourse().then((res) => setCourses(res.data));
  }, []);
  return (
    <>
      <Banner {...base_banner.banner_course} />

      <div className={cx("courses__wrapper")}>
        <Container>
          <h1>
            Khóa học Pro <span className={cx("pro__label")}>Mới</span>
          </h1>
          <Row data-course="1" className={cx("courseWrapper")}>
            {courses.map(
              (course: ICourses) =>
                course.categoryId == 3 && (
                  <Col lg={3} md={4}>
                    <CourseItem course={course} item={course.id} />
                  </Col>
                )
            )}
          </Row>
        </Container>
      </div>
      <div className={cx("courses__wrapper")}>
        <Container>
          <h1>Khóa học Front-End </h1>
          <Row data-course="1" className={cx("courseWrapper")}>
            {courses.map(
              (course: ICourses) =>
                course.categoryId == 1 && (
                  <Col lg={3} md={4}>
                    <CourseItem course={course} item={course.id} />
                  </Col>
                )
            )}
          </Row>
        </Container>
      </div>
      <div className={cx("courses__wrapper")}>
        <Container>
          <h1>Khóa học Back-End</h1>
          <Row data-course="1" className={cx("courseWrapper")}>
            {courses.map(
              (course: ICourses) =>
                course.categoryId == 2 && (
                  <Col lg={3} md={4}>
                    <CourseItem course={course} item={course.id} />
                  </Col>
                )
            )}
          </Row>
        </Container>
      </div>
      <div className={cx("group")}>
        <Container>
          <Row style={{ alignItems: "center" }}>
            <Col lg={7} md={7}>
              <div className={cx("group__text")}>
                <h3>Tham gia cộng đồng học viên BrainTech trên Facebook</h3>
                <p>
                  Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy
                  tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học
                  nhé.
                </p>

                <a href="https://www.facebook.com/groups/f8official">
                  Tham gia nhóm
                </a>
              </div>
            </Col>
            <Col lg={5} md={5}>
              <div className={cx("group__img")}>
                <img src={group} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Courses;
