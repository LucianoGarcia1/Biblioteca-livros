import { useContext } from "react";
import { Content } from "../components/Content";
import { MyContext } from "../services/Context";

export const Home = () => {
  const { dados, modal } = useContext(MyContext);
  return (
    <section className="home">
      <Content dados={dados} modal={modal} />
    </section>
  );
};
