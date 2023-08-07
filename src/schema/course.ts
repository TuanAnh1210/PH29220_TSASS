import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export const courseSchema = yup.object().shape({
  name: yup.string().required("Tên khóa học là bắt buộc"),
  old_price: yup.number().required("Giá gốc học là bắt buộc"),
  price: yup.number().required("Giá bán là bắt buộc"),
  image: yup.string().required("Ảnh khóa học là bắt buộc"),
  description: yup
    .string()
    .min(10, "Mô tả tối thiểu 10 kí tự")
    .required("Mô tả là bắt buộc"),
  //   categoryId: yup.string().required("Danh mục khóa học là bắt buộc"),
});
