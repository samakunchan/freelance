<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    /**
     * @Route("/", name="contact")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index(Request $request)
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()){
            $this->sendEmail($form->getData());
            $this->addFlash(
                'notice',
                'Votre demande a été envoyé. Vous aurez votre réponse sous 48hmax.'
            );
        }
        return $this->render('contact/index.html.twig', [
            'controller_name' => 'ContactController',
            'form'=> $form->createView()
        ]);
    }

    private function sendEmail($data){
        $mail = 'samakunchan@gmail.com';
        $mailOwner = $data->getEmail();
        $nameOwner = $data->getName();
        if ($data->getCompany()){
            $nameOwner .= ' - '.ucfirst($data->getCompany());
        }
        if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail))
        {
            $passage_ligne = "\r\n";
        }
        else
        {
            $passage_ligne = "\n";
        }
        $message_html = '<h1 style="text-align: center; color: #5eb5e0">Demande éffectuer depuis mon site: Samakunchan Technology</h1>';
        if ($data->getPhone()){
            $message_html .= '<h2 style="text-align: center; color: #5eb5e0">Contact joignable à se numéro: <em style="color: #3CC157">'.$data->getPhone().'</em></h2>';
        }
        $message_html .= '<div style="text-align: center;padding-left: 6vw;padding-right: 6vw;"><p style="text-align: justify;font-size: 15px;letter-spacing:1px;">'.$data->getContent().'</p></div>';
        $boundary = "-----=".md5(rand());
        $sujet = ucfirst($data->getWhatyouneed());
        $header = "From: \"$nameOwner\"<$mailOwner>".$passage_ligne;
        $header.= "Reply-to: \"$nameOwner\" <$mailOwner>".$passage_ligne;
        $header.= "MIME-Version: 1.0".$passage_ligne;
        $header.= "Content-Type: multipart/alternative;".$passage_ligne." boundary=\"$boundary\"".$passage_ligne;
        $header .= "X-Priority: 1 (Highest)\n";
        $header .= "X-MSMail-Priority: High\n";
        $header .= "Importance: High\n";
        $message = $passage_ligne."--".$boundary.$passage_ligne;
        $message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".$passage_ligne;
        $message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
        $message.= $passage_ligne.$message_html.$passage_ligne;
        $message.= $passage_ligne."--".$boundary."--".$passage_ligne;
        $message.= $passage_ligne."--".$boundary."--".$passage_ligne;
        return mail($mail,$sujet,$message,$header);
    }
}
