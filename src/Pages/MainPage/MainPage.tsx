import About from "@/Components/About"
import Delivery from "@/Components/Delivery"
import FAQ from "@/Components/FAQ"
import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import PlugBox from "@/Components/PlugBox"
import ProjectsDD from "@/Components/ProjectsDD"

const MainPage = () => {
  return (
    <>
      <Header/>
      <PlugBox/>
      <About/>
      <ProjectsDD/>
      <Delivery/>
      <PlugBox/>
      <FAQ/>
      <Footer/>
    </>
  )
}

export default MainPage