<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class CreateUserCommand extends Command
{
    protected static $defaultName = 'sama:create-user';
    /**
     * @var ObjectManager
     */
    private $manager;
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    /**
     * CreateUserCommand constructor.
     * @param null $name
     * @param ObjectManager $manager
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct($name = null, ObjectManager $manager, UserPasswordEncoderInterface $encoder)
    {
        parent::__construct($name);
        $this->manager = $manager;
        $this->encoder = $encoder;
    }


    protected function configure()
    {
        $this->setDescription('Creation d\'un nouvel utilisateur')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $helper = $this->getHelper('question');

        $questionSurLeNom = new Question('Entrez votre nom et/ou prénom [Ex: PETIT Jean]: ');
        $questionSurLeNom->setValidator(function ($answer) {
            if (!is_string($answer) && empty($answer)) {
                throw new \RuntimeException(
                    'Vous devez entré un nom valide.'
                );
            }

            return $answer;
        });
        $questionSurLeNom->setMaxAttempts(2);

        $questionSurLePseudo = new Question('Entrez votre pseudo: ');
        $questionSurLePseudo->setValidator(function ($answer) {
            if (!is_string($answer) && empty($answer)) {
                throw new \RuntimeException(
                    'Vous devez entré un nom valide.'
                );
            }

            return $answer;
        });
        $questionSurLePseudo->setMaxAttempts(2);

        $questionSurEmail = new Question('Entrez votre email: ');
        $questionSurEmail->setValidator(function ($answer) {
            if (!is_string($answer) && empty($answer)) {
                throw new \RuntimeException(
                    'Vous devez entré un email valide.'
                );
            }

            return $answer;
        });
        $questionSurEmail->setMaxAttempts(2);

        $questionSurLeMDP = new Question('Entrez votre mot de passe: ');
        $questionSurLeMDP->setValidator(function ($answer) {
            if (!is_string($answer) && empty($answer)) {
                throw new \RuntimeException(
                    'Vous devez entré un mot de passe valide.'
                );
            }

            return $answer;
        });
        $questionSurLeMDP->setMaxAttempts(2);

        $questionSurLeRole = new Question('Choisissez le role parmis ROLE_ADMIN, ROLE_MODO, ROLE_USER (en majuscule): ');
        $questionSurLeRole->setValidator(function ($answer) {
            if (!is_string($answer) && empty($answer)) {
                if ($answer !== 'ROLE_ADMIN' || $answer !== 'ROLE_MODO' || $answer !== 'ROLE_USER'){
                    throw new \RuntimeException('Vous devez entré un rôle valide.');
                }
            }

            return $answer;
        });
        $questionSurLeRole->setMaxAttempts(2);



        $name = $helper->ask($input, $output, $questionSurLeNom);
        $username = $helper->ask($input, $output, $questionSurLePseudo);
        $email = $helper->ask($input, $output, $questionSurEmail);
        $password = $helper->ask($input, $output, $questionSurLeMDP);
        $roles = $helper->ask($input, $output, $questionSurLeRole);

        $user = new User();
        $user->setFullname($name);
        $user->setUsername($username);
        $user->setEmail($email);
        $hash = $this->encoder->encodePassword($user, $password);
        $user->setPassword($hash);
        $user->setRoles([$roles]);
        //$this->manager->persist($user);
        //$this->manager->flush();
        //$io = new SymfonyStyle($input, $output);
        //$name = $input->getArgument('name');
        //$password = $input->getArgument('password');
//
        //if ($name) {
        //    $io->note(sprintf('Voici le nom: %s', $name));
        //}
//
        //if ($password) {
        //    $io->note(sprintf('Voici le mot de passe: %s', $password));
        //}
//
        //$io->success('You have a new command! Now make it your own! Pass --help to see your options.');
    }
}
