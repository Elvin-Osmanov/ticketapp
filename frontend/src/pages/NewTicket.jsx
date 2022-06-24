import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("IPhone");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isError, dispatch, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill out form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" name="name" id="name" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Name</label>
          <input type="text" name="email" id="email" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product"></label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Iphone">Iphone</option>
              <option value="IMac">IMac</option>
              <option value="IPad">IPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description"></label>
            <textarea
              name="descriptio"
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
