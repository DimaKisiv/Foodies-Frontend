import React, { useEffect, useState } from "react";
import css from "./SignUpModal.module.css";
import Modal from "../Modal.jsx";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import Icon from "../../shared/Icon/Icon";
import { register } from "../../../redux/auth/authOperations";
import { toast } from "react-hot-toast";

function SignUpModal({
  isOpen,
  onClose,
  defaultEmail = "",
  onSwitchToSignIn,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [submitError, setSubmitError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    name: false,
    password: false,
  });

  useEffect(() => {
    if (!isOpen) return;
    setSubmitError(null);
    setFormData({ email: defaultEmail || "", name: "", password: "" });
    setTouched({ email: false, name: false, password: false });
    setShowPassword(false);
  }, [isOpen, defaultEmail]);

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (submitError) setSubmitError(null);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitError(null);

    const data = { ...formData, avatar: "" };

    try {
      await dispatch(register(data)).unwrap();
      setFormData({ email: "", name: "", password: "" });
      setTouched({ email: false, name: false, password: false });
      setShowPassword(false);
      onClose?.();
    } catch (err) {
      const status = err?.status ?? null;
      const message = err.response?.data?.message || err.message;

      if (status === 409) {
        setSubmitError("User with this email already exists");
        return;
      }

      if (status === 400) {
        setSubmitError(message || "Validation error");
        return;
      }

      toast.error(message || "Server error. Please try again later");
    }
  };

  const handleClose = () => {
    setSubmitError(null);
    setFormData({ email: "", name: "", password: "" });
    setTouched({ email: false, name: false, password: false });
    setShowPassword(false);
    onClose?.();
  };

  return (
    <Modal
      className={css["signUp-modal"]}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className={css["signUp-modal-container"]}>
        <p className={css["modal-title"]}>Sign Up</p>

        <form className={css["modal-form"]} onSubmit={handleSubmit} noValidate>
          <div className={css["form-group"]}>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.name && errors.name && (
              <span className={css["error"]}>{errors.name}</span>
            )}
          </div>

          <div className={css["form-group"]}>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.email && errors.email && (
              <span className={css["error"]}>{errors.email}</span>
            )}
          </div>

          <div className={css["form-group"]}>
            <div className={css["password-wrapper"]}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password*"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <button
                type="button"
                className={css["show-password"]}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icon
                    id="icon-eye-on"
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                ) : (
                  <Icon
                    id="icon-eye-off"
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className={css["error"]}>{errors.password}</span>
            )}
          </div>
          <div className={css["modal-actions"]}>
            {submitError && (
              <span className={css["submit-error"]}>{submitError}</span>
            )}
            <button
              type="submit"
              className={clsx(css["modal-btn"], {
                [css["modal-btn-disabled"]]: !isValid,
              })}
              disabled={!isValid}
            >
              Create
            </button>
          </div>
        </form>

        <p className={css["modal-info-text"]}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onSwitchToSignIn?.(formData.email)}
          >
            Sign in
          </button>
        </p>
      </div>
    </Modal>
  );
}

export default SignUpModal;
