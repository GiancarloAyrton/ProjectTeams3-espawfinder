import React, { useEffect, useState, lazy, Suspense, useRef } from 'react';
import { Helmet } from 'react-helmet'; // ✅ Importación correcta
import Footer from '../components/Footer';
import SectionSkeleton from '../components/SectionSkeleton';

const CoupleMatch = lazy(() => import('../components/CoupleMatch'));
const AdoptionGallery = lazy(() => import('../components/AdoptionCards'));
const SolidarityHelpCard = lazy(() => import('../components/SolidarityHelpCard'));


const HomeScreen = () => {
  const [isSectionVisible, setIsSectionVisible] = useState({
    adoption: false,
    solidarity: false,
    couple: false,
  });
  const adoptionRef = useRef();
  const solidarityRef = useRef();
  const coupleRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '300px' }
    );
    [adoptionRef, solidarityRef, coupleRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);
  return (
    <>
    <Helmet>
        <title>Espaw Finder - Encuentra Mascotas Perdidas y Adopta</title>
        <meta name="description" content="Encuentra mascotas perdidas, adopta y ayuda a darles un hogar con Espaw Finder. Un espacio para los amantes de los animales." />
        <meta name="keywords" content="adopción mascotas, adoptar perro, adoptar gato, adoptar cachorros, adoptar gatitos, adoptar perritos, adoptar mascota, perros adopción, gatos adopción, refugios animales, adopción gratuita, adoptar sin costo, adopta perro, adopta gato, adoptar perro gratis, adoptar gato gratis, adopción de animales, perros en adopción, gatos en adopción

mascota perdida, encontrar mascota, mascota extraviada, recuperar mascota, reportar mascota, buscar mascota, encontrar perro, encontrar gato, mascota callejera, búsqueda de mascotas, rescatar mascota, rescate animal, encontrar dueño mascota

perros perdidos, gatos perdidos, ayuda mascotas, perros sin hogar, gatos sin hogar, dar en adopción, dar perro adopción, dar gato adopción, adopción urgente, adoptar hoy, adoptar ahora, publicar adopción, compartir adopción, ayudar mascotas, voluntariado mascotas, voluntariado animal

protección animal, bienestar animal, cuidar mascotas, cuidado de perros, cuidado de gatos, rescate de animales, refugio de mascotas, hogar temporal mascotas, acoger perro, acoger gato, acoger mascota, adopción responsable, adopción solidaria, adopción ética, mascotas sin hogar, adopción consciente

red de adopción, adopción Ecuador, adopción en línea, adopción online, adopción Guayaquil, adopción Quito, adopción internacional, adoptar en Ecuador, adoptar en Guayaquil, adoptar en Quito, buscar mascota, buscar perro, buscar gato, encontrar compañero, encontrar amigo peludo

publicar mascota perdida, reportar mascota perdida, buscar dueño mascota, encontrar dueño perro, encontrar dueño gato, publicar adopción, compartir mascota adoptable, publicar mascota rescatada, compartir perro adoptable, compartir gato adoptable, buscar nuevo hogar mascota

perros rescatados, gatos rescatados, adopción perros grandes, adopción perros pequeños, adopción perros medianos, adopción perros mestizos, adopción gatos siameses, adopción gatos persas, adopción cachorros pequeños, adoptar perrito rescatado, adoptar gatito rescatado, adoptar mascota rescatada

cuidar perros, cuidar gatos, consejos adopción, consejos mascotas, cómo adoptar mascota, dónde adoptar perro, dónde adoptar gato, qué hacer mascota perdida, qué hacer si encuentro mascota, cómo reportar mascota perdida, cómo dar mascota adopción

amistad animal, comunidad animal, conectar mascotas, adoptar mejor amigo, cambiar vida mascota, amor incondicional, darle hogar perro, darle hogar gato, vida mejor mascotas, encontrar compañero peludo, encontrar mejor amigo, salvar vidas animales
" />
        <meta name="author" content="Espaw Finder" />

        {/* Open Graph */}
        <meta property="og:title" content="Espaw Finder - Encuentra Mascotas Perdidas y Adopta" />
        <meta property="og:description" content="¿Buscas a tu mascota perdida o quieres adoptar? En Espaw Finder conectamos a personas con mascotas necesitadas." />
        <meta property="og:image" content="https://espawfinder.com/logo.png" />
        <meta property="og:url" content="https://espawfinder.com" />

        {/* Twitter Card */}
        <meta name="twitter:title" content="Espaw Finder - Encuentra y Adopta Mascotas" />
        <meta name="twitter:description" content="¿Buscas a tu mascota perdida o quieres adoptar? Conéctate con dueños y adopta una mascota en Espaw Finder." />
        <meta name="twitter:image" content="https://espawfinder.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

    <div>
      <div id="header3" className="container-fluid overlay fixed-header">
        <div className="container">
          <div className="col-lg-5 text-light" data-aos="fade-up">
            <p className='h1 bienvenida title'>Bienvenido a Espaw Finder</p>
            <h1 className="h7 description">Si perdiste o encontraste a una mascota ¡puedes publicarlo aquí!</h1>
            <a href="/formulario" className="btn btn-publicar btn-primary">Publicar</a>
          </div>
        </div>
      </div>
      <section id="services-home" class="">
        <div class="">
          <div class="section-heading text-center">
            <p class="subtitle">Qué Ofrecemos</p>
            <h2>Nuestros Servicios</h2>
          </div>
        </div>
      </section>
      <div class="seccion-pronto container intro-row-boxes" data-aos="zoom-out">
        <div class="rows">
          <div class="col-lg-4">
            <div class="serviceBox1 bg-tertiary pattern3">
              <div class="service-content bg-light">
                <div class="service-icon">
                  <img src="img/services/service1.jpg" class="img-fluid rounded-circle" alt="" />
                </div>
                <h3 class=""><a href="services-single.html">Veterinarias</a></h3>
                <p class="">
                  ¿Tienes una clínica veterinaria? 🩺✨ Únete a nuestra comunidad para ayudar a más mascotas. Conectamos a dueños responsables con servicios confiables para el bienestar animal.
                </p>
              </div>
              <div class="text-center">
                <a class="btn btn-primary" href="services-single.html">Pronto</a>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="serviceBox1 bg-tertiary pattern3">
              <div class="service-content bg-light">
                <div class="service-icon">
                  <img src="img/services/service3.jpg" class="img-fluid rounded-circle" alt="" />
                </div>
                <h3 class=""><a href="services-single.html">Adopciones</a></h3>
                <p class="">
                  Queremos ser un apoyo para refugios. ❤️🐕 Ofrecemos un espacio donde puedes mostrar a tus adorables rescatados, compartir historias de éxito, y fomentar la adopción responsable.
                </p>
              </div>
              <div class="text-center">
                <a class="btn btn-primary" href="services-single.html">Pronto</a>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="serviceBox1 bg-tertiary pattern3">
              <div class="service-content bg-light">
                <div class="service-icon">
                  <img src="img/services/service2.jpg" class="img-fluid rounded-circle" alt="" />
                </div>
                <h3 class=""><a href="services-single.html">Peluquerías</a></h3>
                <p class="">
                  ¿Tu negocio de peluquería canina busca llegar a más clientes? ✂️🐾 Espaw Finder es un espacio donde conectamos a amantes de las mascotas con servicios de calidad.
                </p>
              </div>
              <div class="text-center">
                <a class="btn btn-primary" href="services-single.html">Pronto</a>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div id="adoption-seccion">
      <div ref={adoptionRef} id="adoption">
        <div className="section-heading text-center">
          <p className="subtitle">Encuentra a tu amigo</p>
          <h2>Adopciones</h2>
        </div>
        <div className="">
          <div className="col-lg-10 offset-lg-1 text-center acto">
            <h3>Adoptar es un acto de <span className="text-tertiary">amor</span></h3>
          </div>
        </div>
      </div>

        {isSectionVisible.adoption ? (
          <Suspense fallback={<SectionSkeleton />}>
            <AdoptionGallery />
          </Suspense>
        ) : (
          <SectionSkeleton />
        )}
      </div>

      <section id="counter-section" class="container-fluid-home counter-calltoaction bg-fixed overlay">
        <div id="counter" class="container">
          <div class="rows col-lg-10 offset-lg-1">
            <div class="col-xl-3 col-md-6">
              <div class="counter">
                <i class="counter-icon flaticon-dog-in-front-of-a-man"></i>
                <div class="counter-value" data-count="14">0</div>
                <h3 class="title">Profesionales</h3>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="counter">
                <i class="counter-icon flaticon-dog-2"></i>
                <div class="counter-value" data-count="60">0</div>
                <h3 class="title">Adopted Pets</h3>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="counter">
                <i class="counter-icon flaticon-prize-badge-with-paw-print"></i>
                <div class="counter-value" data-count="12">0</div>
                <h3 class="title">Awards</h3>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="counter">
                <i class="counter-icon flaticon-dog-18"></i>
                <div class="counter-value" data-count="120">0</div>
                <h3 class="title">Clients</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="solidarity-seccion">
      <div ref={solidarityRef} id="solidarity">
        {isSectionVisible.solidarity ? (
          <Suspense fallback={<SectionSkeleton />}>
            <SolidarityHelpCard />
          </Suspense>
        ) : (
          <SectionSkeleton />
        )}
      </div>
      </div>


      <div className='couple-match-container' id="couple-seccion">
        <div ref={coupleRef} id="couple">
        <div className="section-heading text-center">
          <p className="subtitle">Encuentra a su pareja</p>
          <h2>Be my <span className="text-tertiary">Valentine</span></h2>
        </div>
          {isSectionVisible.solidarity ? (
            <Suspense fallback={<SectionSkeleton />}>
              {isSectionVisible.couple && <CoupleMatch />}
            </Suspense>
          ) : (
            <SectionSkeleton />
          )}
        </div>
      </div>








      <Footer />

    </div>
    </>


  );
};

export default HomeScreen;

