import classNames from "classnames/bind";
import styles from "./CourseItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ICourses } from "../../types/ICourses";
// import Image from '../Image/Image';

const cx = classNames.bind(styles);

interface IProps {
  course: ICourses;
  item: number;
}
const CourseItem = (props: IProps) => {
  console.log(props, "props");
  const { course, item } = props;
  return (
    <Link to={`/detail/${item}`}>
      <div className={cx("courses-newest_item")}>
        <img src={course.image} alt="" />

        <h4>{course.name}</h4>
        <div className={cx("courses-newest_info")}>
          <FontAwesomeIcon icon={faUsers} />
          <span>123</span>
          <div className={cx("price__wrapper")}>
            <p className={cx("old__price")}>
              {course.old_price.toLocaleString()}đ
            </p>
            <p>{course.price.toLocaleString()}đ</p>
          </div>
          {/* <p>Miễn phí</p> */}
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
