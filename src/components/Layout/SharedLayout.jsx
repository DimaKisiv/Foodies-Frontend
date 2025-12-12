import styles from "./SharedLayout.module.css";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Container from "./Container/Container";
import Header from "../Header/Header.jsx";

const SharedLayout = () => {
  return (
    <Container>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default SharedLayout;
