import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Container from "./Container/Container";
import Header from "./Header/Header";
import { Toaster } from "react-hot-toast";

const SharedLayout = () => {
  return (
      <>
          <Container>
              <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
              <Header />
              <Outlet />
          </Container>
          <Footer />
      </>
  );
};

export default SharedLayout;
