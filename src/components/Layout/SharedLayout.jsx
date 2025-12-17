import styles from "./SharedLayout.module.css";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Container from "./Container/Container";
import Header from "./Header/Header";
import { Toaster } from "react-hot-toast";

const SharedLayout = () => {
  return (
    <Container>
      <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default SharedLayout;
