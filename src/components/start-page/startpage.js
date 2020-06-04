import React from 'react';
import "./vendor/bootstrap/css/bootstrap.min.css";
//import "https://fonts.googleapis.com/css?family=Varela+Round" ;
//import "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i";
import "./css/grayscale.min.css";
import "./vendor/fontawesome-free/css/all.min.css";

const StartPage =()=>{
  return(
  
<div>
  <section id="projects" class="projects-section bg-light">
    <div class="container">

     
      <div class="row align-items-center no-gutters mb-4 mb-lg-5">
        <div class="col-xl-8 col-lg-7">
          <img class="img-fluid mb-3 mb-lg-0" src="./img/bg-masthead.jpg" alt=""/>
        </div>
        <div class="col-xl-4 col-lg-5">
          <div class="featured-text text-center text-lg-left">
            <h4>Choose your QUEEN and KING.</h4>
          </div>
        </div>
      </div>

      
      <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
        <div class="col-lg-6">
          <img class="img-fluid" src="../img/category.jpg" alt=""/>
        </div>
        <div class="col-lg-6">
          <div class="bg-black text-center h-100 project">
            <div class="d-flex h-100">
              <div class="project-text w-100 my-auto text-center text-lg-left">
                <h4 class="text-white">Categorie</h4>
                <p class="mb-0 text-white-50">Сreate your own categories.</p>
                <hr class="d-none d-lg-block mb-0 ml-0"/>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div class="row justify-content-center no-gutters">
        <div class="col-lg-6">
          <img class="img-fluid" src="./img/promo.jpg" alt=""/>
        </div>
        <div class="col-lg-6 order-lg-first">
          <div class="bg-black text-center h-100 project">
            <div class="d-flex h-100">
              <div class="project-text w-100 my-auto text-center text-lg-right">
                <h4 class="text-white">Candidate</h4>
                <p class="mb-0 text-white-50">Promote your candidate.</p>
                <hr class="d-none d-lg-block mb-0 mr-0"/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
    
 
  <footer class="bg-black small text-center text-white-50">
    <div class="container">
      Fuck corona &copy; KNU vote 2020 
    </div>
  </footer>


  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>


  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

  <script src="js/grayscale.min.js"></script>

</div>)}
export default StartPage;
