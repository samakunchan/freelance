<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class HomeController
 * @package App\Controller
 */
class HomeController extends AbstractController
{
    /**
     * Affichage de la page principale
     * @Route("/", name="home")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index()
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * Affichage des conditions générales de vente
     * @Route("/cgv", name="cgv")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function cgv()
    {
        return $this->render('home/cgv.html.twig');
    }
}
