import Explan from "@/components/explan";
import Footer from "@/components/footer";
import Intro from "@/components/intro";
import NavBar from "@/components/navBar";
import Reviews from "@/components/reviews";
import SemiFooter from "@/components/semiFooter";

export default function Home() {
  return (
   <div>
    <div className=' md:px-10 p-4'>
    <NavBar />
    <Intro />
    <Explan />
    <Reviews />
    </div>
    <SemiFooter />
    <Footer/>
   </div>
  );
}
