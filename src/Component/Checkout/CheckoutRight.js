import React, { useContext, useEffect, useState } from "react";
import style from "./Checkout.module.scss";
import classNames from "classnames/bind";
import { DataContext } from "../DataProvider";
import { setVND } from "~/utils/curentVND";

const cx = classNames.bind(style);
function CheckoutRight(props) {
  const { cart } = useContext(DataContext);
  const [shipping, setShipping] = useState(30000);
  const totalPrice = cart.reduce((acumalator, currentValue) => {
    return acumalator + currentValue.product.price * currentValue.quantity;
  }, 0);
  useEffect(() => {
    if (totalPrice > 50000) {
      setShipping(0);
    }
  }, [totalPrice]);

  return (
    <div className={cx("wrapper-right")}>
      <div className={cx("header-right")}>
        <h2>Đơn hàng của bạn</h2>
      </div>
      <table className={cx("table")}>
        <tr>
          <th className={cx("order-name")}>Sản phẩm</th>
          <th className={cx("order-price")}>Tạm tính</th>
        </tr>
        {cart.length === 0 ? (
          <tr>
            <td className={cx("name-product")}>emty</td>
            <td className={cx("price-product")}>{setVND(0)}</td>
          </tr>
        ) : (
          cart.map((item, index) => {
            return (
              <tr key={index}>
                <td className={cx("name-product")}>
                  <p>
                    {item.product.name} * {item.quantity}
                  </p>
                </td>
                <td className={cx("price-product")}>
                  {setVND(item.product.price * item.quantity)}
                </td>
              </tr>
            );
          })
        )}
      </table>
      <div className={cx("price-sum")}>
        <h3>Tạm tính :</h3>
        <p>{setVND(totalPrice)}</p>
      </div>
      <div className={cx("price-sipper")}>
        <h3>Phí giao hàng :</h3>
        <p>{setVND(shipping)}</p>
      </div>
      <div className={cx("totalPrice")}>
        <h3>Tổng :</h3>
        <p>{setVND(totalPrice + shipping)}</p>
      </div>
      <div className={cx("node-checkout")}>
        <h5>Thanh toán khi nhận hàng</h5>
      </div>
    </div>
  );
}

export default CheckoutRight;
