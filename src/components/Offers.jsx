import Item from "./Item";

const Offers = ({ data }) => {
  return (
    <section className="offers container">
      {data.map((item) => {
        return <Item key={item._id} item={item} />;
      })}
    </section>
  );
};

export default Offers;
