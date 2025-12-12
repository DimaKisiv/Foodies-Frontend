import styles from "./SharedLayout.module.css";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Container from "./Container/Container";

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
