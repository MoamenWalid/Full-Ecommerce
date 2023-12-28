/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import EditAccount from "./EditAccount";
import { useEffect } from "react";
import { updateCart, updateProductsUser } from "../../../store/slices/userSlice";
import axios from "axios";

const MyAccount = () => {
  const { userId } = useSelector(state => state.user);
  const { nameUser, emailUser, passwordUser } = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      axios(`http://localhost:3005/users/${userId}`).then(({ data }) => {
        if (data.cart) dispatch(updateCart(data.cart));
        if (data.wishlist) dispatch(updateProductsUser(data.wishlist));
    })
    }
  }, [userId])

  return (
    <div className="account container mx-auto px-3">
      <EditAccount userId={userId ? userId : ''} name={nameUser ? nameUser : ''} email={emailUser ? emailUser : ''} password={passwordUser ? passwordUser : ''} />
    </div>
  );
}

export default MyAccount;
