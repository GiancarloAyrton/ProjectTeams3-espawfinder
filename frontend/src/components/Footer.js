import React, { useEffect, useState } from 'react';

const Footer = () => {
    return (
        <div className='footerG'>

          






            <footer className="bg-light pattern">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 text-center">
                            <a href="/">
                                <img src='/img/logo.png' className="logo-footer img-fluid" alt="Logo" />
                            </a>
                            <ul className="social-list text-center list-inline">
                                <li className="list-inline-item"><a title="Facebook" href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li className="list-inline-item"><a title="Twitter" href="#"><i className="fab fa-twitter"></i></a></li>
                                <li className="list-inline-item"><a title="Instagram" href="#"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <h2>Sobre Mi</h2>
                            <hr className="small-divider left" />
                            <h3 className="mt-3 h6 description">Proyecto dedicado a ayudar a la comunidad  | ESPOL</h3>
                        </div>
                        <div className="col-lg-3">
                            <h4>Contactame</h4>
                            <hr className="small-divider left" />
                            <ul className="list-unstyled mt-3">
                                <li className="mb-1"><i className="fas fa-phone margin-icon"></i>(593) 98 022 3236</li>
                                <li className="mb-1"><i className="fas fa-envelope margin-icon"></i><a href="mailto:email@yoursite.com">gianayrton@gmail.com</a></li>
                                <li><i className="fas fa-map-marker margin-icon"></i>Guayaquil - Ecuador</li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <h4>Horas de trabajo</h4>
                            <hr className="small-divider left" />
                            <ul className="list-unstyled mt-3">
                                <li className="mb-1">De 9am - 6pm</li>
                                
                            </ul>
                        </div>
                    </div>
                    <hr />
                    
                </div>
                <div className="page-scroll hidden-sm hidden-xs">
                    <a href="#top" className="back-to-top"><i className="fa fa-angle-up"></i></a>
                </div>
                <div className="">
                        <div className="credits col-sm-12">
                        <p>Copyright 2024 - 2026 </p> 
                    </div>
                </div>
            </footer>
        </div>

    );
}

export default Footer;