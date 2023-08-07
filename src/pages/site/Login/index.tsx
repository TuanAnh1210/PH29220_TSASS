/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import images from "../../../assets/images";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { addUser, getAllUser } from "../../../api/user";

const cx = classNames.bind(styles);

const Login = () => {
  const [listAcc, setListAcc] = useState([]);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    getAllUser().then((res) => setListAcc(res.data));
  }, []);
  const [errsLogin, setErrsLogin] = useState({
    name: "",
    password: "",
  });
  const [dataLogin, setDataLogin] = useState({
    name: "",
    password: "",
  });

  const [dataRegis, setDataRegis] = useState({
    fullname: "",
    name: "",
    password: "",
    rePassword: "",
  });

  const [errsRegis, setErrsRegis] = useState({
    fullname: "",
    name: "",
    password: "",
    rePassword: "",
  });

  const navigate = useNavigate();

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };
  const { bg_blue } = images;

  const handleLogin = (e: any) => {
    e.preventDefault();
    setErrsLogin({
      name: "",
      password: "",
    });
    let emailErr: string = "";
    let passErr: string = "";
    let isErr = false;

    if (dataLogin.name == "" && dataLogin.password == "") {
      emailErr = "Tên đăng nhập không được để trống";
      passErr = "Password không được để trống";
      isErr = true;
      setErrsLogin({ ...errsLogin, name: emailErr, password: passErr });
    }

    if (dataLogin.name == "") {
      emailErr = "Tên đăng nhập không được để trống";
      isErr = true;
    }
    if (dataLogin.password == "") {
      isErr = true;
      passErr = "Password không được để trống";
    }

    if (!isErr) {
      const isCorrect = listAcc.filter(
        (acc) =>
          acc.name == dataLogin.name && acc.password == dataLogin.password
      );

      if (isCorrect.length > 0) {
        localStorage.setItem("acc", JSON.stringify(dataLogin.name));
        if (isCorrect[0].roleId == 1) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    }

    setErrsLogin({
      name: emailErr,
      password: passErr,
    });
  };

  const handleRegis = (e: any) => {
    e.preventDefault();
    let errFullname = "";
    let errName = "";
    let errPass = "";
    let errRePass = "";
    let isErr = false;

    if (dataRegis.password.length < 6) {
      errPass = "Mật khẩu tối thiểu 6 kí tự";
      isErr = true;
    }
    if (dataRegis.password !== dataRegis.rePassword) {
      errRePass = "Mật khẩu không khớp";
      isErr = true;
    }
    if (
      dataRegis.fullname == "" &&
      dataRegis.name == "" &&
      dataRegis.password == "" &&
      dataRegis.rePassword == ""
    ) {
      errFullname = "Họ tên không được để trống";
      errName = "Tên đăng nhập không được để trống";
      errPass = "Password không được để trống";
      errRePass = "RePassword không được để trống";
      isErr = true;
      setErrsRegis({
        ...errsLogin,
        fullname: errFullname,
        name: errName,
        password: errPass,
        rePassword: errRePass,
      });
    }

    if (!isErr) {
      const isCorrect = listAcc.some((acc) => acc.name == dataRegis.name);
      if (isCorrect) {
        alert("Tên đăng nhập đã tồn tại!");
      } else {
        addUser({
          ...dataRegis,
          roleId: 2,
        }).then((res) => {
          alert("Đăng ký thành công");
          localStorage.setItem("acc", JSON.stringify(dataRegis.name));
          navigate("/home");
        });
      }
    }

    setErrsRegis({
      fullname: errFullname,
      name: errName,
      password: errPass,
      rePassword: errRePass,
    });
  };

  return (
    <div
      style={{
        background: `url(${bg_blue}) center center / cover no-repeat`,
      }}
      className={cx("account__wrapper")}
    >
      <button
        className={cx("go-home")}
        onClick={() => {
          navigate(-1);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className={cx("form__wrapper")}>
        <form className={cx("form__login", { ani: !isLogin })}>
          <h2 className={cx("form__title")}>Đăng nhập</h2>
          <div className={cx("form__group")}>
            <label>Tên đăng nhập</label>
            <input
              id="email_login"
              type="text"
              placeholder="Tên đăng nhập"
              name="email_login"
              value={dataLogin.name}
              onChange={(e) =>
                setDataLogin({ ...dataLogin, name: e.target.value })
              }
            />
            <p className="error">{errsLogin.name}</p>
          </div>
          <div className={cx("form__group")}>
            <label>Mật khẩu</label>
            <input
              id="pass_login"
              type="password"
              placeholder="Mật khẩu"
              name="pass_login"
              value={dataLogin.password}
              onChange={(e) =>
                setDataLogin({ ...dataLogin, password: e.target.value })
              }
            />
            <p className="error">{errsLogin.password}</p>
          </div>
          <a className={cx("forgot__pass")} href="">
            Quên mật khẩu
          </a>
          <button onClick={handleLogin} className={cx("btn__login")}>
            Đăng nhập
          </button>

          <div className={cx("IFLxoy")}>
            <div className={cx("IFLxoy--left")}></div>
            <span className={cx("IFLxoy--title")}>HOẶC</span>
            <div className={cx("IFLxoy--right")}></div>
          </div>
          <button className={cx("login--with-gg")}>
            <FontAwesomeIcon className={cx("icon--gg")} icon={faGoogle} />
            <p className={cx("login--gg")}>Đăng nhập với Google</p>
          </button>
        </form>
        <form className={cx("form__regis", { ani: isLogin })}>
          <h2 className={cx("form__title", "regis")}>Đăng ký</h2>
          <div className={cx("form__group")}>
            <label>Họ tên</label>
            <input
              type="text"
              placeholder="Họ và tên"
              id="name_regis"
              name="name_regis"
              onChange={(e) =>
                setDataRegis({ ...dataRegis, fullname: e.target.value })
              }
            />

            <p className="error">{errsRegis.fullname}</p>
          </div>
          <div className={cx("form__group")}>
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              id="email_regis"
              name="email_regis"
              onChange={(e) =>
                setDataRegis({ ...dataRegis, name: e.target.value })
              }
            />
            <p className="error">{errsRegis.name}</p>
          </div>
          <div className={cx("form__group")}>
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              id="pass_regis"
              name="pass_regis"
              onChange={(e) =>
                setDataRegis({ ...dataRegis, password: e.target.value })
              }
            />

            <p className="error">{errsRegis.password}</p>
          </div>
          <div className={cx("form__group")}>
            <label>Nhập lại mật khẩu</label>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              id="rePass_regis"
              onChange={(e) =>
                setDataRegis({ ...dataRegis, rePassword: e.target.value })
              }
            />

            <p className="error">{errsRegis.rePassword}</p>
          </div>
          <button onClick={handleRegis} className={cx("btn__regis")}>
            Đăng ký
          </button>
        </form>
        <div className={cx("overlay_container", { isRegis: !isLogin })}>
          <div className={cx("overlay-login")}>
            <div className={cx("isInfoRegis", "close")}>
              <h2 className={cx("overlay-title")}>Bạn chưa có tài khoản ?</h2>
              <p className={cx("overlay-sub")}>
                Đăng ký ngay để bắt đầu học lập trình với BrainTech nhé !
              </p>
              <button className={cx("overlay-btn")} onClick={handleSwitchForm}>
                Đăng ký ngay
              </button>
            </div>
            <div className={cx("isInfoLogin")}>
              <h2 className={cx("overlay-title")}>
                Chào mừng bạn đến với BrainTech
              </h2>
              <p className={cx("overlay-sub")}>
                Đăng nhập ngay để học những bài học bổ ích nhé !
              </p>
              <button className={cx("overlay-btn")} onClick={handleSwitchForm}>
                Đăng nhập ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
