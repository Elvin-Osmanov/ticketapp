import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";

const Ticket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    if (isError) return toast.error(message);

    dispatch(getTicket(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId, dispatch]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket closed");
  };
  if (isLoading) return <Spinner />;
  if (isError) return <h3>Something went wrong</h3>;
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url={"/tickets"} />
        <h2>
          Ticket ID: {ticket._id}{" "}
          <span className={`status status-${ticket.status}`}></span>
        </h2>
        <h3>
          Data submitted: {new Date(ticket.createdAt).toLocaleString("en-UK")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "closed" && (
        <button
          onClick={onTicketClose}
          className="btn btn-block btn-danger"
        ></button>
      )}
    </div>
  );
};

export default Ticket;
